import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import CONSTANTS from '../../constants/routes'
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'
import Checklist from '../../assets/checklist.svg';
import '../../style/globalStyles.css'

const Home = () => {
  const navigate = useNavigate()
  const { auth } = useSelector((state: RootState) => state.authData);

  const handleCreateList = () => {
    navigate(CONSTANTS.TODOS)
  }

  return (
    <div className='container'>
      <div className='row align-items-center'>
        <div className='col-5 text-align-right'>
          <h2 style={{ fontSize: '3em' }}>{`Bienvenido de nuevo a Todo List, ${auth.user?.firstName}`}</h2>
          <Button onClick={handleCreateList} type="primary" className='mt-10'>¡Estoy listo para organizarme!</Button>
        </div>
        <img className='col-7' src={Checklist} alt="Your SVG" />
      </div>


    </div>

  )
}

export default Home