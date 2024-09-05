import { Button, Input, Radio } from 'antd'
import { useState } from 'react'
import cls from './product.module.scss'
import { useAppDispatch } from '../../../../store/hooks';
import { getHistory } from '../../../../store/slices/historySlice';
import { baseURL } from '../../../../baseParam';

type propsProd = { name: string, b: number, zh: number, u: number, k?: number }



function Product({ name, b, zh, u, k }: propsProd) {
    const [ei, setei] = useState<string>('Грамм');
    const [inp, setinp] = useState<string>('');
    const dispatch = useAppDispatch();


    function mat(p: number, s: string, k?: number) {
        return k && ei === 'Шт' ? Math.round(p / 100 * Number(s) * k) : Math.round(p / 100 * Number(s))
    }

    const eaten = async (): Promise<void> => {
        if (inp === '') { return }
        const date = new Date();
        try {
            const auth = localStorage.getItem('Auth')
            if (typeof auth === 'string') {
                const res = await fetch(`${baseURL}/eaten`, {
                    method: 'POST',
                    headers: {
                        'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', ...JSON.parse(auth)
                    },
                    body: JSON.stringify(
                        {
                            date: date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric' }),
                            b: mat(b, inp, k),
                            zh: mat(zh, inp, k),
                            u: mat(u, inp, k)
                        })
                })
                if (res.ok) { dispatch(getHistory()); setinp('') } else { throw res.status }
            }
        } catch (err) {
            if (!['404', '500'].includes(`${err}`)) { localStorage.removeItem('Auth'); window.location.reload() }
        }
    }


    return (
        <div className={`${cls.main}`}>
            <div>{name}<br />К{Math.ceil(b * 4 + zh * 9 + u * 4)} Б{b} Ж{zh} У{u}</div>
            <div className={`${cls.box}`}>
                {k ?
                    <Radio.Group value={ei} onChange={(e) => { setei(e.target.value) }}>
                        <Radio.Button value="Грамм">Грамм</Radio.Button>
                        <Radio.Button value="Шт">Шт</Radio.Button>
                    </Radio.Group> : ''}
                <div>
                    <Input className={`${cls.inp}`} placeholder={ei} value={inp}
                        onChange={(e) => {
                            if (Number(e.target.value) || e.target.value === '') { setinp(e.target.value) }
                        }} />
                    <Button onClick={() => eaten()}>Eaten</Button>
                </div>
            </div>
        </div>
    )
}

export default Product