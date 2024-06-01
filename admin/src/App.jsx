import Navbar from "./components/Navbar/Navbar";
import SideBar from "./components/SideBar/SideBar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import Orders from "./pages/Order/Orders";
import List from "./pages/List/List";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <div className="app">
        <ToastContainer />
        <Navbar />
        <hr />
        <div className="app-content">
          <SideBar />
          <Routes>
            <Route
              path={`/`}
              element={
                <>
                  <h1
                    className="flex"
                    style={{
                      textAlign: "left",
                      marginTop: "100px",
                      marginLeft: "100px",
                    }}
                  >
                    Admin Panel
                  </h1>
                </>
              }
            />
            <Route path={`/add`} element={<Add />} />
            <Route path={`/list`} element={<List />} />
            <Route path={`/orders`} element={<Orders />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
