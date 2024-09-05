import { Button, Input } from 'antd'
import cls from './auth.module.scss'
import { useNavigate } from 'react-router-dom'
import type React from 'react';
import type { ChangeEvent } from 'react';
import { useState } from 'react'
import { useAppDispatch } from '../../store/hooks';
import { visModal } from '../../store/slices/modalSlice';
import { baseHeaders, baseURL } from '../../baseParam';

function Auth() {
    const nav = useNavigate()
    const dispatch = useAppDispatch();
    const [name, setName] = useState<string>('');
    const [pass, setPass] = useState<string>('');

    function changeInput(
        state: string,
        setstate: React.Dispatch<React.SetStateAction<string>>,
        action?: (e: ChangeEvent<HTMLInputElement>) => void) { return (e: ChangeEvent<HTMLInputElement>) => { setstate(e.target.value); if (action) { action(e) } } }

    function auth() {
        fetch(`${baseURL}/auth`, { method: 'POST', headers: { username: name, password: pass, ...baseHeaders } })
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
                <Input placeholder='Введите имя пользователя' value={name} onChange={changeInput(name, setName)} />
                <Input type='password' placeholder='Введите пароль' value={pass} onChange={changeInput(pass, setPass)} />
                <div className={`${cls.btns}`}>
                    <Button type="primary" onClick={() => auth()}>Войти</Button>
                    <Button onClick={() => nav('/reg')} type="primary">Регистрация</Button>
                </div>
            </div>
        </div>

    )
}

export default Auth