# Verisure Smart-Twin — MVP Académico Funcional

> **Prototipo académico no oficial.** No pertenece a Verisure Argentina. No realiza llamadas reales a servicios de emergencia. Creado con fines educativos para la materia *Tendencias Tecnológicas*.

---

## Descripción

**Verisure Smart-Twin** simula un orquestador multimodal predictivo para una Central Receptora de Alarmas (CRA). El sistema combina vectores visuales, auditivos, sensoriales IoT, conectividad y franja horaria para calcular un **Risk Score** determinístico y clasificar eventos como:

| Color | Score | Diagnóstico |
|-------|-------|-------------|
| 🟢 Verde  | 0–25  | Falsa alarma filtrada |
| 🟡 Amarillo | 26–59 | Revisión humana requerida |
| 🔴 Rojo | 60–100 | Intrusión crítica verificada |

---

## Stack tecnológico

| Tecnología | Rol |
|---|---|
| React 19 + TypeScript | Framework UI |
| Vite 7 | Bundler / Dev Server |
| Tailwind CSS 3 | Estilos utilitarios |
| Recharts | Gráficos BI (6 tipos) |
| Lucide React | Iconografía |
| localStorage | Persistencia del historial |

---

## Cómo instalar

```bash
npm install
```

## Cómo ejecutar en desarrollo

```bash
npm run dev
```

Abre `http://localhost:5173` en el navegador.

## Cómo compilar para producción

```bash
npm run build
```

---

## Estructura del proyecto

```
src/
├── components/
│   ├── AppShell.tsx          # Layout principal
│   ├── Header.tsx            # Header con reloj en vivo
│   ├── Sidebar.tsx           # Navegación por tabs
│   ├── KpiCard.tsx           # Tarjeta de KPI con tendencia
│   ├── StatusBadge.tsx       # Badge coloreado por estado
│   ├── RiskGauge.tsx         # Gauge SVG semicircular con aguja
│   ├── EventForm.tsx         # Formulario de vectores + demo buttons
│   ├── AnalysisResult.tsx    # Resultado del análisis completo
│   ├── EventHistoryTable.tsx # Tabla de historial con export
│   ├── JsonPayloadBlock.tsx  # Payload 911 con syntax highlight
│   └── TechCard.tsx          # Tarjeta de tecnología con ícono
├── pages/
│   ├── OperatorPage.tsx      # Pantalla principal CRA
│   ├── BiDashboardPage.tsx   # Dashboard gerencial BI
│   ├── IntelligentTechnologiesPage.tsx # Tecnologías inteligentes Verisure
│   ├── ArchitecturePage.tsx  # Arquitectura tecnológica
│   └── DocumentationPage.tsx # Guía para exposición
├── domain/
│   ├── types.ts              # Tipos TypeScript del dominio
│   └── riskEngine.ts         # Motor de Risk Scoring (función pura)
├── data/
│   ├── demoScenarios.ts      # Escenarios de demo + opciones
│   └── mockEvents.ts         # 10 eventos históricos base
└── utils/
    ├── formatters.ts         # Formateo ARS, tiempo, clipboard
    └── storage.ts            # Persistencia localStorage
```

---

## Funcionalidades principales

### Operador CRA
- 6 selectores de vectores (visual, auditivo, sensorial IoT, conectividad, franja horaria, cámara térmica)
- **5 botones de demo rápido** con colores diferenciados (Verde/Amarillo/Rojo/ZeroVision/Agro)
- Motor de Risk Scoring con reglas determinísticas y explicables
- Gauge SVG semicircular con aguja animada
- Desglose de puntaje por vector con mini-barras
- Payload 911 simulado en alertas rojas (con copia al portapapeles)
- Modo Hand-off sensorial (ZeroVision + humo)
- Toast notifications por cada tipo de alerta
- Historial de eventos con exportación JSON y persistencia localStorage

### Dashboard BI Gerencial
- 8 KPIs en tiempo real (falsas alarmas, despachos, ahorro, hand-offs, etc.)
- 6 gráficos con Recharts: barras (zona), donut (estado), líneas (evolución), barras horizontales (franja), barras (cliente), radial (cliente)
- Datos combinados: 10 eventos históricos base + eventos de la sesión actual
- 3 insight pills gerenciales al pie

### Tecnologías Inteligentes Verisure
- Chatbot funcional **Asistente IA de Soporte Verisure 360°** con formulario, consultas rápidas, clasificación automática, prioridad, tickets, derivación humana, cierre, satisfacción y métricas dinámicas.
- Dashboard **Bienestar Seguro Verisure** con empleados simulados, sincronización de reloj inteligente, alertas de salud laboral, recomendaciones, revisión e informes anonimizados para RR. HH., Obra Social y ART.
- Simulación **Automatización RPA** con pasos que cambian de estado, ejecución/reintento del bot, informe simulado, contadores y log de procesos.
- Panel **Ciberseguridad y Protección de Datos** con checklist interactivo, cálculo de riesgo, simulación de incidentes y registro de eventos sensibles.
- Gestión **BYOD** con formulario controlado, evaluación automática, estados de acceso, revocación, borrado remoto selectivo y bloqueo visual de módulos críticos para dispositivos no aprobados.
- Integraciones simuladas entre módulos: tickets por alarma manipulada, alertas IoT enviadas a RPA, eventos RPA/BYOD registrados en ciberseguridad y efecto de MFA sobre riesgo BYOD.

### Arquitectura Tecnológica
- Flujo de 6 pasos con íconos y colores por etapa
- 9 TechCards con íconos Lucide, uso y beneficio operativo
- Paneles de ciberseguridad y límites del MVP

### Documentación Demo
- Guión de 6 pasos para la exposición
- 6 secciones temáticas (problema, solución, qué simula, qué no hace, relación con materia, ley 25.326)
- Checklist de compromisos éticos
- Disclaimer académico prominente

---

## Casos demo recomendados

| Demo | Escenario | Resultado esperado |
|------|-----------|-------------------|
| 🟢 Verde | Mascota + ladrido | Score bajo, falsa alarma filtrada, ahorro operativo |
| 🟡 Amarillo | Persona desconocida + movimiento nocturno | Score medio, revisión humana |
| 🔴 Rojo | Arma visible + rotura de cristal | Score forzado ≥82, payload 911 generado |
| 🔵 ZeroVision | Humo + Hand-off sensorial | Modo hand-off + cámara térmica |
| 🟠 Agro | Sensor rural LoRaWAN + señal inhibida | Ajuste rural aplicado |

---

## Aclaración académica

Este proyecto fue desarrollado como MVP académico para la materia **Tendencias Tecnológicas**. No representa un producto oficial de Verisure Argentina ni de ninguna de sus empresas vinculadas. Todos los eventos, scores, datos y payloads son completamente simulados con propósitos educativos.

**Cumplimiento ético:** sin imágenes reales, sin reconocimiento facial, sin datos biométricos, sin conexión a servicios de emergencia, sin autenticación real. En un escenario productivo real se requeriría cumplimiento de la Ley 25.326 de Protección de Datos Personales (Argentina).
