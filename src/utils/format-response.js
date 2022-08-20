// para formatear los mensajes de error que nos mande el backend

export function internatServerError(err) {
  if(err.response && err.response.data && err.response.data.errMessage){
    return {
      status:false,
      errorMessage: err.response.data.errorMessage
    }
  }
  return {
    status: false,
    errorMessage: 'Interanr server error, Please check your server'
  }
}

export function successStatus(res){
  return{
    status:true,
    data:res.data
  }
}