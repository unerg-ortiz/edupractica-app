# Edupractica App - Guía para Agentes

Este documento sirve como guía para agentes de IA que trabajan en este proyecto.

## Resumen del Proyecto
Edupractica es una aplicación Next.js moderna con soporte para internacionalización.

## Tecnologías
- **Framework**: Next.js 15+ (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4, Material Tailwind
- **Estado**: Zustand
- **Validación**: Zod
- **i18n**: Enrutamiento dinámico `[lang]`

## Ubicación de Archivos Generados por IA
> [!NOTE]
> Para mantener limpio el código fuente, sigue estas reglas estrictas para archivos generados por IA:

- **Pruebas y Tests**: Todo código generado únicamente para pruebas debe ir en `.vibe/tests/`. Si el directorio no existe, CRÉALO.
- **Documentación**: Documentos, notas o explicaciones extendidas generadas van en `.vibe/docs/`.
- **Otros**: Cualquier archivo que no sea parte del producto final debe ubicarse dentro de `.vibe/`.
- **Excepción**: Los archivos de implementación real (features, bugfixes) sí van en su estructura correspondiente (`app/`, `components/`, etc).

## Estructura de Directorios
- `app/[lang]/`: Rutas de la aplicación localizadas.
- `components/`: Componentes reutilizables.
- `hooks/`: Lógica de negocio y ViewModels (Conexión con Backend).
- `services/`: Llamadas directas a API (Axios/Fetch).
- `store/`: Gestión de estado con Zustand.
- `dictionaries/`: Archivos de traducción.

## Patrón de Diseño (MVVM)
Se utiliza el patrón **Model-View-ViewModel** donde:
- **View**: Componentes React en `app/` y `components/`.
- **ViewModel**: Custom Hooks en `hooks/` que manejan la lógica y el estado.
- **Model**: Definiciones en `types/` y servicios en `services/`.

## Reglas de Desarrollo
> [!IMPORTANT]
> **El código debe estar en INGLÉS.**
> Aunque la documentación esté en español, todas las variables, funciones, comentarios y commits deben ser en inglés.
>
> **La comunicación (Chat) debe ser en ESPAÑOL.**
> Todas las respuestas, explicaciones y comunicaciones con el usuario a través del chat deben realizarse en español, a menos que se solicite explícitamente lo contrario.

## Comandos
- `npm run dev`: Iniciar servidor de desarrollo.
- `npm run build`: Construir para producción.
- `npm run lint`: Verificar calidad de código.

## Reglas de Implementación de Features

Cuando se te pida implementar una nueva funcionalidad (feature), sigue estos pasos estrictos:

1. **Análisis y Diseño**:
   - Revisa la documentación existente (`docs/`) para entender el contexto.
   - Si es necesario, crea un documento de diseño en `.vibe/docs/` con el título `design-feature-nombre.md`.
   - Define los componentes, hooks y servicios necesarios.

2. **Implementación**:
   - Crea los archivos en su ubicación correcta (`app/`, `components/`, `hooks/`, `services/`).
   - **IMPORTANTE**: Todo el código debe estar en **INGLÉS** (variables, funciones, comentarios).
   - Sigue el patrón MVVM establecido.

3. **Pruebas**:
   - Crea los archivos de prueba en `.vibe/tests/`.
   - Escribe pruebas unitarias para los nuevos hooks y servicios.
   - Si es necesario, crea componentes de prueba en `.vibe/tests/components/`.

4. **Documentación**:
   - Actualiza la documentación relevante en `docs/` si es necesario.
   - Asegúrate de que los archivos en `.vibe/docs/` estén actualizados.

5. **Revisión**:
   - Verifica que el código cumpla con las reglas de linting (`npm run lint`).
   - Asegúrate de que todas las pruebas pasen (`npm run test`).
   - Verifica que la aplicación funcione correctamente (`npm run dev`).

