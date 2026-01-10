(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/v0-erp-obra-principal-verce/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/lib/utils.ts [app-client] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Card;
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('leading-none font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c2 = CardTitle;
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c3 = CardDescription;
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c4 = CardAction;
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c5 = CardContent;
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center px-6 [.border-t]:pt-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_c6 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardAction");
__turbopack_context__.k.register(_c5, "CardContent");
__turbopack_context__.k.register(_c6, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/v0-erp-obra-principal-verce/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/lib/utils.ts [app-client] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]', 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Input;
;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/v0-erp-obra-principal-verce/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])('inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden', {
    variants: {
        variant: {
            default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
            secondary: 'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
            destructive: 'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
function Badge({ className, variant, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : 'span';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "badge",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/badge.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/v0-erp-obra-principal-verce/components/ui/tabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tabs",
    ()=>Tabs,
    "TabsContent",
    ()=>TabsContent,
    "TabsList",
    ()=>TabsList,
    "TabsTrigger",
    ()=>TabsTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/@radix-ui/react-tabs/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
function Tabs({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "tabs",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col gap-2', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/tabs.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Tabs;
function TabsList({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["List"], {
        "data-slot": "tabs-list",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/tabs.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c1 = TabsList;
function TabsTrigger({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "tabs-trigger",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/tabs.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_c2 = TabsTrigger;
function TabsContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
        "data-slot": "tabs-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex-1 outline-none', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/tabs.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c3 = TabsContent;
;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Tabs");
__turbopack_context__.k.register(_c1, "TabsList");
__turbopack_context__.k.register(_c2, "TabsTrigger");
__turbopack_context__.k.register(_c3, "TabsContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/v0-erp-obra-principal-verce/components/ui/table.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Table",
    ()=>Table,
    "TableBody",
    ()=>TableBody,
    "TableCaption",
    ()=>TableCaption,
    "TableCell",
    ()=>TableCell,
    "TableFooter",
    ()=>TableFooter,
    "TableHead",
    ()=>TableHead,
    "TableHeader",
    ()=>TableHeader,
    "TableRow",
    ()=>TableRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
function Table({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "table-container",
        className: "relative w-full overflow-x-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            "data-slot": "table",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-full caption-bottom text-sm', className),
            ...props
        }, void 0, false, {
            fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/table.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/table.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = Table;
function TableHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
        "data-slot": "table-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('[&_tr]:border-b', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/table.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_c1 = TableHeader;
function TableBody({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
        "data-slot": "table-body",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('[&_tr:last-child]:border-0', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/table.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_c2 = TableBody;
function TableFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
        "data-slot": "table-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/table.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_c3 = TableFooter;
function TableRow({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        "data-slot": "table-row",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/table.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_c4 = TableRow;
function TableHead({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
        "data-slot": "table-head",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/table.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_c5 = TableHead;
function TableCell({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
        "data-slot": "table-cell",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/table.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
_c6 = TableCell;
function TableCaption({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("caption", {
        "data-slot": "table-caption",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground mt-4 text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/table.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
_c7 = TableCaption;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "Table");
__turbopack_context__.k.register(_c1, "TableHeader");
__turbopack_context__.k.register(_c2, "TableBody");
__turbopack_context__.k.register(_c3, "TableFooter");
__turbopack_context__.k.register(_c4, "TableRow");
__turbopack_context__.k.register(_c5, "TableHead");
__turbopack_context__.k.register(_c6, "TableCell");
__turbopack_context__.k.register(_c7, "TableCaption");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/v0-erp-obra-principal-verce/components/ui/checkbox.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Checkbox",
    ()=>Checkbox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/@radix-ui/react-checkbox/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function Checkbox({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "checkbox",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Indicator"], {
            "data-slot": "checkbox-indicator",
            className: "flex items-center justify-center text-current transition-none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                className: "size-3.5"
            }, void 0, false, {
                fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/checkbox.tsx",
                lineNumber: 26,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/checkbox.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/checkbox.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = Checkbox;
;
var _c;
__turbopack_context__.k.register(_c, "Checkbox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/v0-erp-obra-principal-verce/components/ui/radio-group.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RadioGroup",
    ()=>RadioGroup,
    "RadioGroupItem",
    ()=>RadioGroupItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$radio$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/@radix-ui/react-radio-group/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleIcon$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as CircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function RadioGroup({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$radio$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "radio-group",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('grid gap-3', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/radio-group.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = RadioGroup;
function RadioGroupItem({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$radio$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "radio-group-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$radio$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Indicator"], {
            "data-slot": "radio-group-indicator",
            className: "relative flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleIcon$3e$__["CircleIcon"], {
                className: "fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2"
            }, void 0, false, {
                fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/radio-group.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/radio-group.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/radio-group.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c1 = RadioGroupItem;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "RadioGroup");
__turbopack_context__.k.register(_c1, "RadioGroupItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/v0-erp-obra-principal-verce/components/ui/label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
function Label({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Label;
;
var _c;
__turbopack_context__.k.register(_c, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select,
    "SelectContent",
    ()=>SelectContent,
    "SelectGroup",
    ()=>SelectGroup,
    "SelectItem",
    ()=>SelectItem,
    "SelectLabel",
    ()=>SelectLabel,
    "SelectScrollDownButton",
    ()=>SelectScrollDownButton,
    "SelectScrollUpButton",
    ()=>SelectScrollUpButton,
    "SelectSeparator",
    ()=>SelectSeparator,
    "SelectTrigger",
    ()=>SelectTrigger,
    "SelectValue",
    ()=>SelectValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/@radix-ui/react-select/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function Select({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "select",
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Select;
function SelectGroup({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
        "data-slot": "select-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c1 = SelectGroup;
function SelectValue({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Value"], {
        "data-slot": "select-value",
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c2 = SelectValue;
function SelectTrigger({ className, size = 'default', children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "select-trigger",
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                    className: "size-4 opacity-50"
                }, void 0, false, {
                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c3 = SelectTrigger;
function SelectContent({ className, children, position = 'popper', ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "select-content",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md', position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1', className),
            position: position,
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('p-1', position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_c4 = SelectContent;
function SelectLabel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
        "data-slot": "select-label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground px-2 py-1.5 text-xs', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
_c5 = SelectLabel;
function SelectItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "select-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute right-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemText"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_c6 = SelectItem;
function SelectSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
        "data-slot": "select-separator",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-border pointer-events-none -mx-1 my-1 h-px', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
_c7 = SelectSeparator;
function SelectScrollUpButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
        "data-slot": "select-scroll-up-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex cursor-default items-center justify-center py-1', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__["ChevronUpIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx",
            lineNumber: 151,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
_c8 = SelectScrollUpButton;
function SelectScrollDownButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
        "data-slot": "select-scroll-down-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex cursor-default items-center justify-center py-1', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx",
            lineNumber: 169,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}
_c9 = SelectScrollDownButton;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Select");
__turbopack_context__.k.register(_c1, "SelectGroup");
__turbopack_context__.k.register(_c2, "SelectValue");
__turbopack_context__.k.register(_c3, "SelectTrigger");
__turbopack_context__.k.register(_c4, "SelectContent");
__turbopack_context__.k.register(_c5, "SelectLabel");
__turbopack_context__.k.register(_c6, "SelectItem");
__turbopack_context__.k.register(_c7, "SelectSeparator");
__turbopack_context__.k.register(_c8, "SelectScrollUpButton");
__turbopack_context__.k.register(_c9, "SelectScrollDownButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/v0-erp-obra-principal-verce/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function Dialog({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/dialog.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Dialog;
function DialogTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/dialog.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c1 = DialogTrigger;
function DialogPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/dialog.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c2 = DialogPortal;
function DialogClose({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
        "data-slot": "dialog-close",
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/dialog.tsx",
        lineNumber: 30,
        columnNumber: 10
    }, this);
}
_c3 = DialogClose;
function DialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/dialog.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c4 = DialogOverlay;
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        "data-slot": "dialog-portal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/dialog.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg', className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        "data-slot": "dialog-close",
                        className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/dialog.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/dialog.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/dialog.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/dialog.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/dialog.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c5 = DialogContent;
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col gap-2 text-center sm:text-left', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/dialog.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_c6 = DialogHeader;
function DialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/dialog.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_c7 = DialogFooter;
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-lg leading-none font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/dialog.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_c8 = DialogTitle;
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/dialog.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
_c9 = DialogDescription;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Dialog");
__turbopack_context__.k.register(_c1, "DialogTrigger");
__turbopack_context__.k.register(_c2, "DialogPortal");
__turbopack_context__.k.register(_c3, "DialogClose");
__turbopack_context__.k.register(_c4, "DialogOverlay");
__turbopack_context__.k.register(_c5, "DialogContent");
__turbopack_context__.k.register(_c6, "DialogHeader");
__turbopack_context__.k.register(_c7, "DialogFooter");
__turbopack_context__.k.register(_c8, "DialogTitle");
__turbopack_context__.k.register(_c9, "DialogDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/v0-erp-obra-principal-verce/components/ui/scroll-area.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollArea",
    ()=>ScrollArea,
    "ScrollBar",
    ()=>ScrollBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/@radix-ui/react-scroll-area/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
function ScrollArea({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "scroll-area",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative', className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
                "data-slot": "scroll-area-viewport",
                className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
                children: children
            }, void 0, false, {
                fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/scroll-area.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollBar, {}, void 0, false, {
                fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/scroll-area.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Corner"], {}, void 0, false, {
                fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/scroll-area.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/scroll-area.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = ScrollArea;
function ScrollBar({ className, orientation = 'vertical', ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaScrollbar"], {
        "data-slot": "scroll-area-scrollbar",
        orientation: orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex touch-none p-px transition-colors select-none', orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent', orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaThumb"], {
            "data-slot": "scroll-area-thumb",
            className: "bg-border relative flex-1 rounded-full"
        }, void 0, false, {
            fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/scroll-area.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/scroll-area.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_c1 = ScrollBar;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "ScrollArea");
__turbopack_context__.k.register(_c1, "ScrollBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/v0-erp-obra-principal-verce/components/ui/separator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Separator",
    ()=>Separator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$separator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/@radix-ui/react-separator/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
function Separator({ className, orientation = 'horizontal', decorative = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$separator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "separator",
        decorative: decorative,
        orientation: orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/separator.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = Separator;
;
var _c;
__turbopack_context__.k.register(_c, "Separator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/v0-erp-obra-principal-verce/components/ui/alert.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Alert",
    ()=>Alert,
    "AlertDescription",
    ()=>AlertDescription,
    "AlertTitle",
    ()=>AlertTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const alertVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])('relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current', {
    variants: {
        variant: {
            default: 'bg-card text-card-foreground',
            destructive: 'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
function Alert({ className, variant, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert",
        role: "alert",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(alertVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/alert.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = Alert;
function AlertTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/alert.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_c1 = AlertTitle;
function AlertDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/components/ui/alert.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_c2 = AlertDescription;
;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Alert");
__turbopack_context__.k.register(_c1, "AlertTitle");
__turbopack_context__.k.register(_c2, "AlertDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PerfisPermissoesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/git-branch.js [app-client] (ecmascript) <export default as GitBranch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$compare$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitCompare$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/git-compare.js [app-client] (ecmascript) <export default as GitCompare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileEdit$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/file-pen.js [app-client] (ecmascript) <export default as FileEdit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/crown.js [app-client] (ecmascript) <export default as Crown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/components/ui/tabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/components/ui/table.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/components/ui/checkbox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/components/ui/radio-group.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/components/ui/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/components/ui/scroll-area.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/components/ui/separator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/v0-erp-obra-principal-verce/components/ui/alert.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// Dados de exemplo - Perfis
const perfisData = [
    {
        id: 1,
        nome: "DP – Cadastro de Funcionário",
        departamento: "Recursos Humanos",
        setor: "Departamento Pessoal",
        descricao: "Usuário responsável apenas pelo cadastro e manutenção básica de funcionários.",
        permissoes: 2,
        usuarios: 3,
        ultimaAlteracao: "08/01/2026",
        permissoesDetalhadas: [
            {
                rotina: "RH > Departamento Pessoal > Cadastro de Funcionário",
                acoes: {
                    ver: false,
                    criar: true,
                    editar: true,
                    excluir: false,
                    aprovar: false,
                    cancelar: false,
                    exportar: false
                },
                nivelVisao: "MEU"
            }
        ],
        restricoes: [
            "Folha de Pagamento",
            "Benefícios",
            "Rescisão",
            "Relatórios de RH"
        ],
        resumo: "O usuário vê apenas a tela 'Cadastro de Funcionário'. O menu exibe somente esta opção. O histórico mostra apenas os registros criados por ele."
    },
    {
        id: 2,
        nome: "Suprimentos – Pedido",
        departamento: "Suprimentos",
        setor: "Pedidos",
        descricao: "Usuário responsável pela criação e acompanhamento de pedidos de compra.",
        permissoes: 3,
        usuarios: 5,
        ultimaAlteracao: "07/01/2026",
        permissoesDetalhadas: [
            {
                rotina: "Suprimentos > Pedidos > Pedido",
                acoes: {
                    ver: true,
                    criar: true,
                    editar: true,
                    excluir: false,
                    aprovar: false,
                    cancelar: false,
                    exportar: false
                },
                nivelVisao: "SETOR"
            }
        ],
        restricoes: [
            "Contratos",
            "Cotações",
            "Financeiro",
            "Pagamentos"
        ],
        resumo: "O menu mostra apenas 'Pedidos'. A listagem mostra pedidos do setor. Pedidos acima do limite seguem automaticamente para aprovação."
    },
    {
        id: 3,
        nome: "Comercial – Governante",
        departamento: "Comercial",
        setor: "Governança",
        descricao: "Responsável máximo do departamento comercial, com poder de aprovação.",
        permissoes: 8,
        usuarios: 1,
        ultimaAlteracao: "05/01/2026",
        permissoesDetalhadas: [
            {
                rotina: "Comercial > Propostas",
                acoes: {
                    ver: true,
                    criar: true,
                    editar: true,
                    excluir: false,
                    aprovar: true,
                    cancelar: false,
                    exportar: false
                },
                nivelVisao: "DEPARTAMENTO"
            },
            {
                rotina: "Comercial > Contratos",
                acoes: {
                    ver: true,
                    criar: false,
                    editar: false,
                    excluir: false,
                    aprovar: true,
                    cancelar: false,
                    exportar: false
                },
                nivelVisao: "DEPARTAMENTO"
            },
            {
                rotina: "Comercial > Relatórios",
                acoes: {
                    ver: true,
                    criar: false,
                    editar: false,
                    excluir: false,
                    aprovar: false,
                    cancelar: false,
                    exportar: true
                },
                nivelVisao: "DEPARTAMENTO"
            }
        ],
        restricoes: [],
        resumo: "Atua como aprovador final do departamento. Visualiza tudo do Comercial. Não acessa rotinas de outros departamentos.",
        permissoesEspeciais: [
            "Aprovação automática de solicitações vindas de subordinados",
            "Visualização consolidada do departamento",
            "Recebe todas as solicitações pendentes de aprovação do Comercial"
        ]
    },
    {
        id: 4,
        nome: "Financeiro – Analista",
        departamento: "Financeiro",
        setor: "Contas a Pagar",
        descricao: "Analista financeiro com acesso a contas a pagar e relatórios.",
        permissoes: 5,
        usuarios: 4,
        ultimaAlteracao: "06/01/2026",
        permissoesDetalhadas: [],
        restricoes: [
            "Aprovação de pagamentos",
            "Configurações"
        ],
        resumo: "Acessa rotinas de contas a pagar do setor financeiro."
    }
];
// Dados de exemplo - Governantes
const governantesData = [
    {
        departamento: "Comercial",
        governante: "João Silva",
        email: "joao.comercial@empresa.com"
    },
    {
        departamento: "Suprimentos",
        governante: "Maria Souza",
        email: "maria.suprimentos@empresa.com"
    },
    {
        departamento: "Recursos Humanos",
        governante: "Carlos Lima",
        email: "carlos.rh@empresa.com"
    },
    {
        departamento: "Financeiro",
        governante: "Diretoria",
        email: "diretoria@empresa.com"
    }
];
// Dados de exemplo - Regras de Aprovação
const regrasAprovacao = [
    {
        id: 1,
        tipo: "Pedido de Compra",
        condicao: "Até R$ 5.000",
        aprovador: "Gestor Direto",
        sla: "24h"
    },
    {
        id: 2,
        tipo: "Pedido de Compra",
        condicao: "De R$ 5.001 até R$ 50.000",
        aprovador: "Governante do Departamento (Suprimentos)",
        sla: "48h"
    },
    {
        id: 3,
        tipo: "Pedido de Compra",
        condicao: "Acima de R$ 50.000",
        aprovador: "Diretoria",
        sla: "72h"
    },
    {
        id: 4,
        tipo: "Contrato Comercial",
        condicao: "Qualquer valor",
        aprovador: "Governante do Departamento Comercial",
        sla: "48h"
    }
];
// Árvore de Rotinas
const arvoreRotinas = [
    {
        id: "rh",
        nome: "Recursos Humanos",
        icone: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        filhos: [
            {
                id: "rh-dp",
                nome: "Departamento Pessoal",
                filhos: [
                    {
                        id: "rh-dp-cadastro",
                        nome: "Cadastro de Funcionário",
                        rotina: true
                    },
                    {
                        id: "rh-dp-documentos",
                        nome: "Documentos",
                        rotina: true
                    },
                    {
                        id: "rh-dp-ferias",
                        nome: "Férias",
                        rotina: true
                    },
                    {
                        id: "rh-dp-afastamentos",
                        nome: "Afastamentos",
                        rotina: true
                    }
                ]
            },
            {
                id: "rh-folha",
                nome: "Folha de Pagamento",
                filhos: [
                    {
                        id: "rh-folha-previa",
                        nome: "Prévia de Folha",
                        rotina: true
                    },
                    {
                        id: "rh-folha-fechamento",
                        nome: "Fechamento",
                        rotina: true
                    }
                ]
            },
            {
                id: "rh-beneficios",
                nome: "Benefícios",
                filhos: [
                    {
                        id: "rh-beneficios-vt",
                        nome: "Vale Transporte",
                        rotina: true
                    },
                    {
                        id: "rh-beneficios-va",
                        nome: "Vale Alimentação",
                        rotina: true
                    }
                ]
            }
        ]
    },
    {
        id: "suprimentos",
        nome: "Suprimentos",
        icone: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"],
        filhos: [
            {
                id: "sup-pedidos",
                nome: "Pedidos",
                filhos: [
                    {
                        id: "sup-pedidos-pedido",
                        nome: "Pedido",
                        rotina: true
                    },
                    {
                        id: "sup-pedidos-acompanhamento",
                        nome: "Acompanhamento",
                        rotina: true
                    }
                ]
            },
            {
                id: "sup-cotacoes",
                nome: "Cotações",
                filhos: [
                    {
                        id: "sup-cotacoes-solicitar",
                        nome: "Solicitar Cotação",
                        rotina: true
                    },
                    {
                        id: "sup-cotacoes-comparativo",
                        nome: "Comparativo",
                        rotina: true
                    }
                ]
            },
            {
                id: "sup-contratos",
                nome: "Contratos",
                filhos: [
                    {
                        id: "sup-contratos-lista",
                        nome: "Lista de Contratos",
                        rotina: true
                    }
                ]
            }
        ]
    },
    {
        id: "comercial",
        nome: "Comercial",
        icone: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"],
        filhos: [
            {
                id: "com-propostas",
                nome: "Propostas",
                filhos: [
                    {
                        id: "com-propostas-criar",
                        nome: "Criar Proposta",
                        rotina: true
                    },
                    {
                        id: "com-propostas-lista",
                        nome: "Lista de Propostas",
                        rotina: true
                    }
                ]
            },
            {
                id: "com-contratos",
                nome: "Contratos",
                filhos: [
                    {
                        id: "com-contratos-lista",
                        nome: "Contratos Comerciais",
                        rotina: true
                    }
                ]
            },
            {
                id: "com-relatorios",
                nome: "Relatórios",
                filhos: [
                    {
                        id: "com-relatorios-vendas",
                        nome: "Vendas",
                        rotina: true
                    },
                    {
                        id: "com-relatorios-pipeline",
                        nome: "Pipeline",
                        rotina: true
                    }
                ]
            }
        ]
    },
    {
        id: "financeiro",
        nome: "Financeiro",
        icone: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"],
        filhos: [
            {
                id: "fin-contas-pagar",
                nome: "Contas a Pagar",
                filhos: [
                    {
                        id: "fin-cp-titulos",
                        nome: "Títulos",
                        rotina: true
                    },
                    {
                        id: "fin-cp-pagamentos",
                        nome: "Pagamentos",
                        rotina: true
                    }
                ]
            },
            {
                id: "fin-contas-receber",
                nome: "Contas a Receber",
                filhos: [
                    {
                        id: "fin-cr-titulos",
                        nome: "Títulos",
                        rotina: true
                    },
                    {
                        id: "fin-cr-baixas",
                        nome: "Baixas",
                        rotina: true
                    }
                ]
            }
        ]
    }
];
// Dados de exemplo - Organograma
const organograma = [
    {
        nome: "Diretoria",
        cargo: "Diretor Geral",
        subordinados: [
            {
                nome: "João Silva",
                cargo: "Governante Comercial",
                subordinados: [
                    {
                        nome: "Pedro Santos",
                        cargo: "Analista Comercial",
                        subordinados: []
                    },
                    {
                        nome: "Lucia Ferreira",
                        cargo: "Assistente Comercial",
                        subordinados: []
                    }
                ]
            },
            {
                nome: "Maria Souza",
                cargo: "Governante Suprimentos",
                subordinados: [
                    {
                        nome: "Marcos Pereira",
                        cargo: "Comprador",
                        subordinados: []
                    },
                    {
                        nome: "Ana Costa",
                        cargo: "Auxiliar de Compras",
                        subordinados: []
                    }
                ]
            },
            {
                nome: "Carlos Lima",
                cargo: "Governante RH",
                subordinados: [
                    {
                        nome: "Ana Paula",
                        cargo: "Analista DP",
                        subordinados: []
                    },
                    {
                        nome: "Roberto Alves",
                        cargo: "Assistente RH",
                        subordinados: []
                    }
                ]
            }
        ]
    }
];
// Usuarios para simulação
const usuariosSimulacao = [
    {
        id: 1,
        nome: "Ana Paula",
        perfil: "DP – Cadastro de Funcionário",
        departamento: "RH"
    },
    {
        id: 2,
        nome: "Marcos Pereira",
        perfil: "Suprimentos – Pedido",
        departamento: "Suprimentos"
    },
    {
        id: 3,
        nome: "João Silva",
        perfil: "Comercial – Governante",
        departamento: "Comercial"
    }
];
function PerfisPermissoesPage() {
    _s();
    const [searchPerfil, setSearchPerfil] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [perfilSelecionado, setPerfilSelecionado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rotinaSelecionada, setRotinaSelecionada] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [nodosExpandidos, setNodosExpandidos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        "rh",
        "rh-dp"
    ]);
    const [dialogSimular, setDialogSimular] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [usuarioSimulacao, setUsuarioSimulacao] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [dialogCriarPerfil, setDialogCriarPerfil] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dialogCompararPerfis, setDialogCompararPerfis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [perfilComparar1, setPerfilComparar1] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [perfilComparar2, setPerfilComparar2] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [dialogCriarRegra, setDialogCriarRegra] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Permissões para a rotina selecionada (exemplo)
    const [permissoesRotina, setPermissoesRotina] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        ver: false,
        criar: true,
        editar: true,
        excluir: false,
        aprovar: false,
        cancelar: false,
        exportar: false
    });
    const [nivelVisao, setNivelVisao] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("MEU");
    const toggleNodo = (id)=>{
        setNodosExpandidos((prev)=>prev.includes(id) ? prev.filter((n)=>n !== id) : [
                ...prev,
                id
            ]);
    };
    const renderArvore = (nodos, nivel = 0)=>{
        return nodos.map((nodo)=>{
            const temFilhos = nodo.filhos && nodo.filhos.length > 0;
            const expandido = nodosExpandidos.includes(nodo.id);
            const selecionado = rotinaSelecionada === nodo.id;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex items-center gap-2 py-1.5 px-2 rounded cursor-pointer hover:bg-muted/50 ${selecionado ? "bg-primary/10 text-primary" : ""}`,
                        style: {
                            paddingLeft: `${nivel * 16 + 8}px`
                        },
                        onClick: ()=>{
                            if (temFilhos) {
                                toggleNodo(nodo.id);
                            }
                            if (nodo.rotina) {
                                setRotinaSelecionada(nodo.id);
                            }
                        },
                        children: [
                            temFilhos ? expandido ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                lineNumber: 441,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                lineNumber: 443,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-4"
                            }, void 0, false, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                lineNumber: 446,
                                columnNumber: 15
                            }, this),
                            nodo.icone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(nodo.icone, {
                                className: "h-4 w-4 text-muted-foreground"
                            }, void 0, false, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                lineNumber: 448,
                                columnNumber: 28
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-sm ${nodo.rotina ? "text-foreground" : "font-medium"}`,
                                children: nodo.nome
                            }, void 0, false, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                lineNumber: 449,
                                columnNumber: 13
                            }, this),
                            nodo.rotina && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "outline",
                                className: "ml-auto text-xs",
                                children: "Rotina"
                            }, void 0, false, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                lineNumber: 451,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                        lineNumber: 425,
                        columnNumber: 11
                    }, this),
                    temFilhos && expandido && renderArvore(nodo.filhos, nivel + 1)
                ]
            }, nodo.id, true, {
                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                lineNumber: 424,
                columnNumber: 9
            }, this);
        });
    };
    const renderOrganograma = (pessoas, nivel = 0)=>{
        return pessoas.map((pessoa, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ml-4 border-l pl-4",
                style: {
                    marginLeft: nivel > 0 ? "16px" : "0"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `h-8 w-8 rounded-full flex items-center justify-center ${pessoa.subordinados?.length > 0 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`,
                                children: pessoa.subordinados?.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 471,
                                    columnNumber: 48
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 471,
                                    columnNumber: 80
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                lineNumber: 466,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium",
                                        children: pessoa.nome
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                        lineNumber: 474,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground",
                                        children: pessoa.cargo
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                        lineNumber: 475,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                lineNumber: 473,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                        lineNumber: 465,
                        columnNumber: 9
                    }, this),
                    pessoa.subordinados && pessoa.subordinados.length > 0 && renderOrganograma(pessoa.subordinados, nivel + 1)
                ]
            }, idx, true, {
                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                lineNumber: 464,
                columnNumber: 7
            }, this));
    };
    const perfisFiltrados = perfisData.filter((p)=>p.nome.toLowerCase().includes(searchPerfil.toLowerCase()) || p.departamento.toLowerCase().includes(searchPerfil.toLowerCase()));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold",
                                children: "Perfis, Permissões & Hierarquia"
                            }, void 0, false, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                lineNumber: 494,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground",
                                children: "Gerencie perfis de acesso, permissões granulares e fluxos de aprovação"
                            }, void 0, false, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                lineNumber: 495,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                        lineNumber: 493,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                onClick: ()=>setDialogSimular(true),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                        className: "h-4 w-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                        lineNumber: 501,
                                        columnNumber: 13
                                    }, this),
                                    "Simular Acesso"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                lineNumber: 500,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: ()=>setDialogCriarPerfil(true),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "h-4 w-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                        lineNumber: 505,
                                        columnNumber: 13
                                    }, this),
                                    "Criar Perfil"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                lineNumber: 504,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                        lineNumber: 499,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                lineNumber: 492,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tabs"], {
                defaultValue: "perfis",
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsList"], {
                        className: "grid w-full grid-cols-3 max-w-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                value: "perfis",
                                className: "gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                        lineNumber: 515,
                                        columnNumber: 13
                                    }, this),
                                    "Perfis"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                lineNumber: 514,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                value: "permissoes",
                                className: "gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                        lineNumber: 519,
                                        columnNumber: 13
                                    }, this),
                                    "Matriz"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                lineNumber: 518,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                value: "hierarquia",
                                className: "gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__["GitBranch"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                        lineNumber: 523,
                                        columnNumber: 13
                                    }, this),
                                    "Hierarquia"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                lineNumber: 522,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                        lineNumber: 513,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                        value: "perfis",
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                        className: "pb-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                    className: "text-lg",
                                                    children: "Perfis de Acesso"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 533,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                                    className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 536,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                    placeholder: "Buscar perfil...",
                                                                    value: searchPerfil,
                                                                    onChange: (e)=>setSearchPerfil(e.target.value),
                                                                    className: "pl-8 w-64"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 537,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 535,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "outline",
                                                            size: "sm",
                                                            onClick: ()=>setDialogCompararPerfis(true),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$compare$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitCompare$3e$__["GitCompare"], {
                                                                    className: "h-4 w-4 mr-2"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 545,
                                                                    columnNumber: 21
                                                                }, this),
                                                                "Comparar"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 544,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 534,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 532,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                        lineNumber: 531,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                children: "Perfil"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 555,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                children: "Departamento"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 556,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                className: "text-center",
                                                                children: "Permissões"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 557,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                className: "text-center",
                                                                children: "Usuários"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 558,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                children: "Última Alteração"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 559,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                className: "text-right",
                                                                children: "Ações"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 560,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 554,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 553,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                                                    children: perfisFiltrados.map((perfil)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "font-medium",
                                                                                children: perfil.nome
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 568,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs text-muted-foreground",
                                                                                children: perfil.setor
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 569,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 567,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 566,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        variant: "outline",
                                                                        children: perfil.departamento
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 573,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 572,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                    className: "text-center",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        variant: "secondary",
                                                                        children: perfil.permissoes
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 576,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 575,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                    className: "text-center",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        variant: "outline",
                                                                        children: perfil.usuarios
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 579,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 578,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                    className: "text-muted-foreground text-sm",
                                                                    children: perfil.ultimaAlteracao
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 581,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                    className: "text-right",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                                                                asChild: true,
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                    variant: "ghost",
                                                                                    size: "sm",
                                                                                    children: [
                                                                                        "Ações",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                                            className: "h-4 w-4 ml-1"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                            lineNumber: 587,
                                                                                            columnNumber: 31
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                    lineNumber: 585,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 584,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                                                                align: "end",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                                                        onClick: ()=>setPerfilSelecionado(perfil),
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                                                                className: "h-4 w-4 mr-2"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                                lineNumber: 592,
                                                                                                columnNumber: 31
                                                                                            }, this),
                                                                                            "Ver Detalhes"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 591,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                                                                className: "h-4 w-4 mr-2"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                                lineNumber: 596,
                                                                                                columnNumber: 31
                                                                                            }, this),
                                                                                            "Editar"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 595,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                                                className: "h-4 w-4 mr-2"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                                lineNumber: 600,
                                                                                                columnNumber: 31
                                                                                            }, this),
                                                                                            "Clonar"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 599,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 603,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                                                        className: "text-destructive",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                                                className: "h-4 w-4 mr-2"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                                lineNumber: 605,
                                                                                                columnNumber: 31
                                                                                            }, this),
                                                                                            "Excluir"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 604,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 590,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 583,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 582,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, perfil.id, true, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 565,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 563,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 552,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                        lineNumber: 551,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                lineNumber: 530,
                                columnNumber: 11
                            }, this),
                            perfilSelecionado && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                        className: "pb-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                            className: "text-lg",
                                                            children: perfilSelecionado.nome
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 624,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                            children: perfilSelecionado.descricao
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 625,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 623,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    size: "sm",
                                                    onClick: ()=>setPerfilSelecionado(null),
                                                    children: "Fechar"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 627,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 622,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                        lineNumber: 621,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "space-y-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-medium text-sm",
                                                            children: "Permissões"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 636,
                                                            columnNumber: 21
                                                        }, this),
                                                        perfilSelecionado.permissoesDetalhadas.map((perm, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "p-3 border rounded-lg space-y-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-medium",
                                                                        children: perm.rotina
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 639,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex flex-wrap gap-1",
                                                                        children: [
                                                                            perm.acoes.ver && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                variant: "secondary",
                                                                                className: "text-xs",
                                                                                children: "Ver"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 642,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            perm.acoes.criar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                variant: "secondary",
                                                                                className: "text-xs",
                                                                                children: "Criar"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 647,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            perm.acoes.editar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                variant: "secondary",
                                                                                className: "text-xs",
                                                                                children: "Editar"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 652,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            perm.acoes.aprovar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                className: "text-xs bg-amber-500",
                                                                                children: "Aprovar"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 656,
                                                                                columnNumber: 50
                                                                            }, this),
                                                                            perm.acoes.exportar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                variant: "outline",
                                                                                className: "text-xs",
                                                                                children: "Exportar"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 658,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 640,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        variant: "outline",
                                                                        className: "text-xs",
                                                                        children: [
                                                                            "Visão: ",
                                                                            perm.nivelVisao
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 663,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, idx, true, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 638,
                                                                columnNumber: 23
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 635,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-3",
                                                    children: [
                                                        perfilSelecionado.restricoes.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-medium text-sm mb-2",
                                                                    children: "Restrições"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 674,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-wrap gap-1",
                                                                    children: perfilSelecionado.restricoes.map((r, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                            variant: "destructive",
                                                                            className: "text-xs",
                                                                            children: r
                                                                        }, idx, false, {
                                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                            lineNumber: 677,
                                                                            columnNumber: 29
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 675,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 673,
                                                            columnNumber: 23
                                                        }, this),
                                                        perfilSelecionado.permissoesEspeciais && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-medium text-sm mb-2",
                                                                    children: "Permissões Especiais"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 687,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                    className: "space-y-1",
                                                                    children: perfilSelecionado.permissoesEspeciais.map((pe, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                            className: "text-sm text-muted-foreground flex items-start gap-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                                    className: "h-4 w-4 text-green-500 mt-0.5 shrink-0"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                    lineNumber: 691,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                pe
                                                                            ]
                                                                        }, idx, true, {
                                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                            lineNumber: 690,
                                                                            columnNumber: 29
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 688,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 686,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                    className: "h-4 w-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 700,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                                                                    className: "text-sm",
                                                                    children: perfilSelecionado.resumo
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 701,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 699,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 671,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 633,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                        lineNumber: 632,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                lineNumber: 620,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                        lineNumber: 529,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                        value: "permissoes",
                        className: "space-y-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                            className: "pb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                    className: "text-lg",
                                                    children: "Árvore de Rotinas"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 716,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                    children: "Departamento > Setor > Rotina"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 717,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 715,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                                                className: "h-[500px] pr-4",
                                                children: renderArvore(arvoreRotinas)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                lineNumber: 720,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 719,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 714,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                            className: "pb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                    className: "text-lg",
                                                    children: "Permissões da Rotina"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 727,
                                                    columnNumber: 17
                                                }, this),
                                                rotinaSelecionada ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                    children: [
                                                        "Configurando: ",
                                                        rotinaSelecionada
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 729,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                    children: "Selecione uma rotina na árvore"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 731,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 726,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                            children: rotinaSelecionada ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                children: "Perfil"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 739,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                            placeholder: "Selecione um perfil"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                            lineNumber: 742,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 741,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                        children: perfisData.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                value: p.id.toString(),
                                                                                children: p.nome
                                                                            }, p.id, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 746,
                                                                                columnNumber: 29
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 744,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 740,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 738,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                children: "Ações Permitidas"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 756,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-2 gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center space-x-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                                id: "acao-ver",
                                                                                checked: permissoesRotina.ver,
                                                                                onCheckedChange: (c)=>setPermissoesRotina((prev)=>({
                                                                                            ...prev,
                                                                                            ver: !!c
                                                                                        }))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 759,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                htmlFor: "acao-ver",
                                                                                className: "text-sm flex items-center gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                                                        className: "h-4 w-4 text-muted-foreground"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 765,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    "Ver"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 764,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 758,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center space-x-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                                id: "acao-criar",
                                                                                checked: permissoesRotina.criar,
                                                                                onCheckedChange: (c)=>setPermissoesRotina((prev)=>({
                                                                                            ...prev,
                                                                                            criar: !!c
                                                                                        }))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 770,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                htmlFor: "acao-criar",
                                                                                className: "text-sm flex items-center gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                                        className: "h-4 w-4 text-muted-foreground"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 776,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    "Criar"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 775,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 769,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center space-x-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                                id: "acao-editar",
                                                                                checked: permissoesRotina.editar,
                                                                                onCheckedChange: (c)=>setPermissoesRotina((prev)=>({
                                                                                            ...prev,
                                                                                            editar: !!c
                                                                                        }))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 781,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                htmlFor: "acao-editar",
                                                                                className: "text-sm flex items-center gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileEdit$3e$__["FileEdit"], {
                                                                                        className: "h-4 w-4 text-muted-foreground"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 787,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    "Editar"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 786,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 780,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center space-x-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                                id: "acao-excluir",
                                                                                checked: permissoesRotina.excluir,
                                                                                onCheckedChange: (c)=>setPermissoesRotina((prev)=>({
                                                                                            ...prev,
                                                                                            excluir: !!c
                                                                                        }))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 792,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                htmlFor: "acao-excluir",
                                                                                className: "text-sm flex items-center gap-2 text-destructive",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                                        className: "h-4 w-4"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 798,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    "Excluir",
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                                        className: "h-3 w-3"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 800,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 797,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 791,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center space-x-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                                id: "acao-aprovar",
                                                                                checked: permissoesRotina.aprovar,
                                                                                onCheckedChange: (c)=>setPermissoesRotina((prev)=>({
                                                                                            ...prev,
                                                                                            aprovar: !!c
                                                                                        }))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 804,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                htmlFor: "acao-aprovar",
                                                                                className: "text-sm flex items-center gap-2 text-amber-600",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                                        className: "h-4 w-4"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 810,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    "Aprovar",
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                                        className: "h-3 w-3"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 812,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 809,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 803,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center space-x-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                                id: "acao-cancelar",
                                                                                checked: permissoesRotina.cancelar,
                                                                                onCheckedChange: (c)=>setPermissoesRotina((prev)=>({
                                                                                            ...prev,
                                                                                            cancelar: !!c
                                                                                        }))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 816,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                htmlFor: "acao-cancelar",
                                                                                className: "text-sm flex items-center gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                                                        className: "h-4 w-4 text-muted-foreground"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 822,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    "Cancelar"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 821,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 815,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center space-x-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                                id: "acao-exportar",
                                                                                checked: permissoesRotina.exportar,
                                                                                onCheckedChange: (c)=>setPermissoesRotina((prev)=>({
                                                                                            ...prev,
                                                                                            exportar: !!c
                                                                                        }))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 827,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                htmlFor: "acao-exportar",
                                                                                className: "text-sm flex items-center gap-2 text-amber-600",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                                                        className: "h-4 w-4"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 833,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    "Exportar",
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                                        className: "h-3 w-3"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 835,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 832,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 826,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 757,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 755,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 841,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                children: "Nível de Visão"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 845,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroup"], {
                                                                value: nivelVisao,
                                                                onValueChange: setNivelVisao,
                                                                className: "space-y-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center space-x-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                                                value: "MEU",
                                                                                id: "visao-meu"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 848,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                                htmlFor: "visao-meu",
                                                                                className: "font-normal",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "font-medium",
                                                                                        children: "MEU"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 850,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-muted-foreground ml-2",
                                                                                        children: "- Apenas registros criados por mim"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 851,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 849,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 847,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center space-x-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                                                value: "SETOR",
                                                                                id: "visao-setor"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 855,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                                htmlFor: "visao-setor",
                                                                                className: "font-normal",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "font-medium",
                                                                                        children: "SETOR"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 857,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-muted-foreground ml-2",
                                                                                        children: "- Registros do meu setor"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 858,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 856,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 854,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center space-x-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                                                value: "DEPARTAMENTO",
                                                                                id: "visao-depto"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 862,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                                htmlFor: "visao-depto",
                                                                                className: "font-normal",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "font-medium",
                                                                                        children: "DEPARTAMENTO"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 864,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-muted-foreground ml-2",
                                                                                        children: "- Todos do departamento"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 865,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 863,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 861,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center space-x-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                                                value: "EMPRESA",
                                                                                id: "visao-empresa"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 869,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                                htmlFor: "visao-empresa",
                                                                                className: "font-normal",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "font-medium",
                                                                                        children: "EMPRESA"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 871,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-muted-foreground ml-2",
                                                                                        children: "- Visão global"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 872,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 870,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 868,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 846,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 844,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 878,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 882,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        children: "O que este perfil consegue fazer:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 884,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-1 text-sm",
                                                                        children: [
                                                                            permissoesRotina.criar && "Pode criar novos registros. ",
                                                                            permissoesRotina.editar && "Pode editar registros existentes. ",
                                                                            permissoesRotina.ver && "Pode visualizar registros. ",
                                                                            permissoesRotina.aprovar && "Tem poder de aprovação. ",
                                                                            permissoesRotina.exportar && "Pode exportar dados. ",
                                                                            "Visualiza apenas registros de nível ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                children: nivelVisao
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 891,
                                                                                columnNumber: 63
                                                                            }, this),
                                                                            "."
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 885,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 883,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 881,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-end gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                variant: "outline",
                                                                children: "Cancelar"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 897,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                children: "Salvar Permissões"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 898,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 896,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                lineNumber: 736,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-[400px] flex items-center justify-center text-muted-foreground",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                            className: "h-12 w-12 mx-auto mb-4 opacity-20"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 904,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: "Selecione uma rotina na árvore ao lado para configurar as permissões"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 905,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 903,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                lineNumber: 902,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 734,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 725,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                            lineNumber: 712,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                        lineNumber: 711,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                        value: "hierarquia",
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                                className: "pb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                        className: "text-lg",
                                                        children: "Governantes por Departamento"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 920,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                        children: "Responsáveis máximos de cada área"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 921,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                lineNumber: 919,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                        children: "Departamento"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 927,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                        children: "Governante"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 928,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                        className: "text-right",
                                                                        children: "Ação"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 929,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 926,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 925,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                                                            children: governantesData.map((gov, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                            className: "font-medium",
                                                                            children: gov.departamento
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                            lineNumber: 935,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
                                                                                            className: "h-4 w-4 text-primary"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                            lineNumber: 939,
                                                                                            columnNumber: 31
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 938,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                className: "text-sm font-medium",
                                                                                                children: gov.governante
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                                lineNumber: 942,
                                                                                                columnNumber: 31
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                className: "text-xs text-muted-foreground",
                                                                                                children: gov.email
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                                lineNumber: 943,
                                                                                                columnNumber: 31
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                        lineNumber: 941,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 937,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                            lineNumber: 936,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                            className: "text-right",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                variant: "ghost",
                                                                                size: "sm",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                                                    className: "h-4 w-4"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                    lineNumber: 949,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 948,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                            lineNumber: 947,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, idx, true, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 934,
                                                                    columnNumber: 23
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 932,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 924,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                lineNumber: 923,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                        lineNumber: 918,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                                className: "pb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                        className: "text-lg",
                                                        children: "Organograma"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 962,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                        children: "Estrutura hierárquica simplificada"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 963,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                lineNumber: 961,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                                                    className: "h-[300px]",
                                                    children: renderOrganograma(organograma)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 966,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                lineNumber: 965,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                        lineNumber: 960,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                lineNumber: 916,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                        className: "pb-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                            className: "text-lg",
                                                            children: "Regras de Aprovação"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 976,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                            children: "Fluxos de aprovação por tipo de documento e valor"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 977,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 975,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    size: "sm",
                                                    onClick: ()=>setDialogCriarRegra(true),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                            className: "h-4 w-4 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 980,
                                                            columnNumber: 19
                                                        }, this),
                                                        "Nova Regra"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 979,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 974,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                        lineNumber: 973,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                children: "Tipo"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 989,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                children: "Condição"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 990,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                children: "Aprovador"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 991,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                children: "SLA"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 992,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                className: "text-right",
                                                                children: "Ações"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 993,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 988,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 987,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                                                    children: regrasAprovacao.map((regra)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                    className: "font-medium",
                                                                    children: regra.tipo
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 999,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        variant: "outline",
                                                                        children: regra.condicao
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 1001,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 1000,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                                                className: "h-4 w-4 text-muted-foreground"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 1005,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            regra.aprovador
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 1004,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 1003,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        variant: "secondary",
                                                                        className: "gap-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                                className: "h-3 w-3"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                                lineNumber: 1011,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            regra.sla
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 1010,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 1009,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                    className: "text-right",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: "ghost",
                                                                        size: "sm",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                                            className: "h-4 w-4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                            lineNumber: 1017,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                        lineNumber: 1016,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 1015,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, regra.id, true, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 998,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 996,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 986,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                        lineNumber: 985,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                lineNumber: 972,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                        lineNumber: 915,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                lineNumber: 512,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: dialogSimular,
                onOpenChange: setDialogSimular,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "max-w-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: "Simular Acesso"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 1033,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Selecione um usuário para visualizar os menus e rotas que ele teria acesso"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 1034,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                            lineNumber: 1032,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Usuário"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 1040,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                            value: usuarioSimulacao,
                                            onValueChange: setUsuarioSimulacao,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                        placeholder: "Selecione um usuário"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 1043,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1042,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                    children: usuariosSimulacao.map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: u.id.toString(),
                                                            children: [
                                                                u.nome,
                                                                " (",
                                                                u.perfil,
                                                                ")"
                                                            ]
                                                        }, u.id, true, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1047,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1045,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 1041,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 1039,
                                    columnNumber: 13
                                }, this),
                                usuarioSimulacao && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border rounded-lg p-4 space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "font-medium",
                                            children: "Menus Visíveis"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 1057,
                                            columnNumber: 17
                                        }, this),
                                        usuarioSimulacao === "1" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 p-2 bg-muted rounded",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1061,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "RH"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1062,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1063,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Departamento Pessoal"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1064,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1065,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: "Cadastro de Funcionário"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1066,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1060,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                                                        className: "text-sm",
                                                        children: 'Este usuário vê apenas a tela "Cadastro de Funcionário" e visualiza somente os registros que ele mesmo criou.'
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 1069,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1068,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 1059,
                                            columnNumber: 19
                                        }, this),
                                        usuarioSimulacao === "2" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 p-2 bg-muted rounded",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1079,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Suprimentos"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1080,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1081,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Pedidos"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1082,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1083,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: "Pedido"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1084,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1078,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                                                        className: "text-sm",
                                                        children: 'Este usuário vê apenas "Pedidos" e visualiza pedidos do setor. Pedidos acima do limite seguem automaticamente para aprovação.'
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 1087,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1086,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 1077,
                                            columnNumber: 19
                                        }, this),
                                        usuarioSimulacao === "3" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 p-2 bg-muted rounded",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1097,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Comercial"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1098,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1099,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: "Propostas, Contratos, Relatórios"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1100,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1096,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                                                        className: "text-sm",
                                                        children: "Este usuário é Governante do Comercial. Visualiza tudo do departamento e tem poder de aprovação. Recebe todas as solicitações pendentes."
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 1103,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1102,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 1095,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 1056,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                            lineNumber: 1038,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                onClick: ()=>setDialogSimular(false),
                                children: "Fechar"
                            }, void 0, false, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                lineNumber: 1114,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                            lineNumber: 1113,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                    lineNumber: 1031,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                lineNumber: 1030,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: dialogCriarPerfil,
                onOpenChange: setDialogCriarPerfil,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: "Criar Novo Perfil"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 1125,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Configure um novo perfil de acesso"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 1126,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                            lineNumber: 1124,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Nome do Perfil"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 1130,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            placeholder: "Ex: Financeiro – Analista"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 1131,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 1129,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Departamento"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1135,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                placeholder: "Selecione"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 1138,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1137,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "rh",
                                                                    children: "Recursos Humanos"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 1141,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "financeiro",
                                                                    children: "Financeiro"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 1142,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "comercial",
                                                                    children: "Comercial"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 1143,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "suprimentos",
                                                                    children: "Suprimentos"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 1144,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1140,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1136,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 1134,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Setor"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1149,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    placeholder: "Ex: Contas a Pagar"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1150,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 1148,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 1133,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Descrição"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 1154,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            placeholder: "Descreva as responsabilidades deste perfil"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 1155,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 1153,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                            lineNumber: 1128,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: ()=>setDialogCriarPerfil(false),
                                    children: "Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 1159,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: ()=>setDialogCriarPerfil(false),
                                    children: "Criar Perfil"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 1162,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                            lineNumber: 1158,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                    lineNumber: 1123,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                lineNumber: 1122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: dialogCompararPerfis,
                onOpenChange: setDialogCompararPerfis,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "max-w-3xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: "Comparar Perfis"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 1171,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Compare as permissões de dois perfis lado a lado"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 1172,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                            lineNumber: 1170,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Perfil 1"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 1176,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                            value: perfilComparar1,
                                            onValueChange: setPerfilComparar1,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                        placeholder: "Selecione"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 1179,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1178,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                    children: perfisData.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: p.id.toString(),
                                                            children: p.nome
                                                        }, p.id, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1183,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1181,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 1177,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 1175,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Perfil 2"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 1191,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                            value: perfilComparar2,
                                            onValueChange: setPerfilComparar2,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                        placeholder: "Selecione"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 1194,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1193,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                    children: perfisData.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: p.id.toString(),
                                                            children: p.nome
                                                        }, p.id, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1198,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1196,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 1192,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 1190,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                            lineNumber: 1174,
                            columnNumber: 11
                        }, this),
                        perfilComparar1 && perfilComparar2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border rounded-lg p-4 mt-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    children: "Aspecto"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1211,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    children: perfisData.find((p)=>p.id.toString() === perfilComparar1)?.nome
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1212,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    children: perfisData.find((p)=>p.id.toString() === perfilComparar2)?.nome
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1213,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 1210,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                        lineNumber: 1209,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "font-medium",
                                                        children: "Departamento"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 1218,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        children: perfisData.find((p)=>p.id.toString() === perfilComparar1)?.departamento
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 1219,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        children: perfisData.find((p)=>p.id.toString() === perfilComparar2)?.departamento
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 1220,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                lineNumber: 1217,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "font-medium",
                                                        children: "Permissões"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 1223,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        children: perfisData.find((p)=>p.id.toString() === perfilComparar1)?.permissoes
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 1224,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        children: perfisData.find((p)=>p.id.toString() === perfilComparar2)?.permissoes
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 1225,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                lineNumber: 1222,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "font-medium",
                                                        children: "Usuários"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 1228,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        children: perfisData.find((p)=>p.id.toString() === perfilComparar1)?.usuarios
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 1229,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        children: perfisData.find((p)=>p.id.toString() === perfilComparar2)?.usuarios
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 1230,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                lineNumber: 1227,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                        lineNumber: 1216,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                lineNumber: 1208,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                            lineNumber: 1207,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                onClick: ()=>setDialogCompararPerfis(false),
                                children: "Fechar"
                            }, void 0, false, {
                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                lineNumber: 1237,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                            lineNumber: 1236,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                    lineNumber: 1169,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                lineNumber: 1168,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: dialogCriarRegra,
                onOpenChange: setDialogCriarRegra,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: "Nova Regra de Aprovação"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 1248,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Configure uma nova regra de fluxo de aprovação"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 1249,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                            lineNumber: 1247,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Tipo de Documento"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 1253,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                        placeholder: "Selecione"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 1256,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1255,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "pedido",
                                                            children: "Pedido de Compra"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1259,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "contrato",
                                                            children: "Contrato Comercial"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1260,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "pagamento",
                                                            children: "Solicitação de Pagamento"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1261,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "admissao",
                                                            children: "Admissão de Funcionário"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1262,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1258,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 1254,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 1252,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Condição"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1268,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                placeholder: "Selecione"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 1271,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1270,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "ate5k",
                                                                    children: "Até R$ 5.000"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 1274,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "5k50k",
                                                                    children: "De R$ 5.001 até R$ 50.000"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 1275,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "acima50k",
                                                                    children: "Acima de R$ 50.000"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 1276,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "qualquer",
                                                                    children: "Qualquer valor"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 1277,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1273,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1269,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 1267,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "SLA"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1282,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                placeholder: "Selecione"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                lineNumber: 1285,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1284,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "24h",
                                                                    children: "24 horas"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 1288,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "48h",
                                                                    children: "48 horas"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 1289,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "72h",
                                                                    children: "72 horas"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 1290,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "7d",
                                                                    children: "7 dias"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                                    lineNumber: 1291,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1287,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1283,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 1281,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 1266,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Aprovador"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 1297,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                        placeholder: "Selecione"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                        lineNumber: 1300,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1299,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "gestor",
                                                            children: "Gestor Direto"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1303,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "governante",
                                                            children: "Governante do Departamento"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1304,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "diretoria",
                                                            children: "Diretoria"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                            lineNumber: 1305,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                                    lineNumber: 1302,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                            lineNumber: 1298,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 1296,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                            lineNumber: 1251,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: ()=>setDialogCriarRegra(false),
                                    children: "Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 1311,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$v0$2d$erp$2d$obra$2d$principal$2d$verce$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: ()=>setDialogCriarRegra(false),
                                    children: "Criar Regra"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                                    lineNumber: 1314,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                            lineNumber: 1310,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                    lineNumber: 1246,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
                lineNumber: 1245,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/v0-erp-obra-principal-verce/app/corporativo/console/perfis/page.tsx",
        lineNumber: 490,
        columnNumber: 5
    }, this);
}
_s(PerfisPermissoesPage, "envGBCmp9rb7mYtUhhKYBqmeBe4=");
_c = PerfisPermissoesPage;
var _c;
__turbopack_context__.k.register(_c, "PerfisPermissoesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_v0-erp-obra-principal-verce_dafc9b11._.js.map