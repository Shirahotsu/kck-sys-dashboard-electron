const {Chart} = require("chart.js");
const {options} = require('../helpers/pie-chart-options.helper')
const {getFixedTwoDecimalPlaces} = require('../helpers/getFixedTwoDecimalPlaces')

const {getCpuUsage} = require('../services/cpu.service')

let chart = null;

const renderChart = async () => {
    await initChart()
    await rerenderChart()
}


const rerenderChart = async () => {
    const cpuUsage = parseFloat(getFixedTwoDecimalPlaces(await getCpuUsage()));
    const currentData = chart.data.datasets[0].data
    if (currentData.length >= 10) {
        currentData.shift()
        currentData.push(cpuUsage)
    } else {
        currentData.push(cpuUsage)
    }
    chart.data.labels = currentData
    chart.update();
    setTimeout(() => {
        rerenderChart()
    }, 1000)
}

const initChart = async () => {
    const cpuUsage = await getCpuUsage();
    const ctx = document.getElementById('cpuDetailsChart').getContext('2d');
    chart = new Chart(
        ctx,
        {
            type: 'line',
            data: {
                labels: [' '],
                datasets: [{
                    data: [cpuUsage],
                    backgroundColor: '#4caf50',
                    borderColor: '#4caf50',
                    fill: 1,
                    borderWidth: 4
                }
                ],
            },
            options: {
                ...options,
                animation: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                elements: {
                    point: {
                        radius: 0
                    },
                    line: {
                        tension: 0
                    }
                },
                scales: {
                    y: {
                        max: 100,
                        min:0,
                        grid:{
                            display:false
                        }
                    },
                    x: {
                        max: 11,
                        min:0,
                        grid:{
                            display:false
                        },
                        ticks: {
                            display: false
                        }
                    }
                }
            }
        }
    );
}

module.exports = {
    renderChart
}