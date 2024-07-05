import { Scene } from './Scene';
import * as PIXI from 'pixi.js';
import backImage from '../assets/back.png';
import winText from "../assets/win_text.png";
import {drawLevelChoseButton} from "../helpers/drawLevelChoseButton";
import {GAME_CONFIG} from "../static/levels";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../static/screen";

export class EndScene extends Scene {
    private onRestart: (level: number) => void;

    constructor(onRestart: (level: number) => void) {
        super();
        this.onRestart = onRestart;
    }

    public init(): void {
        console.log('END')

        PIXI.Assets.load(backImage).then((res) => {

            const background = new PIXI.Sprite(res);
            this.container.addChild(background);

            PIXI.Assets.load(winText).then(res => {
                const title = new PIXI.Sprite(res);
                this.container.addChild(title);
                title.scale.set(0.7)
                title.anchor.set(0.5);
                title.x = SCREEN_WIDTH / 2;
                title.y = 250;

            })


            //размещение кнопок выбора уровня
            for(let i = 0; i < GAME_CONFIG.length; i++) {
                const button = drawLevelChoseButton(this.container, i + 1, 120 * i + 100, 450)
                button.on('pointerdown', () => {
                    this.onRestart(i)
                });
            }


            const choose = new PIXI.Text({
                text: 'Choose Level',
                style: {
                    fontFamily: 'Courier New',
                    fontSize: 50,
                    fill: 0xffffff,
                    fontWeight: "bold",
                }
            });
            choose.interactive = true;
            choose.anchor.set(0.5);
            choose.x = SCREEN_WIDTH / 2;
            choose.y = SCREEN_HEIGHT / 1.5;
            this.container.addChild(choose);

        })
    }

    public update(delta: number): void {

    }
}
