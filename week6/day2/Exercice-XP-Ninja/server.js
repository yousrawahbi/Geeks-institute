const express = require('express');
const app = express();
const greetRouter = require('./routes/greet');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', greetRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Emoji Greeting App running at http://localhost:${PORT}`);
});