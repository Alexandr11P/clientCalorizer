import { Suspense, lazy } from "react"
import Base from "./components/Base/Base"
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import { Spin } from "antd"
import cls from "./app.module.scss"

const History = lazy(() => import("./components/History/History"))

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Base />}></Route>
      <Route
        path="/his"
        element={
          <Suspense
            fallback={
              <div className={cls.fallback}>
                <Spin />
              </div>
            }
          >
            <History />
          </Suspense>
        }
      ></Route>
    </>,
  ),
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App
