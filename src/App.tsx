import { Suspense, lazy } from "react";
import Auth from "./components/Auth/Auth"
import Base from "./components/Base/Base";
import Modals from "./components/Modals";
import Reg from "./components/Reg/Reg"
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, redirect } from "react-router-dom";
import { Spin } from "antd";

const loaderAuth = () => {
  if (localStorage.getItem('Auth')) { return redirect('/') };
  return 'Auth'
}

const loaderNonAuth = () => {
  if (!localStorage.getItem('Auth')) { return redirect('/auth') };
  return 'Non auth'
}

const History = lazy(() => import("./components/History/History"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route loader={loaderNonAuth} path='/' element={<Base />}></Route>
      <Route loader={loaderAuth} path="/reg" element={<Reg />}></Route>
      <Route loader={loaderAuth} path="/auth" element={<Auth />}></Route>
      <Route loader={loaderNonAuth} path="/his" element={
        <Suspense
          fallback={
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <Spin />
            </div>}>
          <History />
        </Suspense>}>
      </Route>
    </>

  ))

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Modals />
    </>
  )
}

export default App
