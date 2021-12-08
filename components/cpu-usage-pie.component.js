const {Chart} = require("chart.js");
const {getPercentageColor} = require('../helpers/getPercentageColor.helper')
const {options} = require('../helpers/pie-chart-options.helper')

const {getCpuUsage} = require('../services/cpu.service')

let donutChart = null;
let chartPercentageSpan = null;

const renderChart = async () => {
    chartPercentageSpan = document.getElementById('cpuUsagePercentage')
    await initChart()
    await rerenderChart()
}

const getChartData = async () => {
    const maxPercentage = 100
    const cpuUsage = await getCpuUsage()
    // const cpuUsage = Math.floor(Math.random() * 101);
    const freePercentage = maxPercentage - cpuUsage
    return {cpuUsage, freePercentage}
}

const rerenderChart = async () => {
    const {cpuUsage, freePercentage} = await getChartData()
    donutChart.data.datasets[0].data = [cpuUsage, freePercentage]
    donutChart.data.datasets[0].backgroundColor = [
        getPercentageColor(cpuUsage),
        'rgb(255, 255, 255)',
    ]
    donutChart.update();
    chartPercentageSpan.innerHTML = `${cpuUsage.toFixed()}%`
    setTimeout(() => {
        rerenderChart()
    }, 1000)
}

const initChart = async () => {
    const {cpuUsage, freePercentage} = await getChartData()
    const ctx = document.getElementById('cpuUsage').getContext('2d');
    donutChart = new Chart(
        ctx,
        {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    label: ' ',
                    data: [freePercentage, cpuUsage],
                    backgroundColor: [
                        getPercentageColor(cpuUsage),
                        'rgb(255, 255, 255)',
                    ],
                    borderWidth: 0,
                }],
            },
            options: options
        },
    );
}

module.exports = {
    renderChart
}