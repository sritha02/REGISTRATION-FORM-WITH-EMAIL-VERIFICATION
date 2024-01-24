// App.js
import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';
import WelcomeScreen from './WelcomeScreen';

const App = () => {
  const [user, setUser] = useState(null);

  const handleRegister = async (userData) => {
    // Call the registration API endpoint
    const response = await fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    // Show success message or handle errors
    alert(data.message);
  };

  const handleLogin = async (email) => {
    // Call the login API endpoint
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    // Update the user state to show the welcome screen
    setUser({ name: data.message.split(' ')[1] });
  };

  return (
    <div>
      {user ? (
        <WelcomeScreen userName={user.name} />
      ) : (
        <RegistrationForm onRegister={handleRegister} />
      )}
    </div>
  );
};

export default App;
