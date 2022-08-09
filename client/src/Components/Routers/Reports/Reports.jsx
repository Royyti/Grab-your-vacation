import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { getVacationFollowers, getToken } from '../../../Api';
import { store } from '../../../store/store';

export function Reports() {
    const [vacationArr, setvacationArr] = useState([]);
    const token = getToken();
    const isAdmin = store.getState().userSettings.isAdmin === "yes"
    useEffect(() => {
        getVacationFollowers()
            .then(res => setvacationArr(res))
    }, [])
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    const options = { responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'VACATION FOLLOWRS', }, }, };
    const labels = [];
    const data2 = [];
    vacationArr.forEach((element) => {
        labels.push(element.destination);
        data2.push(element.followers);
    });
    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: data2,
                backgroundColor: 'rgba(255, 99, 132,0.5)',
            },]
    };

    return <>
        {isAdmin ? <Bar options={options} data={data} /> : !token ? window.location.replace('http://localhost:3000') : window.location.replace('http://localhost:3000/Vacations')}
    </>


}

export default Reports