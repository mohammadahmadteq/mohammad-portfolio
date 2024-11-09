import {
	b2AABB,
	b2Body,
	b2BodyType,
	b2Fixture,
	b2MouseJoint,
	b2MouseJointDef,
	b2Vec2,
	type b2World
} from '@box2d/core';
import type { FederatedPointerEvent } from 'pixi.js';

export let mouseJoint: b2MouseJoint | null = null;

const mouse = new b2Vec2();

export function getBodyAtMouse(world: b2World) {
	const aabb = new b2AABB();
	const d = 0.001;
	aabb.lowerBound.Set(mouse.x - d, mouse.y - d);
	aabb.upperBound.Set(mouse.x + d, mouse.y + d);

	let selectedBody: b2Body = {} as b2Body;

	// Query the world for overlapping shapes
	world.QueryAABB(aabb, (fixture: b2Fixture) => {
		if (fixture.GetBody().GetType() !== b2BodyType.b2_staticBody) {
			if (fixture.TestPoint(mouse)) {
				selectedBody = fixture.GetBody();
				return false; // Terminate query
			}
		}
		return true;
	});

	return selectedBody as b2Body;
}
export function onPointerDown(
	event: FederatedPointerEvent,
	world: b2World,
	referenceBody: b2Body,
	scale: number
) {
	updateMousePosition(event, scale);

	const body: b2Body = getBodyAtMouse(world);

	if (Object.keys(body).length > 0) {
		const mouseJointDef = new b2MouseJointDef();
		mouseJointDef.bodyA = referenceBody;
		mouseJointDef.bodyB = body;
		mouseJointDef.target.Copy(mouse);
		mouseJointDef.maxForce = 10000 * body.GetMass();
		mouseJointDef.stiffness = 100;
		mouseJointDef.damping = 5;
		mouseJoint = world.CreateJoint(mouseJointDef);
		body.SetAwake(true);
	}
}

export function onPointerMove(event: FederatedPointerEvent, scale: number) {
	updateMousePosition(event, scale);

	if (mouseJoint) {
		mouseJoint.SetTarget(mouse);
	}
}

export function onPointerUp(event: FederatedPointerEvent, world: b2World) {
	if (event && mouseJoint) {
		world.DestroyJoint(mouseJoint);
		mouseJoint = null;
	}
}

export function updateMousePosition(event: FederatedPointerEvent, scale: number) {
	const pointerPosition = event.global;
	mouse.Set(pointerPosition.x / scale, pointerPosition.y / scale);
}
