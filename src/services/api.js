
// este archivo es para crear la instancia de axios para mandar nuestros peticiones
import axios from 'axios'

// crear una constante para validar si mi aplicacion esta en produccion o enta en local

const isProduction = process.env.NODE_ENV === 'production';

// si la app ya esta en produccion hgara paticion a heroku

const baseURL = isProduction ? 'https://vale-gatos.herokuapp.com/api' : 'http://localhost:5005/api';

export const api = axios.create({
  baseURL,//:'https://vale-gatos.herokuapp.com/api'
  withCredentials:true,
  timeout:10000
})