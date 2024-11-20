import { useEffect, useState } from "react"
import { addTable, getTableAmount, } from "../../services/table-service"

export default function AdminTables(){
    const [tableAmount, setTableAmount] = useState(1)
    const fetchData = () => getTableAmount().then((response) =>setTableAmount(response));
    
    useEffect(() =>{
        fetchData()
    },
     [])

    const handleAddTable = () => {
        addTable().then(() => fetchData())
    }

    return (<div className="container">
        <p>
            Currently system has tables from 1 to {tableAmount}
        </p>
        <button className="btn btn-primary" onClick={handleAddTable}>Add table</button>
    </div>
    )
}