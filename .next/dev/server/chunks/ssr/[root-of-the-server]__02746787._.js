module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Documents/v0-erp-obra-principal-verce/lib/auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Tipos de usuário e funções de autenticação mock
__turbopack_context__.s([
    "DEFAULT_USER",
    ()=>DEFAULT_USER,
    "authenticateUser",
    ()=>authenticateUser,
    "clearStoredAuth",
    ()=>clearStoredAuth,
    "getStoredAuth",
    ()=>getStoredAuth,
    "setStoredAuth",
    ()=>setStoredAuth
]);
// Mock de usuários para desenvolvimento
const MOCK_USERS = {
    "admin@genesis.com": {
        password: "admin123",
        user: {
            id: "1",
            name: "Administrador",
            email: "admin@genesis.com",
            role: "admin"
        }
    },
    "gerente@genesis.com": {
        password: "gerente123",
        user: {
            id: "2",
            name: "Gerente de Obra",
            email: "gerente@genesis.com",
            role: "gerente"
        }
    },
    "engenheiro@genesis.com": {
        password: "eng123",
        user: {
            id: "3",
            name: "Engenheiro",
            email: "engenheiro@genesis.com",
            role: "engenheiro"
        }
    }
};
async function authenticateUser(email, password) {
    // Simula delay de rede
    await new Promise((resolve)=>setTimeout(resolve, 500));
    const userData = MOCK_USERS[email];
    if (userData && userData.password === password) {
        return userData.user;
    }
    return null;
}
function getStoredAuth() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
    const stored = undefined;
}
function setStoredAuth(user, token) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function clearStoredAuth() {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
const DEFAULT_USER = {
    id: "1",
    name: "Administrador",
    email: "admin@genesis.com",
    role: "admin"
};
}),
"[project]/Documents/v0-erp-obra-principal-verce/contexts/auth-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/lib/auth.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_USER"]);
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const login = async (email, password)=>{
        // Login sempre retorna true em modo desenvolvimento
        setUser(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_USER"]);
        setIsAuthenticated(true);
        return true;
    };
    const logout = ()=>{
    // Logout desabilitado em modo desenvolvimento
    // setUser(null)
    // setIsAuthenticated(false)
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            isAuthenticated,
            isLoading,
            login,
            logout
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/contexts/auth-context.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
}),
"[project]/Documents/v0-erp-obra-principal-verce/contexts/theme-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "colorThemeDescriptions",
    ()=>colorThemeDescriptions,
    "colorThemeNames",
    ()=>colorThemeNames,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const colorThemeNames = {
    aahbrant: "Aahbrant (Padrao)",
    mono: "Monocromatico",
    acro: "Acromatico",
    dourado: "Aahbrant Dourado"
};
const colorThemeDescriptions = {
    aahbrant: "Vermelho institucional com tons neutros - identidade visual padrao",
    mono: "Cinzas com subtom azulado frio - visual elegante e moderno",
    acro: "Preto e branco puro - contraste maximo e minimalista",
    dourado: "Vermelho Marsala com acentos dourados - visual premium"
};
function getStoredValue(key, fallback) {
    if ("TURBOPACK compile-time truthy", 1) return fallback;
    //TURBOPACK unreachable
    ;
}
function setStoredValue(key, value) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function ThemeProvider({ children }) {
    const [theme, setThemeState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("light");
    const [colorTheme, setColorThemeState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("aahbrant");
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const applyTheme = (newTheme, newColorTheme)=>{
        if (typeof document === "undefined") return;
        try {
            const root = document.documentElement;
            // Remove todas as classes de tema
            root.classList.remove("light", "dark");
            document.body.classList.remove("light", "dark");
            root.classList.remove("color-aahbrant", "color-mono", "color-acro", "color-dourado");
            document.body.classList.remove("color-aahbrant", "color-mono", "color-acro", "color-dourado");
            // Adiciona a classe do tema atual
            root.classList.add(newTheme);
            document.body.classList.add(newTheme);
            // Adiciona a classe de cor (se nao for aahbrant - padrao)
            if (newColorTheme !== "aahbrant") {
                root.classList.add(`color-${newColorTheme}`);
                document.body.classList.add(`color-${newColorTheme}`);
            }
            // Define o atributo data-theme para compatibilidade
            root.setAttribute("data-theme", newTheme);
            root.setAttribute("data-color-theme", newColorTheme);
            // Define color-scheme para elementos nativos do browser
            root.style.colorScheme = newTheme;
            // Salva no localStorage
            setStoredValue("genesis-theme", newTheme);
            setStoredValue("genesis-color-theme", newColorTheme);
        } catch  {
        // Ignora erros de DOM
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const storedTheme = getStoredValue("genesis-theme", "");
            const storedColorTheme = getStoredValue("genesis-color-theme", "");
            // Verifica preferencia do sistema
            const prefersDark = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : false;
            const initialTheme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "light";
            const validColorThemes = [
                "aahbrant",
                "mono",
                "acro",
                "dourado"
            ];
            const initialColorTheme = validColorThemes.includes(storedColorTheme) ? storedColorTheme : "aahbrant";
            setThemeState(initialTheme);
            setColorThemeState(initialColorTheme);
            applyTheme(initialTheme, initialColorTheme);
        } catch  {
            // Fallback para valores padrao em caso de erro
            setThemeState("light");
            setColorThemeState("aahbrant");
        }
        setMounted(true);
    }, []);
    const setTheme = (newTheme)=>{
        setThemeState(newTheme);
        applyTheme(newTheme, colorTheme);
    };
    const setColorTheme = (newColorTheme)=>{
        setColorThemeState(newColorTheme);
        applyTheme(theme, newColorTheme);
    };
    const toggleTheme = ()=>{
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };
    // Os valores do contexto serao atualizados apos montagem
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            colorTheme,
            setTheme,
            setColorTheme,
            toggleTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/contexts/theme-context.tsx",
        lineNumber: 139,
        columnNumber: 5
    }, this);
}
function useTheme() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
}),
"[project]/Documents/v0-erp-obra-principal-verce/contexts/language-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const translations = {
    "pt-BR": {
        "status.available": "Disponivel",
        "status.busy": "Ocupado",
        "status.away": "Ausente",
        "status.dnd": "Nao Perturbe",
        "menu.profile": "Meu Perfil",
        "menu.settings": "Configuracoes",
        "menu.privacy": "Privacidade e Seguranca",
        "menu.display": "Display",
        "menu.theme": "Tema",
        "menu.language": "Idioma",
        "menu.logout": "Sair do Sistema",
        "language.pt": "Portugues (Brasil)",
        "language.en": "Ingles",
        "language.es": "Espanhol",
        notifications: "Notificacoes",
        "notifications.viewAll": "Ver todas as notificacoes"
    },
    en: {
        "status.available": "Available",
        "status.busy": "Busy",
        "status.away": "Away",
        "status.dnd": "Do Not Disturb",
        "menu.profile": "My Profile",
        "menu.settings": "Settings",
        "menu.privacy": "Privacy and Security",
        "menu.display": "Display",
        "menu.theme": "Theme",
        "menu.language": "Language",
        "menu.logout": "Log Out",
        "language.pt": "Portuguese (Brazil)",
        "language.en": "English",
        "language.es": "Spanish",
        notifications: "Notifications",
        "notifications.viewAll": "View all notifications"
    },
    es: {
        "status.available": "Disponible",
        "status.busy": "Ocupado",
        "status.away": "Ausente",
        "status.dnd": "No Molestar",
        "menu.profile": "Mi Perfil",
        "menu.settings": "Configuraciones",
        "menu.privacy": "Privacidad y Seguridad",
        "menu.display": "Pantalla",
        "menu.theme": "Tema",
        "menu.language": "Idioma",
        "menu.logout": "Cerrar Sesion",
        "language.pt": "Portugues (Brasil)",
        "language.en": "Ingles",
        "language.es": "Espanol",
        notifications: "Notificaciones",
        "notifications.viewAll": "Ver todas las notificaciones"
    }
};
const defaultValue = {
    language: "pt-BR",
    setLanguage: ()=>{},
    t: (key)=>translations["pt-BR"][key] || key
};
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(defaultValue);
function LanguageProvider({ children }) {
    const [language, setLanguageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("pt-BR");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const stored = localStorage.getItem("genesis-language");
            if (stored && [
                "pt-BR",
                "en",
                "es"
            ].includes(stored)) {
                setLanguageState(stored);
            }
        } catch (e) {
            console.error("Error accessing localStorage:", e);
        }
    }, []);
    const setLanguage = (newLanguage)=>{
        setLanguageState(newLanguage);
        try {
            localStorage.setItem("genesis-language", newLanguage);
        } catch (e) {
            console.error("Error saving to localStorage:", e);
        }
    };
    const t = (key)=>{
        return translations[language][key] || key;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            language,
            setLanguage,
            t
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/contexts/language-context.tsx",
        lineNumber: 105,
        columnNumber: 10
    }, this);
}
function useLanguage() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    return context;
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__02746787._.js.map