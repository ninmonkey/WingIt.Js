import { labelPoint } from './drawing.js';
export class Vector2 {
    /**
     * @description Represents a 2D vector
     * @todo Add vector operations (.fromAngle, fromVector, add, dot/cross/scalar product, normalize, etc.)
     */
    #x = 0
    #y = 0
    constructor( x = 0, y = 0 ) {
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
    toString () {
        return `Vector2(${ this.#x }, ${ this.#y })`;
    }
}
export function WrapScreenEdge ( boid ) {
    /**
     * @description Wraps boid around edges like pac-man or asteroids
     */
    if ( boid.Position.x > canvas.width ) {
        boid.Position.x = 0
    }
    if ( boid.Position.x < 0 ) {
        boid.Position.x = canvas.width
    }
    if ( boid.Position.y > canvas.height ) {
        boid.Position.y = 0
    }
    if ( boid.Position.y < 0 ) {
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

    #fillStyle = 'rgb(27, 151, 182)'
    #radius = 20

    // constructor (
    //     position = new Vector2( 0.0, 0.0 ),
    //     velocity = new Vector2( 10.0, 10.0 ),
    //     acceleration = new Vector2( 0.0, 0.0 ) ) {
    //     }
    get Position () { return this.#position; }
    get Velocity () { return this.#velocity; }
    // get Acceleration () { return this.#acceleration; }

    draw ( context ) {
        /**
         * @description basic rendering of boid. future will be extracted
         * @param context {CanvasRenderingContext2D} 2D rendering context from HTML5 canvas
         */
        const ctx = context
        if ( ctx == null ) { throw new Error( 'Boid.draw() requires a valid 2D rendering context as an argument' ); }
        ctx.fillStyle = this.FillStyle;

        const gradient = ctx.createConicGradient( 0, 100, 100 );
        const grad_0 = 'hsl(200 100% 50% / .25 )'; // hsl(200 100% 50% )
        const grad_1 = 'hsl(263 100% 50% / .70)'; // hsl(200 100% 50% )
        gradient.addColorStop( 0, grad_0 );
        gradient.addColorStop( 0.50, grad_1 );
        gradient.addColorStop( 1, grad_0 );

        // ctx.fillStyle = 'goldenrod'
        // ctx.strokeStyle = 'red'
        ctx.fillStyle = gradient
        ctx.fillStyle = 'salmon'
        ctx.fillStyle = 'hsl(200 100% 50% / 1.0'
        // ctx.fillStyle = 'red'
        // ctx.strokeStyle = 'red'
        ctx.strokeStyle = gradient
        ctx.lineWidth = this.Radius * .5
        ctx.beginPath();
        // ctx.arc( this.Position.x, this.Position.y, 5, 0, Math.PI * 2, true );
        /* arc(x, y, radius, startAngle, endAngle, counterclockwise) */
        ctx.arc(this.Position.x, this.Position.y, this.Radius, 0, Math.PI * 2, true);
        ctx.stroke()
        ctx.fill()
        ctx.beginPath();
        ctx.arc( 100, 200, 50, 10, 40, false );
        ctx.stroke()
        ctx.fill()

        // ctx.fillRect( this.Position.x,  this.Position.y,  this.Position.x + 4,  this.Position.y + 4);

        ctx.beginPath()
        ctx.lineWidth = 20
        ctx.strokeStyle = 'salmon'
        ctx.arc( 100, 75, 50, 0, 2 * Math.PI );
        ctx.fillStyle = gradient
        ctx.fillStyle = 'hsl(200 100% 50% / .75)'
        ctx.strokeStyle = gradient

        ctx.stroke()
        ctx.fill()

        labelPoint( ctx, this.Position, {
            // font: 'bold 2rem serif',
            // font: 'bold 5rem "fira sans", mono',
            font: `bold 1rem "Cascadia Code", mono`,
            fillStyle: 'rgb( 10% 10% 10% / .8)',
        } );

        labelPoint( ctx, { x: 100, y: 300 }, {
            font: 'bold 2rem serif'
        } );
        labelPoint( ctx, { x: 200, y: 200 } );


        // ctx.fillRect( this.Position.x,  this.Position.y,
        // this.Position.x + 10, this.Position.y + 10);
    }

    toString () {
        return `Boid( Position: ${ this.#position.toString() }, Velocity: ${ this.#velocity.toString() } )`;
    }
    get Radius() { return this.#radius; }
    get FillStyle () { return this.#fillStyle; }
    set FillStyle ( colorString ) {
        this.#fillStyle = colorString;
    }
}