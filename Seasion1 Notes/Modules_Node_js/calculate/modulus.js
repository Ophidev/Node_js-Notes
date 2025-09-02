function modulus(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed.");
    }
    return a % b;
}

module.exports = { modulus }; // Exporting the modulus function
// or module.exports.modulus = modulus; // Another way to export the modulus function