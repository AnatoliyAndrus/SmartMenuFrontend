import { useEffect, useState } from "react"
import { getTableAmount } from "../../services/table-service"

export default function AdminTables(){
    const [tableAmount, setTableAmount] = useState(1)
    useEffect(() =>{
        const fetchTableAmount = async () => {
            getTableAmount().then((amount) =>setTableAmount(amount));
        }
        fetchTableAmount()
    },
     [])

    const handleAddTable = () => {

    }

    return (<div className="container">
        <p>
            Currently system has tables from 1 to {tableAmount}
        </p>
        <button className="btn btn-primary" onClick={handleAddTable}>Add table</button>
    </div>
    )
}