import * as PIXI from 'pixi.js';

export const drawLevelChoseButton = (container: PIXI.Container, number: number, x: number = 50, y: number = 50): PIXI.Graphics => {
    const graphics = new PIXI.Graphics()
        .rect(x, y, 100, 100)
        .fill({color: 0xFFFFFF, alpha: 0.5})
        .stroke({ color: 0xffffff, width: 4, alignment: 0 })

    container.addChild(graphics);
    graphics.interactive = true

    const text = new PIXI.Text({
        text: number.toString(),
        style: {
            fontFamily: 'Courier New',
            fontSize: 50,
            fill: 0xffffff,
            fontWeight: "bold",
        }
    });
    text.anchor.set(0.5);
    text.position.set(x + 50, y + 50);
    container.addChild(text);

    return graphics
}