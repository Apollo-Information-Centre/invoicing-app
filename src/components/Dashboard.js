import React from 'react';
import './Dashboard.css'; // Ensure you have a CSS file for styling the Dashboard

const Dashboard = ({ invoices }) => {
  return (
    <div className="dashboard">
      <h2>Invoice Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Client Name</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length === 0 ? (
            <tr>
              <td colSpan="4">No invoices generated yet.</td>
            </tr>
          ) : (
            invoices.map((invoice, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{invoice.clientName}</td>
                <td>${invoice.total.toFixed(2)}</td>
                <td>{invoice.paid ? 'Paid' : 'Pending'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;