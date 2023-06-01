import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import CONSTANTS from '../../constants/routes'
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'
import imagen from '../../assets/checklist.png';

const Home = () => {
  const navigate = useNavigate()
  const { auth } = useSelector((state: RootState) => state.authData);

  const handleCreateList = () => {
    navigate(CONSTANTS.TODOS)
  }
  return (
    <div>
      <div>{`Bienvenido de nuevo a Todo List, ${auth.user?.firstName}`}</div>
      <img src={imagen} alt="Imagen" width="400" />

      <Button onClick={handleCreateList} type="primary" style={{width:'100%'}}>¡Estoy listo para organizarme!</Button>
    </div>

  )
}

export default Home