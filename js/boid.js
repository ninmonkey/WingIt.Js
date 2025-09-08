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
    toString() {
        return `Vector2(${ this.#x }, ${ this.#y })`;
    }
}
 export function WrapScreenEdge( boid ) {
    /**
     * @description Wraps boid around edges like pac-man or asteroids
     */
    if( boid.Position.x > canvas.width ) {
        boid.Position.x = 0
    }
    if( boid.Position.x < 0 ) {
        boid.Position.x = canvas.width
    }
    if( boid.Position.y > canvas.height ) {
        boid.Position.y = 0
    }
    if( boid.Position.y < 0 ) {
        boid.Position.y = canvas.height
    }
}

export class Boid {
    /**
     * @description Represents basic bird/fish/boid in the physics simulation
     * @todo: implement: Width/Radius, Left/Right/Top/Bottom vs (x,y) local origin
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

    draw( context ) {
        if( context == null ) { throw   new Error('Boid.draw() requires a valid 2D rendering context as an argument'); }
        context.fillStyle = this.#colorFill;
        // context.fillRect( this.Position.x,  this.Position.y,  this.Position.x + 4,  this.Position.y + 4);
        context.fillRect( this.Position.x,  this.Position.y,
            this.Position.x + 10, this.Position.y + 10);
    }

    toString() {
        return `Boid( Position: ${ this.#position.toString() }, Velocity: ${ this.#velocity.toString() } )`;
    }
    set FillStyle( colorString ) {
        this.#colorFill = colorString;
    }
}