import { labelPoint } from './drawing.js';
import { toDegrees, toRadians } from './utils.js';
export class Vector2 {
    /**
     * @description Represents a 2D vector
     * @property x {number} x coordinate
     * @property y {number} y coordinate
     * @property Position {Object} shorthand for getting/setting both x and y as an object
     * @method Add {function} vector addition, returns a new Vector2 instance
     * @method fromCoord {function} set x,y from two numbers
     * @method fromVector {function} set x,y from another Vector2 or object with numeric x,y properties
     * @todo Add vector operations (.fromAngle, fromVector, add, dot/cross/scalar product, normalize, etc.)
     */
    #x = 0
    #y = 0
    constructor( x = 0.0, y = 0.0 ) {
        // this.setLoc( x, y )
        this.fromCoord( x, y )
    }
    set x ( value ) { this.#x = value; }
    get x () { return this.#x; }
    set y ( value ) { this.#y = value; }
    get y () { return this.#y; }
    get Position () { return { x: this.#x, y: this.#y }; }
    set Position ( newPos ) {
        // warn if value isn't a vector?
        const x = newPos.x
        const y = newPos.y
        if ( x !== undefined && typeof x === 'number' ) { this.#x = x; }
        if ( y !== undefined && typeof y === 'number' ) { this.#y = y; }
    }

    normalize () {
        /**
         * @summary Modifies the vector to be a unit vector. ( where length == 1 )
         * @returns {Vector2} current instance after normalizing it
         */
        const magnitude = this.magnitude()
        if ( magnitude === 0 ) {
            return new Vector2( 0, 0 )
        }
        this.fromVector( new Vector2( this.#x / magnitude, this.#y / magnitude ) )
        return this
    }

    magnitude () {
        /**
         * @description Returns the magnitude (length) of the vector
         * @returns {number} The magnitude of the vector
         */
        // I didn't make it a property to make the extra sqrt cost more obvious
        return Math.sqrt( this.#x * this.#x + this.#y * this.#y )
    }

    Add ( vector ) {
        /**
         * @description Vector operation for addition. returns a new Vector2 instance / immutable
         * @param vector {Vector2} another Vector2 instance
         * @example const newPos = boid.Position.add( boid.Velocity ) // returns the new vector without changing `boid.Position`
         */
        if ( !( vector instanceof Vector2 ) ) {
            throw new Error( 'Vector2.Add requires a Vector2 as an argument' )
        }
        return new Vector2( this.#x + vector.x, this.#y + vector.y )
    }
    fromCoord ( x, y ) {
        /**
         * @summary Mutates vector in-place to the new position
         * @param x {number} x coordinate
         * @param y {number} y coordinate
         * @example boid.Position.fromCoord( 100, 200 )
         */
        if ( typeof x !== 'number' || typeof y !== 'number' ) {
            throw new Error( 'Vector2.fromCoord requires two numbers as arguments' )
        }
        this.#x = x;
        this.#y = y;
    }
    fromVector ( vector ) {
        /**
         * @summary Mutates vector in-place to the new position
         * @param vector {Vector2|Object} another Vector2 or object with numeric x,y properties
         * @example boid.Position.fromVector( new Vector2( 100, 200 ) )
         */
        if ( vector instanceof Vector2 ) {
            this.#x = vector.x;
            this.#y = vector.y;
            return;
        }
        if ( vector && typeof vector.x === 'number' && typeof vector.y === 'number' ) {
            this.#x = vector.x;
            this.#y = vector.y;
            return;
        }
        throw new Error( 'Vector2.fromVector requires a Vector2 or an object with numeric x,y properties' );
    }

    toString () {
        return `Vector2( ${ this.#x.toFixed( 2 ) }, ${ this.#y.toFixed( 2 ) } )`;
    }
}
export function WrapScreenEdge ( boid, canvas ) {
    /**
     * @description Wraps boid around edges like pac-man or asteroids
     * @summary note that this uses center coordinate, no radius/width/height
     */
    if ( canvas == null ) {
        console.error( `'canvas' was null!` )
        return;
    }
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

export function TestIsOnScreen ( position, radius, canvas ) {
    /**
     * @description Test if boid is on "screen" (inside canvas bounds).
     * @returns {boolean} true if boid plus radius is off-screen. partially visible returns true
     */
    if ( canvas == null ) {
        console.error( `'canvas' was null!` )
        return false;
    }
    if ( position.x + radius < 0 ) { return false }
    if ( position.x - radius >= canvas.width ) { return false }
    if ( position.y + radius < 0 ) { return false }
    if ( position.y - radius >= canvas.height ) { return false }
    return true
}
export class Boid {
    /**
     * @description Represents basic bird/fish/boid in the physics simulation
     * @todo: implement: Width/Radius, Left/Right/Top/Bottom vs (x,y) local origin
     */
    #position = new Vector2( 0.0, 0.0 );
    #velocity = new Vector2( 10.0, 10.0 );
    // #acceleration = new Vector2( 0.0, 0.0 );
    #config = {
        labelPoints: true,
    }

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

        const gradient = ctx.createConicGradient( 0, ( 800 ), ( 600 ) );
        const grad_0 = 'hsl(200 100% 50% / .35 )'; // hsl(200 100% 50% )
        const grad_1 = 'hsl(263 100% 50% / .30)'; // hsl(200 100% 50% )
        gradient.addColorStop( 0, grad_0 );
        gradient.addColorStop( 0.50, grad_1 );
        gradient.addColorStop( 0.750, 'hsl(0.0turn 30% 50% / .35 )' );
        gradient.addColorStop( 1, grad_0 );

        const font_style = {
            fillStyle: 'rgb( 10% 10% 10% / .65)',
            font: `bold 1.25rem "Cascadia Code", mono`, // 'bold 2rem serif',
            // offset: this.Radius * .55,
            offset: this.Radius * 1.25,
        }

        ctx.fillStyle = this.FillStyle;
        ctx.beginPath();

        // ctx.fillStyle = 'red'
        ctx.fillStyle = 'hsl(200 100% 50% / 1.0'
        ctx.fillStyle = 'hsl(200 100% 50% / .75)'
        ctx.fillStyle = gradient
        ctx.lineWidth = this.Radius * 1.25
        ctx.lineWidth = this.Radius * .65 // huge or small ?
        ctx.lineWidth = this.Radius * .35 // huge or small ?
        ctx.strokeStyle = gradient
        ctx.strokeStyle = 'hsl(0 0% 0% / 0.3)'


        ctx.arc( this.Position.x, this.Position.y, this.Radius,
            /* startAngle */ 0, /* end angle */  Math.PI * 2, true );
        ctx.stroke()
        ctx.fill()

        if ( this.#config.labelPoints ) {
            // const newAt = { x: this.Position.x + this.Radius * 1.5, y: this.Position.y + this.Radius * 1.5, }
            labelPoint( ctx, this.Position, font_style );
        }
    }

    toString () {
        return `Boid( Position: ${ this.#position.toString() }, Velocity: ${ this.#velocity.toString() } )`;
    }
    set Radius ( radius ) { this.#radius = radius; }
    get Radius () { return this.#radius; }
    get FillStyle () { return this.#fillStyle; }
    set FillStyle ( colorString ) {
        this.#fillStyle = colorString;
    }

    get Config () { return this.#config; }
    setConfig ( updateKeys ) {
        /**
         * @description modify config in-place
         */
        if ( updateKeys == null ) { return }
        this.#config = { ...this.#config, ...updateKeys };
    }
}

export function BounceScreenEdge ( entities, canvas ) {
    /**
     * @summary Bounce boids off edges of canvas to keep them in bounds
     * @param entities {Array<Boid>} array of Boid instances
     * @param canvas {HTMLCanvasElement} canvas element to use for bounds
     * @description this uses center coordinates for circles
     */
    for ( const ent of entities ) {
        const newX = ent.Position.x + ent.Velocity.x  // * timestamp
        const newY = ent.Position.y + ent.Velocity.y  // * timestamp

        const newPos = ent.Position.Add( ent.Velocity )
        const isOnScreen = TestIsOnScreen( newPos, ent.Radius * 0, canvas ) // 0 tests center coord, (ent.Radius * 2) tests outside, etc...
        if ( isOnScreen ) {
            ent.Position.fromVector( newPos )
            continue
        }
        if ( newPos.x >= canvas.width ) {
            newPos.x = canvas.width
            if ( ent.Velocity.x > 0 ) { ent.Velocity.x *= -1 }
        } else if ( newPos.x <= 0 ) {
            newPos.x = 0
            if ( ent.Velocity.x < 0 ) { ent.Velocity.x *= -1 }
        }
        if ( newPos.y <= 0 ) {
            newPos.y = 0
            if ( ent.Velocity.y < 0 ) { ent.Velocity.y *= -1 }
        } else if ( newPos.y >= canvas.height ) {
            newPos.y = canvas.height
            if ( ent.Velocity.y > 0 ) { ent.Velocity.y *= -1 }
        }
        ent.Position.fromVector( newPos )
    }
}

export function debugLogBoidStates ( entityList, mode = 'table' ) {
    let i = 0
    for ( const ent of entityList ) {
        if( ! ( ent instanceof Boid ) ) {
            console.warn( `debugLogBoidStates: entityList[ ${i} ] was not a Boid instance!` )
            console.debug( { index: i,  unexpectedItem: ent })
            i++
            continue
        }

        const str = `Pos: ${ ent.Position.toString() } Vel: ${ ent.Velocity.toString() }`
        if ( mode === 'table' ) {
            console.table( {
                id: i++,
                velocityMagnitude: ent.Velocity.magnitude().toFixed( 2 ),
                boid: str,
            } );
            continue
        }

        console.log( {
            id: i++,
            velocityMagnitude: new Number( ent.Velocity.magnitude().toFixed( 2 ) ),
            velocity: ent.Velocity,
            position: ent.Position,
            boid: ent,
            str: str,
        } );
    }
}