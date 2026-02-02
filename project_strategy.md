# ESTRATEGIA DE EJECUCIÓN TECNOLÓGICA: PORTAL DIGITAL NOTARÍA 13 DE CALI (2026)

**Autor:** Dirección de Proyecto y Arquitectura de Soluciones  
**Versión:** 1.0.0  
**Enfoque:** Ingeniería de Sistemas Modulares y Diseño Atómico

---

## 1. VISIÓN DEL PROYECTO
Este desarrollo trasciende la creación de una página web convencional. Estamos construyendo una **plataforma de ingeniería modular** diseñada para garantizar la estabilidad institucional, la escalabilidad técnica y una experiencia de usuario (UX) que proyecte confianza jurídica al ciudadano de Cali.

La estabilidad no es una característica, es nuestro activo de marca más valioso.

---

## 2. ARQUITECTURA: ATOMIC DESIGN
Hemos adoptado **Atomic Design** para pasar de un desarrollo monolítico a un sistema de componentes vivos. Esto asegura consistencia visual y facilita el mantenimiento a largo plazo.

### 2.1 Estructura del Sistema
*   **Átomos (Atoms):** Bloques indivisibles y abstractos.
    *   *Ejemplos:* `Button` (Acciones legales), `Badge` (Estados de trámites), `Icon` (Simbología institucional).
    *   *Ubicación:* `components/atoms/`
*   **Moléculas (Molecules):** Agrupaciones funcionales de átomos.
    *   *Ejemplos:* `TramiteCard` (Combina Badge, Typography, Button y Layout), `SearchInput` (Input + Icono).
    *   *Ubicación:* `components/molecules/`
*   **Organismos (Organisms):** Secciones complejas y autónomas de la interfaz.
    *   *Ejemplos:* `Navbar` (Navegación principal), `Footer` (Información legal y sellos), `Hero` (Bienvenida e impacto).
    *   *Ubicación:* `components/organisms/`
*   **Plantillas y Vistas (Templates/Views):** Orquestación de organismos para formar páginas.
    *   *Ejemplos:* `HomeView`, `TramitesView`.
    *   *Ubicación:* `views/`

---

## 3. HOJA DE RUTA DE DESARROLLO (ROADMAP)

### Fase 1: Cimientos (Meses 1-3) - **ESTADO ACTUAL**
*   **Objetivo:** Definición de arquitectura base y "Fuente Única de Verdad".
*   **Hitos:**
    *   Implementación de Design Tokens (Colores: `brand-primary`, `brand-dark`).
    *   Estructuración del repositorio bajo Atomic Design.
    *   Creación de componentes base (`Button`, `LiquidCard`).

### Fase 2: Modularidad y Trámites (Meses 4-8)
*   **Objetivo:** Despliegue de lógica de negocio compleja.
*   **Hitos:**
    *   Módulos independientes para Escrituración y Registro Civil.
    *   Implementación de Visual Regression Testing (VRT).
    *   Filtros avanzados y lógica de búsqueda (Ya iniciado en `TramitesView`).

### Fase 3: Optimización y Escala (Meses 9-18)
*   **Objetivo:** Inteligencia y Rendimiento extremo.
*   **Hitos:**
    *   Integración de Asistente IA para consultas ciudadanas.
    *   Edge Rendering para tiempos de carga < 1s.

---

## 4. PROTOCOLO DE CALIDAD (QA) Y GOBERNANZA

### 4.1 Handoff Automatizado
Eliminamos la "deriva de diseño" (Design Drift) asegurando que el código refleje exactamente las especificaciones visuales mediante el uso estricto de variables CSS y componentes tipados en TypeScript.

### 4.2 Métricas de Éxito (KPIs Técnicos)
1.  **Tasa de Reutilización (>80%):** El desarrollo de nuevas vistas debe basarse mayoritariamente en componentes existentes en `components/`.
2.  **Integridad Visual (<2% Regresión):** Cambios en un átomo no deben romper organismos complejos.
3.  **Performance (Core Web Vitals 2026):**
    *   LCP < 2.5s (Uso de `fetchpriority="high"` en Hero).
    *   CLS < 0.1 (Dimensiones explícitas en contenedores).

### 4.3 Accesibilidad Universal
Cumplimiento estricto de WCAG 2.2 AA.
*   Herramienta de accesibilidad integrada (`AccessibilityTool.tsx`).
*   Modos de alto contraste y dislexia nativos.
*   Semántica HTML rigurosa.

---

## 5. CONTEXTO LOCAL Y DEUDA TÉCNICA
*   **Identidad Caleña:** La interfaz debe ser cálida pero sobria, reflejando la eficiencia de una notaría moderna en el Valle del Cauca.
*   **Gestión de Deuda:** Se asignará un 20% de cada sprint a refactorización y actualización de documentación de componentes para evitar que el sistema se vuelva obsoleto.

---

*Este documento debe ser revisado trimestralmente por el equipo de arquitectura.*
