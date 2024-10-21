import {
	b2BodyType,
	b2EdgeShape,
	b2World,
	type b2BodyDef,
	b2Vec2,
	b2Body,
	b2PolygonShape,
	type b2FixtureDef,
	b2CircleShape,
	b2WeldJointDef
} from '@box2d/core';
//All numbers here must be in meters or meter based units

export const createSimulation = (gravity: { x: number; y: number }) => {
	return b2World.Create(new b2Vec2(gravity.x, gravity.y));
};

export const createWalls = (width: number, height: number, world: b2World) => {
	const bodyDef: b2BodyDef = {
		type: b2BodyType.b2_staticBody,
		position: new b2Vec2(0)
	};

	const wallsBody = world.CreateBody(bodyDef);

	const edgeShape = new b2EdgeShape();
	edgeShape.SetTwoSided(new b2Vec2(-1, -1), new b2Vec2(0, height));
	wallsBody.CreateFixture({ shape: edgeShape });

	edgeShape.SetTwoSided(new b2Vec2(width + 1, -1), new b2Vec2(width, height));
	wallsBody.CreateFixture({ shape: edgeShape });

	edgeShape.SetTwoSided(new b2Vec2(-1, 0 - 1), new b2Vec2(width, 0));
	wallsBody.CreateFixture({ shape: edgeShape });

	edgeShape.SetTwoSided(new b2Vec2(-1, height + 1), new b2Vec2(width, height));
	wallsBody.CreateFixture({ shape: edgeShape });

	return wallsBody;
};

export const createGround = (width: number, height: number, world: b2World) => {
	const groundBodyDef: b2BodyDef = {
		position: { x: width / 2, y: 1.4 }
	};

	const groundBody: b2Body = world.CreateBody(groundBodyDef);

	const groundShape = new b2PolygonShape();
	groundShape.SetAsBox(width / 2, height / 2); // Slope angle

	groundBody.CreateFixture({
		shape: groundShape,
		density: 1
	});

	return groundBody;
};

export const createBall = (radius: number, world: b2World) => {
	const ballBodyDef: b2BodyDef = {
		position: {
			x: 1,
			y: 0.5
		},
		type: b2BodyType.b2_dynamicBody
	};

	const ballBody = world.CreateBody(ballBodyDef);

	const ballShape = new b2CircleShape();
	ballShape.m_radius = radius;

	const ballFixtureDef: b2FixtureDef = {
		shape: ballShape,
		density: 15.4, // Density of the ball
		friction: 0.3,
		restitution: 0.7 // Bounciness
	};

	ballBody.CreateFixture(ballFixtureDef);

	return ballBody;
};

export const createPoleCantilever = (
	numberOfSegment: number,
	prevBody: b2Body,
	world: b2World,
	baseWidth: number,
	baseHeight: number,
	positionX: number
) => {
	const jd = new b2WeldJointDef();

	const Cantilevers: b2Body[] = [];
	for (let i = 0; i < numberOfSegment; ++i) {
		const shape = new b2PolygonShape();
		shape.SetAsBox(baseWidth / 2 - (i / 2) * 0.004, baseHeight / 2);

		const fd: b2FixtureDef = {
			shape,
			density: 1000,
			restitution: 0.1
		};

		// Add it to the stage to render
		const body = world.CreateBody({
			type: b2BodyType.b2_dynamicBody,
			position: { x: positionX, y: 1.25 - 0.1 * i }
		});
		body.CreateFixture(fd);
		Cantilevers.push(body);

		const anchor = new b2Vec2(positionX, 1.3 - 0.1 * i);
		jd.Initialize(prevBody, body, anchor);
		jd.stiffness = 900;
		jd.damping = 800;
		world.CreateJoint(jd);
		prevBody = body;
	}
	return Cantilevers;
};

export const createOriginBody = (world: b2World) => {
	const originBodyDef: b2BodyDef = {};
	originBodyDef.position = { x: 0, y: 0 }; // Positioned at the world's origin
	const originBody = world.CreateBody(originBodyDef);

	return originBody;
};
