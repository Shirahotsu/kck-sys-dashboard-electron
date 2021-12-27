const {Chart} = require("chart.js");
const {getPercentageColor} = require('../helpers/getPercentageColor.helper')
const {options} = require('../helpers/pie-chart-options.helper')

const {getMemoryUsage} = require('../services/memory.service')

let donutChart = null;
let chartPercentageSpan = null;

const renderChart = async () => {
    await initChart()
    await rerenderChart()
}


const rerenderChart = async () => {
    const {totalMemMb, usedMemMb, freeMemMb} = await getMemoryUsage();
    // donutChart.data.datasets[0].data = [usedMemMb, freeMemMb]
    donutChart.update();
    setTimeout(() => {
        rerenderChart()
    }, 1000)
}

const initChart = async () => {
    const {usedMemMb, freeMemMb} = await getMemoryUsage();
    console.log(usedMemMb)
    console.log(freeMemMb)
    const ctx = document.getElementById('memoryDetailsChart').getContext('2d');
    donutChart = new Chart(
        ctx,
        {
            type: 'bar',
            data: {
                labels: [' '],
                datasets: [{
                    label: 'Used',
                    data: [usedMemMb],
                    backgroundColor: [
                        '#ffc107',
                    ],
                    borderWidth: 0,
                },
                    {
                        label: 'Free',
                        data: [freeMemMb],
                        backgroundColor: [
                            '#4caf50',
                        ],
                        borderWidth: 0,
                    }
                ],
            },
            options: {
                ...options,
                indexAxis: 'y',
                elements: {
                    bar: {
                        borderWidth: 2,
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true
                    }
                }
            }
        },
    );
}

module.exports = {
    renderChart
}