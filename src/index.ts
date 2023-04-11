// @ts-nocheck
import { Sprite, Application, Loader, Texture, Graphics, DisplayObject } from "pixi.js";
import gsap from "gsap";
import resizeEmitter from "./utils/resizeEmitter";
import "./style.css";

const CONTAINER_SIZE = 400;
const FIGURE_AND_SQUARE_SIZE = 105;
const FIGURE_AND_SQUARE_SIZE_PADDING = 7;
const CONTAINER_DIFFERENCE = 219;

let capturedFigure: Sprite | null = null;
let capturedFigurePosition: { x: number; y: number } | null = null;
let replacementFigure: Sprite | null = null;
let replacementFigurePosition: { x: number; y: number } | null = null;
let wasReplaced = false;

window.onload = async (): Promise<void> => {
    await loadGameAssets();

    const app = new Application({
        backgroundColor: 0x000000,
        // width: gameWidth,
        // height: gameHeight,
        width: window.innerWidth,
        height: window.innerHeight,
    });

    app.renderer.resize(window.innerWidth, window.innerHeight);
    // app.stage.width = window.innerWidth;
    // app.stage.height = window.innerHeight;
    // app.stage.scale.x = 1;
    // app.stage.scale.y = 1;
    document.body.appendChild(app.view);

    const sprite = getContainer();

    const videoElement = document.createElement("video");
    videoElement.src = "./assets/video_2023-04-05_00-59-02.mp4";
    videoElement.autoplay = true;
    videoElement.loop = true;
    videoElement.muted = true;
    document.body.appendChild(videoElement);

    const videoTexture = Texture.from(videoElement);

    const videoSprite = new Sprite(videoTexture);

    videoSprite.width = window.innerWidth;
    videoSprite.height = window.innerHeight;
    videoSprite.alpha = 0.5;

    app.stage.addChild(videoSprite);
    app.stage.addChild(sprite);

    resizeEmitter.on("resize", (width, height) => {
        // app.stage.width = window.innerWidth;
        // app.stage.height = window.innerHeight;
        app.renderer.resize(width, height);
        app.stage.width = width;
        app.stage.height = height;
        app.stage.scale.set(1, 1);

        videoSprite.width = width;
        videoSprite.height = height;
    });
    // app.stage.interactive = true;
};

async function loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = Loader.shared;
        loader.add("rabbit", "./assets/simpleSpriteSheet.json");
        loader.add("pixie", "./assets/spine-assets/pixie.json");

        loader.onComplete.once(() => {
            res();
        });

        loader.onError.once(() => {
            rej();
        });

        loader.load();
    });
}

const getPositions = (grid: DisplayObject[]) => {
    const result = [];

    for (let i = 0; i < 4; i++) {
        let count = 1;
        let currentType = grid[i * 4].customData.type;
        for (let j = 1; j < 4; j++) {
            if (grid[i * 4 + j].customData.type === currentType) {
                count++;
                if (count >= 3) {
                    for (let k = 0; k < count; k++) {
                        if (!result.find((r) => r.x === i && r.y === j - k)) {
                            result.push({ x: i, y: j - k, type: currentType });
                        }
                    }
                }
            } else {
                count = 1;
                currentType = grid[i * 4 + j].customData.type;
            }
        }
    }

    for (let j = 0; j < 4; j++) {
        let count = 1;
        let currentType = grid[j].customData.type;
        for (let i = 1; i < 4; i++) {
            if (grid[i * 4 + j].customData.type === currentType) {
                count++;
                if (count >= 3) {
                    for (let k = 0; k < count; k++) {
                        if (!result.find((r) => r.x === i - k && r.y === j)) {
                            result.push({ x: i - k, y: j, type: currentType });
                        }
                    }
                }
            } else {
                count = 1;
                currentType = grid[i * 4 + j].customData.type;
            }
        }
    }

    return result;
};

const arr: ("mayak" | "star" | "boat" | "fish")[][] = [
    ["mayak", "boat", "star", "fish"],
    ["fish", "star", "star", "mayak"],
    ["star", "star", "fish", "star"],
    ["star", "fish", "boat", "mayak"],
];

const textureData = {
    fish: "./assets/fish.png",
    star: "./assets/star.png",
    boat: "./assets/boat.png",
    mayak: "./assets/mayak.png",
};

const getFigure = (
    container: Sprite,
    i: number,
    j: number,
    xCoord: number,
    yCoord: number,
    random?: boolean,
): Sprite => {
    const randomValue = Math.round(Math.random() * 3);
    const figureTexture = Texture.from(random ? Object.values(textureData)[randomValue] : textureData[arr[i][j]]);

    const figure = new Sprite(figureTexture);
    figure.width = FIGURE_AND_SQUARE_SIZE;
    figure.height = FIGURE_AND_SQUARE_SIZE;
    figure.x = xCoord;
    figure.y = yCoord;
    figure.customData = {
        name: "figure",
        type: random ? Object.keys(textureData)[randomValue] : arr[i][j],
        position: { x: i, y: j },
    };
    figure.alpha = 0;
    gsap.to(figure, {
        alpha: 1,
        duration: 1,
        ease: "power1.out",
        onComplete: function () { },
    });

    figure.interactive = true;
    figure.buttonMode = true;
    figure.on("mousedown", onDragStart);
    figure.on("touchstart", onDragStart);
    figure.on("mouseup", onDragEnd);
    figure.on("mouseupoutside", onDragEnd);
    figure.on("touchend", onDragEnd);
    figure.on("touchendoutside", onDragEnd);
    figure.on("mousemove", onDragMove);
    figure.on("touchmove", onDragMove);

    function onDragStart(event: any) {
        const centerX = event.target.width / 2 + event.target.position.x;
        const centerY = event.target.height / 2 + event.target.position.y;
        capturedFigurePosition = { x: centerX, y: centerY };

        capturedFigure = event.target;
        if (capturedFigure) {
            capturedFigure.zIndex = 10000;
            capturedFigure.alpha = 0.5;
        }
    }
    function onDragEnd(event: any) {
        if (capturedFigure) {
            capturedFigure.alpha = 1;
        }
        if (wasReplaced) {
            if (capturedFigure && replacementFigure) {
                const tempX = capturedFigure.customData.position.x;
                const tempY = capturedFigure.customData.position.y;
                capturedFigure.customData.position.x = replacementFigure.customData.position.x;
                capturedFigure.customData.position.y = replacementFigure.customData.position.y;
                replacementFigure.customData.position.x = tempX;
                replacementFigure.customData.position.y = tempY;

                capturedFigure.position.set(
                    replacementFigurePosition.x - FIGURE_AND_SQUARE_SIZE / 2,
                    replacementFigurePosition.y - FIGURE_AND_SQUARE_SIZE / 2,
                );
            }
        } else {
            if (capturedFigure) {
                capturedFigure.position.set(
                    capturedFigurePosition.x - FIGURE_AND_SQUARE_SIZE / 2,
                    capturedFigurePosition.y - FIGURE_AND_SQUARE_SIZE / 2,
                );
            }
        }

        capturedFigure = null;
        capturedFigurePosition = null;
        replacementFigure = null;
        replacementFigurePosition = null;
        wasReplaced = false;
        const update = () => {
            const positions = getPositions(
                container.children
                    .filter((children) => children.customData.name === "figure")
                    .sort(
                        (a, b) =>
                            a.customData.position.x - b.customData.position.x ||
                            a.customData.position.y - b.customData.position.y,
                    ),
            );
            if (positions.length > 0) {
                positions.forEach((c) => {
                    const findElement = container.children.find(
                        (child) =>
                            child.customData.name === "figure" &&
                            child.customData.position.x === c.x &&
                            child.customData.position.y === c.y,
                    );
                    if (findElement) {
                        c.xCoord = findElement.x;
                        c.yCoord = findElement.y;
                        console.log("удалилось");
                        findElement.destroy();
                    }
                });
                console.log(positions);
                positions.forEach((c) => {
                    console.log("добавилось");
                    const figure = getFigure(container, c.x, c.y, c.xCoord, c.yCoord, true);
                    container.addChild(figure);
                });
                update();
            }
        }
        update();
    }

    function onDragMove(event: any) {
        const newPosition = event.data.getLocalPosition(container);

        if (capturedFigure) {
            capturedFigure.position.set(
                newPosition.x - FIGURE_AND_SQUARE_SIZE / 2,
                newPosition.y - FIGURE_AND_SQUARE_SIZE / 2,
            );
            const center1 = capturedFigure.getGlobalPosition();
            const findElement = container.children.find((children) => {
                return (
                    children?.customData?.name === "figure" &&
                    children.containsPoint({
                        x: center1.x + FIGURE_AND_SQUARE_SIZE / 2,
                        y: center1.y + FIGURE_AND_SQUARE_SIZE / 2,
                    }) &&
                    !(
                        capturedFigure.customData.position.x === children.customData.position.x &&
                        capturedFigure.customData.position.y === children.customData.position.y
                    )
                );
            }) as Sprite;
            const isCorrect1 = container.children.find((children) => {
                return (
                    children?.customData?.name === "square" &&
                    children.containsPoint({
                        x: center1.x + FIGURE_AND_SQUARE_SIZE / 2,
                        y: center1.y + FIGURE_AND_SQUARE_SIZE / 2,
                    }) &&
                    capturedFigure.customData.position.x === children.customData.position.x &&
                    capturedFigure.customData.position.y === children.customData.position.y
                );
            });
            if (isCorrect1) {
                if (replacementFigure && replacementFigurePosition) {
                    replacementFigure.alpha = 1;
                    replacementFigure.position.set(
                        replacementFigurePosition.x - FIGURE_AND_SQUARE_SIZE / 2,
                        replacementFigurePosition.y - FIGURE_AND_SQUARE_SIZE / 2,
                    );
                    wasReplaced = false;
                }
                return;
            }
            if (findElement) {
                const isNearElement =
                    Math.abs(
                        Math.abs(findElement.customData.position.x - capturedFigure.customData.position.x) +
                        Math.abs(findElement.customData.position.y - capturedFigure.customData.position.y),
                    ) === 1;

                if (isNearElement) {
                    if (replacementFigure) {
                        replacementFigure.alpha = 1;
                        if (replacementFigurePosition) {
                            replacementFigure.position.set(
                                replacementFigurePosition.x - FIGURE_AND_SQUARE_SIZE / 2,
                                replacementFigurePosition.y - FIGURE_AND_SQUARE_SIZE / 2,
                            );
                            wasReplaced = false;
                        }
                    }
                    replacementFigure = findElement;
                    const centerX = replacementFigure.width / 2 - replacementFigure.position.x;
                    const centerY = replacementFigure.height / 2 - replacementFigure.position.y;
                    replacementFigurePosition = { x: centerX, y: centerY };
                    replacementFigure.alpha = 0.5;

                    if (capturedFigurePosition) {
                        replacementFigure.position.set(
                            capturedFigurePosition.x - FIGURE_AND_SQUARE_SIZE / 2,
                            capturedFigurePosition.y - FIGURE_AND_SQUARE_SIZE / 2,
                        );
                        wasReplaced = true;
                    }
                } else {
                    if (replacementFigure) {
                        replacementFigure.alpha = 1;
                        if (replacementFigurePosition) {
                            replacementFigure.position.set(
                                replacementFigurePosition.x - FIGURE_AND_SQUARE_SIZE / 2,
                                replacementFigurePosition.y - FIGURE_AND_SQUARE_SIZE / 2,
                            );
                            wasReplaced = false;
                        }
                    }
                }
            } else {
                if (replacementFigure) {
                    replacementFigure.alpha = 1;
                }
            }
        }
    }
    return figure;
};

const getContainer = () => {
    const texture = Texture.from("./assets/FRAME.png");
    const container = new Sprite(texture);
    container.anchor.set(0.5, 0.5);
    container.position.set(window.innerWidth / 2, window.innerHeight / 2);
    container.width = CONTAINER_SIZE;
    container.height = CONTAINER_SIZE;

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const square = new Graphics();
            const xCoord = i * FIGURE_AND_SQUARE_SIZE + i * FIGURE_AND_SQUARE_SIZE_PADDING - CONTAINER_DIFFERENCE;
            const yCoord = j * FIGURE_AND_SQUARE_SIZE + j * FIGURE_AND_SQUARE_SIZE_PADDING - CONTAINER_DIFFERENCE;
            square.beginFill(0xffffff);
            square.drawRect(xCoord, yCoord, FIGURE_AND_SQUARE_SIZE, FIGURE_AND_SQUARE_SIZE);
            square.endFill();
            square.alpha = 0;
            square.customData = {
                name: "square",
                position: { x: i, y: j },
            };
            const figure: Sprite = getFigure(container, i, j, xCoord, yCoord);

            container.addChild(square);
            container.addChild(figure);
        }
    }
    container.interactive = true;

    resizeEmitter.on("resize", (width, height) => {
        container.position.set(width / 2, height / 2);
    });
    return container;
};
