const {Chart} = require("chart.js");
const {getPercentageColor} = require('../helpers/getPercentageColor.helper')
const {options} = require('../helpers/pie-chart-options.helper')

const { getMemoryUsage } = require('../services/memory.service')

let donutChart = null;
let chartPercentageSpan = null;

const renderChart = async () => {
    chartPercentageSpan = document.getElementById('memoryUsagePercentage')
    await initChart()
    await rerenderChart()
}

const getChartData = async () => {
    const maxPercentage = 100
    const { totalMemMb, usedMemMb } = await getMemoryUsage();
    const usedPercentage = usedMemMb/totalMemMb*100
    const freePercentage = maxPercentage - usedPercentage
    return {usedPercentage, freePercentage}
}

const rerenderChart = async () => {
    const {usedPercentage, freePercentage} = await getChartData()
    donutChart.data.datasets[0].data = [usedPercentage, freePercentage]
    donutChart.data.datasets[0].backgroundColor = [
        getPercentageColor(usedPercentage),
        'rgb(255, 255, 255)',
    ]
    chartPercentageSpan.innerHTML = `${(usedPercentage).toFixed()}%`
    donutChart.update();
    setTimeout(() => {
        rerenderChart()
    }, 1000)
}

const initChart = async () => {
    const {usedPercentage, freePercentage} = await getChartData()
    const ctx = document.getElementById('memoryUsage').getContext('2d');
    donutChart = new Chart(
        ctx,
        {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    label: ' ',
                    data: [freePercentage, usedPercentage],
                    backgroundColor: [
                        getPercentageColor(usedPercentage),
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