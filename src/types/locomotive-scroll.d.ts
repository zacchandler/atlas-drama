declare module "locomotive-scroll" {
  export interface LocomotiveScrollOptions {
    el?: HTMLElement | null;
    name?: string;
    offset?: [number, number];
    repeat?: boolean;
    smooth?: boolean;
    lerp?: number;
    multiplier?: number;
    firefoxMultiplier?: number;
    touchMultiplier?: number;
    scrollFromAnywhere?: boolean;
    getDirection?: boolean;
    getSpeed?: boolean;
    class?: string;
    initPosition?: { x: number; y: number };
    scrollbarContainer?: HTMLElement | false;
    reloadOnContextChange?: boolean;
    resetNativeScroll?: boolean;
    tablet?: { smooth?: boolean; breakpoint?: number; multiplier?: number };
    smartphone?: { smooth?: boolean; multiplier?: number };
  }

  export interface ScrollInstance {
    scroll: { x: number; y: number };
    limit: { x: number; y: number };
    speed?: number;
    direction?: string;
  }

  export interface CallObj {
    el: HTMLElement;
    id?: string;
  }

  export default class LocomotiveScroll {
    constructor(options?: LocomotiveScrollOptions);
    scroll: unknown;
    on(event: "scroll", cb: (instance: ScrollInstance) => void): void;
    on(event: "call", cb: (func: string | string[], way: "enter" | "exit", obj: CallObj) => void): void;
    scrollTo(
      target: HTMLElement | string | number,
      options?: { offset?: number; duration?: number; easing?: [number, number, number, number]; disableLerp?: boolean; callback?: () => void }
    ): void;
    update(): void;
    start(): void;
    stop(): void;
    destroy(): void;
  }
}
