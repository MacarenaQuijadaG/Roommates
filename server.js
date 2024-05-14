const express = require('express');
const app = express();
const PORT = 3000;

// ruta la cual levanta el proyecto el index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
//puerto por donde se muestra el server.js con nodemon
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// no se puede ejecutar nodemon por problemas de ejecucion del script esta desabilitada en el sistema operativo
//Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

 // Rutas
/*
    / GET: Debe devolver el documento HTML disponible en el apoyo.
/roommate POST: Almacena un nuevo roommate ocupando random user.
/roommate GET: Devuelve todos los roommates almacenados.
/gastos GET: Devuelve el historial con todos los gastos registrados.
/gasto PUT: Edita los datos de un gasto.
/gasto DELETE: Elimina un gasto del historial.
*/