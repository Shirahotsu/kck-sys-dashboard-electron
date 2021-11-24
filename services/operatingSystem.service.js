const osu = require('node-os-utils')
const os = osu.os

const getOperatingSystem = async () => {
    return await os.oos()
}

const getIp = () => {
    return os.ip()
}
const getHostname = () => {
    return os.hostname()
}
const getUptime = () => {
    return getReadableTimeValue(os.uptime())
}
const getArch = () => {
    return os.arch()
}

const getReadableTimeValue = time => new Date(time * 1000).toISOString().substr(11, 8);

module.exports = {getOperatingSystem, getIp, getHostname, getUptime, getArch}