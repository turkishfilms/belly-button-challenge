const express = require('express'),
app = express(),
port = process.env.PORT || 3030,
server = app.listen(port, () => console.log(`Preach It!! ${port}`))
app.use(express.static('belly-button-challenge'))