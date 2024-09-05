import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import cls from './panel.module.scss'
import { getHistory } from '../../../store/slices/historySlice'
import { Spin } from 'antd';




function Panel() {

    const dispatch = useAppDispatch();
    useEffect(() => { dispatch(getHistory()) }, [])
    const journal = useAppSelector((s) => s.history)

    const { b, zh, u } = journal.state.find((e) => {
        const date = new Date();
        return e.date === date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric' });
    }) || { b: 0, zh: 0, u: 0 }

    if (journal.status === 'Error') { return <ul className={cls.main}>Ошибка загрузки данных</ul> }
    return (
        <ul className={cls.main}>
            {journal.status === "Загрузка"
                ? <><div>Загрузка <Spin size='small' /></div></>
                : <><li>Белки {b}</li>
                    <li>Жиры {zh}</li>
                    <li>Углеводы {u}</li>
                    <li>Калории {Math.ceil(b * 4 + zh * 9 + u * 4)}</li></>}
        </ul>
    )
}

export default Panel