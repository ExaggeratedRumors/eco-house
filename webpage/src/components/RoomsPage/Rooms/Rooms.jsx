import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import "./Rooms.css";


const Rooms = () => {
    class ApexChart extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                series: [
                    {
                        name: 'Washing machine',
                        data: [{
                                x: 'Monday',
                                y: [
                                    new Date('2023-04-05').getTime(),
                                    new Date('2023-04-08').getTime()
                                ]
                            }, {
                                x: 'Tuesday',
                                y: [
                                    new Date('2023-04-02').getTime(),
                                    new Date('2023-04-05').getTime()
                                ]
                            }, {
                                x: 'Tuesday',
                                y: [
                                    new Date('2023-04-05').getTime(),
                                    new Date('2023-04-07').getTime()
                                ]
                            }, {
                                x: 'Wednesday',
                                y: [
                                    new Date('2023-04-03').getTime(),
                                    new Date('2023-04-09').getTime()
                                ]
                            }, {
                                x: 'Wednesday',
                                y: [
                                    new Date('2023-04-08').getTime(),
                                    new Date('2023-04-11').getTime()
                                ]
                            }, {
                                x: 'Thursday',
                                y: [
                                    new Date('2023-04-11').getTime(),
                                    new Date('2023-04-16').getTime()
                                ]
                            }, {
                                x: 'Monday',
                                y: [
                                    new Date('2023-04-01').getTime(),
                                    new Date('2023-04-03').getTime()
                                ]
                            }
                        ]
                    }, {
                        name: 'Dryer',
                        data: [{
                                x: 'Monday',
                                y: [
                                    new Date('2023-04-02').getTime(),
                                    new Date('2023-04-05').getTime()
                                ]
                            }, {
                                x: 'Wednesday',
                                y: [
                                    new Date('2023-04-06').getTime(),
                                    new Date('2023-04-16').getTime()
                                ],
                                goals: [
                                    {
                                        name: 'Break',
                                        value: new Date('2023-04-10').getTime(),
                                        strokeColor: '#CD2F2A'
                                    }
                                ]
                            }, {
                                x: 'Tuesday',
                                y: [
                                    new Date('2023-04-03').getTime(),
                                    new Date('2023-04-07').getTime()
                                ]
                            }, {
                                x: 'Friday',
                                y: [
                                    new Date('2023-04-20').getTime(),
                                    new Date('2023-04-22').getTime()
                                ]
                            }, {
                                x: 'Monday',
                                y: [
                                    new Date('2023-04-10').getTime(),
                                    new Date('2023-04-16').getTime()
                                ]
                            }
                        ]
                    }, {
                        name: 'Lamp',
                        data: [{
                                x: 'Saturday',
                                y: [
                                    new Date('2023-04-10').getTime(),
                                    new Date('2023-04-17').getTime()
                                ]
                            }, {
                                x: 'Sunday',
                                y: [
                                    new Date('18:18').getTime(),
                                    new Date('18:20').getTime()
                                ],
                                goals: [
                                    {
                                        name: 'Break',
                                        value: new Date('2023-04-07').getTime(),
                                        strokeColor: '#CD2F2A'
                                    }
                                ]
                            },
                        ]
                    }
                ],
                options: {
                    chart: { height: 450, type: 'rangeBar'},
                    plotOptions: { bar: { horizontal: true, barHeight: '85%' } },
                    xaxis: { type: 'datetime' },
                    stroke: { width: 1 },
                    fill: { type: 'solid', opacity: 0.6 },
                    legend: { position: 'top', horizontalAlign: 'left' }
                },


            };
        }



        render() {
            return (
                <div>
                    <div id="chart">
                        <ReactApexChart options={this.state.options} series={this.state.series} type="rangeBar" height={450} />
                    </div>
                    <div id="html-dist"></div>
                </div>
            );
        }
    }

    return (
        <section className='rooms section-p bg-black text-center'>
            <div className="container">
                <h1 className='rooms-title'>Device Usage Schedule</h1>
                <div>
                    <h2>Rooms</h2>
                    <select>
                        <option>Room 1</option>
                        <option>Room 2</option>
                        <option>Room 3</option>
                    </select>

                    <Link to="/add-room">
                        <button>Add Room</button>
                    </Link>
                </div>

                <ApexChart/>
            </div>
        </section>

    );
};

export default Rooms;