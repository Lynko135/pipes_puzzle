import { Scene } from './Scene';
import * as PIXI from 'pixi.js';
import backImage from '../assets/back.png';
import pipeText from '../assets/PipeText.png'

export class StartScene extends Scene {
    private onStart: () => void;

    constructor(onStart: () => void) {
        super();
        this.onStart = onStart;
    }

    public init(): void {

        PIXI.Assets.load(backImage).then((res) => {

            const background = new PIXI.Sprite(res);
            this.container.addChild(background);

            PIXI.Assets.load(pipeText).then(res => {
                const title = new PIXI.Sprite(res);
                this.container.addChild(title);
                title.scale.set(0.7)
                title.anchor.set(0.5);
                title.x = 400;
                title.y = 250;

            })

            const start = new PIXI.Text({
                text: 'Start Game',
                style: {
                    fontFamily: 'Courier New',
                    fontSize: 50,
                    fill: 0xffffff,
                    fontWeight: "bold",
                }
            });
            start.interactive = true;
            start.anchor.set(0.5);
            start.x = 400;
            start.y = 400;
            start.on('pointerdown', this.onStart);
            this.container.addChild(start);
        })
    }
    public update(delta: number): void {

    }
}
