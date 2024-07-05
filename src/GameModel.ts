import { GAME_CONFIG } from './static/levels';
import {Pipe, Neighbor} from './types/pipe_types';
import {connections, connectionsHelper} from "./static/connections";

export class GameModel {
    level: number = 0
    gridSize
    pipes

    constructor(level: number) {
        this.level = level

        //Строим уровень
        this.gridSize = GAME_CONFIG[this.level].gridSize;
        this.pipes = GAME_CONFIG[this.level].pipes.map((row, rowIndex) => row.map((pipe, pipeIndex) => ({
            ...pipe,
            isFilled: false,
            row: rowIndex,
            col: pipeIndex
        })));

        // Заполнить первую трубу (вентиль) сразу водой
        this.openWater()
    }

    openWater() {
        this.pipes[0][0].isFilled = true
        this.checkPipe(1, 0)
        this.checkPipe(0, 1)
    }

    rotatePipe(x: number, y: number) {
        const pipe = this.pipes[y][x];
        pipe.rotation = (pipe.rotation + 1) % 4; // Вращение на 90 градусов
        //отключить не подключенные к вентелю трубы
        this.pipes.forEach(line => {
            line.forEach(pipe => pipe.isFilled = false)
        })
        this.openWater()
        this.checkPipe(x, y)
    }

    checkPipe(x: number, y: number) {
        const pipe = this.pipes[y][x];
        const neighbors = this.getNeighbors(x, y)

        const connectedPipes = neighbors
            .filter(item => this.isConnected(pipe, item))
            .map(item => {
                return this.pipes[item.y][item.x]
            })

        pipe.isFilled = !!connectedPipes.filter(item => item.isFilled).length;

        // Заполнить соседние трубы, если они подключены к этой трубе
        if(pipe.isFilled && connectedPipes.filter(item => !item.isFilled).length) {
            connectedPipes.filter(item => !item.isFilled).forEach(empty => {
                this.checkPipe(empty.col, empty.row)
            })
        }
    }

    getNeighbors(x: number, y: number): Neighbor[] {
        const neighbors = [
            { x, y: y - 1, direction: 0 }, // вверх
            { x: x + 1, y, direction: 1 }, // вправо
            { x, y: y + 1, direction: 2 }, // вниз
            { x: x - 1, y, direction: 3 }  // влево
        ];

        return neighbors.filter(({ x: nx, y: ny }) => nx >= 0 && nx < this.gridSize.width && ny >= 0 && ny < this.gridSize.height);
    }

    isLevelComplete(): boolean {
        const end = { x: this.gridSize.width - 1, y: this.gridSize.height - 1 };
        return this.pipes[end.y][end.x].isFilled
    }

    private isConnected(pipe: Pipe, item: Neighbor): boolean {
        const neighbor = this.pipes[item.y][item.x]
        return connections[pipe.type][pipe.rotation % 4].includes(item.direction) && connectionsHelper[neighbor.type][neighbor.rotation % 4].includes(item.direction)
    }
}
