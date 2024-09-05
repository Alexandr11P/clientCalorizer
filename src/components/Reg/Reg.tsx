import { Button, Input } from 'antd'
import cls from './reg.module.scss'
import { useNavigate } from 'react-router-dom'
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { visModal } from '../../store/slices/modalSlice';
import { baseHeaders, baseURL } from '../../baseParam';

function Reg() {
    const nav = useNavigate();
    const dispatch = useAppDispatch();
    const [name, setName] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [passR, setPassR] = useState<string>('');
    const [validName, setValidName] = useState(false);
    const [validPass, setValidPass] = useState(false);

    useEffect(() => {
        setValidName(name.length > 15);
        if (pass.length > 15 || pass.length < 4 && pass !== '') { setValidPass(true) }
        else { setValidPass(false) }
    }, [name, pass])


    function changeInput(
        state: string,
        setstate: React.Dispatch<React.SetStateAction<string>>,
        action?: (e: ChangeEvent<HTMLInputElement>) => void) { return (e: ChangeEvent<HTMLInputElement>) => { setstate(e.target.value); if (action) { action(e) } } }

    function reg() {
        if (pass.trim() === '' || name.trim() === '') { return dispatch(visModal('Одно из полей не заполнено!')) }
        fetch(`${baseURL}/reg`, { method: 'POST', body: JSON.stringify({ name: name, password: pass }), headers: { 'Content-Type': 'application/json', ...baseHeaders } })
            .then((response) => response.ok ? response.json() : Promise.reject(response))
            .then(() => { localStorage.setItem('Auth', JSON.stringify({ username: name, password: pass })); nav('/') })
            .catch((err) => {
                if (err.status === 401) {
                    err.json().then((d: { message: 'string' }) => dispatch(visModal(d.message)))
                }
            });
    }
    return (
        <div className={`${cls.body}`}>
            <div className={`${cls.main}`}>
                <span style={{ display: validName ? '' : 'none' }} className={`${cls.nameV}`}>Имя пользователя должно быть не длиннее 15 символов</span>
                <Input placeholder='Введите имя пользователя' value={name} onChange={changeInput(name, setName)} />
                <span style={{ display: validPass ? '' : 'none' }} className={`${cls.passV}`}>Пароль должен быть не короче 4 и не длиннее 15 символов</span>
                <Input type='password' placeholder='Введите пароль' value={pass} onChange={changeInput(pass, setPass)} />
                <Input type='password' placeholder='Повторите пароль' value={passR} onChange={changeInput(passR, setPassR)} />
                <div className={`${cls.btns}`}>
                    <Button disabled={validName || validPass} type="primary" onClick={() => pass === passR ? reg() : dispatch(visModal('Пароли не совпадают!'))}>
                        Зарегистрироваться
                    </Button>
                    <Button onClick={() => nav('/auth')} type="primary">Авторизация</Button>
                </div>
            </div>
        </div>

    )
}

export default Reg