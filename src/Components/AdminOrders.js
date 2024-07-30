import { toast } from "react-toastify";
import AdminHeader from "./AdminHeader";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/cart/order-view"
      );
      if (response.data.status) {
        setOrders(response.data.data.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div >
      <div>
        <AdminHeader />
      </div>
      
      <div className="admin-orders-container">
        <table className="admin-orders-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.userId.username}</td>
                <td>{item.name}</td>
                <td>₹{item.price.toLocaleString()}</td>
                <td>{item.cartQuantity}</td>
                <td>₹{item.total.toLocaleString()}</td>
                <td>
                  <span
                    className={`status-badge ${
                      item.status ? "status-active" : "status-inactive"
                    }`}
                  >
                    {item.status ? "Sold" : "Not sold"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


  );
};

export default AdminOrders;
