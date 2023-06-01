import { Button, Card, Checkbox, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { FC } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CONSTANTS from '../../constants/routes';
import { LoginData } from '../../interfaces/auth';
import { login } from '../../store/slices/auth.slice';
import { AppDispatch } from '../../store/store';


const Login: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  const onFinish = async (values: LoginData) => {
    await dispatch(login(values)).then((auth) => {
      if (auth.payload?.token) {//TODO fix ts
        navigate(CONSTANTS.HOME)
      } else {
        // TODO alerta usuario incorrecto
      }
    })
  };

  return (
    <Card style={{ height: '40vh', width: '30vw', textAlign: 'left' }} >
      <h2>Login</h2>
      <Form
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, type: 'email', message: 'El email no es válido', }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'La contraseña es requerida' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Recuerdame</Checkbox>
          </Form.Item>
          <a className="login-form-forgot" href="">
            Olvidé la contraseña
          </a>
        </div>
        <Button style={{ width: '100%', marginTop: '25px' }} type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        O <a href="">regristrate ahora!</a>
      </Form>
    </Card>
  )
}

export default Login