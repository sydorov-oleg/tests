const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 3000;

// ===== Server ========================================================
app.listen(PORT, () => {
  mongoose.connect(process.env.DB).then(() => {
    console.log('DB ready');
  });
  console.log(`App running on port ${PORT}...`);
});
