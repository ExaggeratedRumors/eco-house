import React, { useEffect, useState } from 'react';
import "./Rooms.css";
import RoomsChart from "./RoomsChart";
import axios from "axios";

const Rooms = () => {
    const [ownerData, setOwnerData] = useState(null);

    /** House **/
    const [houseName, setHouseName] = useState('');
    const [houseAddress, setHouseAddress] = useState('');
    const [houseDayTariff, setHouseDayTariff] = useState(0.0);
    const [houseNightTariff, setHouseNightTariff] = useState(0.0);

    /** Room **/
    const [roomName, setRoomName] = useState('');

    /** Device **/
    const [deviceName, setDeviceName] = useState('');
    const [devicePowerConsumption, setDevicePowerConsumption] = useState(0.0);

    /** Generator **/
    const [generatorName, setGeneratorName] = useState('');
    const [generatorWattage, setGeneratorWattage] = useState(0.0);
    const [generatorEffectiveness, setGeneratorEffectiveness] = useState(0.0);
    const [generatorBatteryCapacity, setGeneratorBatteryCapacity] = useState(0.0);

    /** Interval **/
    const [intervalStartTime, setIntervalStartTime] = useState('');
    const [intervalEndTime, setIntervalEndTime] = useState('');

    /** Selections **/
    const [selectedHouse, setSelectedHouse] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedGenerator, setSelectedGenerator] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [selectedInterval, setSelectedInterval] = useState(null);

    /** Flags **/
    const [showHouseForm, setShowHouseForm] = useState(0);
    const [showRoomForm, setShowRoomForm] = useState(0);
    const [showGeneratorForm, setShowGeneratorForm] = useState(0);
    const [showDeviceForm, setShowDeviceForm] = useState(0);
    const [showIntervalForm, setShowIntervalForm] = useState(0);

    /** Token **/
    let token = localStorage.getItem('token');

    /** Functions **/
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }
        try {
            const id = localStorage.getItem('id');
            const response = await axios.get('http://localhost:8082/owners/' + id, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const newOwnerData = response.data;
            setOwnerData(newOwnerData);

            if (selectedHouse) {
                const updatedHouse = newOwnerData.houses.find((house) => house.house_id === selectedHouse.house_id);
                setSelectedHouse(updatedHouse || null);

                if (updatedHouse && selectedRoom) {
                    const updatedRoom = updatedHouse.rooms.find((room) => room.id === selectedRoom.id);
                    setSelectedRoom(updatedRoom || null);

                    if (updatedRoom && selectedDevice) {
                        const updatedDevice = updatedRoom.devices.find((device) => device.id === selectedDevice.id);
                        setSelectedDevice(updatedDevice || null);

                        if (updatedDevice && selectedInterval) {
                            const updatedInterval = updatedDevice.intervals.find((interval) => interval.id === selectedInterval.id);
                            setSelectedInterval(updatedInterval || null);
                        } else {
                            setSelectedInterval(null);
                        }
                    } else {
                        setSelectedDevice(null);
                        setSelectedInterval(null);
                    }
                } else {
                    setSelectedRoom(null);
                    setSelectedDevice(null);
                    setSelectedInterval(null);
                }

                if (updatedHouse && selectedGenerator) {
                    const updatedGenerator = updatedHouse.generators.find((generator) => generator.id === selectedGenerator.id);
                    setSelectedGenerator(updatedGenerator || null);
                } else {
                    setSelectedGenerator(null);
                }
            } else {
                setSelectedHouse(null);
                setSelectedRoom(null);
                setSelectedDevice(null);
                setSelectedGenerator(null);
                setSelectedInterval(null);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    function formatTime(inputTime) {
        const [hours, minutes] = inputTime.split(':');
        const formattedHours = hours.padStart(2, '0');
        const formattedMinutes = minutes.padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}`;
    }

    function countIntervalsForRoom() {
        let intervalsCount = 0;
        selectedRoom.devices.forEach(device => {
            intervalsCount += device.intervals.length;
        });
        return intervalsCount;
    }

    function validateInterval() {
        const startValidate = /^([01]\d|2[0-3]):([0-5]\d)$/.test(intervalStartTime);
        const endValidate = /^([01]\d|2[0-3]):([0-5]\d)$/.test(intervalEndTime);
        const startMinutes = parseInt(intervalStartTime.split(':')[1]) +
            60 * parseInt(intervalStartTime.split(':')[0]);
        const endMinutes = parseInt(intervalEndTime.split(':')[1]) +
            60 * parseInt(intervalEndTime.split(':')[0]);

        console.log(startValidate);
        console.log(endValidate);
        console.log(startMinutes < endMinutes);
        return startValidate && endValidate && (startMinutes < endMinutes);
    }

    /** Manipulate items **/
    const deleteItem = async (collection, id, updateFunction) => {
        try {
            await axios.delete(`http://localhost:8082/${collection}/remove/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            updateFunction();
            await fetchData()
        } catch (error) {
            alert(`Error deleting item: ${error}`);
        }
    };

    const sendItem = async (collection, body, updateFunction, mode) => {
        try {
            let response
            if(mode === 1) {
                response = await fetch(`http://localhost:8082/${collection}/add`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });
            } else if(mode === 2) {
                response = await fetch(`http://localhost:8082/${collection}/update`, {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });
            } else return


            const newItem = await response.json();
            if(mode === 1) updateFunction(newItem);
            await fetchData()
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
            houses: prevData.houses.filter(house => house.house_id !== selectedHouse.id),
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
        const c = ownerData.houses.find((it) => it.house_id === newHouse.house_id)
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
        setSelectedRoom(prevRoom => ({
            ...prevRoom,
            devices: prevRoom.devices.map(device => {
                if (device.id === selectedDevice.id) {
                    return {
                        ...device,
                        intervals: [...device.intervals, newInterval],
                    };
                }
                return device;
            }),
        }));

        setSelectedDevice(prevDevice => ({
            ...prevDevice,
            intervals: [...prevDevice.intervals, newInterval],
        }));
    };

    const toggleForm = (setShowForm, showForm, value) => {
        setShowForm(value);
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

                {/* Houses */}

                    <div className="select-box">
                        <hr className="room-hr"></hr>
                        <h2>Houses</h2>
                        <div className="rooms-panel">
                            <div className="rooms-left-panel">
                                <select id="houses" onChange={handleHouseChange}>
                                    <option value="">Select a house</option>
                                    {ownerData && ownerData.houses && ownerData.houses.map((house) => (
                                        <option key={house.house_id} value={house.house_id}>
                                            {house.name}
                                        </option>
                                    ))}
                                </select>
                                {selectedHouse && (
                                    <div className="container-center text-white border">
                                        <lu className="container-left">
                                            <li>Address: {selectedHouse.address}</li>
                                            <li>Daytime Tariff: {selectedHouse.daytimeTariff}</li>
                                            <li>Night Tariff: {selectedHouse.nightTariff}</li>
                                        </lu>
                                    </div>
                                )}
                            </div>

                            <div className="rooms-right-panel">
                                {selectedHouse && showHouseForm === 0 && (
                                    <button class="room-button" onClick={() => deleteItem('houses', selectedHouse.house_id, updateHouseAfterDelete)}>
                                        Delete House
                                    </button>
                                )}
                                {showHouseForm === 0 && (
                                    <button className="room-button" onClick={() => toggleForm(setShowHouseForm, showHouseForm, 1)}>
                                        Add House
                                    </button>
                                )}
                                {selectedHouse && showHouseForm === 0 && (
                                    <button className="room-button" onClick={() => toggleForm(setShowHouseForm, showHouseForm, 2)}>
                                        Edit House
                                    </button>
                                )}
                                {showHouseForm !== 0 && (
                                    <button className="room-button" onClick={() => toggleForm(setShowHouseForm, showHouseForm, 0)}>
                                        {showHouseForm === 1 ? "Cancel adding" : "Cancel editing"}
                                    </button>
                                )}
                                {showHouseForm > 0 && (
                                    <div className="add-form">
                                        <input type="text" value={houseName}
                                               onChange={(e) => setHouseName(e.target.value)}
                                               placeholder={showHouseForm === 1 ? "House name" : selectedHouse.name}/>
                                        <input type="text" value={houseAddress}
                                               onChange={(e) => setHouseAddress(e.target.value)}
                                               placeholder={showHouseForm === 1 ? "House address" : selectedHouse.address}/>
                                        <input type="number" step="0.01" value={houseDayTariff === 0 ? '' : houseDayTariff}
                                               onChange={(e) => setHouseDayTariff(e.target.value)}
                                               placeholder={showHouseForm === 1 ? "House day tariff" : selectedHouse.daytimeTariff}/>
                                        <input type="number" step="0.01" value={houseNightTariff === 0 ? '' : houseNightTariff}
                                               onChange={(e) => setHouseNightTariff(e.target.value)}
                                               placeholder={showHouseForm === 1 ? "House night tariff" : selectedHouse.nightTariff}/>
                                        <button class="room-button"
                                            onClick={() => sendItem('houses',
                                                {
                                                    id: showHouseForm === 1 ? ownerData.owner_id : selectedHouse.house_id,
                                                    name: houseName,
                                                    address: houseAddress,
                                                    daytimeTariff: houseDayTariff,
                                                    nightTariff: houseNightTariff
                                                }, updateHouseAfterAdd, showHouseForm)}>Submit
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
                                        {selectedRoom && showRoomForm === 0 && (
                                            <button class="room-button" onClick={() => deleteItem('rooms', selectedRoom.id, updateRoomAfterDelete)}>
                                                Delete Room
                                            </button>
                                        )}
                                        {showRoomForm === 0 && (
                                            <button className="room-button" onClick={() => toggleForm(setShowRoomForm, showRoomForm, 1)}>
                                                Add Room
                                            </button>
                                        )}
                                        {selectedRoom && showRoomForm === 0 && (
                                            <button className="room-button" onClick={() => toggleForm(setShowRoomForm, showRoomForm, 2)}>
                                                Edit Room
                                            </button>
                                        )}
                                        {showRoomForm !== 0 && (
                                            <button className="room-button" onClick={() => toggleForm(setShowRoomForm, showRoomForm, 0)}>
                                                {showRoomForm === 1 ? "Cancel adding" : "Cancel editing"}
                                            </button>
                                        )}
                                        {showRoomForm > 0 && (
                                            <div className="add-form">
                                                <input type="text" value={roomName}
                                                       onChange={(e) => setRoomName(e.target.value)}
                                                       placeholder={showRoomForm === 1 ? "Room Name" : selectedRoom.name} />
                                                <button class="room-button" onClick={() => sendItem('rooms', {
                                                    name: roomName,
                                                    id: showRoomForm === 1 ? selectedHouse.house_id : selectedRoom.id
                                                }, updateRoomAfterAdd, showRoomForm)}>Submit
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
                                        {selectedGenerator && (
                                            <div className="container-center text-white border">
                                                <lu className="container-left">
                                                    <li>Effectiveness: {selectedGenerator.effectiveness}</li>
                                                    <li>Battery Capacity: {selectedGenerator.batteryCapacity}</li>
                                                    <li>Wattage: {selectedGenerator.wattage}</li>
                                                </lu>
                                            </div>
                                        )}
                                    </div>
                                    <div className="rooms-right-panel">
                                        {selectedGenerator && showGeneratorForm === 0 && (
                                            <button class="room-button" onClick={() => deleteItem('generators', selectedGenerator.id, updateGeneratorAfterDelete)}>
                                                Delete Generator
                                            </button>
                                        )}
                                        {showGeneratorForm === 0 && (
                                            <button className="room-button" onClick={() => toggleForm(setShowGeneratorForm, showGeneratorForm, 1)}>
                                                Add Generator
                                            </button>
                                        )}
                                        {selectedGenerator && showGeneratorForm === 0 && (
                                            <button className="room-button" onClick={() => toggleForm(setShowGeneratorForm, showGeneratorForm, 2)}>
                                                Edit Generator
                                            </button>
                                        )}
                                        {showGeneratorForm !== 0 && (
                                            <button className="room-button" onClick={() => toggleForm(setShowGeneratorForm, showGeneratorForm, 0)}>
                                                {showGeneratorForm === 1 ? "Cancel adding" : "Cancel editing"}
                                            </button>
                                        )}
                                        {showGeneratorForm > 0 && (
                                            <div className="add-form">
                                                <input type="text" value={generatorName}
                                                       onChange={(e) => setGeneratorName(e.target.value)}
                                                       placeholder={showGeneratorForm === 1 ? "Generator name" : selectedGenerator.name}/>
                                                <input type="number" step="0.01" value={generatorEffectiveness === 0 ? '' : generatorEffectiveness}
                                                       onChange={(e) => setGeneratorEffectiveness(e.target.value)}
                                                       placeholder={showGeneratorForm === 1 ? "Generator effectiveness" : selectedGenerator.effectiveness}/>
                                                <input type="number" step="0.01" value={generatorBatteryCapacity === 0 ? '' : generatorBatteryCapacity}
                                                       onChange={(e) => setGeneratorBatteryCapacity(e.target.value)}
                                                       placeholder={showGeneratorForm === 1 ? "Generator battery capacity" : selectedGenerator.batteryCapacity}/>
                                                <input type="number" step="0.01" value={generatorWattage === 0 ? '' : generatorWattage}
                                                       onChange={(e) => setGeneratorWattage(e.target.value)}
                                                       placeholder={showGeneratorForm === 1 ? "Generator wattage" : selectedGenerator.wattage} />

                                                <button class="room-button" onClick={() => sendItem('generators', {
                                                    name: generatorName,
                                                    id: showGeneratorForm === 1 ? selectedHouse.house_id : selectedGenerator.id,
                                                    wattage: generatorWattage,
                                                    effectiveness: generatorEffectiveness,
                                                    batteryCapacity: generatorBatteryCapacity
                                                }, updateGeneratorAfterAdd, showGeneratorForm)}>Submit
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
                                        {selectedDevice && (
                                            <div className="container-center text-white border">
                                                <lu className="container-left">
                                                    <li>Power consumption [kWh]: {selectedDevice.powerConsumptionPerHour}</li>
                                                </lu>
                                            </div>
                                        )}
                                    </div>
                                    <div className="rooms-right-panel">
                                        {selectedDevice && showDeviceForm === 0 && (
                                            <button class="room-button" onClick={() => deleteItem('devices', selectedDevice.id, updateDeviceAfterDelete)}>
                                                Delete Device
                                            </button>
                                        )}
                                        {showDeviceForm === 0 && (
                                            <button className="room-button" onClick={() => toggleForm(setShowDeviceForm, showDeviceForm, 1)}>
                                                Add Device
                                            </button>
                                        )}
                                        {selectedDevice && showDeviceForm === 0 && (
                                            <button className="room-button" onClick={() => toggleForm(setShowDeviceForm, showDeviceForm, 2)}>
                                                Edit Device
                                            </button>
                                        )}
                                        {showDeviceForm !== 0 && (
                                            <button className="room-button" onClick={() => toggleForm(setShowDeviceForm, showDeviceForm, 0)}>
                                                {showDeviceForm === 1 ? "Cancel adding" : "Cancel editing"}
                                            </button>
                                        )}
                                        {showDeviceForm > 0 && (
                                            <div className="add-form">
                                                <input type="text" value={deviceName}
                                                       onChange={(e) => setDeviceName(e.target.value)}
                                                       placeholder={showDeviceForm === 1 ? "Device Name" : selectedDevice.name}/>
                                                <input type="number" step="0.01"
                                                       value={devicePowerConsumption === 0 ? '' : devicePowerConsumption}
                                                       onChange={(e) => setDevicePowerConsumption(e.target.value)}
                                                       placeholder={showDeviceForm === 1 ? "Power consumption" : selectedDevice.powerConsumptionPerHour} />
                                                <button class="room-button" onClick={() => sendItem('devices', {
                                                    name: deviceName,
                                                    id: showDeviceForm === 1 ?  selectedRoom.id : selectedDevice.id,
                                                    powerConsumption: devicePowerConsumption
                                                }, updateDeviceAfterAdd, showDeviceForm)}>Submit
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
                                            {selectedInterval && showIntervalForm === 0 && (
                                                <button class="room-button" onClick={() => deleteItem('intervals', selectedInterval.id, updateIntervalAfterDelete)}>
                                                    Delete Interval
                                                </button>
                                            )}
                                            {showIntervalForm === 0 && (
                                                <button className="room-button" onClick={() => toggleForm(setShowIntervalForm, showIntervalForm, 1)}>
                                                    Add Interval
                                                </button>
                                            )}
                                            {selectedInterval && showIntervalForm === 0 && (    
                                                <button className="room-button" onClick={() => toggleForm(setShowIntervalForm, showIntervalForm, 2)}>
                                                    Edit Interval
                                                </button>
                                            )}
                                            {showIntervalForm !== 0 && (
                                                <button className="room-button" onClick={() => toggleForm(setShowIntervalForm, showIntervalForm, 0)}>
                                                    {showIntervalForm === 1 ? "Cancel adding" : "Cancel editing"}
                                                </button>
                                            )}
                                            {showIntervalForm > 0 && (
                                                <div className="add-form">
                                                    <input type="text" value={intervalStartTime}
                                                           onChange={(e) => setIntervalStartTime(e.target.value)}
                                                           placeholder={showIntervalForm === 1 ? "Start Time" : selectedInterval.timeStart} required />
                                                    <input type="text" value={intervalEndTime}
                                                           onChange={(e) => setIntervalEndTime(e.target.value)}
                                                           placeholder={showIntervalForm === 1 ? "End Time" : selectedInterval.timeEnd} required />
                                                    <button class="room-button"
                                                        onClick={() => {
                                                            if(validateInterval()) {
                                                                sendItem('intervals', {
                                                                    timeStart: formatTime(intervalStartTime),
                                                                    timeEnd: formatTime(intervalEndTime),
                                                                    id: showIntervalForm === 1 ? selectedDevice.id : selectedInterval.id,
                                                                 }, updateIntervalAfterAdd, showIntervalForm)
                                                            } else {
                                                                alert('Invalid interval');
                                                            }
                                                        }
                                                    }>Submit
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {countIntervalsForRoom() < 1 ? "" : (
                            <div className='time-chart'>
                                <div className='time-chart-content'>
                                    <RoomsChart devicesData={selectedRoom.devices} roomName={selectedRoom.name} />
                                </div>
                            </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Rooms;