const { waringOrange, successGreen, dangerRed } = require('./colors.helper')
const getPercentageColor = percentage => {
    if (percentage >= 80) return dangerRed
    if (percentage < 80 && percentage >= 60) return waringOrange
    return successGreen
}
module.exports = {getPercentageColor}