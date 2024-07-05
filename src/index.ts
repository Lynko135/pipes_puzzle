import * as PIXI from 'pixi.js';
import { StartScene } from './scenes/StartScene';
import { GameScene } from './scenes/GameScene';
import { EndScene } from './scenes/EndScene';
import { Scene } from './scenes/Scene';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from "./static/screen";
import './style.css'

class Main {
    private app: PIXI.Application;
    private currentScene: Scene | null = null;

    constructor() {

        this.app = new PIXI.Application();

        this.app.init({ background: '#1099bb', width: SCREEN_WIDTH, height: SCREEN_HEIGHT}).then(() => {
            document.body.appendChild(this.app.canvas);
            this.showStartScene();
        });
    }
    private showStartScene(): void {
        if (this.currentScene) {
            this.currentScene.destroy();
        }

        const startScene = new StartScene(() => this.showGameScene(0));
        startScene.init();
        this.app.stage.addChild(startScene.getContainer());
        this.currentScene = startScene;
    }

    private showGameScene(level: number): void {
        if (this.currentScene) {
            this.currentScene.destroy();
        }

        const gameScene = new GameScene(() => this.showEndScene(), level);
        gameScene.init();
        this.app.stage.addChild(gameScene.getContainer());
        this.currentScene = gameScene;
    }

    private showEndScene(): void {
        if (this.currentScene) {
            this.currentScene.destroy();
        }

        const endScene = new EndScene((level) => {
            this.showGameScene(level)
        });
        endScene.init();
        this.app.stage.addChild(endScene.getContainer());
        this.currentScene = endScene;
    }
}

window.onload = () => {
    new Main();
};
