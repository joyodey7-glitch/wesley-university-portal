const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Connect the website folder
app.use(express.static(path.join(__dirname, '..', 'public')));

// Demo user accounts
const users = [
  {
    name: 'Demo Student',
    email: 'student@test.com',
    password: 'Student123',
    role: 'Student'
  },
  {
    name: 'Demo Parent',
    email: 'parent@test.com',
    password: 'Parent123',
    role: 'Parent'
  },
  {
    name: 'Demo Lecturer',
    email: 'lecturer@test.com',
    password: 'Lecturer123',
    role: 'Lecturer'
  },
  {
    name: 'Portal Administrator',
    email: 'admin@test.com',
    password: 'Admin123',
    role: 'Administrator'
  }
];

// Test the server
app.get('/api/test', function(req, res) {
  res.json({
    message: 'Wesley University Portal is working!'
  });
});

// Login route
app.post('/api/login', function(req, res) {
  const role = req.body.role;
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');

  if (!role || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in all fields.'
    });
  }

  const user = users.find(function(account) {
    return account.email.toLowerCase() === email &&
           account.role === role;
  });

  if (!user || user.password !== password) {
    return res.status(401).json({
      success: false,
      message: 'Incorrect email, password or account type.'
    });
  }

  res.json({
    success: true,
    message: 'Login successful!',
    user: {
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

// Start server
app.listen(PORT, function() {
  console.log('Wesley University Portal running at http://localhost:' + PORT);
});
