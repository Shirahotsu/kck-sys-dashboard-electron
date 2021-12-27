const {Chart} = require("chart.js");
const {options} = require('../helpers/pie-chart-options.helper')
const {getFixedTwoDecimalPlaces} = require('../helpers/getFixedTwoDecimalPlaces')

const {getDiskUsage} = require('../services/disk.service')

let chart = null;

const renderChart = async () => {
    await initChart()
    await rerenderChart()
}


const rerenderChart = async () => {
    const {freePercentage, usedPercentage, freeGb, usedGb} = await getDiskUsage();
    chart.data.datasets[0].data = [usedGb]
    chart.data.datasets[1].data = [freeGb]
    chart.data.datasets[0].label = `Used ${getFixedTwoDecimalPlaces(usedGb)}GB (${getFixedTwoDecimalPlaces(usedPercentage)}%)`
    chart.data.datasets[1].label = `Free ${getFixedTwoDecimalPlaces(freeGb)}GB (${getFixedTwoDecimalPlaces(freePercentage)}%)`

    chart.update();
    setTimeout(() => {
        rerenderChart()
    }, 10000)
}

const initChart = async () => {
    const {freePercentage, usedPercentage, freeGb, usedGb} = await getDiskUsage();
    const ctx = document.getElementById('diskDetailsChart').getContext('2d');
    chart = new Chart(
        ctx,
        {
            type: 'bar',
            data: {
                labels: [' '],
                datasets: [{
                    label: `Used ${getFixedTwoDecimalPlaces(usedGb)}GB (${getFixedTwoDecimalPlaces(usedPercentage)}%)`,
                    data: [usedGb],
                    backgroundColor: [
                        '#ffc107',
                    ],
                    borderWidth: 0,
                },
                    {
                        label: `Free ${getFixedTwoDecimalPlaces(freeGb)}GB (${getFixedTwoDecimalPlaces(freePercentage)}%)`,
                        data: [freeGb],
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