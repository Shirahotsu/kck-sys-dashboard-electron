const osu = require('node-os-utils')
const drive = osu.drive

const getDiskUsage = async () => {
    const driveInfo = await drive.info()
    return {
        totalGb: driveInfo.totalGb,
        usedGb: driveInfo.usedGb,
        usedPercentage: driveInfo.usedPercentage,
        freeGb: driveInfo.freeGb,
        freePercentage: driveInfo.freePercentage
    }
}

module.exports = {getDiskUsage}