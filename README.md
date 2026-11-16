# Mi Préstamo Digital - Plataforma Web

Plataforma web moderna y responsiva para servicios de financiamiento y préstamos personales con contrato privado en Bolivia, basada en la propuesta y funcionalidades del sitio de referencia `site123.me`.

---

## 🚀 Stack de Desarrollo Recomendado

| Componente | Tecnología | Justificación |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 18 + Vite 6** | Rendimiento ultra rápido, desarrollo ágil con HMR, excelente modularidad de componentes y reactividad financiera. |
| **Estilos y Diseño** | **Tailwind CSS v4** | Utilidades CSS modernas, cero overhead, diseño adaptable para móviles y soporte integrado para impresión de cronogramas. |
| **Iconografía** | **Lucide React** | Conjunto de iconos limpio, consistente y de estética fintech/bancaria profesional. |
| **Cálculo Financiero** | **Sistema Francés (Vanilla JS)** | Cuotas fijas mensuales con segregación precisa de amortización de capital, interés sobre saldo e impresión limpia. |
| **Persistencia Local** | **Local Storage** | Permite almacenar solicitudes generadas de forma inmediata y consultarlas en el módulo de seguimiento sin requerir base de datos inicial. |
| **Despliegue** | **Vercel / Netlify / Cloudflare / Static Host** | La carpeta `dist` resultante puede desplegarse en cualquier hosting estático o servidor Apache/Nginx. |

---

## 📁 Estructura del Proyecto

```
mi-prestamo-digital/
├── index.html                   # Documento HTML base con fuentes y metaetiquetas SEO
├── package.json                 # Dependencias y scripts de Vite y React
├── vite.config.js               # Configuración de Vite con plugins de React y Tailwind
├── src/
│   ├── main.jsx                 # Punto de entrada de la aplicación
│   ├── App.jsx                  # Coordinador de vistas y estado global
│   ├── index.css                # Estilos Tailwind y reglas para impresión
│   ├── data/
│   │   └── plans.js             # Definición de las 4 líneas de préstamos y datos de contacto
│   ├── utils/
│   │   └── amortization.js      # Algoritmo de cuota fija, cronograma y formateo de moneda (Bs)
│   ├── components/
│   │   ├── Navbar.jsx           # Menú principal responsivo con barra de confianza
│   │   ├── Footer.jsx           # Pie de página con información legal y sucursal La Paz
│   │   ├── Hero.jsx             # Sección principal con métricas y simulador preliminar
│   │   ├── Features.jsx         # Ventajas (Contrato privado, cronograma, sin costos ocultos)
│   │   ├── PlansSection.jsx     # Tarjetas comparativas de los 4 planes de crédito
│   │   ├── HowItWorks.jsx       # Proceso en 4 pasos
│   │   ├── FAQSection.jsx       # Acordeón de preguntas frecuentes
│   │   └── ContactSection.jsx   # Formulario web de contacto y datos de oficina física
│   └── pages/
│       ├── HomePage.jsx         # Landing page institucional completa
│       ├── SimulatorPage.jsx    # Simulador interactivo en tiempo real con tabla de amortización
│       ├── ApplicationPage.jsx  # Formulario digital con generación de código de seguimiento
│       └── TrackingPage.jsx     # Portal de consulta de estado y cronograma con caso demo
└── dist/                        # Carpeta de producción lista para subir a cualquier hosting
```

---

## 🛠️ Instrucciones de Uso y Ejecución

### 1. Iniciar en modo desarrollo
Para correr el servidor local de desarrollo con recarga en vivo:
```bash
npm run dev
```

### 2. Generar compilación para producción
Para compilar la aplicación optimizada para despliegue:
```bash
npm run build
```

### 3. Previsualizar la versión compilada
```bash
npm run preview
```

---

## 💼 Características Implementadas

1. **4 Planes de Crédito Configurados:**
   - **Adelanto de Sueldo:** 500 a 3.000 Bs | 4.0% mes | 1 a 6 meses.
   - **Préstamo Personal:** 1.000 a 20.000 Bs | 3.0% mes | 6 a 24 meses.
   - **Refinanciamiento:** 2.000 a 30.000 Bs | 2.8% mes | 6 a 36 meses.
   - **Préstamo Emprendedor:** 5.000 a 50.000 Bs | 2.5% mes | 12 a 36 meses.

2. **Simulador Financiero en Vivo:**
   - Sliders de monto y plazo reactivos.
   - Cálculo automático de cuota mensual fija (Fórmula francesa).
   - Generación de tabla de cronograma mensual (Cuota, Vencimiento, Interés, Capital, Saldo).
   - Botón de impresión limpia de cronograma optimizado con `@media print`.

3. **Formulario Digital de Solicitud:**
   - Pre-carga automática de montos calculados en el simulador.
   - Validación de datos personales, laborales, ingresos y canal preferido.
   - Generación de código único de seguimiento (`MPD-2026-XXXX`).
   - Botón directo de enlace a WhatsApp con el código de trámite prellenado.

4. **Portal de Seguimiento y Consulta:**
   - Búsqueda por código de solicitud o cédula de identidad.
   - Visualización de porcentaje de avance, cuotas pagadas vs pendientes.
   - Incluye botón para cargar un caso de prueba activo en demostración (`MPD-2026-DEMO`).
