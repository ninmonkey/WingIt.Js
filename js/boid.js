export class Vector2 {
    /**
     * @description Represents a 2D vector
     * @todo Add vector operations (.fromAngle, fromVector, add, dot/cross/scalar product, normalize, etc.)
     */
    #x = 0
    #y = 0
    constructor ( x = 0, y = 0 ) {
        this.Position( x, y )
    }
    set x ( value ) { this.#x = value; }
    get x () { return this.#x; }
    set y ( value ) { this.#y = value; }
    get y () { return this.#y; }
    get Position () {
        return { x: this.#x, y: this.#y };
    }
    Position ( x = 0, y = 0 ) {
        this.#x = x;
        this.#y = y;
    }
}
export class Boid {
    /**
     * @description Represents basic bird/fish/boid in the physics simulation
     *
     */
    #position = new Vector2( 0.0, 0.0 );
    #velocity = new Vector2( 10.0, 10.0 );
    // #acceleration = new Vector2( 0.0, 0.0 );

    #colorFill = 'rgb(27, 151, 182)'

    // constructor (
    //     position = new Vector2( 0.0, 0.0 ),
    //     velocity = new Vector2( 10.0, 10.0 ),
    //     acceleration = new Vector2( 0.0, 0.0 ) ) {
    //     }
    get Position () { return this.#position; }
    get Velocity () { return this.#velocity; }
    // get Acceleration () { return this.#acceleration; }
}