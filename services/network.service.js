const checkInternetConnected = require('check-internet-connected');
const osu = require('node-os-utils')
const netstat = osu.netstat

const getIsInternetConnected = async () => {
    const config = {
        timeout: 5000,
        retries: 5,
        domain: 'https://google.com'
    }
    try {
        await checkInternetConnected(config)
        return true

    } catch (e) {
        return false
    }
}

const getConnectionSpeed = async () => {
    return await netstat.stats()

}

module.exports = {getIsInternetConnected, getConnectionSpeed}