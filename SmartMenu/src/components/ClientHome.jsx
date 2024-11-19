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
            async function checkIsActive(){
                if(table&&await hasActiveOrder(table)) setActive(true)
            }
            checkIsActive()
        },
        [table]
    )

    return (
        <div style={{display:'flex', flexDirection:'column'}} className="mt-4">
            <h1>Welcome</h1>
            <Link to="menu" className="client-link">Menu</Link>
            <Link to={isActive?`payment?table=${table}`:'#'} className="client-link">Pay</Link>
        </div>
    );
}