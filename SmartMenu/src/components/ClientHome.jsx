import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { hasActiveOrder } from "../services/table-service";
import './ClientHome.css'

export default function ClientHome() {
    const [searchParams] = useSearchParams();

    const table = searchParams.get('table');
    const [isActive, setActive] = useState(false)

    useEffect(
        () => {
           if(table){
            hasActiveOrder(table).then((response) => {if(response.data) setActive(true)})
           }
        },
        [table]
    )

    return (
        <div style={{display:'flex', flexDirection:'column'}} className="mt-4">
            <h1>Welcome</h1>
            <Link to="menu" className="client-link"><span>Menu</span></Link>
            <Link to={`payment?table=${table}`} style={isActive?{}:{pointerEvents:'none'}} className="client-link"><span>Pay</span></Link>
        </div>
    );
}