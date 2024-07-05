import { Scene } from './Scene';
import { GameModel } from '../GameModel';
import { GameView } from '../GameView';
import { GameController } from '../GameController';
import * as PIXI from 'pixi.js';
import backImage from '../assets/stone_bg.png';


export class GameScene extends Scene {
    private model: GameModel | null = null;
    private view: GameView | null = null;
    private controller: GameController | null = null;
    private onComplete: () => void;
    private level: number = 0

    constructor(onComplete: () => void, level: number = 0) {
        super();
        this.onComplete = onComplete;
        this.level = level
    }

    public init(): void {
        console.log("GAME START")
        PIXI.Assets.load(backImage).then((res) => {
            const background = new PIXI.Sprite(res);
            this.container.addChild(background);

            this.model = new GameModel(this.level);
            this.view = new GameView(new PIXI.Application(), this.model);
            this.controller = new GameController(this.view.app, this.level);

            this.container.addChild(this.view.container);

            this.view.onLevelComplete = this.onComplete;


        })
    }
    public update(delta: number): void {
    }
}
