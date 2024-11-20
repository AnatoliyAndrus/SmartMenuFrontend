
import { Link } from "react-router-dom";
import "./NavigationPage.css"

export default function NavigationPage(){
    return (
        <div style={{margin:'50px'}}>
            <Link to="/orders" className="link"><span>Cook</span></Link>
            <Link to="/admin" className="link"><span>Admin</span></Link>
            <Link to="/waiter" className="link"><span>Waiter</span></Link>
        </div>
    )
}