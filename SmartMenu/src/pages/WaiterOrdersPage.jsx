import { useState, useEffect } from "react";

const WaiterOrdersPage = () => {
  const mockOrders = [
    {
      orderId: 1,
      orderTime: "2024-11-18T12:34:56",
      tableId: 3,
      waiterId: 5,
      status: "Pending",
    },
    {
      orderId: 2,
      orderTime: "2024-11-18T13:45:00",
      tableId: 4,
      waiterId: 5,
      status: "Pending",
    },
    {
      orderId: 3,
      orderTime: "2024-11-18T14:15:30",
      tableId: 2,
      waiterId: 5,
      status: "Completed",
    },
  ];

  const [orders, setOrders] = useState([]);

  // Загружаем данные
  useEffect(() => {
    setOrders(mockOrders);
  }, []);

  // Функция для отмены заказа
  const cancelOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.orderId !== orderId)
    );
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
                      onClick={() => cancelOrder(order.orderId)}
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
