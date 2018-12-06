import React from "react";
import PropTypes from "prop-types";

import * as d3 from "d3";

class BarChart extends React.Component {

    scaleColor = d3.scaleSequential(d3.interpolateViridis);
    scaleHeight = d3.scaleLinear();
    scaleWidth = d3.scaleBand().padding(0.05);

    componentDidMount() {
        this.updateChart();
    }

    componentDidUpdate() {
        this.updateChart();
    }

    updateChart() {
        this.updateScales();
        const { data, height, animDuration } = this.props;
        const bars = d3.select(this.viz)
            .selectAll(".bar")
            .data(data, function(d) { return d ? d.item : d3.select(this).attr("item"); });
        bars
            .transition().duration(animDuration)
            .attr("y", (d) => ( this.scaleHeight(d.count) ))
            .attr("height", (d) => (height - this.scaleHeight(d.count)) )
            .attr("x", (d) => ( this.scaleWidth(d.item) ) )
            .attr("width", this.scaleWidth.bandwidth() )
            .style("fill",  (d) => ( this.scaleColor(d.item) ));
    }

    updateScales() {
        const { data, width, height } = this.props;
        this.scaleColor.domain([0, data.length]);
        this.scaleWidth
            .domain(data.map((d) => (d.item)))
            .range([0, width]);
        this.scaleHeight
            .domain(d3.extent(data, (d) => (d.count)))
            .range([height - 20, 0]);
    }

    render() {
        const { width, height, data} = this.props;
        const bars = data.map((d) => (
            <rect key={d.item}
                  item={d.item}
                  className="bar"
                  y={ height} rx="5" ry="5"
            />));
        return (
            <svg ref={ viz => (this.viz = viz) }
                 className="D3svg"
                 width={width} height={height} >
                { bars }
            </svg>
        );
    }
}

BarChart.defaultProps = {
    animDuration: 600,
    width: 700,
    height: 400,
    data: [{item: 12, count: 10},{item: 13, count: 2},{item: 16, count: 3},{item: 17, count: 4},{item: 18, count: 5},{item: 10, count: 6},{item: 14, count: 7},{item: 11, count: 8}]
};

BarChart.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    animDuration: PropTypes.number
};

export default BarChart;