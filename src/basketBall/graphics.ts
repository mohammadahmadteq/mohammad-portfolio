import { Application, Assets, Graphics, Sprite, Text, type Renderer } from 'pixi.js';

//All numbers here must be in meters
export type TCreateSprite = (
	scale: number,
	size: {
		width?: number;
		height?: number;
		radius?: number;
	},
	graphicsEngine: Application<Renderer>
) => Promise<Sprite | Graphics>;

export type TCreateGraphic = (
	scale: number,
	size: {
		width?: number;
		height?: number;
		radius?: number;
	},
	graphicsEngine: Application<Renderer>
) => Sprite | Graphics;

type TCreateGraphicsArray = (
	scale: number,
	size: {
		width?: number;
		height?: number;
		radius?: number;
	},
	graphicsEngine: Application<Renderer>,
	numberOfSegments: number
) => Graphics[];
export const createBallSprite: TCreateSprite = async (scale, size, graphicsEngine) => {
	const texture = await Assets.load('src/assets/sprites/basketBall.png');

	if (!size.radius) {
		throw new Error('Radius is undefined');
	}
	const basketBall = new Sprite(texture);
	basketBall.width = size.radius * scale * 2;
	basketBall.height = size.radius * scale * 2;
	basketBall.anchor.set(0.5, 0.5);
	graphicsEngine.stage.addChild(basketBall);

	return basketBall;
};

export const createGroundGraphics: TCreateGraphic = (scale, groundSize, graphicsEngine) => {
	if (!groundSize.width || !groundSize.height) {
		throw new Error('Radius is undefined');
	}
	const groundObject = new Graphics()
		.rect(0, 0, groundSize.width * scale, groundSize.height * scale)
		.fill({
			color: '#575a8a'
		});
	groundObject.pivot.set(groundObject.width / 2, groundObject.height / 2);
	graphicsEngine.stage.addChild(groundObject);
	return groundObject;
};

export const createHoopSprite: TCreateSprite = async (scale, hoopSize, graphicsEngine) => {
	if (!hoopSize.width || !hoopSize.height) {
		throw new Error('Radius is undefined');
	}

	const textureHoop = await Assets.load('src/assets/sprites/hoop.png');
	const hoop = new Sprite(textureHoop);

	hoop.width = hoopSize.width * scale;
	hoop.height = hoopSize.height * scale;
	hoop.anchor.set(1, 0);
	graphicsEngine.stage.addChild(hoop);
	return hoop;
};

export const createGraphicsEngine = async (canvasContainer: Element) => {
	const app = new Application();
	await app.init({
		width: canvasContainer.clientWidth,
		height: canvasContainer.clientHeight,
		backgroundAlpha: 0
	});
	return app;
};

export const createScoreText = (points: number, graphicsEngine: Application<Renderer>) => {
	const scoreText = new Text({ text: `Score: ${points}`, style: { fill: '#575a8a' } });
	scoreText.x = 50; // X position IN PIXELS
	scoreText.y = 50; // Y position IN PIXELS
	graphicsEngine.stage.addChild(scoreText);
	return scoreText;
};

export const createPoleCantileverGraphics: TCreateGraphicsArray = (
	scale,
	cantileverBaseSize,
	graphicsEngine,
	numberOfSegments: number
) => {
	const graphics: Graphics[] = [];
	if (!cantileverBaseSize.width || !cantileverBaseSize.height) {
		throw new Error('Radius is undefined');
	}

	for (let index = 0; index < numberOfSegments; ++index) {
		const cant = new Graphics()
			.rect(
				0,
				0,
				(cantileverBaseSize.width - index * 0.004) * scale,
				cantileverBaseSize.height * scale
			)
			.fill({
				color: '#2e2f44'
			});
		cant.pivot.set(cant.width / 2, cant.height / 2);
		graphicsEngine.stage.addChild(cant);
		graphics.push(cant);
	}

	return graphics;
};
