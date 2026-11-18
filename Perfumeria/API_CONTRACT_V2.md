# Contrato de integración Frontend ↔ API — Perfumería

**Base de datos de referencia:** `perfumeria_db`, modelo MySQL 8.0.16+ (script SQL entregado).  
**Estado:** propuesta de contrato para implementar en Node.js/Express. No implica que estos endpoints ya existan.

## Convenciones

- Prefijo: `/api/v1`.
- JSON UTF-8; fechas ISO-8601; importes COP como decimal (no flotantes en lógica de negocio).
- Respuesta exitosa de colección: `{ "data": [], "meta": { "page": 1, "limit": 20, "total": 0 } }`.
- Respuesta de recurso: `{ "data": { ... } }`.
- Error: `{ "error": { "code": "VALIDATION_ERROR", "message": "...", "details": [] } }`.
- IDs `BIGINT UNSIGNED` pueden serializarse como string para evitar pérdida de precisión en JavaScript.
- Listados paginados con `page`, `limit`, `q`, `sort`, `order`; filtros específicos por módulo.
- `POST` crea, `GET` consulta, `PATCH` actualiza parcialmente y `DELETE` aplica baja lógica/estado cuando corresponda. No borrar físicamente movimientos, ventas, pagos ni auditoría.
- El backend debe validar roles/permisos en cada solicitud. La UI nunca es autoridad de seguridad.

## Recursos y entidades

| Recurso | Tabla(s) | Rutas sugeridas |
|---|---|---|
| Autenticación | `usuario`, `sesion_usuario`, `token_recuperacion` | `POST /auth/login`, `POST /auth/logout`, `POST /auth/refresh`, `POST /auth/forgot-password`, `POST /auth/reset-password`, `GET /auth/me` |
| Usuarios | `usuario`, `usuario_rol`, `usuario_sucursal` | `GET/POST /users`, `GET/PATCH /users/:id`, `PUT /users/:id/roles`, `PUT /users/:id/branches`, `PATCH /users/:id/status` |
| Roles y permisos | `rol`, `permiso`, `rol_permiso` | `GET/POST /roles`, `GET/PATCH /roles/:id`, `GET /permissions`, `PUT /roles/:id/permissions` |
| Sucursales y almacenes | `sucursal`, `almacen` | `GET/POST /branches`, `GET/PATCH /branches/:id`, `GET/POST /warehouses`, `GET/PATCH /warehouses/:id` |
| Clientes | `cliente`, `direccion_cliente` | `GET/POST /customers`, `GET/PATCH /customers/:id`, `GET/POST /customers/:id/addresses`, `PATCH/DELETE /customers/:id/addresses/:addressId` |
| Catálogo | `categoria`, `marca`, `producto`, `presentacion_producto`, `imagen_producto` | `GET/POST /categories`, `GET/POST /brands`, `GET/POST /products`, `GET/PATCH /products/:id`, `GET/POST /products/:id/presentations`, `GET/POST /products/:id/images` |
| Proveedores | `proveedor`, `proveedor_producto` | `GET/POST /suppliers`, `GET/PATCH /suppliers/:id`, `PUT /suppliers/:id/presentations` |
| Compras | `compra`, `compra_detalle` | `GET/POST /purchases`, `GET /purchases/:id`, `POST /purchases/:id/items`, `POST /purchases/:id/receive`, `POST /purchases/:id/cancel` |
| Inventario | `inventario`, `movimiento_inventario` | `GET /inventory`, `GET /inventory/movements`, `POST /inventory/adjustments` |
| Transferencias | `transferencia_inventario`, `transferencia_detalle` | `GET/POST /transfers`, `GET /transfers/:id`, `POST /transfers/:id/items`, `POST /transfers/:id/dispatch`, `POST /transfers/:id/receive`, `POST /transfers/:id/cancel` |
| Caja | `caja`, `turno_caja` | `GET/POST /cash-registers`, `GET /cash-registers/:id/shifts`, `POST /cash-registers/:id/open-shift`, `POST /shifts/:id/close` |
| Ventas | `venta`, `detalle_venta` | `GET/POST /sales`, `GET /sales/:id`, `POST /sales/:id/items`, `POST /sales/:id/cancel` |
| Pagos | `metodo_pago`, `pago_venta`, `transaccion_pasarela`, `notificacion_pasarela` | `GET /payment-methods`, `POST /sales/:id/payments`, `GET /payments/:id`, `GET /payments/:id/gateway-transactions` |
| Auditoría | `auditoria` | `GET /audit-logs` (solo lectura para roles autorizados) |
| Resúmenes | `vw_inventario_por_sucursal`, `vw_ventas_resumen` | `GET /reports/inventory-by-branch`, `GET /reports/sales-summary` |

## DTO de referencia

### Producto y presentaciones

`POST /products`
```json
{
  "id_categoria": "1",
  "id_marca": "2",
  "nombre": "Fragancia de ejemplo",
  "descripcion": "Descripción",
  "requiere_control_lote": false,
  "activo": true
}
```

`POST /products/:id/presentations`
```json
{
  "sku": "PER-100",
  "codigo_barras": "770000000100",
  "nombre_presentacion": "100 ml",
  "contenido_ml": 100,
  "precio_venta": "520000.00",
  "costo_referencia": "330000.00",
  "permite_venta": true,
  "activo": true
}
```

### Compra

`POST /purchases`
```json
{
  "id_sucursal": "1",
  "id_almacen": "1",
  "id_proveedor": "1",
  "numero_documento": "FC-2026-001",
  "items": [
    { "id_presentacion": "1", "cantidad": "2.000", "costo_unitario": "290000.00", "descuento": "0.00", "impuesto": "0.00" }
  ]
}
```

La recepción de compra debe ejecutarse en transacción SQL: validar estado, insertar movimientos `ENTRADA_COMPRA`, incrementar `inventario`, actualizar totales y pasar compra a `RECIBIDA`.

### Venta y pago

`POST /sales`
```json
{
  "id_sucursal": "1",
  "id_almacen": "1",
  "id_turno": "1",
  "id_cliente": "1",
  "items": [
    { "id_presentacion": "1", "cantidad": "1.000", "precio_unitario": "465000.00", "descuento": "0.00", "impuesto": "0.00" }
  ]
}
```

`POST /sales/:id/payments`
```json
{ "metodo": "PAYU", "monto": "465000.00", "moneda": "COP", "return_url": "https://..." }
```

La respuesta de iniciar PayU debe contener una referencia y los datos de redirección que correspondan al flujo oficial vigente. Nunca recibir ni almacenar PAN/CVV. El retorno del navegador no confirma el pago.

## Reglas transaccionales obligatorias

1. Compra recibida: actualizar `inventario` y registrar `movimiento_inventario` en una misma transacción.
2. Venta pagada: bloquear filas de inventario con `SELECT ... FOR UPDATE`, validar disponibilidad, descontar existencias, registrar `SALIDA_VENTA` y cambiar estado dentro de una transacción. Evitar doble descuento por reintentos.
3. Transferencia: al despachar y recibir, registrar `TRASLADO_SALIDA` y `TRASLADO_ENTRADA` con trazabilidad de la transferencia. No permitir origen y destino iguales.
4. Apertura/cierre de caja: validar que no exista otro turno abierto incompatible; calcular diferencia en servidor.
5. PayU: validar firma/notificación del servidor, idempotencia y monto/referencia contra el pago interno. Registrar cada notificación recibida en `notificacion_pasarela`; no marcar aprobado por query param ni retorno de navegador.
6. Contraseñas: almacenar únicamente `password_hash` generado con Argon2id o bcrypt. Tokens de sesión/recuperación almacenados como hash.
7. Auditoría: registrar actor, acción, entidad, identificador, IP y valores anteriores/nuevos desde el backend.

## Pendientes de implementación de UI/API

- El frontend v2 permite probar formularios principales con almacenamiento local de demostración. Los flujos de líneas múltiples de compra/venta/transferencia deben implementarse como formularios maestros-detalle conectados a los endpoints anteriores.
- Las relaciones `usuario_rol`, `usuario_sucursal` y `rol_permiso` requieren selección múltiple y guardado atómico en endpoints `PUT` dedicados.
- `sesion_usuario`, `token_recuperacion`, `notificacion_pasarela` y `auditoria` son vistas administrativas/operativas restringidas, no CRUD abierto desde el navegador.
- Los totales, precios finales, stock, estados de pagos y permisos se recalculan/verifican siempre en el servidor.
