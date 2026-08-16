const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/samples', require('./routes/samples'));
// app.use('/api/analysis', require('./routes/analysis'));
// app.use('/api/foods', require('./routes/foods'));
// app.use('/api/reports', require('./routes/reports'));

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'foodguard-ai-backend' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
