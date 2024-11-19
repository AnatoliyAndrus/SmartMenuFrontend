import { useEffect, useState } from "react";
import { getAllMenuItems } from "../services/menu-service";
import { sendOrderRequest } from "../services/order-service";

function RegisterOrderPage() {
    const [waiterId, setWaiterId] = useState('');
    const [tableId, setTableId] = useState('');
    const [menuItems, setMenuItems] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [specialInstructions, setSpecialInstructions] = useState("")
    const [showModal, setShowModal] = useState(false);
  
    useEffect(() => {
      getAllMenuItems().then((items) => {
        setMenuItems(items)
      })
    }, []);
  
    const handleAddItem = () => {
      if (selectedItem && quantity > 0) {
        setOrderItems([...orderItems, { menuItemId: selectedItem.menuItemId, name: selectedItem.name, quantity, specialInstructions}]);
        setSelectedItem(null);
        setQuantity(1);
        setSpecialInstructions("");
        setShowModal(false);
      }
    };
  
    const handleRemoveItem = (menuItemId) => {
      setOrderItems(orderItems.filter(item => item.menuItemId !== menuItemId));
    };
  
    const handleSubmit = () => {
      const orderData = {
        waiterId: parseInt(waiterId, 10),
        tableId: parseInt(tableId, 10),
        orderItems: orderItems.map(item => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity
        }))
      };
  
      sendOrderRequest(orderData)
        .then(response => {
          alert('Order successfully registered!');
          setWaiterId('');
          setTableId('');
          setOrderItems([]);
        })
        .catch(error => {
          console.error('Error submitting order:', error);
        });
    };
  
    return (
      <div className="container mt-4">
        <h2>Register Order</h2>
        <div className="mb-3">
          <label className="form-label">Waiter ID</label>
          <input
            type="number"
            className="form-control"
            value={waiterId}
            onChange={e => setWaiterId(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Table ID</label>
          <input
            type="number"
            className="form-control"
            value={tableId}
            onChange={e => setTableId(e.target.value)}
          />
        </div>
        <h4>Order Items</h4>
        <ul className="list-group mb-3">
          {orderItems.length?orderItems.map(item => (
            <li key={item.menuItemId} className="list-group-item d-flex justify-content-between align-items-center">
              {item.name} (Quantity: {item.quantity})
              <button className="btn btn-danger btn-sm" onClick={() => handleRemoveItem(item.menuItemId)}>Remove</button>
            </li>
          )): "no items"}
        </ul>
        <button className="btn btn-primary m-2" onClick={() => setShowModal(true)}>Add Item</button>
        <button className="btn btn-success m-2" onClick={handleSubmit}>Submit Order</button>
  
        {showModal && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Item to Order</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Select Menu Item</label>
                    <select
                      className="form-control"
                      onChange={e => setSelectedItem(menuItems.find(item => item.menuItemId === parseInt(e.target.value, 10)))}
                    >
                      <option value="">Select an item</option>
                      {menuItems.map(item => (
                        <option key={item.menuItemId} value={item.menuItemId}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      value={quantity}
                      min="1"
                      onChange={e => setQuantity(parseInt(e.target.value, 10))}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Special instructions</label>
                    <textarea
                      className="form-control"
                      value={specialInstructions}
                      min="1"
                      onChange={e => setSpecialInstructions(e.target.value)}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={handleAddItem}>Add to Order</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default RegisterOrderPage;