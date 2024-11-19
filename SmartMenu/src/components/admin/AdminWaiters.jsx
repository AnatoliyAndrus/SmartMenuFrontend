import { useState, useEffect } from "react";
import { addWaiter, deleteWaiter, editWaiter, getAllWaiters } from "../../services/waiter-service";


export default function AdminWaiters() {
    const [waiters, setWaiters] = useState([]);
    const [isEditOpened, setIsEditOpened] = useState(false);
    const [currentWaiter, setCurrentWaiter] = useState({});
    const [isAddOpened, setAddOpened] = useState(false);
  
    const fetchData = () => getAllWaiters().then((response) => setWaiters(response.data))
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleDelete = (id) => {
      deleteWaiter(id).then((response) => fetchData());
    };
  
    const handleEdit = (waiter) => {
      setCurrentWaiter(waiter);
      setIsEditOpened(true);
    };
  
    const handleSave = () => {
      editWaiter(currentWaiter).then(()=>{
        setCurrentWaiter({})
        setIsEditOpened(false);
        fetchData();
      })
    };

    const handleClickAddButton = () => {
      setCurrentWaiter({});
      setAddOpened(true);
    };

    const handleAddWaiter = () => {
        addWaiter(currentWaiter).then(() => {
            setAddOpened(false);
            setCurrentWaiter({});
            fetchData();
        });
    }
  
    return (
      <div className="container">
        <div className="row p-4">
            <h2 className="col">Waiters</h2>
            <button className="btn btn-warning me-2 col" onClick={() => handleClickAddButton()}>Add</button>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {waiters.map(waiter => (
                <tr key={waiter.waiterId}>
                  <td>{waiter.waiterId}</td>
                  <td>{waiter.name}</td>
                  <td>
                    <button className="btn btn-warning me-2" onClick={() => handleEdit(waiter)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(waiter.waiterId)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {isEditOpened && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Waiter</h5>
                  <button type="button" className="btn-close" onClick={() => {setCurrentWaiter({}); setIsEditOpened(false)}}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        value={currentWaiter.name}
                        onChange={e => setCurrentWaiter({ ...currentWaiter, name: e.target.value })}
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


        {isAddOpened && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Waiter</h5>
                  <button type="button" className="btn-close" onClick={() => {setAddOpened(false); setCurrentWaiter({})}}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={currentWaiter.name||""}
                        onChange={e => setCurrentWaiter({ ...currentWaiter, name: e.target.value })}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={handleAddWaiter}>Add Waiter</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }