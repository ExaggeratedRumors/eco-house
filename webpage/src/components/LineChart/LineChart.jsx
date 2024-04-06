import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto'

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
                            fill: false,
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
        <section className='chart section-p-top bg-black' id = "contact">
            <div className='container'>
                <div className='contact-content grid text-center'>
                    <div className='content-left'>
                        <canvas ref={chartRef} />;
                    </div>
                </div>
            </div>
        </section>
    )
};

export default LineChart;