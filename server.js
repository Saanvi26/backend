const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const contestRoutes = require('./routes/contests');
const ratingRoutes = require('./routes/rating/contests');
const numberOfQuestionRoutes = require('./routes/numberOfQues/activity')

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', contestRoutes);
app.use('/api', ratingRoutes);
app.use('/api', numberOfQuestionRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
