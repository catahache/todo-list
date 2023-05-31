import { Button, Checkbox, Form, Input } from 'antd'
import React, { FC } from 'react'
import { login } from '../../store/slices/auth.slice';
import { LoginData } from '../../interfaces/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import CONSTANTS from '../../constants/routes';

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

  const onFinishFailed = (errorInfo: any) => {
  };

  return (
    <Form
      name="login"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, type: 'email', message: 'The input is not valid E-mail!', }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login