import React from "react";
import ReactApexChart from "react-apexcharts";
import Rooms from "./Rooms";

class RoomsChart extends React.Component {
    constructor(props, dataSeries) {
        super(props);
        this.state = {
            series: dataSeries,
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

export default RoomsChart;