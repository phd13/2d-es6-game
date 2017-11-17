class Main {
    constructor() {

    }
}

class Canvas {
    constructor(matrix, texturesData, tileData) {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');

        this.fieldMatrix = matrix;
        this.texturesData = texturesData;
        this.tileData = tileData;

        this.textures = {};
        this.preLoadData();
        setTimeout(() => {
            this.drawField()
        }, 1000);
    }

    setCanvasSize(matrixWidth, matrixHeight) {
        this.canvas.width = this.tileData.width * matrixWidth;
        this.canvas.height = this.tileData.height * matrixHeight;
        this.canvas.style.width = `${this.canvas.width}px`;
        this.canvas.style.height = `${this.canvas.height}px`;
    }

    drawField() {
        let height = this.fieldMatrix.length,
            width = this.fieldMatrix[0].length;
        this.setCanvasSize(width, height);
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                let key = this.fieldMatrix[i][j];
                let image = this.textures[key];
                let destX = j * this.tileData.width;
                let destY = i * this.tileData.height;
                this.context.drawImage(image, destX, destY, this.tileData.width, this.tileData.height);
            }
        }
    }

    preLoadData() {
        for (let prop in this.texturesData) {
            if (this.texturesData.hasOwnProperty(prop)) {
                let image = new Image();
                image.src = this.texturesData[prop];
                this.textures[prop] = image;
            }
        }
    }
}

let textures = {
    '_': '/Users/phd_13/Documents/game/img/terrain/earth.png',
    '*': '/Users/phd_13/Documents/game/img/terrain/bushes1.png',
    '#': '/Users/phd_13/Documents/game/img/terrain/bushes0.png',
};

let matrix =
    [
        ['_', '_', '_', '_', '*', '_', '_', '_', '_', '*', '_', '_', '_', '_', '*'],
        ['_', '_', '_', '_', '#', '_', '_', '_', '_', '#', '_', '_', '_', '_', '#'],
        ['_', '_', '_', '_', '#', '_', '_', '_', '_', '#', '_', '_', '_', '_', '#'],
        ['_', '_', '_', '_', '*', '_', '_', '_', '_', '*', '_', '_', '_', '_', '*'],
        ['_', '_', '_', '_', '*', '_', '_', '_', '_', '*', '_', '_', '_', '_', '*'],
        ['_', '_', '_', '_', '#', '_', '_', '_', '_', '#', '_', '_', '_', '_', '#'],
        ['_', '_', '_', '_', '#', '_', '_', '_', '_', '#', '_', '_', '_', '_', '#'],
        ['_', '_', '_', '_', '*', '_', '_', '_', '_', '*', '_', '_', '_', '_', '*'],
        ['_', '_', '_', '_', '*', '_', '_', '_', '_', '*', '_', '_', '_', '_', '*'],
        ['_', '_', '_', '_', '#', '_', '_', '_', '_', '#', '_', '_', '_', '_', '#'],
        ['_', '_', '_', '_', '#', '_', '_', '_', '_', '#', '_', '_', '_', '_', '#'],
        ['_', '_', '_', '_', '*', '_', '_', '_', '_', '*', '_', '_', '_', '_', '*'],
        ['_', '_', '_', '_', '#', '_', '_', '_', '_', '#', '_', '_', '_', '_', '#']
    ];

new Canvas(matrix, textures, {width: 32, height: 32});

class GameObject {
    constructor(obj = {image: '', width: 100, height: 100, x: 25, y: 25}) {
        this._image = obj.image;
        this._width = obj.width;
        this._height = obj.height;
        this._x = obj.x;
        this._y = obj.y;
    }

    get image() {
        return this._image;
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

    destroySelf() {
        //removes class instance from {...}
    }

}

class MovableObject extends GameObject {
    constructor(gmObjectParams) {
        super(gmObjectParams);

    }

    moveItself() {
        //instance moves somewhere
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
     */
    constructor(gmObjectParams, damage = 10, lives, health = 100, direction) {
        super(gmObjectParams, damage);

        this._lives = lives;
        this._health = health;
        this._weapon = null;
        this._direction = direction;
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

    set weapon(weaponObject) {
        this._weapon = weaponObject
    }

    get direction() {
        return this._direction;
    }

    set direction(newDirection) {
        this._direction = newDirection;
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
    constructor(gmObjectParams, health, lives = 3) {
        super(gmObjectParams, health, lives);

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
    setSelfPosition() {
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
