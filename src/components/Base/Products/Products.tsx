import { useDeferredValue, useEffect } from "react"
import Product from "./Product/Product"
import cls from "./products.module.scss"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { setProducts } from "@store/slices/productsSlice"
import { Spin } from "antd"

function Products() {
  const products = useAppSelector(s => s.products.filters)
  const dispatch = useAppDispatch()
  const defProducts = useDeferredValue(products)

  useEffect(() => {
    fetch("db/products.json")
      .then(res => res.json())
      .then(data => dispatch(setProducts(data)))
  }, [])

  if (defProducts[0]?.name === "loading") {
    return (
      <div className={`${cls.list}`}>
        LOADING <Spin />
      </div>
    )
  }

  return (
    <div className={`${cls.list}`}>
      {defProducts.length === 0
        ? "Ничего не найдено!"
        : defProducts.map(({ id, ...e }) => <Product key={id} {...e} />)}
    </div>
  )
}

export default Products
