<script lang="ts">
	import { onDestroy, onMount, tick } from 'svelte';

	import type { b2StepConfig } from '@box2d/core/dist/dynamics/b2_time_step';

	import {
		createBallSprite,
		createGraphicsEngine,
		createGroundGraphics,
		createHoopSprite,
		createPoleCantileverGraphics,
		createScoreText
	} from '../basketBall/graphics';
	import { type Application, type Renderer, Rectangle } from 'pixi.js';
	import { onPointerDown, onPointerMove, onPointerUp } from '../basketBall/mouseInteractions';
	import {
		createBall,
		createGround,
		createOriginBody,
		createPoleCantilever,
		createSimulation,
		createWalls
	} from '../basketBall/physics';

	export let fontSize: number;
	let canvasContainer: Element | null = null;
	let graphicsEngine: Application<Renderer> | null = null;

	let points = 0;

	let isClick: boolean;

	// Time step and frame rate
	const timeStep = 1 / 120;
	const stepConfig: b2StepConfig = {
		velocityIterations: 16,
		positionIterations: 6
	};

	const baseScale = 256;

	const initializeBasketBall = async (fontSize: number) => {
		if (graphicsEngine) {
			graphicsEngine.destroy(true);
			graphicsEngine = null;
		}
		if (canvasContainer && canvasContainer.childNodes.length > 0) {
			canvasContainer.innerHTML = ''; // Clear the container to prevent buildup of child nodes
		}
		const scale = baseScale * (fontSize / 16);
		const world = createSimulation({
			x: 0,
			y: 10
		});

		if (canvasContainer) {
			const basketBallSize = {
				radius: 0.08 //Meters
			};

			const groundSize = {
				width: canvasContainer.clientWidth / scale, //Meters
				height: 0.25 //Meters
			};

			const hoopSize = {
				width: 0.22, //Meters
				height: 0.3 //Meters
			};

			const cantileverPosition =
				window.screen.width <= 576
					? (canvasContainer.clientWidth - 30) / scale
					: (canvasContainer.clientWidth - 80) / scale;

			const wallsBody = createWalls(
				canvasContainer.clientWidth / scale,
				canvasContainer.clientHeight / scale,
				world
			);
			const groundBody = createGround(groundSize.width, groundSize.height, world);
			const originBody = createOriginBody(world);
			const basketBallBody = createBall(basketBallSize.radius, world);
			const Cantilevers = createPoleCantilever(
				10,
				originBody,
				world,
				0.05,
				0.1,
				cantileverPosition
			);

			graphicsEngine = await createGraphicsEngine(canvasContainer);
			if (canvasContainer.childNodes.length > 0) {
				canvasContainer.innerHTML = '';
			}
			await tick();
			canvasContainer.appendChild(graphicsEngine.canvas);

			const basketBallSprite = await createBallSprite(scale, basketBallSize, graphicsEngine);
			const hoopSprite = await createHoopSprite(scale, hoopSize, graphicsEngine);
			const groundGraphic = createGroundGraphics(scale, groundSize, graphicsEngine);
			const scoreText = createScoreText(points, graphicsEngine);
			const CantileverGraphics = createPoleCantileverGraphics(
				scale,
				{
					width: 0.05,
					height: 0.1
				},
				graphicsEngine,
				10
			);

			if (graphicsEngine) {
				graphicsEngine.stage.on('pointerdown', event => {
					onPointerDown(event, world, originBody, scale);
					isClick = true;
				});
				graphicsEngine.stage.on('pointermove', event => onPointerMove(event, scale));
				graphicsEngine.stage.on('pointerup', event => {
					onPointerUp(event, world);
					isClick = false;
				});
				graphicsEngine.stage.on('pointerupoutside', event => {
					onPointerUp(event, world);
					isClick = false;
				}); // Handle pointer up outside canvas
				graphicsEngine.stage.interactive = true;
				graphicsEngine.stage.hitArea = graphicsEngine.screen;
			}

			//----------------------------------------------------------------------------------

			// Custom hit test function
			function hitTestRectangle(r1: any, r2: any) {
				return (
					r1.x + r1.width > r2.x &&
					r1.x < r2.x + r2.width - 10 &&
					r1.y + r1.height - 30 > r2.y &&
					r1.y < r2.y + r2.height
				);
			}

			// Usage

			//---------------------------------------------------------------------------------------------------

			graphicsEngine.ticker.add(() => {
				world.Step(timeStep, stepConfig);
				groundGraphic.position = {
					x: groundBody.GetPosition().x * scale,
					y: groundBody.GetPosition().y * scale
				};
				basketBallSprite.position = {
					x: basketBallBody.GetPosition().x * scale,
					y: basketBallBody.GetPosition().y * scale
				};
				basketBallSprite.rotation = basketBallBody.GetAngle();

				for (let i = 0; i < CantileverGraphics.length; i++) {
					CantileverGraphics[i].position = {
						x: Cantilevers[i].GetPosition().x * scale,
						y: Cantilevers[i].GetPosition().y * scale
					};
					CantileverGraphics[i].rotation = Cantilevers[i].GetAngle();
				}

				hoopSprite.position = {
					x: Cantilevers[Cantilevers.length - 1].GetPosition().x * scale,
					y: Cantilevers[Cantilevers.length - 1].GetPosition().y * scale
				};
				hoopSprite.rotation = Cantilevers[Cantilevers.length - 1].GetAngle();

				//--------------------------------------------------------
				const basketBallBounds = basketBallSprite.getBounds();

				const hoopBounds = hoopSprite.getBounds();

				const oneSixthHeight = hoopBounds.height / 6;

				const topOneSixthBounds2 = new Rectangle(
					hoopBounds.x,
					hoopBounds.y,
					hoopBounds.width,
					oneSixthHeight
				);

				if (hitTestRectangle(basketBallBounds, topOneSixthBounds2) && !isClick) {
					points++;
					scoreText.text = `Score: ${points}`;
				}
				//--------------------------------------------------------------------
			});
		}
	};

	let prevWidth: number;

	const resizeCanvas = async () => {
		const width = window.innerWidth;
		if (width !== prevWidth) {
			await initializeBasketBall(fontSize);
		}
	};

	onMount(async () => {
		prevWidth = window.innerWidth;
	});

	onDestroy(async () => {
		if (graphicsEngine) {
			graphicsEngine.destroy(true);
			graphicsEngine = null;
		}
		canvasContainer = null;
	});

	$: initializeBasketBall(fontSize);
</script>

<svelte:window on:resize={resizeCanvas} />
<div bind:this={canvasContainer} style="width: 100%; height: 21.875rem;"></div>

<style>
</style>
