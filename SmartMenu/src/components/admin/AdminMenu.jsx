import { useState, useEffect } from "react";
import { getAllMenuItems, deleteMenuItem, editMenuItem, addMenuItem } from "../../services/menu-service";

export default function AdminMenu() {
    const [menuItems, setMenuItems] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const [addItem, setAddItem] = useState(false);
    const [itemToAdd, setItemToAdd] = useState({});
  
    let fetchData = () =>  getAllMenuItems().then(response => setMenuItems(response.data));
    
    useEffect(() => {
       fetchData();
    }, []);
  
    const handleDelete = (id) => {
      deleteMenuItem(id).then(response => {
        setMenuItems(menuItems=>menuItems.filter(menuItem => menuItem.menuItemId !== id))
      });
    };
  
    const handleEdit = (item) => {
      setEditItem(item);
    };
  
    const handleSave = () => {
      editMenuItem(editItem).then(()=>{
        setEditItem(null)
        fetchData();
      })
    };

    const handleClickAddButton = () => {
      setAddItem(true);
    };

    const handleAddItem = () => {
        addMenuItem(itemToAdd).then(() => {
            setAddItem(false);
            setItemToAdd({});
            fetchData();
        });
    }
  
    return (
      <div className="container">
        <div className="row p-4">
            <h2 className="col">Menu</h2>
            <button className="btn btn-warning me-2 col" onClick={() => handleClickAddButton()}>Add</button>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map(item => (
                <tr key={item.menuItemId}>
                  <td>{item.menuItemId}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td><a href={item.imageUrl} target="_blank" rel="noopener noreferrer">Image</a></td>
                  <td>
                    <button className="btn btn-warning me-2" onClick={() => handleEdit(item)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(item.menuItemId)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {editItem && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Menu Item</h5>
                  <button type="button" className="btn-close" onClick={() => setEditItem(null)}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        value={editItem.name}
                        onChange={e => setEditItem({ ...editItem, name: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        required
                        className="form-control"
                        value={editItem.description}
                        onChange={e => setEditItem({ ...editItem, description: e.target.value })}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Price</label>
                      <input
                        required
                        type="number"
                        className="form-control"
                        value={editItem.price}
                        onChange={e => setEditItem({ ...editItem, price: parseFloat(e.target.value) })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Image URL</label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        value={editItem.imageUrl}
                        onChange={e => setEditItem({ ...editItem, imageUrl: e.target.value })}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        )}


        {addItem && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Menu Item</h5>
                  <button type="button" className="btn-close" onClick={() => {setAddItem(false); setItemToAdd({})}}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={itemToAdd.name||""}
                        onChange={e => setItemToAdd({ ...itemToAdd, name: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        value={itemToAdd.description||""}
                        onChange={e => setItemToAdd({ ...itemToAdd, description: e.target.value })}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        value={itemToAdd.price||""}
                        onChange={e => setItemToAdd({ ...itemToAdd, price: parseFloat(e.target.value) })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Image URL</label>
                      <input
                        type="text"
                        className="form-control"
                        value={itemToAdd.imageUrl||""}
                        onChange={e => setItemToAdd({ ...itemToAdd, imageUrl: e.target.value })}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={handleAddItem}>Add item</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }