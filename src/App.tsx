import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import { Provider } from 'react-redux'
import { store } from './store/store'
import 'bootstrap-4-grid/css/grid.min.css';
import { ConfigProvider } from 'antd'

function App() {

  const customTheme = {
    token: {
      colorPrimary: '#FF9800',
    },

  }

  return (
    <ConfigProvider theme={customTheme}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  )
}

export default App
