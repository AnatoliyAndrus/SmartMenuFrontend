import { useState, useEffect } from "react";
import { getActiveOrders } from "../services/order-service";
import { cancelOrder } from "../services/order-service";

const WaiterOrdersPage = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getActiveOrders().then((activeOrders) => setOrders(activeOrders.data));
  }, []);

  const cancelOrderById = (orderId) => {
    cancelOrder(orderId).then(response => {
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.orderId !== orderId)
      );
    })
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center">No orders available.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Waiter ID</th>
              <th>Order ID</th>
              <th>Table ID</th>
              <th>Order Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.waiterId}</td>
                <td>{order.orderId}</td>
                <td>{order.tableId}</td>
                <td>{new Date(order.orderTime).toLocaleString()}</td>
                <td>
                  <span
                    className={`badge ${
                      order.status === "Completed"
                        ? "bg-success"
                        : "bg-warning"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  {order.status !== "Completed" && (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => cancelOrderById(order.orderId)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WaiterOrdersPage;
