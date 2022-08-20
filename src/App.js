import { useState, useEffect } from "react";
import "./App.css";
import routes from "./config/routes";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { logoutWs } from "./services/auth-ws";
import { Modal } from "antd";
// importar los componentes o funciones que sean globales

function App() {
  const [user, setUser] = useState(null);
  //funciones globales!
  function authentication(user) {
    setUser(user);
  }
  function handleLogout() {
    Modal.confirm({
      title: "Cerrar sesion",
      content: "Estas sqeguro de lo que vas hacer?",
      onOk() {
        logoutWs().then((res) => {
          const { data, status, errorMessage } = res;
          if (status) {
            alert(data.successMessage);
            setUser(null);
          } else {
            alert(errorMessage);
          }
        });
      },
    });
    // ejecutar el endpoint para hacer logout y borrar al usuario del state!
  }

  return (
    <div className="App">
      <Navbar user={user} handleLogout={handleLogout} />
      <Routes>
        {routes({ user, handleLogout, authentication }).map(
          ({ path, element }, index_route) => (
            <Route key={path} {...{ path, element }} />
          )
        )}
      </Routes>
    </div>
  );
}

export default App;
