const {getIp, getHostname, getUptime, getArch, getOperatingSystem} = require("../services/operatingSystem.service");
const {getIsInternetConnected} = require('../services/network.service')

let basicInfoElement = null;

const renderBasicInfo = () => {
    basicInfoElement = document.getElementById('basicInfo')
    initReloadingBasicInfoData()
}

const initReloadingBasicInfoData = async () => {
    getOperatingSystem().then(res => {
        setInterval(() => reloadBasicInfoData(res), 1000)
    })
}

let isConnected = false
const reloadBasicInfoData = (operatingSystem) =>{
    // TODO uncomment on review
    // isConnected = await getIsInternetConnected()
    const ip = getIp()
    const hostname = getHostname()
    const uptime = getUptime()
    const arch = getArch()

    basicInfoElement.innerHTML =`
    <div>System: ${operatingSystem}</div/>
    <div>IP: ${ip}</div>
    <div>Hostname: ${hostname}</div>
    <div>Uptime: ${uptime}</div>
    <div>Arch: ${arch}</div>
    <div>Connected: ${isConnected}</div>`
}

module.exports = {
    renderBasicInfo
}