import React from 'react';
import Chart from 'react-apexcharts';

const RoomChart = ({ devicesData, roomName }) => {
    const transformedData = devicesData.map((device) => ({
        name: device.name,
        data: device.intervals.map((interval) => ({
            x: 'Today',
            y: [interval.timeStart.substr(0, 5), interval.timeEnd.substr(0, 5)],
        })),
    }));

    console.log(transformedData);

    const series = transformedData.map((device) => ({
        name: device.name,
        data: device.data.map((interval) => ({
            x: interval.x,
            y: interval.y.map((time) => new Date(`2000-01-01T${time}`).getTime())
        })),
    }));

    const options = {
        chart: {
            type: 'rangeBar',
            height: 450,
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: false,
                    speed: 350
                }
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '85%'
            }
        },
        xaxis: {
            type: 'datetime',
            min: new Date('2000-01-01T00:00:00').getTime(),
            max: new Date('2000-01-01T23:59:00').getTime(),
            labels: {
                formatter: function (val) {
                    const date = new Date(val);
                    if(isNaN(date.getTime())) return 'Today';
                    const hours = date.getHours().toString().padStart(2, '0');
                    const minutes = date.getMinutes().toString().padStart(2, '0');
                    return `${hours}:${minutes}`;
                }
            }
        },
        stroke: {
            width: 1
        },
        fill: {
            type: 'solid',
            opacity: 0.6
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left'
        },
        title: {
            text: 'Device Operation Schedule Of Room: ' + roomName,
            align: 'center'
        },
        tooltip: {
            x: {
                formatter: function (val) {
                    const date = new Date(val);
                    if(isNaN(date.getTime())) return 'Today';
                    const hours = date.getHours().toString().padStart(2, '0');
                    const minutes = date.getMinutes().toString().padStart(2, '0');
                    return `${hours}:${minutes}`;
                }
            }
        }
    };

    return (
        <div>
            <Chart options={options} series={series} type="rangeBar" height={450} />
        </div>
    );
};

export default RoomChart;