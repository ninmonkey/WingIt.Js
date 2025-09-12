import { Vector2 } from './boid.js';

export function labelPoint ( ctx, p, options  = {} ) {
    /**
     * @description Labels coordinates on the canvas
     * @param ctx {CanvasRenderingContext2D} 2D rendering context from HTML5 canvas
     * @param p {x,y} Coordinates
     * @param options {Object} Options for labeling
     * @param options.fillStyle {string} style for `fillText`
     * @param options.font {string|null} CSS font string, e.g. '48px serif'
     * @param options.offset {number} pixel offset for text label
     * @param options.toFixed {number} number of decimal places to display
     */
    const defaults = {
        // fillStyle: 'rgb( 10% 10% 10% / 1.0)',
        fillStyle: 'rgb( 10% 10% 10% / .8)',
        // font     : '1.5rem mono',
        font: `bold 1rem "Cascadia Code", mono`,
        offset   : 10,
        toFixed  : 0,
    };
    const config = { ...defaults, ...options,  };

    const x = p.x.toFixed( config.toFixed  );
    const y = p.y.toFixed( config.toFixed );

    ctx.font      = config.font
    ctx.fillStyle = config.fillStyle
    ctx.fillText( `(${ x }, ${ y })`, p.x + config.offset, p.y + config.offset );
}

export function drawVector( ctx, pos, relativeVector, color = 'rgb(27 151 182 / .6)' ) {
    /**
     * @summary Draws a line from (x0, y0) to (angle, length)
     */
    ctx.beginPath()
    ctx.moveTo( pos.x, pos.y )
    ctx.lineTo( pos.x + relativeVector.x, pos.y + relativeVector.y )
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.stroke()
}
export function drawVectorAngle( ctx, pos, angle, length = 50, color = 'rgb(27 151 182 / .6)' ) {
    /**
     * @summary Draws a line from (x0, y0) to (x1, y1)
     */
    const end = (new Vector2()).fromAngle( angle, length )
    ctx.beginPath()
    ctx.moveTo( pos.x, pos.y )
    ctx.lineTo( pos.x + end.x, pos.y + end.y )
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.stroke()
}