import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";


function App() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ name: "", age: "", mobile: "", email: "", city: "", state: "" });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:7000/allUsers");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (editingId) {
                await axios.put(`http://localhost:7000/${editingId}`, user);
                setEditingId(null);
            } else {
                await axios.post("http://localhost:7000/addUser", user);
            }
            setUser({ name: "", age: "", mobile: "", email: "", city: "", state: "" });
            fetchUsers();
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:7000/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleEdit = (user) => {
        setUser(user);
        setEditingId(user._id);
    };

    return (<div className="back">
        <div className="container mt-4">
            <p className="fs-3 fw-bold text-white text-center">User Managment</p>
        </div>
        <div className="container-fluid ">
            <div className="row mt-5">
                <form onSubmit={handleSubmit} className="col-lg-4 col-md-8 mb-3">
                    <div className="form-in">
                        <div className="col mb-2">
                            <input type="text" name="name" value={user.name} onChange={handleChange} className="form-control" placeholder="Name" required />
                        </div>
                        <div className="col mb-2">
                            <input type="number" name="age" value={user.age} onChange={handleChange} className="form-control" placeholder="Age" required />
                        </div>
                        <div className="col mb-2">
                            <input type="number" name="mobile" value={user.mobile} onChange={handleChange} className="form-control" placeholder="Mobile" required />
                        </div>
                        <div className="col mb-2">
                            <input type="text" name="email" value={user.email} onChange={handleChange} className="form-control" placeholder="Email" required />
                        </div>
                        <div className="col mb-2">
                            <input type="text" name="city" value={user.city} onChange={handleChange} className="form-control" placeholder="City" required />
                        </div>
                        <div className="col mb-2">
                            <input type="text" name="state" value={user.state} onChange={handleChange} className="form-control" placeholder="State" required />
                        </div>
                        <div className="col mb-2">
                            <button type="submit" className="btn add">{editingId ? "Update" : "Add"} User</button>
                        </div>
                    </div>
                </form>


                <div className="col-lg-8 col-md-8 tab-back">
                    <table className="table table-bordered mt-3">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.result && users.result.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.mobile}</td>
                                    <td>{user.email}</td>
                                    <td>{user.city}</td>
                                    <td>{user.state}</td>
                                    <td className="d-flex">
                                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(user)}>Edit</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    )
}

export default App;
