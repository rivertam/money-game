declare module 'mobx' {
  declare function observable<T>(): T;
  declare function computed<T>(f: () => T): () => T;
  declare function reaction<T>(name: string, expression: () => T, effect: (arg: T, r: any) => void, fireImmediately?: boolean, delay?: number, scope?: any): void;
  declare function reaction<T>(expression: () => T, effect: (arg: T, r: any) => void, fireImmediately?: boolean, delay?: number, scope?: any): void;
}
