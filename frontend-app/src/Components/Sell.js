import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sell.css';

const Sell = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);

  const apiUrl = 'http://localhost:5000/api';

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${apiUrl}/items`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('Failed to fetch items. Please try again later.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);
    formData.append('contact', JSON.stringify({ name, email, phone }));

    try {
      setLoading(true);
      console.log('Submitting form with data:', {
        title, description, price, image, contact: { name, email, phone }
      });

      const response = await axios({
        method: editingItemId ? 'put' : 'post',
        url: `${apiUrl}/items${editingItemId ? `/${editingItemId}` : ''}`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      console.log('Form submitted successfully:', response.data);
      clearForm();
      setError(null);
      setEditingItemId(null);
      fetchItems();
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.response ? error.response.data.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!title || !description || !price || !image || !name || !email || !phone) {
      setError('All fields are required.');
      return false;
    }
    return true;
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setImage(null);
    setImagePreview(null);
    setName('');
    setEmail('');
    setPhone('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/items/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Failed to delete item. Please try again later.');
    }
  };

  return (
    <div className="sell-container">
      <h2>{editingItemId ? 'Edit Item' : 'Sell Item'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="file"
          onChange={handleImageChange}
        />
        {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {editingItemId ? 'Update' : 'Submit'}
        </button>
      </form>

      <div className="items-list">
        <h2>My Items</h2>
        {items.map(item => (
          <div key={item._id} className="item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>${item.price}</p>
            <img src={`${apiUrl}/${item.image}`} alt={item.title} />
            {item.contact && (
              <p>Contact: {item.contact.name} - {item.contact.email} - {item.contact.phone}</p>
            )}
            <button onClick={() => setEditingItemId(item._id)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sell;
