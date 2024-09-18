import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
  });
  const [cards, setCards] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.age || formData.age <= 0) tempErrors.age = "Valid age is required";
    if (!formData.phone || formData.phone.length == 10) tempErrors.phone = "Phone must be 10 digits";
    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setCards([...cards, formData]);
      setFormData({ name: '', age: '', phone: '' });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className='container'>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Your Name..."
            className={errors.name ? 'error-input' : ''}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="input-field">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter Your Age..."
            className={errors.age ? 'error-input' : ''}
          />
          {errors.age && <p className="error">{errors.age}</p>}
        </div>

        <div className="input-field">
          <label>Phone</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter Your Phone..."
            className={errors.phone ? 'error-input' : ''}
          />
          {errors.phone && <small className="error">{errors.phone}</small>}
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>

      <div className="cards-container">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <h3>Submit Information {index + 1}</h3>
            <p><strong>Name:</strong> {card.name}</p>
            <p><strong>Age:</strong> {card.age}</p>
            <p><strong>Phone:</strong> {card.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
