export const containerToCenter = (
    screenWidth: number,
    screenHeight: number,
    cellSize: number,
    numCellsHoriz: number,
    numCellsVert: number
): { xPos: number, yPos: number, scale: number } => {
    // Размеры контейнера
    const containerWidth = numCellsHoriz * cellSize;
    const containerHeight = numCellsVert * cellSize;

    // Вычисление масштаба
    const scale = Math.min(screenWidth / containerWidth, screenHeight / containerHeight);

    // Вычисление позиции контейнера для центрирования
    const xPos = (screenWidth - containerWidth * scale) / 2;
    const yPos = (screenHeight - containerHeight * scale) / 2;

    return {
        xPos: xPos,
        yPos: yPos,
        scale: scale
    };
}