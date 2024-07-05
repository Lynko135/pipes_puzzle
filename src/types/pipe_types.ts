export enum PipeType {
    STRAIGHT,   // Прямая труба
    CURVED,     // Изогнутая труба
    T_SHAPE,    // Т-образная труба
    CROSS       // Крестообразная труба
}
export enum PipeRotation {
    DEG_0 = 0,
    DEG_90 = 90,
    DEG_180 = 180,
    DEG_270 = 270,
}
export interface Pipe {
    type: PipeType;
    rotation: PipeRotation;
    isFilled?: boolean;
    row?: number;
    col?: number;
}
export interface Neighbor {
    x: number;
    y: number;
    direction: number;
}
