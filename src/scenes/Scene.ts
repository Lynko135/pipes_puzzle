import * as PIXI from 'pixi.js';

export abstract class Scene {
    protected container: PIXI.Container;

    constructor() {
        this.container = new PIXI.Container();
    }

    public abstract init(): void;
    public abstract update(delta: number): void;

    public getContainer(): PIXI.Container {
        return this.container;
    }

    public destroy(): void {
        this.container.destroy({ children: true });
    }
}
