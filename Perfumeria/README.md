# Perfumería — Frontend v2

Capa de presentación ampliada y alineada con `perfumeria_modelo_robusto_mysql.sql` (MySQL 8.0.16+).

## Ejecutar

1. Descomprimir la carpeta.
2. Abrir `perfumeria_frontend` en Visual Studio Code.
3. Ejecutar `index.html` con Live Server (o servir la carpeta con cualquier servidor estático).
4. Abrir `admin.html` para acceder a los módulos administrativos.

No requiere npm ni compilación para esta versión estática.

## Módulos de presentación incluidos

- Tienda pública: `index.html` (se conserva la tienda validada en la versión 1).
- Administración: `admin.html` con dashboard, formularios de alta/edición y tablas para categorías, marcas, productos, presentaciones, proveedores, compras, inventario, movimientos, transferencias, cajas, ventas, pagos, clientes, sucursales, almacenes, usuarios, roles, permisos y auditoría.
- Los datos demo se guardan en `localStorage` bajo la clave `perfumeria_v2_demo`.
- Los formularios reflejan los campos principales de las entidades SQL. Los campos de detalle (por ejemplo `compra_detalle`, `detalle_venta`, `transferencia_detalle`, `direccion_cliente`, `imagen_producto`, `usuario_rol`, `usuario_sucursal`, `rol_permiso`, `notificacion_pasarela` y `turno_caja`) se muestran como vistas relacionadas o quedan especificados en el contrato técnico para implementar flujos completos en API.

## Correspondencia de entidades

| Módulo UI | Entidades MySQL |
|---|---|
| Categorías | `categoria` |
| Marcas | `marca` |
| Productos / presentaciones | `producto`, `presentacion_producto`, `imagen_producto` |
| Proveedores / compras | `proveedor`, `proveedor_producto`, `compra`, `compra_detalle` |
| Inventario / movimientos | `inventario`, `movimiento_inventario` |
| Transferencias | `transferencia_inventario`, `transferencia_detalle` |
| Cajas | `caja`, `turno_caja` |
| Ventas | `venta`, `detalle_venta` |
| Pagos | `metodo_pago`, `pago_venta`, `transaccion_pasarela`, `notificacion_pasarela` |
| Clientes | `cliente`, `direccion_cliente` |
| Sucursales / almacenes | `sucursal`, `almacen`, `usuario_sucursal` |
| Seguridad | `usuario`, `rol`, `permiso`, `usuario_rol`, `rol_permiso`, `sesion_usuario`, `token_recuperacion` |
| Auditoría | `auditoria` |

## Importante

Esta versión es únicamente frontend demostrativo. No se conecta a MySQL, no autentica usuarios y no procesa pagos reales. No se deben cargar datos sensibles. Los IDs y relaciones en los formularios sirven para validar la experiencia y el contrato de integración; el backend será la autoridad para validar permisos, integridad referencial, stock y estados.

## Próxima fase: backend Node.js

Revisar `API_CONTRACT_V2.md` antes de crear controladores y rutas. Mantener la regla: operaciones de compra/venta/transferencia e inventario deben actualizar existencias y movimientos en una transacción SQL; PayU se confirma mediante notificación firmada validada en servidor.
