import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?page=1&results=1&seed=abc');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { results } = await response.json(); // Destructure results
        setUser(results[0]);
      } catch (err) {
        setError(err);
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;
  if (!user) return <div className="no-user">No user data found.</div>;

  // Reusable component for info items
  const InfoItem = ({ label, value }) => (
    <div className="info-item">
      <span className="info-label">{label}:</span>
      <span className="info-value">{value}</span>
    </div>
  );
  

  const { name, email, location, dob, gender, phone, picture } = user; // Destructure user properties

  return (
    <div>
      <div className="card">
        <img src={picture.large} alt={`${name.first} ${name.last}`} className="profile-image" />
        <div className="user-details">
          <h2 className="user-name">{`${name.first} ${name.last}`}</h2>
          <p className="user-email">{email}</p>
          <p className="user-location">{`${location.city}, ${location.country}`}</p>
          <div className="user-info">
            <InfoItem label="Age" value={dob.age} /> {/* Reusable component */}
            <InfoItem label="Gender" value={gender} />
            <InfoItem label="Phone" value={phone} />
          </div>
        </div>
      </div>
    </div>
  );
}



export default App;