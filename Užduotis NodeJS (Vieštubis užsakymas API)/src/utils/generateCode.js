/**
 * Generates a random 10-character uppercase alphanumeric string for a reservation code.
 * @returns {string} A random reservation code.
 */
function generateRandomCode() {
    return Math.random().toString(36).substring(2, 12).toUpperCase();
}
module.exports = {
    generateRandomCode
};