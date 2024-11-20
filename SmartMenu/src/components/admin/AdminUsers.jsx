import { useState, useEffect } from "react";
import { addUser, deleteUser, getAllUsers, editUser } from "../../services/user-service";


export default function AmdinUsers() {
    const [users, setUsers] = useState([]);
    const [isEditOpened, setIsEditOpened] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [isAddOpened, setAddOpened] = useState(false);
  
    const fetchData = () => getAllUsers().then((response) => setUsers(response.data))
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleDelete = (id) => {
      deleteUser(id).then((response) => fetchData());
    };
  
    const handleEdit = (user) => {
      setCurrentUser(user);
      setIsEditOpened(true);
    };
  
    const handleSave = () => {
      editUser(currentUser).then(()=>{
        setCurrentUser({})
        setIsEditOpened(false);
        fetchData();
      })
    };

    const handleClickAddButton = () => {
      setCurrentUser({role:"OPERATOR"});
      setAddOpened(true);
    };

    const handleAddUser = () => {
        addUser(currentUser).then(() => {
            setAddOpened(false);
            setCurrentUser({});
            fetchData();
        });
    }
  
    return (
      <div className="container">
        <div className="row p-4">
            <h2 className="col">Users</h2>
            <button className="btn btn-warning me-2 col" onClick={() => handleClickAddButton()}>Add</button>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>email</th>
                <th>role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn btn-warning me-2" onClick={() => handleEdit(user)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(user.userId)}>Delete</button>
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
                  <h5 className="modal-title">Edit User</h5>
                  <button type="button" className="btn-close" onClick={() => {setCurrentUser({}); setIsEditOpened(false)}}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">email</label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        value={currentUser.email}
                        onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">password</label>
                      <input
                        required
                        type="password"
                        className="form-control"
                        value={currentUser.password}
                        onChange={e => setCurrentUser({ ...currentUser, password: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role" className="block mb-2 font-bold">
                                Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={currentUser.role||"OPERATOR"}
                            onChange={e => setCurrentUser({ ...currentUser, role: e.target.value })}
                            className="w-full p-2 border rounded-md"
                            required
                        >
                            <option value="ADMIN">ADMIN</option>
                            <option value="OPERATOR">OPERATOR</option>
                        </select>
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
                  <h5 className="modal-title">Add User</h5>
                  <button type="button" className="btn-close" onClick={() => {setAddOpened(false); setCurrentUser({})}}></button>
                </div>
                <div className="modal-body">
                  <form>
                  <div className="mb-3">
                      <label className="form-label">email</label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        value={currentUser.email||""}
                        onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">password</label>
                      <input
                        required
                        type="password"
                        className="form-control"
                        value={currentUser.password||""}
                        onChange={e => setCurrentUser({ ...currentUser, password: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role" className="block mb-2 font-bold">
                                Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={currentUser.role||"OPERATOR"}
                            onChange={e => setCurrentUser({ ...currentUser, role: e.target.value })}
                            className="w-full p-2 border rounded-md"
                            required
                        >
                            <option value="ADMIN">ADMIN</option>
                            <option value="OPERATOR">OPERATOR</option>
                        </select>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={handleAddUser}>Add User</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }