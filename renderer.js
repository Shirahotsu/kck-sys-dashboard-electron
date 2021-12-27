// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features
const {renderChart: renderCpuChart} = require('./components/cpu-usage-pie.component')
const {renderChart: renderMemoryChart} = require('./components/memory-usage-pie.component')
const {renderChart: renderDiskChart} = require('./components/disk-usage-pie.component')
const {renderChart: renderMemoryDetails} = require('./components/memory-details.component')
const {renderChart: renderDiskDetails} = require('./components/disk-details.component')
const {renderBasicInfo} = require('./components/basic-info.component')
window.addEventListener('DOMContentLoaded', () => {
    renderCpuChart()
    renderMemoryChart()
    renderDiskChart()
    renderBasicInfo()
    renderMemoryDetails()
    renderDiskDetails()
})

const cpuInfo = document.getElementById('cpuInfo')
const memoryInfo = document.getElementById('memoryInfo')
const diskInfo = document.getElementById('diskInfo')

const cpuDetails = document.getElementById('cpuDetails')
const memoryDetails = document.getElementById('memoryDetails')
const diskDetails = document.getElementById('diskDetails')

cpuInfo.addEventListener('click',()=>{
    cpuDetails.style.display='block'
    memoryDetails.style.display='none'
    diskDetails.style.display='none'
    console.log('cpuInfo')
})
memoryInfo.addEventListener('click',()=>{
    cpuDetails.style.display='none'
    memoryDetails.style.display='block'
    diskDetails.style.display='none'
    console.log('memoryInfo')
})
diskInfo.addEventListener('click',()=>{
    cpuDetails.style.display='none'
    memoryDetails.style.display='none'
    diskDetails.style.display='block'
    console.log('diskInfo')
})