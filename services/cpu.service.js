const osu = require('node-os-utils')
const cpu = osu.cpu

const getCpuUsage = () => {
    return cpu.usage()
}

const getCpuModel = () => {
    return cpu.model()
}

module.exports = {getCpuUsage, getCpuModel}