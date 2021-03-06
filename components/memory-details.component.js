const {Chart} = require("chart.js");
const {options} = require('../helpers/pie-chart-options.helper')
const {getFixedTwoDecimalPlaces} = require('../helpers/getFixedTwoDecimalPlaces')

const {getMemoryUsage} = require('../services/memory.service')

let chart = null;

const renderChart = async () => {
    await initChart()
    await rerenderChart()
}


const rerenderChart = async () => {
    const {usedMemMb, freeMemMb, freeMemPercentage} = await getMemoryUsage();
    chart.data.datasets[0].data = [usedMemMb]
    chart.data.datasets[1].data = [freeMemMb]
    chart.data.datasets[0].label = `Used ${getFixedTwoDecimalPlaces(usedMemMb)}MB (${100 - getFixedTwoDecimalPlaces(freeMemPercentage)}%)`
    chart.data.datasets[1].label = `Free ${getFixedTwoDecimalPlaces(freeMemMb)}MB (${getFixedTwoDecimalPlaces(freeMemPercentage)}%)`

    chart.update();
    setTimeout(() => {
        rerenderChart()
    }, 1000)
}

const initChart = async () => {
    const {usedMemMb, freeMemMb, freeMemPercentage} = await getMemoryUsage();
    const ctx = document.getElementById('memoryDetailsChart').getContext('2d');
    chart = new Chart(
        ctx,
        {
            type: 'bar',
            data: {
                labels: [' '],
                datasets: [{
                    label: `Used ${getFixedTwoDecimalPlaces(usedMemMb)}MB (${100 - getFixedTwoDecimalPlaces(freeMemPercentage)}%)`,
                    data: [usedMemMb],
                    backgroundColor: [
                        '#ffc107',
                    ],
                    borderWidth: 0,
                },
                    {
                        label: `Free ${getFixedTwoDecimalPlaces(freeMemMb)}MB (${getFixedTwoDecimalPlaces(freeMemPercentage)}%)`,
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