-- Creación de la base de datos
CREATE DATABASE WassanaContratos;
USE WassanaContratos;

-- Tabla de Sucursales
CREATE TABLE Sucursales (
    sucursal_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(200),
    telefono VARCHAR(20),
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de Tipos de Crédito
CREATE TABLE TiposCredito (
    tipo_credito_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    plazo_min INT NOT NULL,
    plazo_max INT NOT NULL,
    interes DECIMAL(10,2) NOT NULL,
    monto_minimo DECIMAL(12,2) NOT NULL,
    monto_maximo DECIMAL(12,2) NOT NULL,
    periodicidad INT NOT NULL COMMENT 'Días entre pagos',
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de Series
CREATE TABLE Series (
    serie_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    prefijo VARCHAR(10) NOT NULL,
    consecutivo INT DEFAULT 1,
    automatico BOOLEAN DEFAULT TRUE,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de Ejecutivos
CREATE TABLE Ejecutivos (
    ejecutivo_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de Supervisores
CREATE TABLE Supervisores (
    supervisor_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de Grupos
CREATE TABLE Grupos (
    grupo_id INT PRIMARY KEY AUTO_INCREMENT,
    clave VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    ejecutivo_id INT,
    supervisor_id INT,
    sucursal_id INT,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (ejecutivo_id) REFERENCES Ejecutivos(ejecutivo_id),
    FOREIGN KEY (supervisor_id) REFERENCES Supervisores(supervisor_id),
    FOREIGN KEY (sucursal_id) REFERENCES Sucursales(sucursal_id)
);

-- Tabla de Personas (Clientes y Avales)
CREATE TABLE Personas (
    persona_id INT PRIMARY KEY AUTO_INCREMENT,
    clave VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100) NOT NULL,
    apellido_materno VARCHAR(100),
    fecha_nacimiento DATE,
    curp VARCHAR(18),
    rfc VARCHAR(13),
    clave_elector VARCHAR(20),
    ocupacion VARCHAR(100),
    domicilio VARCHAR(200),
    colonia VARCHAR(100),
    codigo_postal VARCHAR(10),
    municipio VARCHAR(100),
    estado VARCHAR(50),
    telefono_casa VARCHAR(20),
    telefono_celular VARCHAR(20),
    telefono_recados VARCHAR(20),
    email VARCHAR(100),
    grupo_id INT,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (grupo_id) REFERENCES Grupos(grupo_id)
);

-- Tabla de Usuarios
CREATE TABLE Usuarios (
    usuario_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    rol ENUM('admin', 'capturista', 'cobranza', 'juridico') NOT NULL,
    sucursal_id INT,
    activo BOOLEAN DEFAULT TRUE,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sucursal_id) REFERENCES Sucursales(sucursal_id)
);

-- Tabla de Semanas
CREATE TABLE Semanas (
    semana_id INT PRIMARY KEY AUTO_INCREMENT,
    numero INT NOT NULL,
    año INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    cerrada BOOLEAN DEFAULT FALSE,
    fecha_cierre DATETIME
);

-- Tabla de Contratos
CREATE TABLE Contratos (
    contrato_id INT PRIMARY KEY AUTO_INCREMENT,
    identificador VARCHAR(50) NOT NULL UNIQUE,
    serie_id INT NOT NULL,
    folio VARCHAR(20),
    cliente_id INT NOT NULL,
    aval_id INT,
    tipo_credito_id INT NOT NULL,
    grupo_id INT NOT NULL,
    monto_solicitado DECIMAL(12,2) NOT NULL,
    monto_autorizado DECIMAL(12,2) NOT NULL,
    plazo INT NOT NULL,
    interes DECIMAL(10,2) NOT NULL,
    fecha_credito DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    periodicidad INT NOT NULL,
    usuario_id INT NOT NULL,
    sucursal_id INT NOT NULL,
    semana_id INT,
    estatus ENUM('activo', 'liquidado', 'cancelado', 'vencido') DEFAULT 'activo',
    observaciones TEXT,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (serie_id) REFERENCES Series(serie_id),
    FOREIGN KEY (cliente_id) REFERENCES Personas(persona_id),
    FOREIGN KEY (aval_id) REFERENCES Personas(persona_id),
    FOREIGN KEY (tipo_credito_id) REFERENCES TiposCredito(tipo_credito_id),
    FOREIGN KEY (grupo_id) REFERENCES Grupos(grupo_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (sucursal_id) REFERENCES Sucursales(sucursal_id),
    FOREIGN KEY (semana_id) REFERENCES Semanas(semana_id)
);

-- Tabla de Amortizaciones
CREATE TABLE Amortizaciones (
    amortizacion_id INT PRIMARY KEY AUTO_INCREMENT,
    contrato_id INT NOT NULL,
    numero_pago INT NOT NULL,
    fecha_pago DATE NOT NULL,
    monto DECIMAL(12,2) NOT NULL,
    interes DECIMAL(12,2) NOT NULL,
    capital DECIMAL(12,2) NOT NULL,
    saldo DECIMAL(12,2) NOT NULL,
    estatus ENUM('pendiente', 'pagado', 'atrasado') DEFAULT 'pendiente',
    FOREIGN KEY (contrato_id) REFERENCES Contratos(contrato_id)
);

-- Tabla de Pagos
CREATE TABLE Pagos (
    pago_id INT PRIMARY KEY AUTO_INCREMENT,
    contrato_id INT NOT NULL,
    amortizacion_id INT NOT NULL,
    monto DECIMAL(12,2) NOT NULL,
    fecha_pago DATETIME NOT NULL,
    usuario_id INT NOT NULL,
    sucursal_id INT NOT NULL,
    semana_id INT,
    observaciones TEXT,
    FOREIGN KEY (contrato_id) REFERENCES Contratos(contrato_id),
    FOREIGN KEY (amortizacion_id) REFERENCES Amortizaciones(amortizacion_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (sucursal_id) REFERENCES Sucursales(sucursal_id),
    FOREIGN KEY (semana_id) REFERENCES Semanas(semana_id)
);

-- Tabla de Historial de Contratos
CREATE TABLE HistorialContratos (
    historial_id INT PRIMARY KEY AUTO_INCREMENT,
    contrato_id INT NOT NULL,
    accion VARCHAR(50) NOT NULL,
    descripcion TEXT,
    usuario_id INT NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contrato_id) REFERENCES Contratos(contrato_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

-- Tabla de Documentos
CREATE TABLE Documentos (
    documento_id INT PRIMARY KEY AUTO_INCREMENT,
    contrato_id INT NOT NULL,
    tipo_documento VARCHAR(50) NOT NULL,
    nombre_archivo VARCHAR(255) NOT NULL,
    ruta_archivo VARCHAR(255) NOT NULL,
    fecha_subida DATETIME DEFAULT CURRENT_TIMESTAMP,
    usuario_id INT NOT NULL,
    observaciones TEXT,
    FOREIGN KEY (contrato_id) REFERENCES Contratos(contrato_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

-- Tabla de Cierres Semanales
CREATE TABLE CierresSemanales (
    cierre_id INT PRIMARY KEY AUTO_INCREMENT,
    semana_id INT NOT NULL,
    usuario_id INT NOT NULL,
    sucursal_id INT NOT NULL,
    fecha_cierre DATETIME NOT NULL,
    total_contratos INT,
    total_pagos DECIMAL(12,2),
    observaciones TEXT,
    FOREIGN KEY (semana_id) REFERENCES Semanas(semana_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (sucursal_id) REFERENCES Sucursales(sucursal_id)
);

-- Tabla de Cuentas Receptoras
CREATE TABLE CuentasReceptoras (
    cuenta_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    numero_cuenta VARCHAR(50) NOT NULL,
    tipo_cuenta VARCHAR(50) NOT NULL,
    banco VARCHAR(100) NOT NULL,
    activa BOOLEAN DEFAULT TRUE
);

-- Tabla de Movimientos de Cuentas
CREATE TABLE MovimientosCuentas (
    movimiento_id INT PRIMARY KEY AUTO_INCREMENT,
    cuenta_id INT NOT NULL,
    tipo_movimiento ENUM('ingreso', 'egreso') NOT NULL,
    monto DECIMAL(12,2) NOT NULL,
    fecha_movimiento DATE NOT NULL,
    concepto VARCHAR(255) NOT NULL,
    referencia VARCHAR(100),
    usuario_id INT NOT NULL,
    observaciones TEXT,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cuenta_id) REFERENCES CuentasReceptoras(cuenta_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

-- Tabla de Conceptos
CREATE TABLE Conceptos (
    concepto_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    tipo ENUM('ingreso', 'egreso') NOT NULL,
    descripcion TEXT,
    activo BOOLEAN DEFAULT TRUE
);