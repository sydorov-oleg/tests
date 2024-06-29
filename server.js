const app = require('./app');

const PORT = 3000;

// ===== Server ========================================================
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
