import Find from "./Find/Find"
import Panel from "./Panel/Panel"
import Products from "./Products/Products"
import cls from "./base.module.scss"

function Base() {
  return (
    <div className={`${cls.main}`}>
      <Panel />
      <Find />
      <Products />
    </div>
  )
}

export default Base
