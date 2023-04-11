import { Container } from "pixi.js";

declare module "pixi.js" {
    // export interface Sprite extends GlobalMixins.Sprite, Container {
    //     customData: any;
    // }

    interface Sprite {
        customData: Record<string, any>;
    }
}
