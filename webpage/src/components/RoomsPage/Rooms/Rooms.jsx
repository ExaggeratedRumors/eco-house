import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import "./Rooms.css";


const Rooms = () => {
    const [ownerData, setOwnerData] = useState(null)

    /** House **/
    const [houseName, setHouseName] = useState('');
    const [houseAddress, setHouseAddress] = useState('');
    const [houseDayTariff, setHouseDayTariff] = useState(0.0);
    const [houseNightTariff, setHouseNightTariff] = useState(0.0);

    /** Room **/
    const [roomHouseId, setRoomHouseId] = useState(0);
    const [roomName, setRoomName] = useState('');

    /** Device **/
    const [deviceRoomId, setDeviceRoomId] = useState(0);
    const [deviceName, setDeviceName] = useState('');
    const [devicePowerConsumption, setDvicePowerConsumption] = useState(0.0);

    /** Generator **/
    const [generatorHouseId, setGeneratorHouseId] = useState('');
    const [generatorName, setGeneratorName] = useState('');
    const [generatorPanelSurface, setGeneratorPanelSurface] = useState(0.0);
    const [generatorEffectiveness, setGeneratorEffectiveness] = useState(0.0);
    const [generatorBatteryCapacity, setGeneratorBatteryCapacity] = useState(0.0);

    /** Interval **/
    const [intervalDeviceId, setIntervalDeviceId] = useState(0);
    const [intervalStartTime, setIntervalStartTime] = useState('');
    const [intervalEndTime, setIntervalEndtime] = useState('');

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8082/owners/1');
            if (!response.ok) {
                throw new Error('Service not available');
            }
            const data = await response.json();
            //setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    class RoomsChart extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                series: [
                    {
                        name: 'Washing machine',
                        data: [{
                                x: 'Monday',
                                y: [
                                    new Date('2023-04-10 11:15').getTime(),
                                    new Date('2023-04-10 12:15').getTime()
                                ]
                            }, {
                                x: 'Tuesday',
                                y: [
                                    new Date('2023-04-10 8:00').getTime(),
                                    new Date('2023-04-10 9:00').getTime()
                                ]
                            }, {
                                x: 'Tuesday',
                                y: [
                                    new Date('2023-04-10 1:00').getTime(),
                                    new Date('2023-04-10 3:00').getTime()
                                ]
                            }, {
                                x: 'Wednesday',
                                y: [
                                    new Date('2023-04-10 6:00').getTime(),
                                    new Date('2023-04-10 7:00').getTime()
                                ]
                            }, {
                                x: 'Wednesday',
                                y: [
                                    new Date('2023-04-10 13:15').getTime(),
                                    new Date('2023-04-10 14:15').getTime()
                                ]
                            }, {
                                x: 'Thursday',
                                y: [
                                    new Date('2023-04-10 18:10').getTime(),
                                    new Date('2023-04-10 23:51').getTime()
                                ]
                            }, {
                                x: 'Monday',
                                y: [
                                    new Date('2023-04-10 11:11').getTime(),
                                    new Date('2023-04-10 19:35').getTime()
                                ]
                            }
                        ]
                    }, {
                        name: 'Dryer',
                        data: [{
                                x: 'Monday',
                                y: [
                                    new Date('2023-04-10 12:15').getTime(),
                                    new Date('2023-04-10 13:15').getTime()
                                ]
                            }, {
                                x: 'Wednesday',
                                y: [
                                    new Date('2023-04-10 15:30').getTime(),
                                    new Date('2023-04-10 15:55').getTime()
                                ]
                            }, {
                                x: 'Tuesday',
                                y: [
                                    new Date('2023-04-10 12:00').getTime(),
                                    new Date('2023-04-10 21:00').getTime()
                                ]
                            }, {
                                x: 'Friday',
                                y: [
                                    new Date('2023-04-10 11:00').getTime(),
                                    new Date('2023-04-10 12:00').getTime()
                                ]
                            }, {
                                x: 'Monday',
                                y: [
                                    new Date('2023-04-10 15:00').getTime(),
                                    new Date('2023-04-10 17:00').getTime()
                                ]
                            }
                        ]
                    }, {
                        name: 'Lamp',
                        data: [{
                                x: 'Saturday',
                                y: [
                                    new Date('2023-04-10 15:00').getTime(),
                                    new Date('2023-04-10 16:00').getTime()
                                ]
                            }, {
                                x: 'Sunday',
                                y: [
                                    new Date('2023-04-10 01:00').getTime(),
                                    new Date('2023-04-10 16:00').getTime()
                                ],
                                goals: [
                                    {
                                        name: 'Break',
                                        value: new Date('2023-04-10 14:00').getTime(),
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
        <section className='rooms section-p bg-md-black text-center'>
            <h1 className='rooms-title'>Device Usage Schedule</h1>
            <div className="container">
                <div className="rooms-panel">
                    <div className="rooms-left-panel">
                        <div>
                            <h2>Houses</h2>
                            <select>
                                <option>House 1</option>
                                <option>House 2</option>
                            </select>

                            <Link to="/add-house">
                                <button>Add House</button>
                            </Link>
                        </div>
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
                    </div>

                    <div className="rooms-right-panel">
                        <div>
                            <h2>Devices</h2>
                            <select>
                                <option>Lamp</option>
                                <option>Dryer</option>
                                <option>Washing machine</option>
                            </select>

                            <Link to="/add-device">
                            <button>Add Device</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='time-chart'>
                    <div className='time-chart-content'>
                        <RoomsChart/>
                    </div>
                </div>

            </div>
        </section>

    );
};

export default Rooms;