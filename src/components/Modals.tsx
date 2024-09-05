import { Modal } from 'antd'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { invisModal } from '../store/slices/modalSlice';

function Modals() {

  const state = useAppSelector((s) => s.modal)
  const dispatch = useAppDispatch();

  return (
    <Modal footer={(_, { OkBtn }) => <OkBtn />}
      title="Внимание!" open={state.status} onOk={() => { dispatch(invisModal()) }}>
      {state.content}
    </Modal>
  )
}

export default Modals