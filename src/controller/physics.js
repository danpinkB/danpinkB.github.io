const DEFCONFIG = {
    g: 0.4,
    accelerationDec: 0.99,
    movementSpeed: 0.05,
    impulsePower: 2,
    staticObjects:[],
    dynamicObjects:[],
    gravitationPoints:[]
}

let CONFIG;
const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

const attractToPoint = (object, toPoint, koef = 1, gPower = CONFIG.g) => {
    if (object.acceleration == undefined)
        return;
    const centerPosition = getCenterPoint(object);

    const toDirection = new PIXI.Point(
        toPoint.x - centerPosition.x,
        toPoint.y - centerPosition.y,
    );

    const angleToDirection = Math.atan2(
        toDirection.y,
        toDirection.x,
    );

    object.acceleration.set(
        object.acceleration.x + Math.cos(angleToDirection) * gPower * koef,
        object.acceleration.y + Math.sin(angleToDirection) * gPower * koef,
    );
}

const moveToPoint = (object, speed = 10) =>{
    const centerPosition = getCenterPoint(object);

    const toPoint = new PIXI.Point(
        object.x + 10000,
        object.y + object.height
    );

    const toDirection = new PIXI.Point(
        toPoint.x - centerPosition.x,
        toPoint.y - centerPosition.y,
    );

    const angleToDirection = Math.atan2(
        toDirection.y,
        toDirection.x,
    );
    
    speed = typeof(speed) == 'function'?speed():speed;

    object.acceleration.set(
        Math.cos(angleToDirection) * speed,
        Math.sin(angleToDirection) * speed,
    );
}

const moveToRight = (object,speed = 10) =>{
    const centerPosition = getCenterPoint(object);

    const toPoint = new PIXI.Point(
        object.x + 10000,
        object.y + object.height * 0.5
    );

    const toDirection = new PIXI.Point(
        toPoint.x - centerPosition.x,
        toPoint.y - centerPosition.y,
    );

    const angleToDirection = Math.atan2(
        toDirection.y,
        toDirection.x,
    );
    
    speed = typeof(speed) == 'function'?speed():speed;

    object.acceleration.set(
        Math.cos(angleToDirection) * speed,
        object.acceleration.y,
    );
}

const getCenterPoint = (object) => {
    return new PIXI.Point(
        object.x + (object.width * 0.5),
        object.y + (object.height * 0.5),
    );
}

const testPlatformCollision = (object1, object2) => {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();
    return (bounds1.y+bounds1.height<=bounds2.y &&
    bounds1.x+bounds1.width>bounds2.x &&
    bounds1.x<bounds2.x+bounds2.width) && 
    (bounds1.y + bounds1.height + object1.acceleration.y > bounds2.y);
}

const testCirclesCollision = (circle1, circle2) => {
    const bounds1 = circle1.getBounds();
    const bounds2 = circle2.getBounds();
    const point1 = new PIXI.Point(
        bounds1.x + bounds1.width *0.5,
        bounds1.y + bounds1.height *0.5,
    );
    const point2 = new PIXI.Point(
        bounds2.x + bounds2.width *0.5,
        bounds2.y + bounds2.height *0.5,
    );
    collisionRadius = bounds1.width * 0.5 + bounds2.width * 0.5;
    return (getDistance(point1, point2) < collisionRadius);
}

const collisionResponse = (object1, object2) => {
    if (!object1 || !object2) {
        return new PIXI.Point(0);
    }

    const vCollision = new PIXI.Point(
        object2.x - object1.x,
        object2.y - object1.y,
    );

    const distance = Math.sqrt(
        (object2.x - object1.x) * (object2.x - object1.x)
        + (object2.y - object1.y) * (object2.y - object1.y),
    );

    const vCollisionNorm = new PIXI.Point(
        vCollision.x / distance,
        vCollision.y / distance,
    );

    const vRelativeVelocity = new PIXI.Point(
        object1.acceleration.x - object2.acceleration.x,
        object1.acceleration.y - object2.acceleration.y,
    );

    const speed = vRelativeVelocity.x * vCollisionNorm.x
        + vRelativeVelocity.y * vCollisionNorm.y;

    const impulse = CONFIG.impulsePower * speed / (object1.mass + object2.mass);

    return new PIXI.Point(
        impulse * vCollisionNorm.x,
        impulse * vCollisionNorm.y,
    );
}

const getDistance = (point1, point2) => {
    const a = point1.x - point2.x;
    const b = point1.y - point2.y;

    return Math.hypot(a, b);
}

const checkScreenOver = (object, app) => {
    if (object.x < 0) {
        if (object.acceleration.x > 0)
            object.acceleration.x = object.acceleration.x;
        else {
            object.acceleration.x = -object.acceleration.x * 0.5;
        }
        object.acceleration.y = object.acceleration.y * 0.9;
    }
    if (object.x > (app.screen.width - object.width)) {
        if (object.acceleration.x < 0)
            object.acceleration.x = object.acceleration.x;
        else {
            object.acceleration.x = -object.acceleration.x * 0.5;
        }
        object.acceleration.y = object.acceleration.y * 0.9;
    }

    if (object.y < 0) {
        if (object.acceleration.y > 0) {
            object.acceleration.y = object.acceleration.y;
        } else {
            object.acceleration.y = - object.acceleration.y * 0.5;
        }
        object.acceleration.x = object.acceleration.x * 0.9;
    }
    if (object.y > (app.screen.height - object.height)) {
        if (object.acceleration.y < 0) {
            object.acceleration.y = object.acceleration.y;
        } else {
            object.acceleration.y = - object.acceleration.y * 0.5;
        }
        object.acceleration.x = object.acceleration.x * 0.9;
    }
}

const setGravitationPoint = (object, graviConfig = CONFIG)=>{
    object.graviConfig = {
        forceMode:'constraint',
        forceRadius: Infinity,
        forceFunction: (force, distance)=>force/distance,
        force:10,
    };
    if (CONFIG.gravitationPoints.indexOf(object) == -1)
    {  
        CONFIG.gravitationPoints.push(object);
    }
}

const setStaticObject = (object)=>{
    object.isStatic = true;
    if (CONFIG.staticObjects.indexOf(object) == -1)
    {
        if (CONFIG.dynamicObjects.indexOf(object) != -1)
        {
            CONFIG.dynamicObjects.splice(CONFIG.dynamicObjects.indexOf(object),1)
        }
        CONFIG.staticObjects.push(object);
    }
}

const setDynamicObject = (object, isAttractive = false)=>{
    object.isAttractive = isAttractive;
    if (CONFIG.dynamicObjects.indexOf(object) == -1)
    {
        if (CONFIG.staticObjects.indexOf(object) != -1)
        {
            CONFIG.staticObjects.splice(CONFIG.staticObjects.indexOf(object),1)
        }
        CONFIG.dynamicObjects.push(object);
    }
}

const tick = (delta) => {
    const {accelerationDec, dynamicObjects, staticObjects, gravitationPoints} = CONFIG;
    dynamicObjects.forEach(object=>{
        object.acceleration.set(object.acceleration.x * accelerationDec, object.acceleration.y * accelerationDec);
        // moveToRight(object,1);
    });
    dynamicObjects.forEach(object=>{
        if (object.isAttractive){
            gravitationPoints.forEach(gObject=>{
                const objectCenter = getCenterPoint(object);
                const point = new PIXI.Point(gObject.x,gObject.y);
                const dist = getDistance(objectCenter, point);
                if (gObject.graviConfig.forceRadius>=dist){
                    if (gObject.graviConfig.forceMode == 'constraint')
                        attractToPoint(object,point,1,gObject.force);
                }
            });
        }
    });
    dynamicObjects.forEach(object=>{
        if (object.acceleration.y>=0){
            staticObjects.forEach((staticObject)=>{
                if (testPlatformCollision(object, staticObject))
                {
                    const bound = staticObject.getBounds()
                    object.y = bound.y - 44;
                    object.acceleration.y = 0;
                    object.isFall = false;
                }
            });
        }
    });
    dynamicObjects.forEach(object=>{
        object.x+=object.acceleration.x * delta;
        object.y+=object.acceleration.y * delta;
    });
    
}

const physics = (config = {}) => {

    CONFIG = Object.assign(DEFCONFIG, config);
    return {
        setGravitationPoint,
        setDynamicObject,
        setStaticObject,
        tick
    }
    
}