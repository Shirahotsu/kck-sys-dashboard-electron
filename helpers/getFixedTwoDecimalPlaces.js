const getFixedTwoDecimalPlaces = val => {
    return (Math.round(val * 100) / 100).toFixed(2);
}
module.exports = {getFixedTwoDecimalPlaces}