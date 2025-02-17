require('dotenv').config();
const mongoose = require('mongoose');

// Importuoti ir paleisti duomenų importavimo skriptą prieš paleidžiant serverį
mongoose.connect(process.env.MONGO_DB)
  .then(() => {
    console.log('MongoDB connected...');
    const app = require('./app');
    const PORT = process.env.PORT;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));