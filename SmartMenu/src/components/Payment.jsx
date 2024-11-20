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
                        
                    })
                } else{
                    setTableHasActiveOrder(false);
                }
            })
        },
        [table]
    )

    const handlePay = () => {
        pay(orderData.orderId).then(response=>{
            if(response.data){
                setPaymentApproved(true);
            } else{
                setPaymentApproved(false);
            }
        })
    }

    return (<div className="mt-4">
        {!tableHasActiveOrder?(<p>There is no active order at your table!</p>):
            (
                paymentApproved?(
                    <>
                        <Review table={table}/>
                    </>
                ):(
                    <>
                        <div className="card my-4">
                            <div className="card-header bg-primary text-white">
                                <h2 className="mb-0">Table №{table}</h2>
                            </div>
                            <div className="card-body">
                                <p className="fw-bold">Total Amount: <span className="text-success">${orderData.totalAmount}</span></p>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th scope="col">Menu Item</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Special Instructions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderData.orderItems&&orderData.orderItems.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.menuItemName}</td>
                                                    <td>{item.quantity}x${item.price}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.specialInstructions || "None"}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-success btn-block" onClick={handlePay}>Pay</button>
                    </>
                )
            )
        }
    </div>)
}