const express = require('express');
const filmRouter = require('./Routes/filmRoutes');
const ganreRouter = require('./Routes/genreRoutes');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use('/api', filmRouter);
app.use('/api', ganreRouter);

app.listen(PORT, () => console.log(`Server start listen at port ${PORT}`));