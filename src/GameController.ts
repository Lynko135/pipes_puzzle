import { GameModel } from './GameModel';
import { GameView } from './GameView';
import * as PIXI from 'pixi.js';

export class GameController {
    model: GameModel;
    view: GameView;

    constructor(app: PIXI.Application, level: number) {
        this.model = new GameModel(level);
        this.view = new GameView(app, this.model);
    }
}
