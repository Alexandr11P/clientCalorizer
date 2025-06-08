import { useAppSelector } from "@store/hooks"
import cls from "./panel.module.scss"
import { getDateNowXXYY } from "@/shared/getDateXXYY"


function Panel() {
  const journal = useAppSelector(s => s.history.history)

  const { b, zh, u } = journal.find(e => {
    return e.date === getDateNowXXYY()
  }) || { b: 0, zh: 0, u: 0 }

  return (
    <ul className={cls.main}>
      <li>Белки {b}</li>
      <li>Жиры {zh}</li>
      <li>Углеводы {u}</li>
      <li>Калории {Math.ceil(b * 4 + zh * 9 + u * 4)}</li>
    </ul>
  )
}

export default Panel
