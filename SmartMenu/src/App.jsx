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
import Review from "./components/Review";
import LoginPage from "./pages/LoginPage";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="client" element={<ClientPage/>}>
          <Route index element={<ClientHome/>}/>
          <Route path="menu" element={<Menu/>}/>
          <Route path="payment" element={<Payment/>}/>
          <Route path="review" element={<Review/>}/>
        </Route>
        <Route path="admin" element={<AdminPage/>} />
        <Route path="orders" element={<OrdersPage/>} />
        <Route path="register-order" element={<RegisterOrderPage/>} />
        <Route path="login" element={<LoginPage/>}/>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
