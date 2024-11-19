import { Link, Outlet } from "react-router-dom";


export default function WaiterPage(){
    

    return(
        <>
            <div className="d-flex align-items-center p-2 justify-content-between">
                <Link to="/waiter" className="m-4"><h1>Waiters Page</h1></Link>
                <Link to="register-order" className="m-4">Register order</Link>
            </div>
            <Outlet></Outlet>
        </>
    )
}