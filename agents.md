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

## Estructura de Directorios
- `app/[lang]/`: Rutas de la aplicación localizadas.
- `components/`: Componentes reutilizables.
- `hooks/`: Lógica de negocio y ViewModels (Conexión con Backend).
- `services/`: Llamadas directas a API (Axios/Fetch).
- `store/`: Gestión de estado con Zustand.
- `dictionaries/`: Archivos e traducción.

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
> **Restricción de Directorio**:
> El directorio `c:\Users\Zbook\Documents\workspaces\edupractica\edupractica-api` es **SOLO LECTURA**. No se deben realizar modificaciones en este directorio bajo ninguna circunstancia.

## Comandos
- `npm run dev`: Iniciar servidor de desarrollo.
- `npm run build`: Construir para producción.
- `npm run lint`: Verificar calidad de código.
