import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Rooms.css";
import RoomsChart from "./RoomsChart";

const Rooms = () => {
    const [ownerData, setOwnerData] = useState(null);

    const test = {
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
    const [devicePowerConsumption, setDevicePowerConsumption] = useState(0.0);

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

    /** Selections **/
    const [selectedHouse, setSelectedHouse] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedGenerator, setSelectedGenerator] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [selectedInterval, setSelectedInterval] = useState(null);

    /** Flags **/
    const [showAddHouseForm, setShowAddHouseForm] = useState(false);
    const [showAddRoomForm, setShowAddRoomForm] = useState(false);
    const [showAddGeneratorForm, setShowAddGeneratorForm] = useState(false);
    const [showAddDeviceForm, setShowAddDeviceForm] = useState(false);
    const [showAddIntervalForm, setShowAddIntervalForm] = useState(false);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8082/owners/1');
            if (!response.ok) {
                throw new Error('Service not available');
            }
            const data = await response.json();
            setOwnerData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    /** Manipulate items **/
    const deleteItem = async (endpoint, id, updateFunction) => {
        try {
            const response = await fetch(`${endpoint}/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert(`Item with id ${id} deleted successfully`);
                updateFunction();
            } else {
                alert(`Failed to delete item: ${response.statusText}`);
            }
        } catch (error) {
            alert(`Error deleting item: ${error}`);
        }
    };

    const addItem = async (endpoint, body, updateFunction) => {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            if (response.ok) {
                const newItem = await response.json();
                updateFunction(newItem);
                alert('Item added successfully');
            } else {
                alert(`Failed to add item: ${response.statusText}`);
            }
        } catch (error) {
            alert(`Error adding item: ${error}`);
        }
    };



    /** Update data functions **/

    const handleHouseChange = (event) => {
        const house = ownerData.houses.find(h => h.house_id === parseInt(event.target.value));
        setSelectedHouse(house);
        setSelectedRoom(null);
        setSelectedDevice(null);
        setSelectedGenerator(null);
        setSelectedInterval(null);
    };

    const handleRoomChange = (event) => {
        const room = selectedHouse.rooms.find(r => r.id === parseInt(event.target.value));
        setSelectedRoom(room);
        setSelectedDevice(null);
        setSelectedInterval(null);
    };

    const handleGeneratorChange = (event) => {
        const generator = selectedHouse.generators.find(g => g.id === parseInt(event.target.value));
        setSelectedGenerator(generator);
    };

    const handleDeviceChange = (event) => {
        const device = selectedRoom.devices.find(d => d.id === parseInt(event.target.value));
        setSelectedDevice(device);
        setSelectedInterval(null);
    };

    const handleIntervalChange = (event) => {
        const interval = selectedDevice.intervals.find(i => i.id === parseInt(event.target.value));
        setSelectedInterval(interval);
    };


    const updateHouseAfterDelete = () => {
        setOwnerData(prevData => ({
            ...prevData,
            houses: prevData.houses.filter(house => house.house_id !== selectedHouse.house_id),
        }));
        setSelectedHouse(null);
    };

    const updateRoomAfterDelete = () => {
        setSelectedHouse(prevHouse => ({
            ...prevHouse,
            rooms: prevHouse.rooms.filter(room => room.id !== selectedRoom.id),
        }));
        setSelectedRoom(null);
    };

    const updateDeviceAfterDelete = () => {
        setSelectedRoom(prevRoom => ({
            ...prevRoom,
            devices: prevRoom.devices.filter(device => device.id !== selectedDevice.id),
        }));
        setSelectedDevice(null);
    };

    const updateIntervalAfterDelete = () => {
        setSelectedDevice(prevDevice => ({
            ...prevDevice,
            intervals: prevDevice.intervals.filter(interval => interval.id !== selectedInterval.id),
        }));
        setSelectedInterval(null);
    };

    const updateGeneratorAfterDelete = () => {
        setSelectedHouse(prevHouse => ({
            ...prevHouse,
            generators: prevHouse.generators.filter(generator => generator.id !== selectedGenerator.id),
        }));
        setSelectedGenerator(null);
    };

    const updateHouseAfterAdd = (newHouse) => {
        setOwnerData(prevData => ({
            ...prevData,
            houses: [...prevData.houses, newHouse],
        }));
    };

    const updateRoomAfterAdd = (newRoom) => {
        setSelectedHouse(prevHouse => ({
            ...prevHouse,
            rooms: [...prevHouse.rooms, newRoom],
        }));
    };

    const updateDeviceAfterAdd = (newDevice) => {
        setSelectedRoom(prevRoom => ({
            ...prevRoom,
            devices: [...prevRoom.devices, newDevice],
        }));
    };

    const updateGeneratorAfterAdd = (newGenerator) => {
        setSelectedHouse(prevHouse => ({
            ...prevHouse,
            generators: [...prevHouse.generators, newGenerator],
        }));
    };

    const updateIntervalAfterAdd = (newInterval) => {
        fetchData();
        setSelectedDevice(prevDevice => ({
            ...prevDevice,
            intervals: [...prevDevice.intervals, newInterval],
        }));
    };

    const toggleForm = (setShowForm, showForm) => {
        setShowForm(!showForm);
    };

    /** Start UI **/

    if (!ownerData) {
        return <div>Loading...</div>;
    }

    return (
        <section className='rooms section-p bg-md-black text-center'>
            <h1 className='rooms-title'>Device Usage Schedule</h1>
            <div className="room-container">
                <div className="container">
                    <div className="select-box">
                        <hr className="room-hr"></hr>
                        <h2>Houses</h2>
                        <div className="rooms-panel">
                            <div className="rooms-left-panel">
                                <select id="houses" onChange={handleHouseChange}>
                                    <option value="">Select a house</option>
                                    {ownerData.houses.map((house) => (
                                        <option key={house.house_id} value={house.house_id}>
                                            {house.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="rooms-right-panel">
                                {/* Remove house */}
                                {selectedHouse && <button
                                    onClick={() => deleteItem('http://localhost:8082/houses/remove', selectedHouse.house_id, updateHouseAfterDelete)}>Delete
                                    House</button>}

                                {/* Add house */}
                                <button onClick={() => toggleForm(setShowAddHouseForm, showAddHouseForm)}>
                                    {showAddHouseForm ? 'Hide' : 'Add House'}
                                </button>
                                {showAddHouseForm && (
                                    <div className="add-form">
                                        <input type="text" value={houseName}
                                               onChange={(e) => setHouseName(e.target.value)}
                                               placeholder="House Name"/>
                                        <button
                                            onClick={() => addItem('http://localhost:8082/houses/add', {name: houseName}, updateHouseAfterAdd)}>Submit
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>


                    {/* Rooms and generators */}
                    {selectedHouse && (
                        <>
                            <div className="select-box">
                                <hr className="room-hr"></hr>
                                <h2>Rooms</h2>
                                <div className="rooms-panel">
                                    <div className="rooms-left-panel">
                                        <select id="rooms" onChange={handleRoomChange}>
                                            <option value="">Select a room</option>
                                            {selectedHouse.rooms.map((room) => (
                                                <option key={room.id} value={room.id}>
                                                    {room.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="rooms-right-panel">
                                        {/* Remove room */}
                                        {selectedRoom && <button
                                            onClick={() => deleteItem('http://localhost:8082/rooms/delete', selectedRoom.id, updateRoomAfterDelete)}>Delete
                                            Room</button>}

                                        {/* Add room */}
                                        <button onClick={() => toggleForm(setShowAddRoomForm, showAddRoomForm)}>
                                            {showAddRoomForm ? 'Hide' : 'Add Room'}
                                        </button>
                                        {showAddRoomForm && (
                                            <div className="add-form">
                                                <input type="text" value={roomName}
                                                       onChange={(e) => setRoomName(e.target.value)}
                                                       placeholder="Room Name"/>
                                                <button onClick={() => addItem('http://localhost:8082/rooms/add', {
                                                    name: roomName,
                                                    house_id: selectedHouse.house_id
                                                }, updateRoomAfterAdd)}>Submit
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>


                            <div className="select-box">
                            <hr className="room-hr"></hr>
                                <h2>Generators</h2>
                                <div className="rooms-panel">
                                    <div className="rooms-left-panel">
                                        <select id="generators" onChange={handleGeneratorChange}>
                                            <option value="">Select a generator</option>
                                            {selectedHouse.generators.map((generator) => (
                                                <option key={generator.id} value={generator.id}>
                                                    {generator.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="rooms-right-panel">
                                        {/* Remove generator */}
                                        {selectedGenerator && <button
                                            onClick={() => deleteItem('http://localhost:8082/generators/delete', selectedGenerator.id, updateGeneratorAfterDelete)}>Delete
                                            Generator</button>}

                                        {/* Add generator */}
                                        <button
                                            onClick={() => toggleForm(setShowAddGeneratorForm, showAddGeneratorForm)}>
                                            {showAddGeneratorForm ? 'Hide' : 'Add Generator'}
                                        </button>
                                        {showAddGeneratorForm && (
                                            <div className="add-form">
                                                <input type="text" value={generatorName}
                                                       onChange={(e) => setGeneratorName(e.target.value)}
                                                       placeholder="Generator Name"/>
                                                <button onClick={() => addItem('http://localhost:8082/generators/add', {
                                                    name: generatorName,
                                                    house_id: selectedHouse.house_id
                                                }, updateGeneratorAfterAdd)}>Submit
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}


                    {/* Devices */}
                    {selectedRoom && (
                        <>
                            <div className="select-box">
                                <hr className="room-hr"></hr>
                                <h2>Devices</h2>
                                <div className="rooms-panel">
                                    <div className="rooms-left-panel">
                                        <select id="devices" onChange={handleDeviceChange}>
                                            <option value="">Select a device</option>
                                            {selectedRoom.devices.map((device) => (
                                                <option key={device.id} value={device.id}>
                                                    {device.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="rooms-right-panel">
                                        {/* Remove device */}
                                        {selectedDevice && <button
                                            onClick={() => deleteItem('http://localhost:8082/devices/delete', selectedDevice.id, updateDeviceAfterDelete)}>Delete
                                            Device</button>}

                                        {/* Add device */}
                                        <button onClick={() => toggleForm(setShowAddDeviceForm, showAddDeviceForm)}>
                                            {showAddDeviceForm ? 'Hide' : 'Add Device'}
                                        </button>
                                        {showAddDeviceForm && (
                                            <div className="add-form">
                                                <input type="text" value={deviceName}
                                                       onChange={(e) => setDeviceName(e.target.value)}
                                                       placeholder="Device Name"/>
                                                <input type="number" step="0.01"
                                                       value={devicePowerConsumption == 0 ? '' : devicePowerConsumption}
                                                       onChange={(e) => setDevicePowerConsumption(e.target.value)}
                                                       placeholder="Power consumption"/>
                                                <button onClick={() => addItem('http://localhost:8082/devices/add', {
                                                    name: deviceName,
                                                    roomId: selectedRoom.id,
                                                    powerConsumption: devicePowerConsumption
                                                }, updateDeviceAfterAdd)}>Submit
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>


                            {/* Intervals */}
                            {selectedDevice && (
                                <div className="select-box">
                                    <hr class="room-hr"></hr>
                                    <h2>Working intervals</h2>
                                    <div className="rooms-panel">
                                        <div className="rooms-left-panel">

                                            <select id="intervals" onChange={handleIntervalChange}>
                                                <option value="">Select an interval</option>
                                                {selectedDevice.intervals.map((interval) => (
                                                    <option key={interval.id} value={interval.id}>
                                                        {interval.timeStart} - {interval.timeEnd}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="rooms-right-panel">
                                            {/* Remove interval */}

                                            {selectedInterval && <button
                                                onClick={() => deleteItem('http://localhost:8082/intervals', selectedInterval.id, updateIntervalAfterDelete)}>Delete
                                                Interval</button>}

                                            {/* Add interval */}

                                            <button
                                                onClick={() => toggleForm(setShowAddIntervalForm, showAddIntervalForm)}>
                                                {showAddIntervalForm ? 'Hide' : 'Add Interval'}
                                            </button>
                                            {showAddIntervalForm && (
                                                <div className="add-form">
                                                    <input type="text" value={intervalStartTime}
                                                           onChange={(e) => setIntervalStartTime(e.target.value)}
                                                           placeholder="Start Time"/>
                                                    <input type="text" value={intervalEndTime}
                                                           onChange={(e) => setIntervalEndtime(e.target.value)}
                                                           placeholder="End Time"/>
                                                    <button
                                                        onClick={() => addItem('http://localhost:8082/intervals/add', {
                                                            timeStart: intervalStartTime,
                                                            timeEnd: intervalEndTime,
                                                            deviceId: selectedDevice.id
                                                        }, updateIntervalAfterAdd)}>Submit
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className='time-chart'>
                                <div className='time-chart-content'>
                                    <RoomsChart devicesData={selectedRoom.devices} />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Rooms;