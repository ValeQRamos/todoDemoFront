import { useState } from "react";
import { Layout, Avatar, Descriptions, Form, Button, message, Upload } from "antd";
import {FormItem} from '../components'
import { UploadOutlined } from '@ant-design/icons';
import { editUserWs } from "../services/user-ws";

const { Content } = Layout;

const ProfilePage = (props) => {
  const [isEdit, setIsEdit] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const configUpload = {
    name:'image',
    action:'http://localhost:5005/api/upload/single',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
  
      if (info.file.status === 'done') {
        console.log('que es info', info)
        // setImageUrl(file.response.url.uri)
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },  
  }

  const onFinish = (values) => {
    editUserWs({...values, imageUrl})
      .then(res=>{
        const {status, data, errorMessage} = res
        if(status){
          props.authentication(data.user)
        } else {
          console.log('error actualizar', errorMessage);
        }
      })
  }
  return (
    <Content>
      {/* Avatar o un tag img para mostar la imagen del usuario */}
      <Avatar
        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
        src={props.user.imageUrl}
      />
      <Button onClick={() => setIsEdit(prevState => !prevState)} >
        Editar perfil
      </Button>
      {/* puede ser una card para mostar unfo del usuario */}
      {isEdit ? 'se puede editar' : 'no se puede'}
      <Descriptions title="User Info">
        <>
        <Descriptions.Item label="Nombre:">
          {`${props.user.lastName} ${props.user.lastName} `}
        </Descriptions.Item>
        <Descriptions.Item label="email">
          {props.user.email}
        </Descriptions.Item>
        <Descriptions.Item label="rol"> {props.user.role} </Descriptions.Item>
        </>

      </Descriptions>
              <Form onFinish={onFinish} >
          <FormItem
            label="Nombre"
            name="firstName"
          />
          <FormItem
            label="Apellido"
            name="lastName"
          />
          <FormItem
            label="Correo"
            name="lastName"
            disabled
            value={props.user.email}
          />
          <FormItem
            label="role"
            name="role"
            disabled
            value={props.user.role}
          />

          <Upload {...configUpload} >
            <Button icon={<UploadOutlined />} > Click to Upload </Button>
          </Upload>

          <FormItem 
          button_text='editar'
          type="button"
          wrapperCol={{
            offset: 8,
            span:16
          }}
          />

        </Form>
        
    </Content>
  );
};

export default ProfilePage;
