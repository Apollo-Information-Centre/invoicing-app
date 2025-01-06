import React, { useState } from 'react'; // Import useState from React

const ClientManager = ({ clients, setClients }) => {
  const [clientName, setClientName] = useState('');

  const addClient = () => {
    if (clientName) {
      setClients([...clients, clientName]);
      setClientName('');
    } else {
      alert("Client name cannot be empty.");
    }
  };

  return (
    <div className="client-manager">
      <h2>Client Management</h2>
      <input
        type="text"
        value={clientName}
        onChange={e => setClientName(e.target.value)}
        placeholder="Add Client Name"
      />
      <button onClick={addClient}>Add Client</button>
      <h3>Clients List</h3>
      <ul>
        {clients.map((client, index) => (
          <li key={index}>{client}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClientManager;