declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'react' {
  export type PropsWithChildren<P = unknown> = P & { children?: any };
  export type ComponentType<P = unknown> = (props: P) => any;
  export function useEffect(effect: () => void | (() => void), deps?: unknown[]): void;
  export function useMemo<T>(factory: () => T, deps: unknown[]): T;
  export function useState<T>(initial: T | (() => T)): [T, (value: T) => void];
}

declare module 'react/jsx-runtime' {
  export const Fragment: any;
  export function jsx(type: any, props: any, key?: any): any;
  export function jsxs(type: any, props: any, key?: any): any;
}

declare module '@tolgee/react' {
  import { ComponentType, PropsWithChildren } from 'react';
  export const T: ComponentType<PropsWithChildren>;
}

declare module '@inertiajs/react' {
  export const Link: any;
  export const router: { delete: (url: string) => void };
  export function useForm<T extends Record<string, any>>(data: T): {
    data: T;
    errors: Partial<Record<keyof T, string>>;
    setData: <K extends keyof T>(key: K, value: T[K]) => void;
    post: (url: string) => void;
    put: (url: string) => void;
  };
}

declare module 'lucide-react' {
  export const PencilIcon: any;
  export const PlusIcon: any;
  export const TrashIcon: any;
}
