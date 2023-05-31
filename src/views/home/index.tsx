import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import CONSTANTS from '../../constants/routes'
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'

const Home = () => {
  const navigate = useNavigate()
  const { auth } = useSelector((state: RootState) => state.authData);

  const handleCreateList = () => {
    navigate(CONSTANTS.TODOS)
  }
  return (
    <>
      <div>{`¡${auth.user?.firstName}, bienvenido a Todo List: Tu compañero de organización y productividad!`}</div>
      <Button onClick={handleCreateList} type="primary">Crea tu Todo List</Button>
    </>

  )
}

export default Home