class Main {
    /**
     * @constructor
     */
    constructor() {
        this.canvas = document.getElementById('canvas');
        const context = this.canvas.getContext('2d')
    }
}

class GameObject {
    /**
     * @constructor
     */
    constructor(obj) {
        this._image = obj.image;
        this._width = obj.width;
        this._height = obj.height;
        this._x = obj.x;
        this._y = obj.y;
    }

    get image() {
        return this._image;
    }

    set image(newImage) {
        this._image = newImage;
    }

    get width() {
        return this._width;
    }

    set width(newWidth) {
        this._width = newWidth;
    }

    get height() {
        return this._height;
    }

    set height(newHeight) {
        this._height = newHeight;
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

}

class MovableObject extends GameObject {
    constructor(gmObjectParams, damage) {
        super(gmObjectParams);

        this._damage = damage
    }

    get damage() {
        return this._damage
    }

    set damage(newDamage) {
        this._damage = newDamage;
    }

}

class Weapon extends MovableObject {
    constructor(gmObjectParams, damage) {
        super(gmObjectParams, damage)

        this._direction = direction;
    }

    get direction() {
        return this._direction;
    }

    set direction(newDirection) {
        this._direction = newDirection;
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
    constructor(gmObjectParams, damage, lives, health) {
        super(gmObjectParams, damage);

        this._lives = lives;
        this._health = health;

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

    set health(newhealth) {
        this._health = newhealth
    }

    // hit(damage) {
    //     this.health -= damage;
    //     if (this._health <= 0) {
    //         this.kill();
    //     }
    // }
		//
    // kill() {
    //     if (this._lives === 0) {
    //         this.kill();
    //     }
    // }
}

class Player extends Character {
    constructor(gmObjectParams, damage) {
        super(gmObjectParams, damage);

        this.health = 100;
        this.lives = 3;
    }
}

class Enemy extends Character {
    constructor(gmObjectParams, damage) {
        super(gmObjectParams, damage);

        this.health = 100;
        this.lives = 1;
    }


}

class StaticObject extends GameObject {
    constructor(gmObjectParams) {
        super(gmObjectParams)
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
