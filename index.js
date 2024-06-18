const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/shopify');

app.use(cors());
app.use('/shopify', routes);

const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
