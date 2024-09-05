import { useNavigate } from "react-router-dom"
import Find from "./Find/Find"
import Panel from "./Panel/Panel"
import Products from "./Products/Products"
import cls from './base.module.scss'
import { Button } from "antd"


function Base() {

    const nav = useNavigate();

    return (
        <div className={`${cls.main}`}>
            <Button type="text" className={`${cls.exit}`} onClick={() => { localStorage.clear(); nav('/auth') }}>Exit</Button>
            <Panel />
            <Find />
            <Products />
        </div>
    )
}

export default Base