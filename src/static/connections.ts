import {PipeType} from "../types/pipe_types";

// direction: 0 = вверх, 1 = вправо, 2 = вниз, 3 = влево
export const connections: { [key in PipeType]: number[][] } = {
    [PipeType.STRAIGHT]: [
        [1, 3],
        [0, 2],
        [1, 3],
        [0, 2],
    ],
    [PipeType.CURVED]: [
        [1, 2],
        [2, 3],
        [0, 3],
        [1, 0]
    ],
    [PipeType.T_SHAPE]: [
        [1, 2, 3],
        [0, 2, 3],
        [0, 1, 3],
        [0, 1, 2]
    ],
    [PipeType.CROSS]: [
        [0, 1, 2, 3],
        [0, 1, 2, 3],
        [0, 1, 2, 3],
        [0, 1, 2, 3],
    ]
};

//зеркальное направление для соседей
export const connectionsHelper: { [key in PipeType]: number[][] } = {
    [PipeType.STRAIGHT]: [
        [1, 3],
        [0, 2],
        [1, 3],
        [0, 2],
    ],
    [PipeType.CURVED]: [
        [0, 3],
        [1, 0],
        [1, 2],
        [2, 3],
    ],
    [PipeType.T_SHAPE]: [
        [0, 1, 3],
        [0, 1, 2],
        [1, 2, 3],
        [0, 2, 3],
    ],
    [PipeType.CROSS]: [
        [0, 1, 2, 3],
        [0, 1, 2, 3],
        [0, 1, 2, 3],
        [0, 1, 2, 3],
    ]
};