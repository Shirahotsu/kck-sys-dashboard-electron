// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features
const {renderChart: renderCpuChart} = require('./components/cpu-usage-pie.component')
const {renderChart: renderMemoryChart} = require('./components/memory-usage-pie.component')
const {renderChart: renderDiskChart} = require('./components/disk-usage-pie.component')
const {renderChart: renderMemoryDetails} = require('./components/memory-details.component')
const {renderBasicInfo} = require('./components/basic-info.component')
window.addEventListener('DOMContentLoaded', () => {
    renderCpuChart()
    renderMemoryChart()
    renderDiskChart()
    renderBasicInfo()
    renderMemoryDetails()
})