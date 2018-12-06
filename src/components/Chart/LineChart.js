import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

class LineChart extends Component {
    render(){
        const options = {
            annotation: {
                annotations: [{
                    drawTime: 'afterDatasetsDraw',
                    borderColor: 'red',
                    borderDash: [2, 2],
                    borderWidth: 2,
                    mode: 'vertical',
                    type: 'line',
                    value: 10,
                    scaleID: 'x-axis-0',
                    label: {
                        backgroundColor: 'red',
                        fontFamily: 'sans-serif',
                        fontSize: 10,
                        fontStyle: 'bold',
                        fontColor: '#fff',
                        textAlign: 'center',
                        xPadding: 4,
                        yPadding: 4,
                        cornerRadius: 4,
                        position: 'top',
                        enabled: true,
                        content: "Threshold"
                    }
                }]
            },
            maintainAspectRation: false
        };

        return(
            <Line
                data={this.props.dataSet}
                width={50}
                height={10}
                options={options}
            />
        )
    }
}
export default LineChart;