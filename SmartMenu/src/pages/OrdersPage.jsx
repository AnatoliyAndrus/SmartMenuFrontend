import { useState, useEffect } from "react";

const OrdersPage = () => {
  // Mock data
  const mockOrders = [
    {
      orderId: 1,
      orderTime: "2024-11-18T12:34:56",
      tableId: 3,
      waiterId: 5,
      orderItems: [
        {
          menuItemName: "Pizza Margherita",
          quantity: 2,
          specialInstructions: "Extra cheese",
          isDone: false,
        },
        {
          menuItemName: "Tiramisu",
          quantity: 1,
          specialInstructions: "",
          isDone: true,
        },
      ],
    },
    {
      orderId: 2,
      orderTime: "2024-11-18T13:45:00",
      tableId: 4,
      waiterId: 7,
      orderItems: [
        {
          menuItemName: "Lasagna",
          quantity: 1,
          specialInstructions: "No garlic",
          isDone: false,
        },
        {
          menuItemName: "Espresso",
          quantity: 2,
          specialInstructions: "",
          isDone: false,
        },
      ],
    },
  ];

  const [orders, setOrders] = useState([]);

  // Mock API call
  useEffect(() => {
    // Imitating a server call
    setOrders(mockOrders);
  }, []);

  const markAsDone = (orderId, itemIndex) => {
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
                            onClick={() => markAsDone(order.orderId, index)}
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
