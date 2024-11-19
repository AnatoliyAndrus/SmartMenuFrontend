import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import AdminPage from "./pages/AdminPage";
import OrdersPage from "./pages/OrdersPage";
import RegisterOrderPage from "./pages/RegisterOrderPage";
import NoPage from "./pages/NoPage";
import ClientPage from "./pages/ClientPage";
import ClientHome from "./components/ClientHome";
import Menu from "./components/Menu";
import Payment from "./components/Payment";
import LoginPage from "./pages/LoginPage";
import WaiterPage from "./pages/WaiterPage";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import WaiterOrdersPage from "./pages/WaiterOrdersPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="client" element={<ClientPage/>}>
          <Route index element={<ClientHome/>}/>
          <Route path="menu" element={<Menu/>}/>
          <Route path="payment" element={<Payment/>}/>
        </Route>
        <Route path="admin" element={<AdminPage/>} />
        <Route path="orders" element={<OrdersPage/>} />
        <Route path="waiter" element={<WaiterPage/>}>
          <Route index element={<WaiterOrdersPage/>} />
          <Route path="register-order" element={<RegisterOrderPage/>} />
        </Route>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
