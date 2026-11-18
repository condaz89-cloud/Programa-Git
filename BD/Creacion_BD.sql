CREATE DATABASE IF NOT EXISTS perfumeria_db
 CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE perfumeria_db;
SET NAMES utf8mb4;

-- 1. USUARIOS Y SEGURIDAD
CREATE TABLE IF NOT EXISTS usuario (
 id_usuario BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 nombres VARCHAR(100) NOT NULL, apellidos VARCHAR(100) NOT NULL,
 correo VARCHAR(190) NOT NULL, telefono VARCHAR(25),
 password_hash VARCHAR(255) NOT NULL,
 estado ENUM('PENDIENTE','ACTIVO','BLOQUEADO','INACTIVO') NOT NULL DEFAULT 'PENDIENTE',
 email_verificado_en DATETIME, ultimo_acceso_en DATETIME,
 intentos_fallidos SMALLINT UNSIGNED NOT NULL DEFAULT 0,
 bloqueado_hasta DATETIME, creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 actualizado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 eliminado_en DATETIME, UNIQUE KEY uq_usuario_correo(correo), KEY idx_usuario_estado(estado)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS rol (
 id_rol SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 codigo VARCHAR(50) NOT NULL UNIQUE, nombre VARCHAR(80) NOT NULL UNIQUE,
 descripcion VARCHAR(255), sistema TINYINT(1) NOT NULL DEFAULT 0,
 activo TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS permiso (
 id_permiso SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 codigo VARCHAR(100) NOT NULL UNIQUE, modulo VARCHAR(60) NOT NULL,
 nombre VARCHAR(120) NOT NULL, descripcion VARCHAR(255),
 KEY idx_permiso_modulo(modulo)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS usuario_rol (
 id_usuario BIGINT UNSIGNED NOT NULL, id_rol SMALLINT UNSIGNED NOT NULL,
 asignado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY(id_usuario,id_rol),
 CONSTRAINT fk_ur_usuario FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT fk_ur_rol FOREIGN KEY(id_rol) REFERENCES rol(id_rol) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS rol_permiso (
 id_rol SMALLINT UNSIGNED NOT NULL, id_permiso SMALLINT UNSIGNED NOT NULL,
 PRIMARY KEY(id_rol,id_permiso),
 CONSTRAINT fk_rp_rol FOREIGN KEY(id_rol) REFERENCES rol(id_rol) ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT fk_rp_permiso FOREIGN KEY(id_permiso) REFERENCES permiso(id_permiso) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sesion_usuario (
 id_sesion BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 id_usuario BIGINT UNSIGNED NOT NULL, token_hash CHAR(64) NOT NULL UNIQUE,
 ip VARCHAR(45), user_agent VARCHAR(500), expira_en DATETIME NOT NULL,
 revocada_en DATETIME, creada_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 KEY idx_sesion_usuario_expira(id_usuario,expira_en),
 CONSTRAINT fk_sesion_usuario FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS token_recuperacion (
 id_token BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 id_usuario BIGINT UNSIGNED NOT NULL, token_hash CHAR(64) NOT NULL UNIQUE,
 expira_en DATETIME NOT NULL, utilizado_en DATETIME,
 creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT fk_token_usuario FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 2. SUCURSALES, ALMACENES Y PERSONAL
CREATE TABLE IF NOT EXISTS sucursal (
 id_sucursal BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 codigo VARCHAR(30) NOT NULL UNIQUE, nombre VARCHAR(120) NOT NULL,
 telefono VARCHAR(25), correo VARCHAR(190), direccion VARCHAR(255) NOT NULL,
 ciudad VARCHAR(100), departamento VARCHAR(100),
 pais VARCHAR(80) NOT NULL DEFAULT 'Colombia',
 es_principal TINYINT(1) NOT NULL DEFAULT 0,
 estado ENUM('ACTIVA','INACTIVA') NOT NULL DEFAULT 'ACTIVA'
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS almacen (
 id_almacen BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 id_sucursal BIGINT UNSIGNED NOT NULL, codigo VARCHAR(30) NOT NULL,
 nombre VARCHAR(120) NOT NULL,
 tipo ENUM('VENTA','RESERVA','GENERAL') NOT NULL DEFAULT 'GENERAL',
 estado ENUM('ACTIVO','INACTIVO') NOT NULL DEFAULT 'ACTIVO',
 UNIQUE KEY uq_almacen_sucursal_codigo(id_sucursal,codigo),
 UNIQUE KEY uq_almacen_sucursal_id(id_sucursal,id_almacen),
 CONSTRAINT fk_almacen_sucursal FOREIGN KEY(id_sucursal) REFERENCES sucursal(id_sucursal) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS usuario_sucursal (
 id_usuario BIGINT UNSIGNED NOT NULL, id_sucursal BIGINT UNSIGNED NOT NULL,
 es_principal TINYINT(1) NOT NULL DEFAULT 0, activo TINYINT(1) NOT NULL DEFAULT 1,
 asignado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY(id_usuario,id_sucursal),
 CONSTRAINT fk_us_usuario FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT fk_us_sucursal FOREIGN KEY(id_sucursal) REFERENCES sucursal(id_sucursal) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 3. CLIENTES
CREATE TABLE IF NOT EXISTS cliente (
 id_cliente BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 id_usuario BIGINT UNSIGNED NULL,
 tipo_documento ENUM('CC','CE','NIT','PASAPORTE','OTRO') NOT NULL DEFAULT 'CC',
 numero_documento VARCHAR(30), nombres VARCHAR(100) NOT NULL,
 apellidos VARCHAR(100), correo VARCHAR(190), telefono VARCHAR(25),
 fecha_nacimiento DATE, estado ENUM('ACTIVO','INACTIVO') NOT NULL DEFAULT 'ACTIVO',
 creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 actualizado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 UNIQUE KEY uq_cliente_usuario(id_usuario),
 UNIQUE KEY uq_cliente_documento(tipo_documento,numero_documento),
 KEY idx_cliente_nombre(apellidos,nombres),
 CONSTRAINT fk_cliente_usuario FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS direccion_cliente (
 id_direccion BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 id_cliente BIGINT UNSIGNED NOT NULL, alias VARCHAR(50),
 direccion VARCHAR(255) NOT NULL, complemento VARCHAR(150),
 ciudad VARCHAR(100) NOT NULL, departamento VARCHAR(100), codigo_postal VARCHAR(20),
 es_principal TINYINT(1) NOT NULL DEFAULT 0,
 CONSTRAINT fk_direccion_cliente FOREIGN KEY(id_cliente) REFERENCES cliente(id_cliente) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 4. CATALOGO
CREATE TABLE IF NOT EXISTS categoria (
 id_categoria BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 id_categoria_padre BIGINT UNSIGNED NULL, nombre VARCHAR(100) NOT NULL,
 descripcion VARCHAR(255), activo TINYINT(1) NOT NULL DEFAULT 1,
 UNIQUE KEY uq_categoria_padre_nombre(id_categoria_padre,nombre),
 CONSTRAINT fk_categoria_padre FOREIGN KEY(id_categoria_padre) REFERENCES categoria(id_categoria) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS marca (
 id_marca BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 nombre VARCHAR(120) NOT NULL UNIQUE, descripcion VARCHAR(255),
 activo TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS producto (
 id_producto BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 id_categoria BIGINT UNSIGNED NOT NULL, id_marca BIGINT UNSIGNED NULL,
 nombre VARCHAR(160) NOT NULL, descripcion TEXT,
 requiere_control_lote TINYINT(1) NOT NULL DEFAULT 0,
 activo TINYINT(1) NOT NULL DEFAULT 1,
 creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 actualizado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 KEY idx_producto_categoria(id_categoria), KEY idx_producto_marca(id_marca),
 KEY idx_producto_nombre(nombre),
 CONSTRAINT fk_producto_categoria FOREIGN KEY(id_categoria) REFERENCES categoria(id_categoria) ON DELETE RESTRICT ON UPDATE CASCADE,
 CONSTRAINT fk_producto_marca FOREIGN KEY(id_marca) REFERENCES marca(id_marca) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS presentacion_producto (
 id_presentacion BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 id_producto BIGINT UNSIGNED NOT NULL, sku VARCHAR(60) NOT NULL UNIQUE,
 codigo_barras VARCHAR(60) NULL UNIQUE, nombre_presentacion VARCHAR(100) NOT NULL,
 contenido_ml DECIMAL(10,2), precio_venta DECIMAL(14,2) NOT NULL,
 costo_referencia DECIMAL(14,2), permite_venta TINYINT(1) NOT NULL DEFAULT 1,
 activo TINYINT(1) NOT NULL DEFAULT 1,
 creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 actualizado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 KEY idx_presentacion_producto(id_producto),
 CONSTRAINT chk_presentacion_precio CHECK(precio_venta>=0),
 CONSTRAINT chk_presentacion_costo CHECK(costo_referencia IS NULL OR costo_referencia>=0),
 CONSTRAINT chk_presentacion_ml CHECK(contenido_ml IS NULL OR contenido_ml>0),
 CONSTRAINT fk_presentacion_producto FOREIGN KEY(id_producto) REFERENCES producto(id_producto) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS imagen_producto (
 id_imagen BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 id_producto BIGINT UNSIGNED NOT NULL, url_archivo VARCHAR(500) NOT NULL,
 texto_alternativo VARCHAR(180), es_principal TINYINT(1) NOT NULL DEFAULT 0,
 orden SMALLINT UNSIGNED NOT NULL DEFAULT 0,
 CONSTRAINT fk_imagen_producto FOREIGN KEY(id_producto) REFERENCES producto(id_producto) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 5. PROVEEDORES Y COMPRAS
CREATE TABLE IF NOT EXISTS proveedor (
 id_proveedor BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 tipo_documento ENUM('NIT','CC','CE','OTRO') NOT NULL DEFAULT 'NIT',
 numero_documento VARCHAR(30), razon_social VARCHAR(160) NOT NULL,
 contacto VARCHAR(120), correo VARCHAR(190), telefono VARCHAR(25),
 direccion VARCHAR(255), estado ENUM('ACTIVO','INACTIVO') NOT NULL DEFAULT 'ACTIVO',
 UNIQUE KEY uq_proveedor_documento(tipo_documento,numero_documento),
 KEY idx_proveedor_razon(razon_social)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS proveedor_producto (
 id_proveedor BIGINT UNSIGNED NOT NULL, id_presentacion BIGINT UNSIGNED NOT NULL,
 codigo_referencia VARCHAR(80), costo_ultimo DECIMAL(14,2),
 PRIMARY KEY(id_proveedor,id_presentacion),
 CONSTRAINT chk_proveedor_costo CHECK(costo_ultimo IS NULL OR costo_ultimo>=0),
 CONSTRAINT fk_pp_proveedor FOREIGN KEY(id_proveedor) REFERENCES proveedor(id_proveedor) ON DELETE RESTRICT ON UPDATE CASCADE,
 CONSTRAINT fk_pp_presentacion FOREIGN KEY(id_presentacion) REFERENCES presentacion_producto(id_presentacion) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS compra (
 id_compra BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 id_sucursal BIGINT UNSIGNED NOT NULL, id_almacen BIGINT UNSIGNED NOT NULL,
 id_proveedor BIGINT UNSIGNED NOT NULL, id_usuario BIGINT UNSIGNED NOT NULL,
 numero_documento VARCHAR(60), fecha_compra DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 estado ENUM('BORRADOR','RECIBIDA','ANULADA') NOT NULL DEFAULT 'BORRADOR',
 subtotal DECIMAL(14,2) NOT NULL DEFAULT 0, descuento DECIMAL(14,2) NOT NULL DEFAULT 0,
 impuesto DECIMAL(14,2) NOT NULL DEFAULT 0, total DECIMAL(14,2) NOT NULL DEFAULT 0,
 observaciones VARCHAR(500),
 UNIQUE KEY uq_compra_sucursal_documento(id_sucursal,numero_documento),
 KEY idx_compra_fecha(fecha_compra),
 CONSTRAINT chk_compra_valores CHECK(subtotal>=0 AND descuento>=0 AND impuesto>=0 AND total>=0),
 CONSTRAINT fk_compra_sucursal FOREIGN KEY(id_sucursal) REFERENCES sucursal(id_sucursal) ON DELETE RESTRICT ON UPDATE CASCADE,
 CONSTRAINT fk_compra_almacen_sucursal FOREIGN KEY(id_sucursal,id_almacen) REFERENCES almacen(id_sucursal,id_almacen) ON DELETE RESTRICT ON UPDATE CASCADE,
 CONSTRAINT fk_compra_proveedor FOREIGN KEY(id_proveedor) REFERENCES proveedor(id_proveedor) ON DELETE RESTRICT ON UPDATE CASCADE,
 CONSTRAINT fk_compra_usuario FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS compra_detalle (
 id_compra_detalle BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 id_compra BIGINT UNSIGNED NOT NULL, id_presentacion BIGINT UNSIGNED NOT NULL,
 cantidad DECIMAL(12,3) NOT NULL, costo_unitario DECIMAL(14,2) NOT NULL,
 descuento DECIMAL(14,2) NOT NULL DEFAULT 0, impuesto DECIMAL(14,2) NOT NULL DEFAULT 0,
 total_linea DECIMAL(14,2) NOT NULL,
 KEY idx_compra_detalle_compra(id_compra),
 CONSTRAINT chk_compra_detalle CHECK(cantidad>0 AND costo_unitario>=0 AND descuento>=0 AND impuesto>=0 AND total_linea>=0),
 CONSTRAINT fk_cd_compra FOREIGN KEY(id_compra) REFERENCES compra(id_compra) ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT fk_cd_presentacion FOREIGN KEY(id_presentacion) REFERENCES presentacion_producto(id_presentacion) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 6. INVENTARIO Y TRASLADOS
CREATE TABLE IF NOT EXISTS inventario (
 id_inventario BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 id_almacen BIGINT UNSIGNED NOT NULL, id_presentacion BIGINT UNSIGNED NOT NULL,
 existencia DECIMAL(12,3) NOT NULL DEFAULT 0,
 existencia_minima DECIMAL(12,3) NOT NULL DEFAULT 0,
 actualizado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 UNIQUE KEY uq_inventario_almacen_presentacion(id_almacen,id_presentacion),
 CONSTRAINT chk_inventario CHECK(existencia>=0 AND existencia_minima>=0),
 CONSTRAINT fk_inv_almacen FOREIGN KEY(id_almacen) REFERENCES almacen(id_almacen) ON DELETE RESTRICT ON UPDATE CASCADE,
 CONSTRAINT fk_inv_presentacion FOREIGN KEY(id_presentacion) REFERENCES presentacion_producto(id_presentacion) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS movimiento_inventario (
 id_movimiento BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 id_almacen BIGINT UNSIGNED NOT NULL, id_presentacion BIGINT UNSIGNED NOT NULL,
 id_usuario BIGINT UNSIGNED NOT NULL,
 tipo ENUM('ENTRADA_COMPRA','SALIDA_VENTA','AJUSTE_ENTRADA','AJUSTE_SALIDA','TRASLADO_ENTRADA','TRASLADO_SALIDA','DEVOLUCION_CLIENTE','DEVOLUCION_PROVEEDOR') NOT NULL,
 cantidad DECIMAL(12,3) NOT NULL, costo_unitario DECIMAL(14,2),
 referencia_tipo VARCHAR(40), referencia_id BIGINT UNSIGNED,
 observacion VARCHAR(500), creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 KEY idx_mov_almacen_fecha(id_almacen,creado_en),
 KEY idx_mov_producto_fecha(id_presentacion,creado_en),
 KEY idx_mov_referencia(referencia_tipo,referencia_id),
 CONSTRAINT chk_mov_cantidad CHECK(cantidad>0),
 CONSTRAINT fk_mov_almacen FOREIGN KEY(id_almacen) REFERENCES almacen(id_almacen) ON DELETE RESTRICT ON UPDATE CASCADE,
 CONSTRAINT fk_mov_presentacion FOREIGN KEY(id_presentacion) REFERENCES presentacion_producto(id_presentacion) ON DELETE RESTRICT ON UPDATE CASCADE,
 CONSTRAINT fk_mov_usuario FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS transferencia_inventario (
 id_transferencia BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 id_almacen_origen BIGINT UNSIGNED NOT NULL, id_almacen_destino BIGINT UNSIGNED NOT NULL,
 id_usuario BIGINT UNSIGNED NOT NULL,
 estado ENUM('BORRADOR','EN_TRANSITO','RECIBIDA','CANCELADA') NOT NULL DEFAULT 'BORRADOR',
 fecha_solicitud DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 fecha_recepcion DATETIME, observaciones VARCHAR(500),
 KEY idx_transferencia_estado(estado,fecha_solicitud),
 CONSTRAINT chk_transferencia_almacenes CHECK(id_almacen_origen<>id_almacen_destino),
 CONSTRAINT fk_tr_origen FOREIGN KEY(id_almacen_origen) REFERENCES almacen(id_almacen) ON DELETE RESTRICT ON UPDATE CASCADE,
 CONSTRAINT fk_tr_destino FOREIGN KEY(id_almacen_destino) REFERENCES almacen(id_almacen) ON DELETE RESTRICT ON UPDATE CASCADE,
 CONSTRAINT fk_tr_usuario FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS transferencia_detalle (
 id_transferencia_detalle BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 id_transferencia BIGINT UNSIGNED NOT NULL, id_presentacion BIGINT UNSIGNED NOT NULL,
 cantidad DECIMAL(12,3) NOT NULL,
 CONSTRAINT chk_tr_det_cantidad CHECK(cantidad>0),
 CONSTRAINT fk_trd_transferencia FOREIGN KEY(id_transferencia) REFERENCES transferencia_inventario(id_transferencia) ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT fk_trd_presentacion FOREIGN KEY(id_presentacion) REFERENCES presentacion_producto(id_presentacion) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 7. CAJA PARA OPERACION EN TIENDA FISICA
CREATE TABLE IF NOT EXISTS caja (
 id_caja BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 id_sucursal BIGINT UNSIGNED NOT NULL, codigo VARCHAR(30) NOT NULL,
 nombre VARCHAR(100) NOT NULL, activa TINYINT(1) NOT NULL DEFAULT 1,
 UNIQUE KEY uq_caja_sucursal_codigo(id_sucursal,codigo),
 CONSTRAINT fk_caja_sucursal FOREIGN KEY(id_sucursal) REFERENCES sucursal(id_sucursal) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS turno_caja (
 id_turno BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 id_caja BIGINT UNSIGNED NOT NULL, id_usuario_apertura BIGINT UNSIGNED NOT NULL,
 id_usuario_cierre BIGINT UNSIGNED, abierto_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 cerrado_en DATETIME, saldo_inicial DECIMAL(14,2) NOT NULL DEFAULT 0,
 saldo_calculado DECIMAL(14,2), saldo_real DECIMAL(14,2), diferencia DECIMAL(14,2),
 estado ENUM('ABIERTO','CERRADO','ANULADO') NOT NULL DEFAULT 'ABIERTO',
 KEY idx_turno_caja_estado(id_caja,estado),
 CONSTRAINT chk_turno_saldo CHECK(saldo_inicial>=0),
 CONSTRAINT fk_turno_caja FOREIGN KEY(id_caja) REFERENCES caja(id_caja) ON DELETE RESTRICT ON UPDATE CASCADE,
 CONSTRAINT fk_turno_apertura FOREIGN KEY(id_usuario_apertura) REFERENCES usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE,
 CONSTRAINT fk_turno_cierre FOREIGN KEY(id_usuario_cierre) REFERENCES usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 8. VENTAS DE MOSTRADOR
CREATE TABLE IF NOT EXISTS venta (
 id_venta BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 id_sucursal BIGINT UNSIGNED NOT NULL, id_almacen BIGINT UNSIGNED NOT NULL,
 id_turno BIGINT UNSIGNED, id_cliente BIGINT UNSIGNED, id_usuario BIGINT UNSIGNED NOT NULL,
 numero_comprobante VARCHAR(60), fecha_venta DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 estado ENUM('BORRADOR','PENDIENTE_PAGO','PAGADA','ANULADA','DEVUELTA') NOT NULL DEFAULT 'BORRADOR',
 subtotal DECIMAL(14,2) NOT NULL DEFAULT 0, descuento DECIMAL(14,2) NOT NULL DEFAULT 0,
 impuesto DECIMAL(14,2) NOT NULL DEFAULT 0, total DECIMAL(14,2) NOT NULL DEFAULT 0,
 observaciones VARCHAR(500),
 UNIQUE KEY uq_venta_sucursal_comprobante(id_sucursal,numero_comprobante),
 KEY idx_venta_fecha(fecha_venta), KEY idx_venta_cliente_fecha(id_cliente,fecha_venta),
 KEY idx_venta_estado(estado),
 CONSTRAINT chk_venta_valores CHECK(subtotal>=0 AND descuento>=0 AND impuesto>=0 AND total>=0),
 CONSTRAINT fk_venta_sucursal FOREIGN KEY(id_sucursal) REFERENCES sucursal(id_sucursal) ON DELETE RESTRICT ON UPDATE CASCADE,
 CONSTRAINT fk_venta_almacen_sucursal FOREIGN KEY(id_sucursal,id_almacen) REFERENCES almacen(id_sucursal,id_almacen) ON DELETE RESTRICT ON UPDATE CASCADE,
 CONSTRAINT fk_venta_turno FOREIGN KEY(id_turno) REFERENCES turno_caja(id_turno) ON DELETE RESTRICT ON UPDATE CASCADE,
 CONSTRAINT fk_venta_cliente FOREIGN KEY(id_cliente) REFERENCES cliente(id_cliente) ON DELETE SET NULL ON UPDATE CASCADE,
 CONSTRAINT fk_venta_usuario FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS detalle_venta (
 id_detalle_venta BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 id_venta BIGINT UNSIGNED NOT NULL, id_presentacion BIGINT UNSIGNED NOT NULL,
 cantidad DECIMAL(12,3) NOT NULL, precio_unitario DECIMAL(14,2) NOT NULL,
 descuento DECIMAL(14,2) NOT NULL DEFAULT 0, impuesto DECIMAL(14,2) NOT NULL DEFAULT 0,
 total_linea DECIMAL(14,2) NOT NULL,
 KEY idx_dv_venta(id_venta), KEY idx_dv_presentacion(id_presentacion),
 CONSTRAINT chk_dv_valores CHECK(cantidad>0 AND precio_unitario>=0 AND descuento>=0 AND impuesto>=0 AND total_linea>=0),
 CONSTRAINT fk_dv_venta FOREIGN KEY(id_venta) REFERENCES venta(id_venta) ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT fk_dv_presentacion FOREIGN KEY(id_presentacion) REFERENCES presentacion_producto(id_presentacion) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 9. PAGOS PAYU Y OTROS MEDIOS
CREATE TABLE IF NOT EXISTS metodo_pago (
 id_metodo_pago SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 codigo VARCHAR(40) NOT NULL UNIQUE, nombre VARCHAR(80) NOT NULL,
 requiere_pasarela TINYINT(1) NOT NULL DEFAULT 0, activo TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS pago_venta (
 id_pago BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 id_venta BIGINT UNSIGNED NOT NULL, id_metodo_pago SMALLINT UNSIGNED NOT NULL,
 referencia_interna VARCHAR(80) NOT NULL UNIQUE, monto DECIMAL(14,2) NOT NULL,
 estado ENUM('PENDIENTE','APROBADO','RECHAZADO','ANULADO','REEMBOLSADO') NOT NULL DEFAULT 'PENDIENTE',
 pagado_en DATETIME, creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 KEY idx_pago_venta(id_venta), KEY idx_pago_estado_fecha(estado,creado_en),
 CONSTRAINT chk_pago_monto CHECK(monto>0),
 CONSTRAINT fk_pago_venta FOREIGN KEY(id_venta) REFERENCES venta(id_venta) ON DELETE RESTRICT ON UPDATE CASCADE,
 CONSTRAINT fk_pago_metodo FOREIGN KEY(id_metodo_pago) REFERENCES metodo_pago(id_metodo_pago) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS transaccion_pasarela (
 id_transaccion BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 id_pago BIGINT UNSIGNED NOT NULL, proveedor ENUM('PAYU') NOT NULL DEFAULT 'PAYU',
 referencia_comercio VARCHAR(100) NOT NULL UNIQUE,
 referencia_pasarela VARCHAR(120), id_transaccion_pasarela VARCHAR(150) UNIQUE,
 estado ENUM('CREADA','PENDIENTE','APROBADA','RECHAZADA','EXPIRADA','ERROR','REEMBOLSADA') NOT NULL DEFAULT 'CREADA',
 codigo_respuesta VARCHAR(60), mensaje_respuesta VARCHAR(500),
 moneda CHAR(3) NOT NULL DEFAULT 'COP', monto DECIMAL(14,2) NOT NULL,
 idempotencia VARCHAR(100) NOT NULL UNIQUE, respuesta_json JSON,
 notificada_en DATETIME, creada_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 actualizada_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 KEY idx_transaccion_pago(id_pago), KEY idx_transaccion_estado(estado),
 CONSTRAINT chk_transaccion_monto CHECK(monto>0),
 CONSTRAINT fk_transaccion_pago FOREIGN KEY(id_pago) REFERENCES pago_venta(id_pago) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS notificacion_pasarela (
 id_notificacion BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 id_transaccion BIGINT UNSIGNED, proveedor ENUM('PAYU') NOT NULL DEFAULT 'PAYU',
 identificador_evento VARCHAR(150), cuerpo_json JSON NOT NULL,
 firma_validada TINYINT(1) NOT NULL DEFAULT 0, procesada TINYINT(1) NOT NULL DEFAULT 0,
 error_proceso VARCHAR(500), recibida_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE KEY uq_notificacion_evento(proveedor,identificador_evento),
 KEY idx_notificacion_procesada(procesada,recibida_en),
 CONSTRAINT fk_notificacion_transaccion FOREIGN KEY(id_transaccion) REFERENCES transaccion_pasarela(id_transaccion) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 10. AUDITORIA
CREATE TABLE IF NOT EXISTS auditoria (
 id_auditoria BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 id_usuario BIGINT UNSIGNED, accion VARCHAR(60) NOT NULL,
 entidad VARCHAR(100) NOT NULL, id_registro VARCHAR(100),
 valores_anteriores JSON, valores_nuevos JSON,
 ip VARCHAR(45), user_agent VARCHAR(500),
 creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 KEY idx_auditoria_usuario_fecha(id_usuario,creado_en),
 KEY idx_auditoria_entidad_registro(entidad,id_registro),
 CONSTRAINT fk_auditoria_usuario FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 11. CATALOGOS INICIALES (idempotentes)
INSERT IGNORE INTO rol(codigo,nombre,descripcion,sistema) VALUES
('SUPERADMIN','Superadministrador','Acceso total',1),
('ADMIN','Administrador','Administracion general',1),
('VENDEDOR','Vendedor','Registro de ventas',1),
('INVENTARIO','Inventario','Productos y existencias',1),
('CAJERO','Cajero','Caja y pagos',1),
('CLIENTE','Cliente','Cuenta de cliente',1);

INSERT IGNORE INTO permiso(codigo,modulo,nombre) VALUES
('USUARIO.LEER','USUARIOS','Consultar usuarios'),
('USUARIO.CREAR','USUARIOS','Crear usuarios'),
('USUARIO.EDITAR','USUARIOS','Editar usuarios'),
('USUARIO.ESTADO','USUARIOS','Cambiar estado de usuarios'),
('ROL.GESTIONAR','SEGURIDAD','Gestionar roles y permisos'),
('PRODUCTO.LEER','PRODUCTOS','Consultar productos'),
('PRODUCTO.GESTIONAR','PRODUCTOS','Gestionar productos'),
('INVENTARIO.LEER','INVENTARIO','Consultar inventario'),
('INVENTARIO.MOVER','INVENTARIO','Registrar movimientos'),
('COMPRA.GESTIONAR','COMPRAS','Gestionar compras'),
('VENTA.LEER','VENTAS','Consultar ventas'),
('VENTA.CREAR','VENTAS','Registrar ventas'),
('VENTA.ANULAR','VENTAS','Anular ventas'),
('CAJA.GESTIONAR','CAJA','Gestionar caja'),
('PAGO.GESTIONAR','PAGOS','Gestionar pagos'),
('REPORTE.LEER','REPORTES','Consultar reportes'),
('AUDITORIA.LEER','AUDITORIA','Consultar auditoria');

INSERT IGNORE INTO rol_permiso(id_rol,id_permiso)
SELECT r.id_rol,p.id_permiso FROM rol r CROSS JOIN permiso p WHERE r.codigo='SUPERADMIN';

INSERT IGNORE INTO rol_permiso(id_rol,id_permiso)
SELECT r.id_rol,p.id_permiso FROM rol r JOIN permiso p
WHERE r.codigo='ADMIN' AND p.codigo IN
('USUARIO.LEER','USUARIO.CREAR','USUARIO.EDITAR','USUARIO.ESTADO',
'PRODUCTO.LEER','PRODUCTO.GESTIONAR','INVENTARIO.LEER','INVENTARIO.MOVER',
'COMPRA.GESTIONAR','VENTA.LEER','VENTA.CREAR','VENTA.ANULAR',
'CAJA.GESTIONAR','PAGO.GESTIONAR','REPORTE.LEER');

INSERT IGNORE INTO rol_permiso(id_rol,id_permiso)
SELECT r.id_rol,p.id_permiso FROM rol r JOIN permiso p
WHERE r.codigo='VENDEDOR' AND p.codigo IN('PRODUCTO.LEER','VENTA.LEER','VENTA.CREAR','PAGO.GESTIONAR');

INSERT IGNORE INTO rol_permiso(id_rol,id_permiso)
SELECT r.id_rol,p.id_permiso FROM rol r JOIN permiso p
WHERE r.codigo='INVENTARIO' AND p.codigo IN('PRODUCTO.LEER','PRODUCTO.GESTIONAR','INVENTARIO.LEER','INVENTARIO.MOVER','COMPRA.GESTIONAR');

INSERT IGNORE INTO rol_permiso(id_rol,id_permiso)
SELECT r.id_rol,p.id_permiso FROM rol r JOIN permiso p
WHERE r.codigo='CAJERO' AND p.codigo IN('PRODUCTO.LEER','VENTA.LEER','VENTA.CREAR','CAJA.GESTIONAR','PAGO.GESTIONAR');

INSERT IGNORE INTO metodo_pago(codigo,nombre,requiere_pasarela) VALUES
('EFECTIVO','Efectivo',0),('PAYU','PayU',1),('TRANSFERENCIA','Transferencia',0);

-- 12. VISTAS
CREATE OR REPLACE VIEW vw_inventario_por_sucursal AS
SELECT s.id_sucursal,s.nombre AS sucursal,a.id_almacen,a.nombre AS almacen,
 pp.id_presentacion,pp.sku,p.nombre AS producto,pp.nombre_presentacion,
 i.existencia,i.existencia_minima,
 CASE WHEN i.existencia<=i.existencia_minima THEN 'REABASTECER' ELSE 'DISPONIBLE' END AS estado_stock
FROM inventario i JOIN almacen a ON a.id_almacen=i.id_almacen
JOIN sucursal s ON s.id_sucursal=a.id_sucursal
JOIN presentacion_producto pp ON pp.id_presentacion=i.id_presentacion
JOIN producto p ON p.id_producto=pp.id_producto;

CREATE OR REPLACE VIEW vw_ventas_resumen AS
SELECT v.id_venta,v.numero_comprobante,v.fecha_venta,s.nombre AS sucursal,
 v.estado,v.subtotal,v.descuento,v.impuesto,v.total,c.id_cliente,
 CONCAT_WS(' ',c.nombres,c.apellidos) AS cliente,
 CONCAT_WS(' ',u.nombres,u.apellidos) AS usuario_registro
FROM venta v JOIN sucursal s ON s.id_sucursal=v.id_sucursal
JOIN usuario u ON u.id_usuario=v.id_usuario
LEFT JOIN cliente c ON c.id_cliente=v.id_cliente;

-- 13. VALIDACION
SHOW TABLES;
SELECT TABLE_NAME,COLUMN_NAME,CONSTRAINT_NAME,REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA=DATABASE() AND REFERENCED_TABLE_NAME IS NOT NULL
ORDER BY TABLE_NAME,COLUMN_NAME;

-- NOTAS IMPORTANTES DE IMPLEMENTACION:
-- * Crear el primer SUPERADMIN desde el backend generando password_hash
--   con Argon2id o bcrypt. Nunca guardar contrasenas en texto plano.
-- * La venta/compra/transferencia debe actualizar inventario y registrar
--   movimiento_inventario dentro de UNA transaccion SQL.
-- * Bloquear la fila de inventario con SELECT ... FOR UPDATE al descontar stock.
-- * La confirmacion PayU se valida en backend mediante notificacion firmada;
--   no confiar en el retorno del navegador ni marcar pago como aprobado sin validar.
-- * No almacenar numero completo de tarjeta ni CVV.
-- * Los cambios de estado y permisos deben validarse en cada solicitud del backend.
