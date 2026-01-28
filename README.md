# LexFiscal Backend - Documentación

## 📋 Descripción

LexFiscal es una API REST que proporciona información sobre tributos colombianos, incluyendo impuestos nacionales y municipales con sus bases legales y características técnicas.

## 🚀 Instalación y Uso

### Requisitos
- Node.js 18+
- MongoDB

### Instalación

```bash
npm install
```

### Variables de Entorno

Crea un archivo `.env` en la raíz:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/lexfiscal
RATE_LIMIT_ENABLED=true
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
```

### Ejecutar el Proyecto

**Desarrollo:**
```bash
npm run dev
```

**Producción:**
```bash
npm start
```

### Poblar Base de Datos

```bash
node src/seed/seedTributes.js
```

## 📚 API Endpoints

### Health Check
```
GET /api/v1/health
```
Verifica el estado del servicio.

**Respuesta:**
```json
{
  "status": "ok",
  "service": "LexFiscal API",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Obtener Todos los Tributos
```
GET /api/v1/tributes
```

**Respuesta:**
```json
{
  "count": 4,
  "data": [
    {
      "_id": "...",
      "name": "Impuesto sobre la Renta",
      "slug": "ISR",
      "type": "directo",
      "scope": "nacional",
      "validity": { ... },
      "legalBasis": { ... }
    }
  ]
}
```

### Obtener Tributo por Slug
```
GET /api/v1/tributes/:slug
```

**Parámetro:** `slug` (ej: ISR, IVA, ICA, Retefuente)

**Respuesta:** Objeto completo del tributo con toda su información.

## 🏗️ Estructura del Proyecto

| Carpeta | Descripción |
|---------|-------------|
| `config/` | Configuración de la base de datos |
| `controllers/` | Lógica de negocio de las rutas |
| `middlewares/` | Rate limiting y manejo de errores |
| `models/` | Esquemas de MongoDB |
| `routes/` | Definición de endpoints |
| `seed/` | Script para poblar datos iniciales |

## 🔧 Tecnologías

- **Express.js** - Framework web
- **MongoDB/Mongoose** - Base de datos
- **Helmet** - Seguridad HTTP
- **express-rate-limit** - Control de tasa de solicitudes
- **dotenv** - Variables de entorno

## ⚙️ Características

✅ Rate limiting configurable  
✅ Manejo centralizado de errores  
✅ Consultas optimizadas con Mongoose  
✅ Validación de esquemas  
✅ Datos de tributos colombianos incluidos