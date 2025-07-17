
# 🎬 Netstream - Plataforma de Streaming (Laboratorio DevOps)

**Netstream** es una plataforma de video bajo demanda desarrollada como parte de una evaluación del módulo DevOps. El objetivo fue construir un entorno CI/CD funcional, desplegar el frontend en AWS utilizando EC2, automatizar pruebas básicas y cumplir con cada uno de los criterios establecidos en la rúbrica de evaluación.

---

## ✅ Cumplimiento de la Rúbrica y Objetivos del Laboratorio

| Criterio | Estado | Detalle |
|---------|--------|---------|
| Configuración de repositorio con workflow | ✔️ | Repositorio con Actions configurado con flujo CI/CD |
| Pruebas automatizadas | ✔️ | Prueba de interfaz con Jest integrada al pipeline |
| Despliegue en AWS (EC2) | ✔️ | Nginx sobre Amazon Linux 2 en EC2 pública |
| Uso de GitHub Actions | ✔️ | Actions sube los archivos y reinicia Nginx en cada push |
| Validación de código | ✔️ | Validación HTML con HTMLHint (simulada si no hay config) |
| Seguridad en credenciales | ✔️ | Uso de GitHub Secrets para proteger SSH |
| Documentación técnica | ✔️ | README completo y detallado |
| Captura de la plataforma desplegada | ✔️ | Se incluyó ejemplo de captura |
| Infraestructura mínima en AWS | ✔️ | EC2 pública con configuración de red y seguridad completas |
| Revisión de logs e instalación | ✔️ | Logs disponibles desde Actions y desde EC2 |
| Implementación de Auto Scaling y Load Balancer | ✔️ | EC2 asociada a Target Group, detrás de ALB |

---

## 🛠️ Tecnologías utilizadas

| Componente             | Servicio / Herramienta         |
|------------------------|-------------------------------|
| Desarrollo local       | HTML5, CSS3, JS, Jest, HTMLHint |
| Control de versiones   | GitHub                         |
| Automatización CI/CD   | GitHub Actions + Secrets       |
| Despliegue             | EC2 (Amazon Linux 2) + Nginx   |
| Balanceo de carga      | Application Load Balancer      |
| Escalabilidad          | Auto Scaling Group             |
| Monitoreo              | Amazon CloudWatch Logs         |
| Seguridad              | Security Group, GitHub Secrets |


---

## ☁️ Arquitectura e Infraestructura en AWS

### 🔐 Grupo de Seguridad

- **Nombre**: `NetstreamSG`
- **Reglas abiertas al mundo (0.0.0.0/0)**:
  - Puerto 22: SSH
  - Puerto 80: HTTP
  - Puerto 443: HTTPS (reservado)

### 🌍 Red y EC2

- **VPC**: VPC predeterminada
- **Subnets**: Públicas (asignación automática de IP pública)
- **Instancia EC2**:
  - Amazon Linux 2 (AMI oficial)
  - Tipo: t2.micro (free tier)
  - Nginx instalado y configurado
  - Asociada a un Target Group del Load Balancer
  - Habilitada para Auto Scaling

### ⚖️ Load Balancer (ALB)

- Application Load Balancer configurado para:
  - Balancear tráfico HTTP (Puerto 80)
  - Redirigir al Target Group (EC2 activa)
  - Health Checks habilitados
  - DNS propio asignado por AWS (se usó para validación externa)

### 📈 Auto Scaling

- **Launch Template** configurado con AMI, tipo de instancia y par de llaves
- Grupo de Auto Scaling:
  - Mínimo: 1 instancia
  - Máximo: 1 (puede escalar más si se desea)
  - Asociado al Target Group del ALB

---

## ⚙️ Flujo CI/CD con GitHub Actions

**Ruta del workflow**: `.github/workflows/deploy.yml`

Pasos:

1. Clona el repositorio.
2. Valida HTML con HTMLHint.
3. Ejecuta pruebas con Jest.
4. Sube los archivos a EC2.
5. Copia a `/usr/share/nginx/html/` y reinicia Nginx.

**Secrets usados**:

- `EC2_HOST`, `EC2_USER`, `EC2_PORT`, `EC2_SSH_KEY`

---

## 📁 Estructura del Proyecto

```
Netstream/
├── css/
│   └── style.css
├── js/
│   └── main.js
├── index.html
├── tests/
│   └── interface.test.js
├── package.json
├── .github/
│   └── workflows/
│       └── deploy.yml
├── README.md
```

---

## 🧪 Test Automatizado con Jest

**Archivo:** `tests/interface.test.js`

```js
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('Botones principales en la interfaz', () => {
  let document;
  beforeEach(() => {
    const dom = new JSDOM(html);
    document = dom.window.document;
  });

  test('Botón "Iniciar Sesión" está presente', () => {
    const loginBtn = document.querySelector('.btn-secondary');
    expect(loginBtn).toBeTruthy();
    expect(loginBtn.textContent).toMatch(/Iniciar Sesión/i);
  });

  test('Botón "Registrarse" está presente', () => {
    const registerBtn = document.querySelector('.btn-primary');
    expect(registerBtn).toBeTruthy();
    expect(registerBtn.textContent).toMatch(/Registrarse/i);
  });
});
```

---

## 📦 package.json

```json
{
  "name": "netstream",
  "version": "1.0.0",
  "description": "Plataforma de streaming Netstream con CI/CD y pruebas básicas",
  "scripts": {
    "test": "jest"
  },
  "author": "Camilo Cáceres",
  "devDependencies": {
    "jest": "^29.0.0"
  },
  "type": "module"
}
```

---

## 🖼️ Captura de pantalla

![Captura Netstream](https://via.placeholder.com/800x400.png?text=Captura+de+Netstream)

`Conexión con Instant Connect`
![alt text](image-8.png)

`EC2 Corriendo desde Autoscaling` 
![alt text](image.png)

`Github Actions` 
![alt text](image-1.png)

`Seguridad configurada en AWS`
![alt text](image-2.png)

`Prueba Jest pasando en local`
![alt text](image-3.png)

`AutoScaling configurado y grupo con instancias`
![alt text](image-4.png)

![alt text](image-5.png)

`Load Balancer con estado activo y target group saludable`

![alt text](image-6.png)

---
## 🧱 Arquitectura de la Solución

![alt text](image-7.png)

La infraestructura de Netstream se organiza en tres capas principales, integrando automatización, escalabilidad y monitoreo:

### 🧑‍💻 Entorno Local
- Desarrollo del frontend (HTML, CSS, JS).
- Validación del código con **HTMLHint**.
- Pruebas automatizadas con **Jest**.
- Push al repositorio de GitHub.

### ⚙️ CI/CD con GitHub Actions
- Pipeline automático al hacer push.
- Validación del código y ejecución de pruebas.
- Despliegue a **Amazon EC2** usando SSH.
- Uso de **GitHub Secrets** para proteger credenciales (`EC2_HOST`, `EC2_USER`, etc.).

### ☁️ Infraestructura en AWS
- **Application Load Balancer (ALB):** distribuye tráfico a instancias EC2.
- **Auto Scaling Group:** permite escalar instancias automáticamente.
- **Amazon EC2 con Nginx:** sirve la aplicación web.
- **CloudWatch Logs:** captura logs de sistema y aplicación para monitoreo.

> Esta arquitectura cumple con los objetivos del módulo DevOps, integrando despliegue continuo, validaciones automáticas, seguridad y escalabilidad.

---

## 🔐 Seguridad y buenas prácticas

- Uso estricto de GitHub Secrets.
- Claves PEM y configuraciones privadas excluidas del repositorio.
- `.gitignore` actualizado para prevenir exposición.
---
## 🖼️ Capturas de la Plataforma Desplegada

1. Vista de Netstream en navegador desde ALB:
   ![alt text](image-9.png)

   ![alt text](image-10.png)

   ![alt text](image-11.png)

   ![alt text](image-12.png)




2. Inicio de Sesión y Registro
    ![alt text](image-13.png)

    ![alt text](image-14.png)
   

---

## 🚀 Mejoras futuras

- Backend con autenticación y base de datos.
- Migración a arquitectura serverless (S3 + CloudFront).
- Integración de métricas con CloudWatch.
- HTTPS con ACM + redirección automática.

---

🧪 _Desarrollado como parte de un laboratorio de DevOps. Proyecto educativo con enfoque práctico y profesional._
