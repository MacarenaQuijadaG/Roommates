const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// no se puede ejecutar nodemon por problemas de ejecucion del script esta desabilitada en el sistema operativo
//Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
