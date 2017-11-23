/**
 * Storage for game textures
 * @type {{_: string, *: string, #: string, $: string, ^: string}}
 */
const textures = {
    '_': 'img/terrain/earth.png',
    '*': 'img/terrain/bushes1.png',
    '#': 'img/terrain/bushes0.png',
    '$': 'img/actors/DoomKnight.png',
    '^': 'img/bonuses/apple.png'
};
/**
 * Game field matrix, size and textures
 * @type {[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]}
 */
const matrix =
    [
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_']
    ];

class GameController {
    constructor() {
        this.eventsController = new EventsController(this.setDirection.bind(this));
        this.player = new Player({sWidth: 32, sHeight: 32, sX: 0, sY: 0, width: 32, height: 32, x: 150, y: 150, key: '$'});
        this.canvas = new Canvas(matrix, textures, {width: 32, height: 32}, this.prepareObjectsData.bind(this));
        this.bonus = new Bonus({sWidth: 22, sHeight: 22, sX: 0, sY: 0, width: 22, height: 22, x: 200, y: 200, key: '^'});
        console.log(this.player);
    }

    /**
     * Sets and controls direction and coordinates for moving
     * @param direction
     */
    setDirection(direction) {
        this.player.move(direction);
    }

    prepareObjectsData() {
        let objData = [];
        const playerData = {
            sX: this.player.sX,
            sY: this.player.sY,
            sWidth: this.player.sWidth,
            sHeight: this.player.sHeight,
            x: this.player.x,
            y: this.player.y,
            width: this.player.width,
            height: this.player.height,
            key: this.player.key,
            speed: this.player.speed
        };
        const bonusData = {
            sX: this.bonus.sX,
            sY: this.bonus.sY,
            sWidth: this.bonus.sWidth,
            sHeight: this.bonus.sHeight,
            x: this.bonus.x,
            y: this.bonus.y,
            width: this.bonus.width,
            height: this.bonus.height,
            key: this.bonus.key
        };

        objData.push(playerData, bonusData);
        return objData;
    }
}

/**
 * Class for canvas creation and rendering
 */
class Canvas {
    constructor(matrix, texturesData, tileData, getObjectsData) {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');

        this.fieldMatrix = matrix;
        this.texturesData = texturesData;
        this.tileData = tileData;
        this.getObjectsData = getObjectsData;
        this.field = {
            width: 0,
            height: 0
        };

        this.textures = {};
        this.preLoadData(Canvas.createCanvas);
    }

    setCanvasSize(matrixWidth, matrixHeight) {
        this.canvas.width = this.tileData.width * matrixWidth;
        this.canvas.height = this.tileData.height * matrixHeight;
        this.canvas.style.width = `${this.canvas.width}px`;
        this.canvas.style.height = `${this.canvas.height}px`;
    }

    drawField() {
        for (let i = 0; i < this.field.height; i++) {
            for (let j = 0; j < this.field.width; j++) {
                const key = this.fieldMatrix[i][j];
                const image = this.textures[key];
                const destX = j * this.tileData.width;
                const destY = i * this.tileData.height;
                this.context.drawImage(
                    image,
                    destX,
                    destY,
                    this.tileData.width,
                    this.tileData.height);
            }
        }
    }

    drawObjects() {
        let drawData = this.getObjectsData();
        drawData.forEach((gameObject) => {
            const image = this.textures[gameObject.key];
            this.context.drawImage(
                image,
                gameObject.sX,
                gameObject.sY,
                gameObject.sWidth,
                gameObject.sHeight,
                gameObject.x,
                gameObject.y,
                gameObject.width,
                gameObject.height);
        })
    }

    renderFrame() {
        this.context.clearRect(0, 0, this.field.width, this.field.height);
        this.drawField();
        this.drawObjects();
        setTimeout(() => {
            requestAnimationFrame(() => {
                this.renderFrame()
            });
        }, 0)
    }

    handleLoad() {
        this.counter++;
        if (this.counter === this.length) {
            this.callback();
        }
    }

    static createCanvas() {
        this.field.height = this.fieldMatrix.length;
        this.field.width = this.fieldMatrix[0].length;
        this.setCanvasSize(this.field.width, this.field.height);
        requestAnimationFrame(() => {
            this.renderFrame()
        });
    }

    preLoadData(callback) {
        const self = {
            counter: 0,
            length: 0,
            callback: callback.bind(this)
        };
        _.forOwn(this.texturesData, (value, key) => {
            self.length++;
            let image = new Image();
            image.onload = this.handleLoad.bind(self);
            image.src = this.texturesData[key];
            this.textures[key] = image;
        });
    }
}

/**
 * Controls game events
 */
class EventsController {
    constructor(setDirection) {
        this.setDirection = setDirection;
        this.keys = {
            arrowUp: 38,
            arrowDown: 40,
            arrowLeft: 37,
            arrowRight: 39,
            spaceBar: 32,
            w: 87,
            s: 83,
            a: 65,
            d: 68,
            rightShift: 16
        };

        document.addEventListener('keydown', (event) => {
            const key = event.keyCode;
            let direction = this.handleDirection(key);
            this.setDirection(direction);
        })
    }

    handleDirection(keyCode) {
        let action = '';
        switch (keyCode) {
            case this.keys.arrowUp:
            case this.keys.w:
                action = 'up';
                break;

            case this.keys.arrowDown:
            case this.keys.s:
                action = 'down';
                break;

            case this.keys.arrowLeft:
            case this.keys.a:
                action = 'left';
                break;

            case this.keys.arrowRight:
            case this.keys.d:
                action = 'right';
                break;

            case this.keys.spaceBar:
            case this.keys.shiftKey:
                action = 'shoot';
                break
        }
        return action
    }
}

/**
 * Class for every object in the game
 */
class GameObject {
    constructor({key = '', width = 100, height = 100, x = 25, y = 25, sX, sY, sWidth, sHeight}) {
        this._key = key;
        this._width = width;
        this._height = height;
        this._x = x;
        this._y = y;
        this._sX = sX;
        this._sY = sY;
        this._sWidth = sWidth;
        this._sHeight = sHeight;
    }

    get key() {
        return this._key;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get x() {
        return this._x;
    }

    set x(newX) {
        this._x = newX;
    }

    get y() {
        return this._y;
    }

    set y(newY) {
        this._y = newY;
    }

    get sX() {
        return this._sX;
    }

    get sY() {
        return this._sY;
    }

    get sWidth() {
        return this._sWidth;
    }

    get sHeight() {
        return this._sHeight;
    }

    destroy() {
        //removes class instance from {...}
    }

}

class MovableObject extends GameObject {
    constructor(gmObjectParams, speed = 10) {
        super(gmObjectParams);

        this._speed = speed
    }

    move(direction) {
        switch (direction) {
            case 'up':
                this.y -= this.speed;
                break;

            case 'down':
                this.y += this.speed;
                break;

            case 'left':
                this.x -= this.speed;
                break;

            case 'right':
                this.x += this.speed;
                break;
        }
    }

    get speed() {
        return this._speed;
    }

    set speed(newSpeed) {
        this._speed = newSpeed;
    }
}

class Weapon extends MovableObject {
    constructor(gmObjectParams, damage) {
        super(gmObjectParams, damage);

        this._damage = damage;
        this._direction = direction;
    }

    get damage() {
        return this._damage
    }

    set damage(newDamage) {
        this._damage = newDamage;
    }

}

class Character extends MovableObject {
    /**
     *
     * @param gmObjectParams
     * @param damage
     * @param lives
     * @param health
     * @param speed
     */
    constructor(gmObjectParams, speed, damage = 10, lives, health) {
        super(gmObjectParams, speed, damage);
        this._lives = lives;
        this._health = health;
        this._weapon = null;
    }

    get lives() {
        return this._lives;
    }

    set lives(newLives) {
        this._lives = newLives;
    }

    get health() {
        return this._health;
    }

    set health(newHealth) {
        this._health = newHealth
    }

    get weapon() {
        return this._weapon;
    }

    receiveDamage() {
        //receives damage from weapon
    }

    // hit(damage) {
    //     this.health -= damage;
    //     if (this._health <= 0) {
    //         this.kill();
    //     }
    // }
}

class Player extends Character {
    constructor(gmObjectParams, speed, lives = 3, health = 100) {
        super(gmObjectParams, speed, lives, health);
    }

    updateStats() {
        //updates self-stats
    }
}

class Enemy extends Character {
    constructor(gmObjectParams, health, lives = 1) {
        super(gmObjectParams, health, lives);

    }
}

class StaticObject extends GameObject {
    constructor(gmObjectParams) {
        super(gmObjectParams)
    }

    //подумать о том нужен ли тип вместо этих двух абстракций?
    setPosition() {
        //triggers when there are no default position coordinates
    }
}

class Bonus extends StaticObject {
    constructor(gmObjectParams) {
        super(gmObjectParams)
    }
}

class Barrier extends StaticObject {
    constructor(gmObjectParams) {
        super(gmObjectParams)
    }
}

new GameController();
