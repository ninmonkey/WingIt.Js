export function randomInt ( min, max ) {
    /**
     * @description Returns a random integer between min (inclusive) and max (exclusive)
     * @param {number} min Minimum integer value (inclusive)
     * @param {number} max Maximum integer value (exclusive)
     * @returns {number} Random integer between min and max
     */
    const minCeiled = Math.ceil( min );
    const maxFloored = Math.floor( max );
    return Math.floor( Math.random() * ( maxFloored - minCeiled ) + minCeiled ); // The maximum is exclusive and the minimum is inclusive
}

export function randomNumber ( min, max ) {
    /**
     * @description like `randomInt` except for floating point
     * @param {number} min Minimum number (inclusive)
     * @param {number} max Maximum number (exclusive)
     * @return {number} Random number in the range: [ min, max )
     */
    return Math.random() * ( max - min ) + min;
}

export function toDegrees ( radians ) {
    /**
     * @description Converts degrees to radians
     * @param {number} radians Angle in radians
     * @return {number} Angle in degrees
     */
    return radians * ( 180 / Math.PI );
}

export function toRadians ( degrees ) {
    /**
     * @description Converts degrees to radians
     * @param {number} degrees Angle in degrees
     * @return {number} Angle in radians
     */
    // aliased name: degreesToRadians
    return degrees * ( Math.PI / 180 );
}