import { Button, Input } from "antd"
import cls from './find.module.scss'
import { useState } from "react"
import { useAppDispatch } from "../../../store/hooks"
import { find } from "../../../store/slices/productsSlice"
import { useNavigate } from "react-router-dom"




function Find() {
    const [state, setstate] = useState('');
    const nav = useNavigate();
    const dispatch = useAppDispatch();


    return (
        <>
            <Button className={cls.btn} onClick={() => nav('/his')}>График потребления КБЖУ за 30 дней</Button>
            <Input value={state} onChange={(e) => { setstate(e.target.value); dispatch(find(e.target.value)) }}
                className={cls.main} placeholder="Введите название продукта" />
        </>
    )
}

export default Find