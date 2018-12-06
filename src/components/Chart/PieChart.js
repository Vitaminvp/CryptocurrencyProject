import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';


class PieChart extends Component
{
    render(){
        const options = {
            maintainAspectRatio: false,
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
                    backgroundColor:[
                        'rgba(255,105,145,0.6)',
                        'rgba(155,100,210,0.6)',
                        'rgba(90,178,255,0.6)',
                        'rgba(240,134,67,0.6)',
                        'rgba(120,120,120,0.6)',
                        'rgba(250,55,197,0.6)'
                    ],
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
        const data = {
            labels: [...this.props.labelsSet],
            datasets: [{
                label: "Pie chart",
                backgroundColor:[
                    'rgba(155,100,210,0.6)',
                    'rgba(255,105,145,0.6)',
                    'rgba(90,178,255,0.6)',
                    'rgba(240,134,67,0.6)',
                    'rgba(120,120,120,0.6)',
                    'rgba(250,55,197,0.6)'
                ],
                borderColor: 'transparent',
                data: [...this.props.dataSet],
            }]
        };
        return(
            <Pie
                data={data}
                width={50}
                height={10}
                options={options}
            />
        )
    }
}
export default  PieChart;