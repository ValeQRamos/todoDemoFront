// importar mis pages;
import AuthPage from "../pages/AuthPage" //import chafa v1
import Signup from "../pages/Signup"

const routes = (props) => {
  // <Rout path='/' element={componente}
  return [{
    path:'/', //Homepage
    element: <h1>Este esel home</h1>
  },
  {
    path:'/signup',
    element:<AuthPage {...props} />
  },
  {
    path:'/login',
    element:<AuthPage {...props} />
  },
]
}

export default routes