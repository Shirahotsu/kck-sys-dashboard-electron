const {Chart} = require("chart.js");
const {getCpuUsage} = require('../services/cpu.service')
const data = {
    labels: [
        'Red',
    ],
    datasets: [{
        label: 'My First Dataset',
        data: [300],
        backgroundColor: [
            'rgb(255, 99, 132)',
        ],
        hoverOffset: 4
    }]
};

let donutChart = null;


const renderChart = async () => {
    await initChart()



    const maxPercentage = 100
    // const cpuUsage = await getCpuUsage()




    setInterval(()=>{
        const cpuUsage = Math.floor(Math.random() * 100) + 1;
        const freePercentage = maxPercentage - cpuUsage
        donutChart.data.datasets[0].data = [cpuUsage, freePercentage],
        console.log('RE RENDER')
        console.log(freePercentage)
        console.log(cpuUsage)
        donutChart.update();
    }, 1000)
}

const initChart = async () => {
    const maxPercentage = 100
    // const cpuUsage = await getCpuUsage()
    const cpuUsage = Math.floor(Math.random() * 100) + 1;
    const freePercentage = maxPercentage - cpuUsage
    const ctx = document.getElementById('cpuUsage').getContext('2d');
    donutChart = new Chart(
        ctx,
        {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    label: 'My First Dataset',
                    data: [freePercentage, cpuUsage],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 255, 255)',
                    ],
                    borderWidth:0,
                }],
            },
            options: {
                plugins:{
                    tooltip: {
                        enabled:false
                    },
                },
                animation: true
            }
        },
    );
}

module.exports = {
    renderChart
}