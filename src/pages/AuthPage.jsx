import { Form } from "antd";
import { FormItem } from "../components";
import {Link, useLocation} from 'react-router-dom'

// me traigo mis servicios ! LoginWS SignupWS
import {loginWs, signupWs} from '../services/auth-ws'

const AuthPage = (props) => {
  // utilizo el hook useLocation
  const location = useLocation()

  const onFinish = (values) => {
    if(location.pathname === '/signup' && values.password !== values.confirmPassword){
      return alert('hey que paso las contraseñas no coinciden')
    }

    const service = location.pathname === '/signup' ? signupWs(values) : loginWs(values)

    service
      .then(res =>{
        const {data, status, errorMessage} = res
        if(status){
          console.log('data',data)
          props.authentication(data.user)
          alert('todo chido ya pudiste entrar')
          return
        } else{
          alert(errorMessage)
        }
      })
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      { location.pathname === '/signup' && <FormItem 
        label="Nombre" 
        name="firstName" 
        type="text" 
      />}
      { location.pathname === '/signup' && <FormItem
        label="Apellido(s)" 
        name="lastName" 
        type="text" 
      />}
      <FormItem
        label="Email"
        name="email"
        type="text"
        rules={[
          {
            required: true,
            message: "Coloca tu correo!",
          },
        ]}
      />
      <FormItem
        label="Password"
        name="password"
        type="password"
        rules={[
          {
            required: true,
            message: "Porfavor ingresa tu contraseña",
          },
        ]}
      />
      { location.pathname === '/signup' && <FormItem
        label="Confirma tu contraseña"
        name="confirmPassword"
        type="password"
        rules={[
          {
            required: true,
            message: "Ingresa tu confirmacion de contraseña!",
          },
        ]}
      />}
      <FormItem
        button_text="Guardar"
        type="button"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      />
      {/*<Button type="primary" htmlType="submit">
          Submit
      </Button>*/}
      {location.pathname === '/signup' ?
        <p>Si ya tienes cuenta <Link to='/login'> ingresa! </Link> </p>
        :
        <p>Si aun no tienes cuenta <Link to='/signup'> registrate! </Link> </p>
      }
      

    </Form>
  );
};
export default AuthPage;
