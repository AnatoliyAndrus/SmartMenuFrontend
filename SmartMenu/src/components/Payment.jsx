import { useEffect, useState } from "react";
import Review from "./Review";
import { getActiveOrder, hasActiveOrder } from "../services/table-service";
import { pay } from "../services/order-service";
import { useSearchParams } from "react-router-dom";

export default function Payment(){
    const [tableHasActiveOrder, setTableHasActiveOrder] = useState(false); 
    const [paymentApproved, setPaymentApproved] = useState(false);
    const [orderData, setOrderData] = useState({})

    const [searchParams] = useSearchParams();
    const table = searchParams.get('table');

    useEffect(
        ()=>{
            hasActiveOrder(table).then(response=>{
                if(response.data){
                    setTableHasActiveOrder(true);
                    getActiveOrder(table).then(response2=>{
                        setOrderData(response2.data);
                        pay(response2.data.orderId).then(
                            response3=>{
                                setPaymentApproved(true);
                            }
                        )
                    })
                } else{
                    setTableHasActiveOrder(false);
                }
            })
        },
        [table]
    )

    return (<div className="mt-4">
        {!tableHasActiveOrder?(<p>There is no active order at your table!</p>):
            (
                paymentApproved?(
                    <>
                        <h2 className="text-center mb-4">You paid {orderData.totalAmount}. Would you like to leave a review?</h2>
                        <Review table={table}/>
                    </>
                ):""
            )
        }
    </div>)
}