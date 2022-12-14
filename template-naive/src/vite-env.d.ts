/// <reference types="vite/client" />

/// <reference types="vite-svg-loader" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare type Recordable<T = any> = Record<string, T>

declare interface Window {
    $message: any
    $dialog: any
}