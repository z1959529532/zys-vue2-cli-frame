const testBar = (data) => {
    const defaultConfig = {
        grid: {
            top: 20,
            bottom: 20,
            left: 50,
            right: 50,
        },
        tooltip: {
            show: true,
            position: 'top'
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        }]
    }

    const opt = Object.assign({}, defaultConfig)
    return opt
}

const testBar2 = (data) => {
    const defaultConfig = {
        color: ['#61C77E'],
        title: {
            text: '调阅次数',
            textStyle: {
                color: '#000000',
                fontSize: 14
            }
        },
        grid: {
            top: 40,
            bottom: 20,
            left: 50,
            right: 50,
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: '#61C77E'
                }
            },
            textStyle: {
                color: 'black',
                fontSize: 14
            },
            formatter: '{b}: {c} 次'
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                fontSize: 12,
                color: 'rgba(0, 0, 0, 0.65)',
                margin: 12
            },
            axisLine: {
                lineStyle: {
                    color: ['#E8E8E8']
                }
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
        },
        yAxis: {
            splitLine: {
                lineStyle: {
                    color: ['#E8E8E8'],
                    type: 'dotted'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                fontSize: 12,
                color: 'rgba(0, 0, 0, 0.65)'
            }
        },
        series: [
            {
                name: '调阅次数',
                type: 'bar',
                barWidth: '20',
                data: [220, 182, 191, 234, 290, 330, 310]
            }
        ]
    }
    const opt = Object.assign({}, defaultConfig, data)
    return opt
}

export default {
    testBar,
    testBar2
}
