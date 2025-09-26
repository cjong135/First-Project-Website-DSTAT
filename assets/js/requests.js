const socket = io(),
    options = {
        plotOptions: {
            series: {
                events: {
                    legendItemClick: function(event) {
                        event.preventDefault()
                    }
                }
            }
        },
        chart: {
            backgroundColor: '',
            renderTo: 'graph',
            plotBorderColor: '#715ec9'
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%a' // Thứ trong tuần
            }
        },
        yAxis: {
            title: {
                text: 'REQUEST/S',
                margin: 10
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            type: 'area',
            name: 'Số lượng request',
            color: '#5b4ba3',
            data: []
        }]
    },
    chart = new Highcharts.Chart(options)

Highcharts.setOptions({
    lang: {
        loading: 'Loading...',
        months: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        weekdays: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
        shortMonths: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12']
    }
})

function getStringCount(count) {
    if(count === 0) return '0'
    count = Math.floor(count)
    let i = count === 0 ? count : Math.floor(Math.log(count) / Math.log(1000)),
        result = parseFloat((count / Math.pow(1000, i)).toFixed(2))
    if(i >= 17) return '∞'
    result += ['', ' nghìn', ' triệu', ' tỷ', ' nghìn tỷ', ' triệu tỷ', ' tỷ tỷ', ' sextillion', ' septillion', ' octillion', ' nonillion', ' decillion', ' undecillion', ' duodecillion', ' tredecillion', ' quattuordecillion', ' quindecillion'][i]
    result = result.replace(/e/g, '')
    result = result.replace(/\+/g, '')
    result = result.replace(/Infinity/g, '∞')
    return result
}

socket.on('requests', (all_requests, per_requests, max_requests) => {
    chart.series[0].addPoint([new Date().getTime(), per_requests], true, chart.series[0].points.length > 60)
    document.getElementById('total_day_requests').innerHTML = getStringCount(all_requests)
    document.getElementById('max_requests').innerHTML = getStringCount(max_requests)
})
