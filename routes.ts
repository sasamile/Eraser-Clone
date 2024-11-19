/**
 * Rutas y configuraciones de autenticación
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
export const DEFAULT_AUTH_REDIRECT = "/auth/sign-in";

// Rutas públicas (accesibles sin autenticación)
export const publicRoutes = [
    "/",
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/error",
    "/api/auth/*"  
];


// Rutas de autenticación (para manejo de redirecciones)
export const authRoutes = [
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/error"
];

// Prefijos para rutas API
export const apiAuthPrefix = "/api/auth";
export const apiPrefix = "/api";