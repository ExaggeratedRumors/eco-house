import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto'
import "./LineChart.css";

const LineChart = ({ houseId, houseName }) => {
    const [dailyPowerGraph, setDailyPowerGraph] = useState(null);
    const [dailyCostsGraph, setDailyCostsGraph] = useState(null);
    const [dailyCost, setDailyCost] = useState(null);
    const [dailyEnergyProduced, setDailyEnergyProduced] = useState(null);
    const powerChartRef = useRef();
    const costChartRef = useRef();

    /** Token **/
    let token = localStorage.getItem('token');

    /** Functions **/

    const fetchData = async (endpoint, updateFunction) => {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ houseId: houseId }),
            });
            const newItem = await response.json();
            updateFunction(newItem);
            //alert('Item added successfully: ' + newItem);
        } catch (error) {
            alert(`Error fetching line chart data: ${error}`);
        }
    };

    useEffect(() => {
        fetchData('http://localhost:8082/dailyPowerGraph', setDailyPowerGraph);
        fetchData('http://localhost:8082/dailyCostsGraph', setDailyCostsGraph);
        fetchData('http://localhost:8082/dailyCost', setDailyCost);
        fetchData('http://localhost:8082/dailyEnergyProduced', setDailyEnergyProduced);
    }, []);

    useEffect(() => {
        if (powerChartRef && powerChartRef.current && dailyPowerGraph) {
            const newChartInstance = new Chart(powerChartRef.current, {
                type: 'line',
                data: {
                    labels: Object.keys(dailyPowerGraph),
                    datasets: [
                        {
                            label: 'Power consumption (kWh)',
                            data: Object.values(dailyPowerGraph),
                            borderColor: 'rgb(51,255,80)',
                            backgroundColor: 'rgba(51,255,80,0.5)',
                            fill: true,
                            stepped: true,
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Time',
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

            //setChartInstance(newChartInstance);
            return () => {
                if (newChartInstance) {
                    newChartInstance.destroy();
                }
            };
        }
    }, [dailyPowerGraph]);


    useEffect(() => {
        if (costChartRef && costChartRef.current && dailyCostsGraph) {
            const newChartInstance = new Chart(costChartRef.current, {
                type: 'line',
                data: {
                    labels: Object.keys(dailyCostsGraph),
                    datasets: [
                        {
                            label: 'Cost (PLN)',
                            data: Object.values(dailyCostsGraph),
                            borderColor: 'rgb(51,255,80)',
                            backgroundColor: 'rgba(51,255,80,0.5)',
                            fill: true,
                            stepped: true,
                        },
                    ],
                },
                options: {
                    fill: {
                        type: 'gradient' / 'solid' / 'pattern' / 'image'
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Time',
                            },
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Cost (PLN)',
                            },
                        },
                    },
                },
            });

            //setChartInstance(newChartInstance);
            return () => {
                if (newChartInstance) {
                    newChartInstance.destroy();
                }
            };
        }
    }, [dailyCostsGraph]);

    return (
        <section className='power section-p bg-md-black text-center'>
            <div className='line-chart grid'>
                <h2>House: {houseName}</h2>
                {dailyEnergyProduced > 0 || dailyCost > 0 ? (
                    <div className='container-center text-white'>
                        <lu className='container-content'>
                            {dailyEnergyProduced && (
                                <li>Daily energy produced: {dailyEnergyProduced.toFixed(6)} kWh</li>)}
                            {dailyCost && (<li>Daily cost: {dailyCost.toFixed(6)} PLN</li>)}
                        </lu>
                    </div>
                    ) : ('')}
                <canvas className='line-chart-content' ref={powerChartRef}/>
                <canvas className='line-chart-content' ref={costChartRef}/>
            </div>
        </section>
    )
};

export default LineChart;