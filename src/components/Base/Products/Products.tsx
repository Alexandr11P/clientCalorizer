import { useDeferredValue, useEffect } from 'react'
import Product from './Product/Product'
import cls from './products.module.scss'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setProducts } from '../../../store/slices/productsSlice'
import { Spin } from 'antd'
import { baseHeaders, baseURL } from '../../../baseParam'



function Products() {
    const products = useAppSelector((s) => s.products.filters)
    const dispatch = useAppDispatch()
    const defProducts = useDeferredValue(products);

    useEffect(() => {
        (async () => {
            try {
                const auth = localStorage.getItem('Auth')
                if (typeof auth === 'string') {
                    const res = await fetch(`${baseURL}/allprod`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json', ...JSON.parse(auth), ...baseHeaders
                        }
                    })
                    if (res.ok) { res.json().then((data) => { dispatch(setProducts(data)) }) } else { throw res.status }
                }
            } catch (err) {
                if (!['404', '500'].includes(`${err}`)) { localStorage.removeItem('Auth'); window.location.reload() }
            }
        })()

    }, [])

    if (defProducts[0]?.name === 'loading') { return <div className={`${cls.list}`}>LOADING <Spin /></div> }

    return (
        <div className={`${cls.list}`}>
            {defProducts.length === 0
                ? 'Ничего не найдено!'
                : defProducts.map(({ id, ...e }) => <Product key={id} {...e} />)}
        </div>
    )
}

export default Products