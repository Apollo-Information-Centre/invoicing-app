import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { QRCodeSVG } from 'qrcode.react'; // Import the QRCodeSVG component
import './styles/App.css';

const App = () => {
  const [invoice, setInvoice] = useState({
    clientName: '',
    clientAddress: '',
    clientEmail: '',
    items: [{ description: '', quantity: 1, price: 0 }],
    subTotal: 0,
    discount: 0,
    total: 0,
    logo: null,
    thankYouMessage: "Thank you for shopping with us!",
    invoiceColor: '#f0f0f0', // Set a default light color
    businessName: '',
    businessAddress: '',
    businessEmail: '',
    businessPhone: '',
    paymentTerms: '',
  });

  const invoiceRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const updatedItems = [...invoice.items];
    const value = e.target.name === 'price' ? parseFloat(e.target.value) || 0 : e.target.value;
    updatedItems[index][e.target.name] = value;
    setInvoice(prev => ({ ...prev, items: updatedItems }));
  };

  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, price: 0 }],
    }));
  };

  const removeItem = (index) => {
    setInvoice(prev => ({
      ...prev,
      items: invoice.items.filter((_, i) => i !== index),
    }));
  };

  const calculateInvoice = () => {
    const subTotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const total = subTotal - invoice.discount;
    setInvoice(prev => ({
      ...prev,
      subTotal,
      total: total >= 0 ? total : 0, // Ensure total isn't negative
    }));
  };

  const downloadPDF = () => {
    const element = invoiceRef.current;
    html2pdf()
      .from(element)
      .save(`Ksh{invoice.clientName}_invoice.pdf`);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setInvoice(prev => ({ ...prev, logo: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (e) => {
    setInvoice(prev => ({ ...prev, invoiceColor: e.target.value }));
  };

  return (
    <div className="App">
      <h1>Bill Suite</h1>

      <div className="form-container">
        <h2>Create Invoice</h2>

        <input type="text" name="businessName" placeholder="Business Name" value={invoice.businessName} onChange={handleChange} />
        <input type="text" name="businessAddress" placeholder="Business Address" value={invoice.businessAddress} onChange={handleChange} />
        <input type="email" name="businessEmail" placeholder="Business Email" value={invoice.businessEmail} onChange={handleChange} />
        <input type="tel" name="businessPhone" placeholder="Business Phone" value={invoice.businessPhone} onChange={handleChange} />

        <input type="text" name="clientName" placeholder="Client Name" value={invoice.clientName} onChange={handleChange} />
        <input type="text" name="clientAddress" placeholder="Client Address" value={invoice.clientAddress} onChange={handleChange} />
        <input type="email" name="clientEmail" placeholder="Client Email" value={invoice.clientEmail} onChange={handleChange} />

        <input type="file" accept="image/*" onChange={handleLogoUpload} />
        
        <div>
          <label htmlFor="invoiceColor">Select Invoice Color: </label>
          <input type="color" id="invoiceColor" value={invoice.invoiceColor} onChange={handleColorChange} />
        </div>
        
        {invoice.items.map((item, index) => (
          <div className="item-row" key={index}>
            <input type="text" name="description" placeholder="Description" value={item.description} onChange={(e) => handleItemChange(index, e)} />
            <input type="number" name="quantity" min="1" value={item.quantity} onChange={(e) => handleItemChange(index, e)} />
            <input type="number" name="price" min="0" value={item.price || 0} onChange={(e) => handleItemChange(index, e)} />
            <button onClick={() => removeItem(index)}>Remove</button>
          </div>
        ))}

        <button onClick={addItem}>Add Item</button>
        <input type="number" placeholder="Discount" min="0" value={invoice.discount} onChange={(e) => setInvoice(prev => ({ ...prev, discount: parseFloat(e.target.value) || 0 }))} />
        <button onClick={calculateInvoice}>Calculate Total</button>
        <button onClick={downloadPDF}>Download PDF</button>

        <input type="text" name="paymentTerms" placeholder="Payment Terms" value={invoice.paymentTerms} onChange={handleChange} />
      </div>

      <div ref={invoiceRef} className="invoice" style={{ backgroundColor: invoice.invoiceColor }}>
        {invoice.logo && <img src={invoice.logo} alt="Logo" className="invoice-logo" />}
        
        <h2>Invoice</h2>

        <div className="business-details">
          <h4>Business Details</h4>
          <p>{invoice.businessName}</p>
          <p>{invoice.businessAddress}</p>
          <p>{invoice.businessEmail}</p>
          <p>{invoice.businessPhone}</p>
        </div>
        
        <h3>Bill To</h3>
        <p>{invoice.clientName}</p>
        <p>{invoice.clientAddress}</p>
        <p>{invoice.clientEmail}</p>

        <h4>Itemized List</h4>
        <ul>
          {invoice.items.map((item, index) => (
            <li key={index}>
              {item.description} - {item.quantity} x Ksh{parseFloat(item.price).toFixed(2)} = Ksh{parseFloat(item.quantity * item.price).toFixed(2)}
            </li>
          ))}
        </ul>

        <h4>Subtotal: Ksh{invoice.subTotal.toFixed(2)}</h4>
        <h4>Discount: Ksh{invoice.discount.toFixed(2)}</h4>
        <h4>Total: Ksh{invoice.total.toFixed(2)}</h4>
        <h4>Balance Due: Ksh{invoice.total.toFixed(2)}</h4>

        <h4>Payment Till: 5956159 {invoice.paymentTerms}</h4>
        
        <h3>{invoice.thankYouMessage}</h3>

        {/* Add QR Code here for TikTok account */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
          <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>
            Scan the QR code below to follow us on TikTok for tips, discounts, and more!
          </h4>
          <QRCodeSVG 
            value="https://www.tiktok.com/@budgetbymadge" // URL to TikTok account
            size={128} // Size of the QR code
            level="H" // Error correction level
          />
        </div>
      </div>
    </div>
  );
};

export default App;