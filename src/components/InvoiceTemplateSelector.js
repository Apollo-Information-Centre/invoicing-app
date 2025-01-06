import React from 'react';

const colors = ['#f5f5f5', '#e0e0e0', '#c8e6c9', '#bbdefb', '#ffccbc'];

const InvoiceTemplateSelector = ({ selectedColor, setSelectedColor }) => {
  return (
    <div className="template-selector">
      <h2>Select Invoice Color</h2>
      <div className="color-palette">
        {colors.map((color) => (
          <div
            key={color}
            onClick={() => setSelectedColor(color)}
            className="color-box"
            style={{
              backgroundColor: color,
              border: selectedColor === color ? '2px solid #007bff' : '2px solid transparent'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default InvoiceTemplateSelector;