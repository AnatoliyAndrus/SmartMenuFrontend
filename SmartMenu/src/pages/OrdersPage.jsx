import { useState, useEffect } from "react";
import { getPendingOrders, markOrderItemAsDone } from "../services/order-service";

const OrdersPage = () => {

  const [orders, setOrders] = useState([]);
  const fetchData = () => getPendingOrders().then(response=>setOrders(response.data));
  
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const markAsDone = (item, itemIndex, orderId) => {
    markOrderItemAsDone(item.orderItemId).then(()=>{
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId
            ? {
                ...order,
                orderItems: order.orderItems.map((item, index) =>
                  index === itemIndex ? { ...item, isDone: true } : item
                ),
              }
            : order
        )
      );
    })
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center">No orders available.</p>
      ) : (
        orders.map((order) => (
          <div className="card mb-4" key={order.orderId}>
            <div className="card-header">
              <h5>
                Order ID: {order.orderId} | Table ID: {order.tableId} | Waiter
                ID: {order.waiterId}
              </h5>
              <p>Order Time: {new Date(order.orderTime).toLocaleString()}</p>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Dish Name</th>
                    <th>Quantity</th>
                    <th>Special Instructions</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.menuItemName}</td>
                      <td>{item.quantity}</td>
                      <td>{item.specialInstructions || "None"}</td>
                      <td>
                        {item.isDone ? (
                          <span className="badge bg-success">Done</span>
                        ) : (
                          <span className="badge bg-warning">Pending</span>
                        )}
                      </td>
                      <td>
                        {!item.isDone && (
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => markAsDone(item, index, order.orderId)}
                          >
                            Mark as Done
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
