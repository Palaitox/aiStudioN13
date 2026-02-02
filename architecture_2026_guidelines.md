# ARQUITECTURA DE INTERFACES Y RENDIMIENTO 2026: NOTARÍA 13 DE CALI

**Rol:** Arquitecto Senior de Interfaces y Rendimiento  
**Versión:** 1.0.0 (Estándar 2026)  
**Objetivo:** Diseñar una plataforma visualmente impactante, éticamente responsable y optimizada para el futuro del internet.

---

## 1. FILOSOFÍA DE EXPERIENCIA (UX): LA INTERFAZ SENTIENTE
En 2026, la web de la Notaría no es estática; "siente" y se adapta. La interacción trasciende el clic.

### 1.1 Multimodalidad Fluida
El ciudadano caleño no siempre puede escribir. La plataforma debe soportar nativamente:
*   **Voz:** Navegación por comandos de voz para adultos mayores o personas con discapacidad motora ("Buscar requisitos para matrimonio").
*   **Gestos:** Interacciones táctiles avanzadas en móviles (deslizar para firmar digitalmente, pellizcar para inspeccionar planos).

### 1.2 Adaptación Emocional (Micro-interacciones)
La interfaz debe responder al contexto:
*   **Trámites de duelo (Sucesiones):** La interfaz atenúa automáticamente la saturación de colores, reduce las animaciones y prioriza la claridad textual.
*   **Trámites de celebración (Matrimonios):** La interfaz utiliza el estilo "Liquid Glass" con mayor brillo y animaciones fluidas (confeti sutil en SVG) al completar el registro.

### 1.3 Hiper-personalización IA
El layout no es rígido. Mediante Edge Computing e IA local:
*   Si el usuario visita frecuentemente "Autenticaciones", ese módulo se promueve automáticamente al "Hero" en su próxima visita.
*   Detección de dispositivo y contexto: Si la batería es baja (<20%), la web cambia automáticamente a "Modo Eco" (sin transparencias pesadas, contraste alto).

---

## 2. ESTÉTICA VISUAL: LIQUID GLASS INSTITUCIONAL
Abandonamos el "Material Design" plano por una estética de profundidad y refracción que denota transparencia institucional.

*   **Liquid Glass:** Uso de `backdrop-filter: blur()` multicapa, bordes con gradientes de luz (bordes de vidrio) y sombras de colores difusos para dar volumen sin peso visual.
*   **Minimalismo Funcional:** Reducción de ruido cognitivo. Solo se muestra lo esencial. Los menús complejos se revelan progresivamente (Disclosure Pattern).
*   **Movimiento:** Animaciones físicas (`spring physics`) que dan peso y realidad a los elementos digitales. Nada aparece de la nada; todo fluye.

---

## 3. INGENIERÍA DE RENDIMIENTO (CORE WEB VITALS 2026)
La velocidad es inclusión. Un sitio lento es discriminatorio.

### 3.1 LCP (Largest Contentful Paint) < 2.5s
*   **Estrategia:** El "Hero" es sagrado.
    *   Uso estricto de `fetchpriority="high"` en la imagen principal.
    *   Inlining de CSS crítico para el primer pantallazo.
    *   **Prohibido:** Lazy loading en elementos "Above the fold".
    *   Formato de imagen: AVIF con fallback a WebP.

### 3.2 INP (Interaction to Next Paint) < 200 ms
La métrica reina de la interactividad.
*   **Desglose de Tareas:** Ninguna tarea de JavaScript en el hilo principal puede durar más de 50ms (Long Tasks). Usar `scheduler.yield()` o `setTimeout` para romper procesos largos.
*   **Hidratación Selectiva:** Solo hidratar componentes cuando el usuario interactúa o están visibles (Interaction-driven hydration).

### 3.3 CLS (Cumulative Layout Shift) < 0.1
Estabilidad visual absoluta.
*   **Dimensiones Explícitas:** Todas las imágenes, iframes y contenedores dinámicos (como anuncios o widgets) deben tener `width`, `height` o `aspect-ratio` definidos en CSS antes de cargar el contenido.
*   **Skeleton Screens:** Uso de esqueletos animados del mismo tamaño exacto que el contenido final.

---

## 4. ARQUITECTURA Y TECNOLOGÍA
El código debe ser tan moderno como el diseño.

### 4.1 Estrategia de Hidratación: Arquitectura de Islas
Para combatir el exceso de JavaScript:
*   **Concepto:** El sitio es HTML estático por defecto (océano).
*   **Islas:** Solo los componentes interactivos (Buscador, Formulario PQRSD, Calculadora Notarial) son "islas" que cargan JS.
*   **Implementación:** Si usamos React, debe ser bajo un marco que soporte Server Components (RSC) o hidratación parcial.

### 4.2 Stack Tecnológico Sugerido
*   **Framework:** React 19+ (con React Compiler activado para memoización automática, eliminando `useMemo` y `useCallback` manuales).
*   **Meta-framework:** Astro (ideal para contenido estático con islas de React) o Next.js (con App Router y RSC).
*   **CSS Moderno:**
    *   **Container Queries:** Los componentes se adaptan a su contenedor, no a la pantalla. Esto permite portabilidad total.
    *   **Cascade Layers (`@layer`):** Organización de estilos en capas (Reset, Base, Theme, Utilities) para evitar guerras de especificidad (`!important` está prohibido).

---

## 5. CUMPLIMIENTO, ÉTICA Y SOSTENIBILIDAD
La tecnología al servicio de la humanidad y el planeta.

### 5.1 Accesibilidad Universal (Mandatorio WCAG 2.2 AA)
No es opcional, es la ley y nuestro deber ético.
*   **Semántica:** HTML5 perfecto (`<nav>`, `<main>`, `<article>`, `<button>` vs `<a>`).
*   **Navegación por Teclado:** Focus visible y lógico en todos los elementos interactivos.
*   **Contraste:** Mínimo 4.5:1 para texto normal.
*   **Pruebas:** Auditorías automatizadas en CI/CD (Axe Core) + pruebas manuales con lectores de pantalla (NVDA, VoiceOver).

### 5.2 Sostenibilidad Digital
Reducir la huella de carbono digital de la Notaría 13.
*   **Datos Ligeros:** Compresión agresiva de activos (Brotli/Zstd).
*   **Dark Mode por Defecto:** En pantallas OLED ahorra energía.
*   **Caching Inteligente:** Estrategias `Stale-While-Revalidate` para evitar peticiones de red innecesarias a la base de datos.
*   **Green Hosting:** Preferencia por servidores alimentados por energías renovables.

---

## ENTREGABLES TÉCNICOS INMEDIATOS
1.  **Design System (Atomic):** Implementar tokens de diseño en CSS Layers.
2.  **Auditoría Lighthouse/Web Vitals:** Establecer línea base actual y meta.
3.  **Refactorización de Componentes:** Migrar componentes pesados a islas interactivas.
