import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto'
import "./LineChart.css";


const LineChart = ({ data }) => {
    const chartRef = useRef();
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartRef && chartRef.current) {
            const newChartInstance = new Chart(chartRef.current, {
                type: 'line',
                data: {
                    labels: data.map((value, index) => index.toString()),
                    datasets: [
                        {
                            label: 'Values',
                            data: data,
                            borderColor: 'rgb(51,255,80)',
                            backgroundColor: 'rgba(51,255,80,0.5)',
                            fill: true,
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Hour',
                            },
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Power (kWh)',
                            },
                        },
                    },
                },
            });
            setChartInstance(newChartInstance);
        }
    }, [data]);

    return (
        <section className='bg-black text-center'>
            <div className='line-chart grid'>
                <canvas className='line-chart-content' ref={chartRef} />
                {/*<Line data={data} options={options} />*/}
            </div>
        </section>
    )
};

export default LineChart;