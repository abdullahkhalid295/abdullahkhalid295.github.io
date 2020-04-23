import React, {useState, useEffect} from 'react';
import { fetchDailyData } from '../../api';
import {Line, Bar} from 'react-chartjs-2';
import styles from './Chart.module.css';


const Chart = ({ data: {confirmed,deaths,recovered}, country}) => {

    const [dailyData, setDailyData] = useState([]);

    useEffect(()=> {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    },[]);

    const lineChart = (
        
        dailyData.length
        ?(
            <Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({confirmed})=> confirmed),
                    label: 'Infected',
                    borderColor: '#b030b0',
                    fill:true,
                }, {
                    data: dailyData.map(({deaths})=> deaths),
                    label: 'deaths',
                    borderColor: '#ee4540',
                    backgroundColor: '#ca3e47',
                    fill:true,
                }],
            }}
            options={{
                legend:{
                    labels:{
                        fontColor: '#FFFFFF'
                    }
                },
                scales:{
                    yAxes: [
                        {
                            ticks: {fontColor: "#FFFFFF"},
                            scaleLabel: {fontColor: "#FFFFFF"}
                        }
                    ],
                    xAxes: [
                        {
                            ticks: {fontColor: "#FFFFFF"}
                        }
                    ]
                }
            }
        }
        />) :null
    );


    const barChart = (
        confirmed
        ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                        '#15607a',
                        '#47efbe',
                        '#cccccc',
                    ],
                    data:[confirmed.value, recovered.value, deaths.value]
                }]
            }}
                options={{
                    legend:{
                        labels:{
                            fontColor: '#FFFFFF'
                        }
                    },
                    scales:{
                        yAxes: [
                            {
                                ticks: {fontColor: "#FFFFFF"},
                                scaleLabel: {fontColor: "#FFFFFF"}
                            }
                        ],
                        xAxes: [
                            {
                                ticks: {fontColor: "#FFFFFF"}
                            }
                        ]
                    },
                    title:{display: true, text: `Current state in ${country}`, fontColor:'#FFFFFF'},

                }}
            />
        ) : null
    );


    return (
        <div className={styles.container}>
            {country ? barChart : lineChart }
        </div>
    )
}


export default Chart;