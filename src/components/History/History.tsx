import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getHistory } from '../../store/slices/historySlice';
import { useEffect } from 'react';
import { Button, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);



export default function History() {
    const dispatch = useAppDispatch();
    const journal = useAppSelector((s) => s.history.state);
    const nav = useNavigate();
    useEffect(() => { dispatch(getHistory()) }, []);


    const options = {
        responsive: true,
        plugins: {
            legend: {},
            title: {
                color: 'black',
                display: true,
                text: 'График потребления БЖУ за 30 дней',
            },
        },
    };

    const data = {
        labels: journal.map((e) => e.date),
        datasets: [
            {
                label: 'Белки',
                data: journal.map((e) => e.b),
                borderColor: 'blue',
                backgroundColor: 'blue',
            },
            {
                label: 'Жиры',
                data: journal.map((e) => e.zh),
                borderColor: 'yellow',
                backgroundColor: 'yellow',
            },
            {
                label: 'Углеводы',
                data: journal.map((e) => e.u),
                borderColor: 'red',
                backgroundColor: 'red',
            },
        ],
    };

    const optionsK = {
        responsive: true,
        plugins: {
            legend: {},
            title: {
                color: 'black',
                display: true,
                text: 'График потребления каллорий за 30 дней',
            },
        },
    };

    const dataK = {
        labels: journal.map((e) => e.date),
        datasets: [
            {
                label: 'Каллории',
                data: journal.map((e) => Math.ceil(e.u * 4 + e.b * 4 + e.zh * 9)),
                borderColor: 'black',
                backgroundColor: 'black',
            }
        ],
    };

    const style = { display: 'flex', justifyContent: 'center', backgroundColor: 'white', height: '50vh' };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button type="text" className={`${'cls.exit'}`} onClick={() => { nav('/') }}>
                    На главную</Button>
                <Button type="text" className={`${'cls.exit'}`} onClick={() => { localStorage.clear(); nav('/auth') }}>
                    Exit</Button>
            </div>
            <div style={style}><Line options={options} data={data} /></div>
            <div style={style}><Line options={optionsK} data={dataK} /></div>
        </>);
}
