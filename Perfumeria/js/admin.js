/* Perfumería Frontend v2. Datos de demostración. El contrato de campos sigue el SQL MySQL entregado. */
const $ = (s) => document.querySelector(s),
  fmt = (n) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(Number(n || 0));
const seed = {
  categories: [
    {
      id_categoria: 1,
      id_categoria_padre: "",
      nombre: "Perfumes para mujer",
      descripcion: "Fragancias femeninas",
      activo: 1,
    },
    {
      id_categoria: 2,
      id_categoria_padre: "",
      nombre: "Perfumes para hombre",
      descripcion: "Fragancias masculinas",
      activo: 1,
    },
    {
      id_categoria: 3,
      id_categoria_padre: "",
      nombre: "Unisex",
      descripcion: "Fragancias unisex",
      activo: 1,
    },
  ],
  brands: [
    { id_marca: 1, nombre: "Carolina Herrera", descripcion: "", activo: 1 },
    { id_marca: 2, nombre: "Dior", descripcion: "", activo: 1 },
    { id_marca: 3, nombre: "Yves Saint Laurent", descripcion: "", activo: 1 },
  ],
  products: [
    {
      id_producto: 1,
      id_categoria: 1,
      id_marca: 1,
      nombre: "Good Girl",
      descripcion: "Fragancia floral",
      requiere_control_lote: 0,
      activo: 1,
    },
    {
      id_producto: 2,
      id_categoria: 2,
      id_marca: 2,
      nombre: "Sauvage Eau de Parfum",
      descripcion: "Fragancia amaderada",
      requiere_control_lote: 0,
      activo: 1,
    },
    {
      id_producto: 3,
      id_categoria: 3,
      id_marca: 3,
      nombre: "Libre",
      descripcion: "Fragancia floral",
      requiere_control_lote: 0,
      activo: 1,
    },
  ],
  presentations: [
    {
      id_presentacion: 1,
      id_producto: 1,
      sku: "PER-001",
      codigo_barras: "770000000001",
      nombre_presentacion: "80 ml",
      contenido_ml: 80,
      precio_venta: 465000,
      costo_referencia: 290000,
      permite_venta: 1,
      activo: 1,
    },
    {
      id_presentacion: 2,
      id_producto: 2,
      sku: "PER-002",
      codigo_barras: "770000000002",
      nombre_presentacion: "100 ml",
      contenido_ml: 100,
      precio_venta: 520000,
      costo_referencia: 330000,
      permite_venta: 1,
      activo: 1,
    },
    {
      id_presentacion: 3,
      id_producto: 3,
      sku: "PER-003",
      codigo_barras: "770000000003",
      nombre_presentacion: "90 ml",
      contenido_ml: 90,
      precio_venta: 498000,
      costo_referencia: 310000,
      permite_venta: 1,
      activo: 1,
    },
  ],
  suppliers: [
    {
      id_proveedor: 1,
      tipo_documento: "NIT",
      numero_documento: "900123456-1",
      razon_social: "Distribuciones Aroma SAS",
      contacto: "Paula Ríos",
      correo: "compras@aroma.demo",
      telefono: "6015550101",
      direccion: "Bogotá",
      estado: "ACTIVO",
    },
  ],
  branches: [
    {
      id_sucursal: 1,
      codigo: "SUC-001",
      nombre: "Sucursal principal",
      telefono: "6015550100",
      correo: "principal@perfumeria.demo",
      direccion: "Bogotá",
      ciudad: "Bogotá",
      departamento: "Cundinamarca",
      pais: "Colombia",
      es_principal: 1,
      estado: "ACTIVA",
    },
    {
      id_sucursal: 2,
      codigo: "SUC-002",
      nombre: "Sucursal Soacha",
      telefono: "6015550102",
      correo: "soacha@perfumeria.demo",
      direccion: "Soacha",
      ciudad: "Soacha",
      departamento: "Cundinamarca",
      pais: "Colombia",
      es_principal: 0,
      estado: "ACTIVA",
    },
  ],
  warehouses: [
    {
      id_almacen: 1,
      id_sucursal: 1,
      codigo: "ALM-001",
      nombre: "Bodega principal",
      tipo: "GENERAL",
      estado: "ACTIVO",
    },
    {
      id_almacen: 2,
      id_sucursal: 2,
      codigo: "ALM-002",
      nombre: "Punto de venta Soacha",
      tipo: "VENTA",
      estado: "ACTIVO",
    },
  ],
  inventory: [
    {
      id_inventario: 1,
      id_almacen: 1,
      id_presentacion: 1,
      existencia: 18,
      existencia_minima: 5,
    },
    {
      id_inventario: 2,
      id_almacen: 1,
      id_presentacion: 2,
      existencia: 4,
      existencia_minima: 5,
    },
    {
      id_inventario: 3,
      id_almacen: 2,
      id_presentacion: 3,
      existencia: 9,
      existencia_minima: 3,
    },
  ],
  customers: [
    {
      id_cliente: 1,
      id_usuario: "",
      tipo_documento: "CC",
      numero_documento: "10203040",
      nombres: "Laura",
      apellidos: "Gómez",
      correo: "laura.demo@email.com",
      telefono: "3001234567",
      fecha_nacimiento: "1992-04-12",
      estado: "ACTIVO",
    },
    {
      id_cliente: 2,
      id_usuario: "",
      tipo_documento: "CC",
      numero_documento: "80907060",
      nombres: "Carlos",
      apellidos: "Ruiz",
      correo: "carlos.demo@email.com",
      telefono: "3101234567",
      fecha_nacimiento: "1988-09-20",
      estado: "ACTIVO",
    },
  ],
  users: [
    {
      id_usuario: 1,
      nombres: "Administrador",
      apellidos: "Demo",
      correo: "admin@perfumeria.demo",
      telefono: "3000000000",
      estado: "ACTIVO",
    },
    {
      id_usuario: 2,
      nombres: "Asesor",
      apellidos: "Ventas",
      correo: "ventas@perfumeria.demo",
      telefono: "3000000001",
      estado: "ACTIVO",
    },
  ],
  roles: [
    {
      id_rol: 1,
      codigo: "SUPERADMIN",
      nombre: "Superadministrador",
      descripcion: "Acceso total",
      sistema: 1,
      activo: 1,
    },
    {
      id_rol: 2,
      codigo: "VENDEDOR",
      nombre: "Vendedor",
      descripcion: "Registro de ventas",
      sistema: 1,
      activo: 1,
    },
    {
      id_rol: 3,
      codigo: "INVENTARIO",
      nombre: "Inventario",
      descripcion: "Gestión de existencias",
      sistema: 1,
      activo: 1,
    },
  ],
  permissions: [
    {
      id_permiso: 1,
      codigo: "PRODUCTO.LEER",
      modulo: "PRODUCTOS",
      nombre: "Consultar productos",
      descripcion: "",
    },
    {
      id_permiso: 2,
      codigo: "PRODUCTO.GESTIONAR",
      modulo: "PRODUCTOS",
      nombre: "Gestionar productos",
      descripcion: "",
    },
    {
      id_permiso: 3,
      codigo: "INVENTARIO.MOVER",
      modulo: "INVENTARIO",
      nombre: "Registrar movimientos",
      descripcion: "",
    },
    {
      id_permiso: 4,
      codigo: "VENTA.CREAR",
      modulo: "VENTAS",
      nombre: "Registrar ventas",
      descripcion: "",
    },
  ],
  purchases: [
    {
      id_compra: 1,
      id_sucursal: 1,
      id_almacen: 1,
      id_proveedor: 1,
      id_usuario: 1,
      numero_documento: "FC-1001",
      fecha_compra: "2026-11-10",
      estado: "RECIBIDA",
      subtotal: 620000,
      descuento: 0,
      impuesto: 0,
      total: 620000,
      observaciones: "Compra demostrativa",
    },
  ],
  movements: [
    {
      id_movimiento: 1,
      id_almacen: 1,
      id_presentacion: 1,
      id_usuario: 1,
      tipo: "ENTRADA_COMPRA",
      cantidad: 10,
      costo_unitario: 290000,
      referencia_tipo: "COMPRA",
      referencia_id: 1,
      observacion: "Ingreso de mercancía",
      creado_en: "2026-11-10",
    },
  ],
  transfers: [
    {
      id_transferencia: 1,
      id_almacen_origen: 1,
      id_almacen_destino: 2,
      id_usuario: 1,
      estado: "EN_TRANSITO",
      fecha_solicitud: "2026-11-12",
      fecha_recepcion: "",
      observaciones: "Traslado demostrativo",
    },
  ],
  cashboxes: [
    {
      id_caja: 1,
      id_sucursal: 1,
      codigo: "CAJ-001",
      nombre: "Caja principal",
      activa: 1,
    },
  ],
  shifts: [
    {
      id_turno: 1,
      id_caja: 1,
      id_usuario_apertura: 1,
      id_usuario_cierre: "",
      abierto_en: "2026-11-14 08:00",
      cerrado_en: "",
      saldo_inicial: 200000,
      saldo_calculado: "",
      saldo_real: "",
      diferencia: "",
      estado: "ABIERTO",
    },
  ],
  sales: [
    {
      id_venta: 1,
      id_sucursal: 1,
      id_almacen: 1,
      id_turno: 1,
      id_cliente: 1,
      id_usuario: 2,
      numero_comprobante: "PV-1048",
      fecha_venta: "2026-11-14",
      estado: "PAGADA",
      subtotal: 465000,
      descuento: 0,
      impuesto: 0,
      total: 465000,
      observaciones: "Venta demostrativa",
    },
  ],
  payments: [
    {
      id_pago: 1,
      id_venta: 1,
      id_metodo_pago: 1,
      referencia_interna: "PAGO-DEMO-001",
      monto: 465000,
      estado: "APROBADO",
      pagado_en: "2026-11-14 10:30",
      creado_en: "2026-11-14",
    },
  ],
  gateway: [
    {
      id_transaccion: 1,
      id_pago: 1,
      proveedor: "PAYU",
      referencia_comercio: "REF-DEMO-001",
      referencia_pasarela: "",
      id_transaccion_pasarela: "",
      estado: "CREADA",
      codigo_respuesta: "",
      mensaje_respuesta: "Registro ilustrativo",
      moneda: "COP",
      monto: 465000,
      idempotencia: "IDEMP-DEMO-001",
      respuesta_json: "{}",
      notificada_en: "",
      creada_en: "2026-11-14",
      actualizada_en: "2026-11-14",
    },
  ],
  audit: [
    {
      id_auditoria: 1,
      id_usuario: 1,
      accion: "CREAR",
      entidad: "producto",
      id_registro: "1",
      valores_anteriores: "",
      valores_nuevos: '{"nombre":"Good Girl"}',
      ip: "127.0.0.1",
      user_agent: "Demo",
      creado_en: "2026-11-14",
    },
  ],
};
const configs = {
  categories: {
    title: "Categorías",
    desc: "Jerarquía de categorías mediante id_categoria_padre.",
    key: "id_categoria",
    fields: [
      [
        "id_categoria_padre",
        "Categoría padre",
        "select",
        "categories",
        "id_categoria",
        "nombre",
      ],
      ["nombre", "Nombre", "text"],
      ["descripcion", "Descripción", "text"],
      ["activo", "Activa", "select", ["1", "0"]],
    ],
    cols: [
      "id_categoria",
      "id_categoria_padre",
      "nombre",
      "descripcion",
      "activo",
    ],
  },
  brands: {
    title: "Marcas",
    desc: "Marcas asociadas a productos.",
    key: "id_marca",
    fields: [
      ["nombre", "Nombre", "text"],
      ["descripcion", "Descripción", "text"],
      ["activo", "Activa", "select", ["1", "0"]],
    ],
    cols: ["id_marca", "nombre", "descripcion", "activo"],
  },
  products: {
    title: "Productos",
    desc: "Entidad producto; relaciona categoría y marca. Las presentaciones tienen SKU, precio y contenido.",
    key: "id_producto",
    fields: [
      [
        "id_categoria",
        "Categoría",
        "select",
        "categories",
        "id_categoria",
        "nombre",
      ],
      ["id_marca", "Marca", "select", "brands", "id_marca", "nombre"],
      ["nombre", "Nombre del producto", "text"],
      ["descripcion", "Descripción", "textarea"],
      ["requiere_control_lote", "Control por lote", "select", ["0", "1"]],
      ["activo", "Activo", "select", ["1", "0"]],
    ],
    cols: [
      "id_producto",
      "nombre",
      "id_categoria",
      "id_marca",
      "requiere_control_lote",
      "activo",
    ],
  },
  presentations: {
    title: "Presentaciones e imágenes",
    desc: "Presentaciones comerciales de cada producto. Imágenes del producto se administran por URL y orden.",
    key: "id_presentacion",
    fields: [
      [
        "id_producto",
        "Producto",
        "select",
        "products",
        "id_producto",
        "nombre",
      ],
      ["sku", "SKU", "text"],
      ["codigo_barras", "Código de barras", "text"],
      ["nombre_presentacion", "Nombre presentación", "text"],
      ["contenido_ml", "Contenido (ml)", "number"],
      ["precio_venta", "Precio de venta (COP)", "number"],
      ["costo_referencia", "Costo referencia (COP)", "number"],
      ["permite_venta", "Permite venta", "select", ["1", "0"]],
      ["activo", "Activo", "select", ["1", "0"]],
    ],
    cols: [
      "id_presentacion",
      "id_producto",
      "sku",
      "nombre_presentacion",
      "contenido_ml",
      "precio_venta",
      "activo",
    ],
  },
  suppliers: {
    title: "Proveedores",
    desc: "Datos de identificación y contacto de proveedores.",
    key: "id_proveedor",
    fields: [
      [
        "tipo_documento",
        "Tipo documento",
        "select",
        ["NIT", "CC", "CE", "OTRO"],
      ],
      ["numero_documento", "Número documento", "text"],
      ["razon_social", "Razón social", "text"],
      ["contacto", "Contacto", "text"],
      ["correo", "Correo", "email"],
      ["telefono", "Teléfono", "text"],
      ["direccion", "Dirección", "text"],
      ["estado", "Estado", "select", ["ACTIVO", "INACTIVO"]],
    ],
    cols: [
      "id_proveedor",
      "razon_social",
      "tipo_documento",
      "numero_documento",
      "contacto",
      "telefono",
      "estado",
    ],
  },
  purchases: {
    title: "Compras",
    desc: "Cabecera de compra; el detalle compra_detalle contiene presentaciones, cantidades, costos e impuestos.",
    key: "id_compra",
    fields: [
      [
        "id_sucursal",
        "Sucursal",
        "select",
        "branches",
        "id_sucursal",
        "nombre",
      ],
      ["id_almacen", "Almacén", "select", "warehouses", "id_almacen", "nombre"],
      [
        "id_proveedor",
        "Proveedor",
        "select",
        "suppliers",
        "id_proveedor",
        "razon_social",
      ],
      ["id_usuario", "Usuario responsable (ID)", "number"],
      ["numero_documento", "Documento proveedor", "text"],
      ["fecha_compra", "Fecha", "date"],
      ["estado", "Estado", "select", ["BORRADOR", "RECIBIDA", "ANULADA"]],
      ["subtotal", "Subtotal", "number"],
      ["descuento", "Descuento", "number"],
      ["impuesto", "Impuesto", "number"],
      ["total", "Total", "number"],
      ["observaciones", "Observaciones", "textarea"],
    ],
    cols: [
      "id_compra",
      "numero_documento",
      "id_proveedor",
      "id_sucursal",
      "fecha_compra",
      "estado",
      "total",
    ],
  },
  inventory: {
    title: "Inventario por almacén",
    desc: "Existencia y mínimo por combinación única de almacén y presentación (inventario).",
    key: "id_inventario",
    fields: [
      ["id_almacen", "Almacén", "select", "warehouses", "id_almacen", "nombre"],
      [
        "id_presentacion",
        "Presentación",
        "select",
        "presentations",
        "id_presentacion",
        "sku",
      ],
      ["existencia", "Existencia", "number"],
      ["existencia_minima", "Existencia mínima", "number"],
    ],
    cols: [
      "id_inventario",
      "id_almacen",
      "id_presentacion",
      "existencia",
      "existencia_minima",
    ],
  },
  movements: {
    title: "Movimientos de inventario",
    desc: "Registro de trazabilidad; el backend deberá actualizar inventario y movimiento dentro de una transacción.",
    key: "id_movimiento",
    fields: [
      ["id_almacen", "Almacén", "select", "warehouses", "id_almacen", "nombre"],
      [
        "id_presentacion",
        "Presentación",
        "select",
        "presentations",
        "id_presentacion",
        "sku",
      ],
      ["id_usuario", "Usuario (ID)", "number"],
      [
        "tipo",
        "Tipo movimiento",
        "select",
        [
          "ENTRADA_COMPRA",
          "SALIDA_VENTA",
          "AJUSTE_ENTRADA",
          "AJUSTE_SALIDA",
          "TRASLADO_ENTRADA",
          "TRASLADO_SALIDA",
          "DEVOLUCION_CLIENTE",
          "DEVOLUCION_PROVEEDOR",
        ],
      ],
      ["cantidad", "Cantidad", "number"],
      ["costo_unitario", "Costo unitario", "number"],
      ["referencia_tipo", "Tipo referencia", "text"],
      ["referencia_id", "ID referencia", "number"],
      ["observacion", "Observación", "textarea"],
    ],
    cols: [
      "id_movimiento",
      "id_almacen",
      "id_presentacion",
      "tipo",
      "cantidad",
      "referencia_tipo",
      "referencia_id",
    ],
  },
  transfers: {
    title: "Transferencias",
    desc: "Traslados entre almacenes con cabecera y detalle de productos.",
    key: "id_transferencia",
    fields: [
      [
        "id_almacen_origen",
        "Almacén origen",
        "select",
        "warehouses",
        "id_almacen",
        "nombre",
      ],
      [
        "id_almacen_destino",
        "Almacén destino",
        "select",
        "warehouses",
        "id_almacen",
        "nombre",
      ],
      ["id_usuario", "Usuario responsable (ID)", "number"],
      [
        "estado",
        "Estado",
        "select",
        ["BORRADOR", "EN_TRANSITO", "RECIBIDA", "CANCELADA"],
      ],
      ["fecha_solicitud", "Fecha solicitud", "date"],
      ["fecha_recepcion", "Fecha recepción", "date"],
      ["observaciones", "Observaciones", "textarea"],
    ],
    cols: [
      "id_transferencia",
      "id_almacen_origen",
      "id_almacen_destino",
      "estado",
      "fecha_solicitud",
      "fecha_recepcion",
    ],
  },
  cash: {
    title: "Cajas y turnos",
    desc: "Administración de caja y apertura/cierre de turnos.",
    key: "id_caja",
    fields: [
      [
        "id_sucursal",
        "Sucursal",
        "select",
        "branches",
        "id_sucursal",
        "nombre",
      ],
      ["codigo", "Código caja", "text"],
      ["nombre", "Nombre", "text"],
      ["activa", "Activa", "select", ["1", "0"]],
    ],
    cols: ["id_caja", "id_sucursal", "codigo", "nombre", "activa"],
    extra: "Turnos de caja (turno_caja)",
    extraRows: "shifts",
  },
  sales: {
    title: "Ventas",
    desc: "Cabecera de venta; el detalle_venta relaciona las presentaciones y valores por línea.",
    key: "id_venta",
    fields: [
      [
        "id_sucursal",
        "Sucursal",
        "select",
        "branches",
        "id_sucursal",
        "nombre",
      ],
      ["id_almacen", "Almacén", "select", "warehouses", "id_almacen", "nombre"],
      ["id_turno", "Turno caja (ID)", "number"],
      ["id_cliente", "Cliente", "select", "customers", "id_cliente", "nombres"],
      ["id_usuario", "Usuario responsable (ID)", "number"],
      ["numero_comprobante", "Número comprobante", "text"],
      ["fecha_venta", "Fecha", "date"],
      [
        "estado",
        "Estado",
        "select",
        ["BORRADOR", "PENDIENTE_PAGO", "PAGADA", "ANULADA", "DEVUELTA"],
      ],
      ["subtotal", "Subtotal", "number"],
      ["descuento", "Descuento", "number"],
      ["impuesto", "Impuesto", "number"],
      ["total", "Total", "number"],
      ["observaciones", "Observaciones", "textarea"],
    ],
    cols: [
      "id_venta",
      "numero_comprobante",
      "id_cliente",
      "id_sucursal",
      "fecha_venta",
      "estado",
      "total",
    ],
  },
  payments: {
    title: "Pagos y transacciones PayU",
    desc: "Separación entre pago_venta, transaccion_pasarela y notificacion_pasarela. El estado real se confirma en servidor.",
    key: "id_pago",
    fields: [
      ["id_venta", "Venta (ID)", "number"],
      ["id_metodo_pago", "Método de pago (ID)", "number"],
      ["referencia_interna", "Referencia interna", "text"],
      ["monto", "Monto", "number"],
      [
        "estado",
        "Estado",
        "select",
        ["PENDIENTE", "APROBADO", "RECHAZADO", "ANULADO", "REEMBOLSADO"],
      ],
      ["pagado_en", "Pagado en", "datetime-local"],
    ],
    cols: [
      "id_pago",
      "id_venta",
      "referencia_interna",
      "monto",
      "estado",
      "pagado_en",
    ],
    extra: "Transacciones de pasarela (transaccion_pasarela)",
    extraRows: "gateway",
  },
  customers: {
    title: "Clientes y direcciones",
    desc: "Datos de cliente vinculables opcionalmente a usuario; las direcciones se almacenan en direccion_cliente.",
    key: "id_cliente",
    fields: [
      ["id_usuario", "Usuario vinculado (ID)", "number"],
      [
        "tipo_documento",
        "Tipo documento",
        "select",
        ["CC", "CE", "NIT", "PASAPORTE", "OTRO"],
      ],
      ["numero_documento", "Número documento", "text"],
      ["nombres", "Nombres", "text"],
      ["apellidos", "Apellidos", "text"],
      ["correo", "Correo", "email"],
      ["telefono", "Teléfono", "text"],
      ["fecha_nacimiento", "Fecha nacimiento", "date"],
      ["estado", "Estado", "select", ["ACTIVO", "INACTIVO"]],
    ],
    cols: [
      "id_cliente",
      "tipo_documento",
      "numero_documento",
      "nombres",
      "apellidos",
      "correo",
      "estado",
    ],
  },
  branches: {
    title: "Sucursales y almacenes",
    desc: "Las sucursales contienen almacenes; un almacén pertenece a una sucursal.",
    key: "id_sucursal",
    fields: [
      ["codigo", "Código", "text"],
      ["nombre", "Nombre", "text"],
      ["telefono", "Teléfono", "text"],
      ["correo", "Correo", "email"],
      ["direccion", "Dirección", "text"],
      ["ciudad", "Ciudad", "text"],
      ["departamento", "Departamento", "text"],
      ["pais", "País", "text"],
      ["es_principal", "Es principal", "select", ["0", "1"]],
      ["estado", "Estado", "select", ["ACTIVA", "INACTIVA"]],
    ],
    cols: [
      "id_sucursal",
      "codigo",
      "nombre",
      "ciudad",
      "departamento",
      "es_principal",
      "estado",
    ],
    extra: "Almacenes (almacen)",
    extraRows: "warehouses",
  },
  users: {
    title: "Usuarios y asignaciones",
    desc: "Usuarios con roles (usuario_rol) y sucursales asignadas (usuario_sucursal). No se captura password_hash en el navegador.",
    key: "id_usuario",
    fields: [
      ["nombres", "Nombres", "text"],
      ["apellidos", "Apellidos", "text"],
      ["correo", "Correo", "email"],
      ["telefono", "Teléfono", "text"],
      [
        "estado",
        "Estado",
        "select",
        ["PENDIENTE", "ACTIVO", "BLOQUEADO", "INACTIVO"],
      ],
    ],
    cols: [
      "id_usuario",
      "nombres",
      "apellidos",
      "correo",
      "telefono",
      "estado",
    ],
  },
  roles: {
    title: "Roles y permisos",
    desc: "Relación muchos-a-muchos rol_permiso. Los códigos iniciales corresponden al SQL de referencia.",
    key: "id_rol",
    fields: [
      ["codigo", "Código", "text"],
      ["nombre", "Nombre", "text"],
      ["descripcion", "Descripción", "text"],
      ["sistema", "Rol de sistema", "select", ["0", "1"]],
      ["activo", "Activo", "select", ["1", "0"]],
    ],
    cols: ["id_rol", "codigo", "nombre", "descripcion", "sistema", "activo"],
    extra: "Permisos (permiso)",
    extraRows: "permissions",
  },
  audit: {
    title: "Auditoría",
    desc: "Consulta de eventos registrados. En producción este módulo será de solo lectura y los eventos los generará el backend.",
    key: "id_auditoria",
    fields: [
      ["id_usuario", "Usuario (ID)", "number"],
      ["accion", "Acción", "text"],
      ["entidad", "Entidad", "text"],
      ["id_registro", "ID registro", "text"],
      ["valores_anteriores", "Valores anteriores JSON", "textarea"],
      ["valores_nuevos", "Valores nuevos JSON", "textarea"],
      ["ip", "IP", "text"],
      ["user_agent", "User agent", "text"],
    ],
    cols: [
      "id_auditoria",
      "id_usuario",
      "accion",
      "entidad",
      "id_registro",
      "ip",
      "creado_en",
    ],
    readonly: true,
  },
  purchaseDetails: {
    title: "Detalle de compras",
    desc: "Líneas de compra asociadas a compra y presentación del producto.",
    key: "id_compra_detalle",
    fields: [
      ["id_compra", "Compra (ID)", "number"],
      [
        "id_presentacion",
        "Presentación",
        "select",
        "presentations",
        "id_presentacion",
        "sku",
      ],
      ["cantidad", "Cantidad", "number"],
      ["costo_unitario", "Costo unitario", "number"],
      ["descuento", "Descuento", "number"],
      ["impuesto", "Impuesto", "number"],
      ["total_linea", "Total línea", "number"],
    ],
    cols: [
      "id_compra_detalle",
      "id_compra",
      "id_presentacion",
      "cantidad",
      "costo_unitario",
      "total_linea",
    ],
  },
  saleDetails: {
    title: "Detalle de ventas",
    desc: "Líneas de venta asociadas a venta y presentación.",
    key: "id_detalle_venta",
    fields: [
      ["id_venta", "Venta (ID)", "number"],
      [
        "id_presentacion",
        "Presentación",
        "select",
        "presentations",
        "id_presentacion",
        "sku",
      ],
      ["cantidad", "Cantidad", "number"],
      ["precio_unitario", "Precio unitario", "number"],
      ["descuento", "Descuento", "number"],
      ["impuesto", "Impuesto", "number"],
      ["total_linea", "Total línea", "number"],
    ],
    cols: [
      "id_detalle_venta",
      "id_venta",
      "id_presentacion",
      "cantidad",
      "precio_unitario",
      "total_linea",
    ],
  },
  transferDetails: {
    title: "Detalle de traslados",
    desc: "Presentaciones y cantidades asociadas a una transferencia.",
    key: "id_transferencia_detalle",
    fields: [
      ["id_transferencia", "Transferencia (ID)", "number"],
      [
        "id_presentacion",
        "Presentación",
        "select",
        "presentations",
        "id_presentacion",
        "sku",
      ],
      ["cantidad", "Cantidad", "number"],
    ],
    cols: [
      "id_transferencia_detalle",
      "id_transferencia",
      "id_presentacion",
      "cantidad",
    ],
  },
  addresses: {
    title: "Direcciones de clientes",
    desc: "Direcciones de entrega relacionadas con cliente.",
    key: "id_direccion",
    fields: [
      ["id_cliente", "Cliente", "select", "customers", "id_cliente", "nombres"],
      ["alias", "Alias", "text"],
      ["direccion", "Dirección", "text"],
      ["complemento", "Complemento", "text"],
      ["ciudad", "Ciudad", "text"],
      ["departamento", "Departamento", "text"],
      ["codigo_postal", "Código postal", "text"],
      ["es_principal", "Principal", "select", ["0", "1"]],
    ],
    cols: [
      "id_direccion",
      "id_cliente",
      "alias",
      "direccion",
      "ciudad",
      "departamento",
      "es_principal",
    ],
  },
  productImages: {
    title: "Imágenes de productos",
    desc: "Recursos gráficos vinculados a producto. URL, texto alternativo, imagen principal y orden.",
    key: "id_imagen",
    fields: [
      [
        "id_producto",
        "Producto",
        "select",
        "products",
        "id_producto",
        "nombre",
      ],
      ["url_archivo", "URL de imagen", "text"],
      ["texto_alternativo", "Texto alternativo", "text"],
      ["es_principal", "Imagen principal", "select", ["0", "1"]],
      ["orden", "Orden", "number"],
    ],
    cols: [
      "id_imagen",
      "id_producto",
      "url_archivo",
      "texto_alternativo",
      "es_principal",
      "orden",
    ],
  },
  supplierProducts: {
    title: "Productos por proveedor",
    desc: "Relación muchos-a-muchos entre proveedor y presentación (proveedor_producto).",
    key: "id_proveedor",
    fields: [
      [
        "id_proveedor",
        "Proveedor",
        "select",
        "suppliers",
        "id_proveedor",
        "razon_social",
      ],
      [
        "id_presentacion",
        "Presentación",
        "select",
        "presentations",
        "id_presentacion",
        "sku",
      ],
      ["codigo_referencia", "Código referencia", "text"],
      ["costo_ultimo", "Último costo", "number"],
    ],
    cols: [
      "id_proveedor",
      "id_presentacion",
      "codigo_referencia",
      "costo_ultimo",
    ],
  },
  userRoles: {
    title: "Roles por usuario",
    desc: "Asignación muchos-a-muchos usuario_rol.",
    key: "id_usuario",
    fields: [
      ["id_usuario", "Usuario (ID)", "number"],
      ["id_rol", "Rol", "select", "roles", "id_rol", "nombre"],
    ],
    cols: ["id_usuario", "id_rol", "asignado_en"],
  },
  userBranches: {
    title: "Usuarios por sucursal",
    desc: "Asignación de usuarios a las sucursales en usuario_sucursal.",
    key: "id_usuario",
    fields: [
      ["id_usuario", "Usuario (ID)", "number"],
      [
        "id_sucursal",
        "Sucursal",
        "select",
        "branches",
        "id_sucursal",
        "nombre",
      ],
      ["es_principal", "Sucursal principal", "select", ["0", "1"]],
      ["activo", "Activo", "select", ["0", "1"]],
    ],
    cols: [
      "id_usuario",
      "id_sucursal",
      "es_principal",
      "activo",
      "asignado_en",
    ],
  },
  rolePermissions: {
    title: "Permisos por rol",
    desc: "Asignación muchos-a-muchos rol_permiso.",
    key: "id_rol",
    fields: [
      ["id_rol", "Rol", "select", "roles", "id_rol", "nombre"],
      [
        "id_permiso",
        "Permiso",
        "select",
        "permissions",
        "id_permiso",
        "nombre",
      ],
    ],
    cols: ["id_rol", "id_permiso"],
  },
};
let data =
    JSON.parse(localStorage.getItem("perfumeria_v2_demo") || "null") ||
    structuredClone(seed),
  activeView = "dashboard",
  editId = null;
function save() {
  localStorage.setItem("perfumeria_v2_demo", JSON.stringify(data));
}
function labelFor(cfg, row) {
  if (cfg === "products") return row.nombre;
  if (cfg === "presentations") return row.sku + " · " + row.nombre_presentacion;
  if (
    cfg === "categories" ||
    cfg === "brands" ||
    cfg === "warehouses" ||
    cfg === "branches" ||
    cfg === "suppliers" ||
    cfg === "customers"
  )
    return row.nombre || row.razon_social || row.nombres || row.codigo;
  return row[cfg];
}
function display(key, val) {
  if (val === null || val === undefined || val === "") return "—";
  const map = {
    categories: "categories",
    brands: "brands",
    products: "products",
    presentations: "presentations",
    suppliers: "suppliers",
    branches: "branches",
    warehouses: "warehouses",
    customers: "customers",
  };
  if (key === "id_categoria_padre" || key === "id_categoria")
    return data.categories.find((x) => x.id_categoria == val)?.nombre || val;
  if (key === "id_marca")
    return data.brands.find((x) => x.id_marca == val)?.nombre || val;
  if (key === "id_producto")
    return data.products.find((x) => x.id_producto == val)?.nombre || val;
  if (key === "id_presentacion")
    return data.presentations.find((x) => x.id_presentacion == val)?.sku || val;
  if (
    key === "id_almacen" ||
    key === "id_almacen_origen" ||
    key === "id_almacen_destino"
  )
    return data.warehouses.find((x) => x.id_almacen == val)?.nombre || val;
  if (key === "id_sucursal")
    return data.branches.find((x) => x.id_sucursal == val)?.nombre || val;
  if (key === "id_proveedor")
    return (
      data.suppliers.find((x) => x.id_proveedor == val)?.razon_social || val
    );
  if (key === "id_cliente")
    return data.customers.find((x) => x.id_cliente == val)?.nombres || val;
  if (
    [
      "precio_venta",
      "costo_referencia",
      "total",
      "subtotal",
      "monto",
      "costo_unitario",
    ].includes(key)
  )
    return fmt(val);
  if (
    [
      "activo",
      "activa",
      "es_principal",
      "permite_venta",
      "sistema",
      "requiere_control_lote",
    ].includes(key)
  )
    return val == 1 ? "Sí" : "No";
  return String(val);
}
function head(k, t, d, btn = "") {
  return `<div class="page-head"><div><span class="eyebrow">${k}</span><h1>${t}</h1><p>${d}</p></div>${btn ? `<button class="btn" id="primaryAction">＋ ${btn}</button>` : ""}</div>`;
}
function tableFor(rows, cols) {
  return `<div class="table-scroll"><table><thead><tr>${cols.map((c) => `<th>${c.replaceAll("_", " ").toUpperCase()}</th>`).join("")}<th>ACCIONES</th></tr></thead><tbody>${rows.length ? rows.map((r) => `<tr>${cols.map((c) => `<td>${display(c, r[c])}</td>`).join("")}<td class="actions"><button class="text-action" data-edit="${r[configs[activeView]?.key] ?? ""}">Editar</button><button class="text-action danger" data-delete="${r[configs[activeView]?.key] ?? ""}">Eliminar</button></td></tr>`).join("") : `<tr><td colspan="${cols.length + 1}" class="empty">No hay registros en esta vista.</td></tr>`}</tbody></table></div>`;
}
function renderDashboard() {
  const products = data.products.length,
    pres = data.presentations.length,
    stock = data.inventory.reduce((s, x) => s + Number(x.existencia), 0),
    low = data.inventory.filter(
      (x) => Number(x.existencia) <= Number(x.existencia_minima),
    ).length;
  $("#viewContent").innerHTML =
    head(
      "VISTA GENERAL",
      "Resumen operativo",
      "Indicadores calculados a partir de los datos locales de demostración.",
    ) +
    `<div class="stats"><article class="stat"><div class="stat-top">Productos <span class="stat-icon">◇</span></div><strong>${products}</strong><small>${pres} presentaciones comerciales</small></article><article class="stat"><div class="stat-top">Unidades en inventario <span class="stat-icon">▤</span></div><strong>${stock}</strong><small>${low} referencias en mínimo o bajo mínimo</small></article><article class="stat"><div class="stat-top">Ventas registradas <span class="stat-icon">＄</span></div><strong>${data.sales.length}</strong><small>Cabeceras de venta demo</small></article><article class="stat"><div class="stat-top">Clientes <span class="stat-icon">♙</span></div><strong>${data.customers.length}</strong><small>Registros locales</small></article></div><div class="dashboard-grid"><section class="panel"><h3>Mapa de módulos y relaciones</h3><p>La capa de presentación organiza los datos siguiendo las relaciones definidas en MySQL.</p><div class="relation-list"><div><b>Catálogo</b><span>categoria → producto → presentacion_producto → imagen_producto</span></div><div><b>Abastecimiento</b><span>proveedor → compra → compra_detalle → inventario</span></div><div><b>Operación</b><span>sucursal → almacen → inventario → movimiento_inventario</span></div><div><b>Venta y pago</b><span>cliente → venta → detalle_venta → pago_venta → transaccion_pasarela</span></div><div><b>Seguridad</b><span>usuario ↔ usuario_rol ↔ rol ↔ rol_permiso ↔ permiso</span></div></div></section><section class="panel"><h3>Alertas de inventario</h3><p>Registros cuya existencia es menor o igual al mínimo configurado.</p>${
      data.inventory
        .filter((x) => Number(x.existencia) <= Number(x.existencia_minima))
        .map((x) => {
          const p = data.presentations.find(
            (z) => z.id_presentacion == x.id_presentacion,
          );
          return `<div class="activity"><i class="dot warn"></i><div><b>${p?.sku || "Presentación"} · ${p?.nombre_presentacion || ""}</b><small>${x.existencia} disponibles · mínimo ${x.existencia_minima}</small></div></div>`;
        })
        .join("") || '<p class="empty">Sin alertas de stock.</p>'
    }</section></div><div class="notice"><b>Importante:</b> todos los registros de esta versión se guardan únicamente en el navegador mediante localStorage. No son datos reales ni reemplazan validaciones del servidor.</div>`;
}
function renderModule(view) {
  const c = configs[view],
    rows = data[view] || [];
  let html =
    head("MÓDULO", c.title, c.desc, c.readonly ? "" : "NUEVO REGISTRO") +
    `<section class="table-panel"><div class="table-head"><div><h3>${c.title} <small>(${rows.length})</small></h3><span class="subtle">Campos de referencia: tabla MySQL <code>${view === "presentations" ? "presentacion_producto" : view === "customers" ? "cliente" : view === "branches" ? "sucursal" : view === "users" ? "usuario" : view === "roles" ? "rol" : view === "audit" ? "auditoria" : view === "cash" ? "caja" : view === "payments" ? "pago_venta" : view === "transfers" ? "transferencia_inventario" : view === "movements" ? "movimiento_inventario" : view === "inventory" ? "inventario" : view === "purchases" ? "compra" : view === "suppliers" ? "proveedor" : view === "products" ? "producto" : view === "brands" ? "marca" : "categoria"}</code></span></div><input id="tableSearch" placeholder="Buscar en los registros..."></div>${tableFor(rows, c.cols)}</section>`;
  if (c.extra)
    html += `<section class="table-panel"><div class="table-head"><div><h3>${c.extra}</h3><span class="subtle">Vista complementaria de entidad relacionada</span></div></div>${tableFor(data[c.extraRows] || [], c.extraRows === "shifts" ? ["id_turno", "id_caja", "id_usuario_apertura", "abierto_en", "estado"] : c.extraRows === "gateway" ? ["id_transaccion", "id_pago", "proveedor", "referencia_comercio", "estado", "monto"] : c.extraRows === "warehouses" ? ["id_almacen", "id_sucursal", "codigo", "nombre", "tipo", "estado"] : ["id_permiso", "codigo", "modulo", "nombre"])}</section>`;
  $("#viewContent").innerHTML = html;
  $("#primaryAction")?.addEventListener("click", () => openForm(view));
  $("#tableSearch")?.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelector("#viewContent tbody").innerHTML =
      rows
        .filter((r) => JSON.stringify(r).toLowerCase().includes(q))
        .map(
          (r) =>
            `<tr>${c.cols.map((k) => `<td>${display(k, r[k])}</td>`).join("")}<td class="actions"><button class="text-action" data-edit="${r[c.key]}">Editar</button><button class="text-action danger" data-delete="${r[c.key]}">Eliminar</button></td></tr>`,
        )
        .join("") ||
      `<tr><td colspan="${c.cols.length + 1}" class="empty">Sin coincidencias.</td></tr>`;
  });
}
const names = {
  dashboard: "Resumen",
  ...Object.fromEntries(Object.entries(configs).map(([k, v]) => [k, v.title])),
};
function render(v) {
  activeView = v;
  document
    .querySelectorAll(".side-link")
    .forEach((b) => b.classList.toggle("active", b.dataset.view === v));
  $("#pageName").textContent = names[v] || "Resumen";
  v === "dashboard" ? renderDashboard() : renderModule(v);
}
function fieldMarkup(f, val) {
  const [name, label, type, source, a, b] = f;
  let input = "";
  if (type === "select") {
    let opts = [];
    if (Array.isArray(source)) opts = source.map((x) => [x, x]);
    else if (
      source === "categories" ||
      source === "brands" ||
      source === "products" ||
      source === "presentations" ||
      source === "suppliers" ||
      source === "branches" ||
      source === "warehouses" ||
      source === "customers" ||
      source === "roles" ||
      source === "permissions"
    )
      opts = data[source].map((x) => [x[a], x[b]]);
    input = `<select name="${name}"><option value="">— Seleccionar —</option>${opts.map(([v, t]) => `<option value="${v}" ${String(val ?? "") === String(v) ? "selected" : ""}>${t}</option>`).join("")}</select>`;
  } else if (type === "textarea")
    input = `<textarea name="${name}" rows="3">${val ?? ""}</textarea>`;
  else
    input = `<input name="${name}" type="${type === "datetime-local" ? "datetime-local" : type}" value="${val ?? ""}" ${type === "number" ? 'step="0.001"' : ""}>`;
  return `<label class="field"><span>${label}</span>${input}</label>`;
}
function openForm(view, id = null) {
  const c = configs[view];
  if (c.readonly) {
    notify("La auditoría es de solo lectura.");
    return;
  }
  editId = id;
  const row = id ? data[view].find((x) => String(x[c.key]) === String(id)) : {};
  $("#modalTitle").textContent = id
    ? `Editar ${c.title.toLowerCase()}`
    : `Nuevo registro · ${c.title.toLowerCase()}`;
  $("#formFields").innerHTML = c.fields
    .map((f) => fieldMarkup(f, row?.[f[0]]))
    .join("");
  $("#modalBackdrop").classList.add("open");
  $("#modalBackdrop").setAttribute("aria-hidden", "false");
}
function closeForm() {
  $("#modalBackdrop").classList.remove("open");
  $("#modalBackdrop").setAttribute("aria-hidden", "true");
  $("#recordForm").reset();
  editId = null;
}
function nextId(view, key) {
  return Math.max(0, ...data[view].map((x) => Number(x[key]) || 0)) + 1;
}
function notify(t) {
  const el = $("#toast");
  el.textContent = t;
  el.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
}
document
  .querySelectorAll(".side-link")
  .forEach((b) => b.addEventListener("click", () => render(b.dataset.view)));
$("#viewContent").addEventListener("click", (e) => {
  const edit = e.target.closest("[data-edit]"),
    del = e.target.closest("[data-delete]");
  if (edit) openForm(activeView, edit.dataset.edit);
  if (del) {
    const c = configs[activeView];
    if (
      confirm("¿Eliminar este registro de los datos locales de demostración?")
    ) {
      data[activeView] = data[activeView].filter(
        (x) => String(x[c.key]) !== String(del.dataset.delete),
      );
      save();
      render(activeView);
      notify("Registro eliminado de la demostración.");
    }
  }
});
$("#recordForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const c = configs[activeView],
    fd = new FormData(e.target),
    obj = {};
  for (const f of c.fields) {
    let v = fd.get(f[0]);
    if (v !== null && v !== "") {
      if (f[2] === "number") v = Number(v);
      obj[f[0]] = v;
    }
  }
  if (editId) {
    const i = data[activeView].findIndex(
      (x) => String(x[c.key]) === String(editId),
    );
    data[activeView][i] = { ...data[activeView][i], ...obj };
  } else {
    obj[c.key] = nextId(activeView, c.key);
    data[activeView].push(obj);
  }
  save();
  closeForm();
  render(activeView);
  notify("Registro guardado localmente. No se ha enviado a MySQL.");
});
$("#closeModal").onclick = closeForm;
$("#cancelModal").onclick = closeForm;
$("#modalBackdrop").addEventListener("click", (e) => {
  if (e.target.id === "modalBackdrop") closeForm();
});
render("dashboard");
