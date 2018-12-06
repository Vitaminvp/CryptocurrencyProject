import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { interpolateLab } from 'd3-interpolate';

export default class Bars extends Component {
    constructor(props) {
        super(props);
        this.colorScale = scaleLinear()
            .domain([0, this.props.maxValue])
            .range(['#98abc5',
                    '#ff8c00'])
            .interpolate(interpolateLab)
    }

    render() {
        const { scales, margins, data, svgDimensions } = this.props;
        const { xScale, yScale } = scales;
        const { height } = svgDimensions;

        const bars = (
            data.map(datum =>{
                return <rect
                    key={datum.title}
                    x={xScale(datum.title)}
                    y={yScale(datum.value)}
                    height={height - margins.bottom - scales.yScale(datum.value)}
                    width={xScale.bandwidth()}
                    fill={this.colorScale(datum.value)}
                />},
            )
        );

        return (
            <g>{bars}</g>
        )
    }
}
