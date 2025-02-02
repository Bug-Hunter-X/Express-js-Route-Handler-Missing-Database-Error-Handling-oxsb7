const express = require('express');
const app = express();

//Simulate database operation
const db = {
  getUser: async (id) => {
    if (id === 'error') {
      throw new Error('Database error!');
    }
    if (id === '1') {
      return { id: '1', name: 'John Doe' };
    }
    return null;
  }
};

app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const userData = await db.getUser(userId);
    if (!userData) {
      return res.status(404).send('User not found');
    }
    res.send(userData);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Database error occurred');
  }
});
app.listen(3000, () => console.log('Server listening on port 3000'));