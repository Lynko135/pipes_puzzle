import * as PIXI from 'pixi.js';
import { GameModel } from './GameModel';
import { PipeType, PipeRotation } from './types/pipe_types';
import gsap from 'gsap';
import strait_pipe from './assets/straight_pipe.png'
import curved_pipe from './assets/curved_pipe.png'
import t_pipe from './assets/t_pipe.png'
import cross_pipe from './assets/cross_pipe.png'
import strait_pipe_full from './assets/straight_pipe_full.png'
import curved_pipe_full from './assets/curved_pipe_full.png'
import t_pipe_full from './assets/t_pipe_full.png'
import cross_pipe_full from './assets/cross_pipe_full.png'
import {SCREEN_WIDTH, SCREEN_HEIGHT} from "./static/screen";
import start from './assets/start.png';
import border from './assets/border_short.png';
import {containerToCenter} from "./helpers/containerToCenter";

export class GameView {
    app: PIXI.Application;
    model: GameModel;
    container: PIXI.Container;
    onLevelComplete: () => void = () => {
        return
    };

    constructor(app: PIXI.Application, model: GameModel) {
        this.app = app;
        this.model = model;

        const containerParams = containerToCenter(SCREEN_WIDTH, SCREEN_HEIGHT, 100, this.model.gridSize.width, this.model.gridSize.height)

        this.container = new PIXI.Container({
            height: this.model.gridSize.height * 100,
            width: this.model.gridSize.width * 100,
            scale: containerParams.scale,
            x: containerParams.xPos,
            y: containerParams.yPos
        });
        this.app.stage.addChild(this.container);
        this.render();




    }

    render() {
        this.container.removeChildren();


        //cоздаем границы игрового поля
        PIXI.Assets.load(border).then((res) => {
            for(let i = 0; i < this.model.gridSize.width; i++) {
                const  top = new PIXI.Sprite(res)
                top._zIndex = 1
                top.x = i * 100
                this.container.addChild(top)
            }
            for(let i = 0; i < this.model.gridSize.width - 1; i++) {
                const  bottom = new PIXI.Sprite(res)
                bottom._zIndex = 1
                bottom.y = this.model.gridSize.height * 100 - 15
                bottom.x = i * 100
                this.container.addChild(bottom)
            }
            for(let i = 0; i < this.model.gridSize.height - 1; i++) {
                const  right = new PIXI.Sprite(res)
                right._zIndex = 1
                right.rotation = Math.PI * 0.5
                right.x = this.model.gridSize.width * 100
                right.y = 100 * i
                this.container.addChild(right)
            }
            for(let i = 0; i < this.model.gridSize.height; i++) {
                const left = new PIXI.Sprite(res)
                left._zIndex = 1
                left.rotation = Math.PI * 0.5
                left.x = 15
                left.y = 100 * i
                this.container.addChild(left)
            }
        })

        //вентиль
        PIXI.Assets.load(start).then(res => {
            const startValve = new PIXI.Sprite(res);
            this.container.addChild(startValve);
            startValve.anchor.set(0.5)
            startValve.scale.set(1.28)
            startValve.x = 50
            startValve.y = 50
            startValve._zIndex = 1
        })

        for (let y = 0; y < this.model.gridSize.height; y++) {
            for (let x = 0; x < this.model.gridSize.width; x++) {
                const pipe = this.model.pipes[y][x];
                if (!pipe) continue;
                this.createPipeSprite(pipe.type, pipe.rotation, pipe.isFilled, x, y);
            }
        }
    }

    createPipeSprite(type: PipeType, rotation: PipeRotation, isFilled: boolean, x: number, y: number): void {
        let texturePath

        switch (type) {
            case PipeType.STRAIGHT:
                texturePath = (!isFilled) ? strait_pipe : strait_pipe_full
                break;
            case PipeType.CURVED:
                texturePath = (!isFilled) ? curved_pipe : curved_pipe_full
                break;
            case PipeType.T_SHAPE:
                texturePath = (!isFilled) ? t_pipe : t_pipe_full
                break;
            case PipeType.CROSS:
                texturePath = (!isFilled) ? cross_pipe : cross_pipe_full
                break;
            default:
                throw new Error('Unknown pipe type');
        }

        PIXI.Assets.load(texturePath).then((res) => {
            const sprite = new PIXI.Sprite(res);
            sprite.x = x * 100 + 50;
            sprite.y = y * 100 + 50;
            sprite.scale.set(1, 1)
            sprite.anchor.set(0.5);
            sprite.rotation = rotation * (Math.PI / 2);
            sprite.interactive = true;
            sprite.on('pointerdown', () => {
                this.onPipeClick(x, y, sprite, rotation)
            });
            this.container.addChild(sprite);
        })
    }

    onPipeClick(x: number, y: number, sprite: PIXI.Sprite, rotation: number) {

        this.model.rotatePipe(x, y);

        sprite.rotation = sprite.rotation%(2 * Math.PI)

        const currentRotation = sprite.rotation % (2 * Math.PI);
        const targetRotation = this.model.pipes[y][x].rotation * (Math.PI / 2);

        // кратчайший путь для вращения по часовой стрелке
        let finalRotation = targetRotation;
        if (targetRotation < currentRotation) {
            finalRotation += 2 * Math.PI;
        }

        gsap.to(sprite, {
            rotation: finalRotation,
            duration: 0.2,
            ease: 'power2.inOut',
            onComplete: () => {
                if (this.model.isLevelComplete()) {
                    setTimeout(() => {
                        this.onLevelComplete();
                    }, 300)

                }
                this.render();
            }
        });
    }
}
