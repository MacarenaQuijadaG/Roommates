const express = require('express');
const app = express();
const PORT = 3000;

//puerto por donde se muestra el server.js con nodemon
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// no se puede ejecutar nodemon por problemas de ejecucion del script esta desabilitada en el sistema operativo
//Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

 // Rutas
// --   / GET: Debe devolver el documento HTML disponible en el apoyo.
// ruta la cual levanta el proyecto el index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//  --   /roommate POST: Almacena un nuevo roommate ocupando random user.
import { agregar } from './modulo/agregar.js';

app.use(express.json());


app.post('/roommate', async (req, res) => {
    try {
        // Verificamos que el archivo roommates.json existe, si no existe lo creamos con un arreglo vacío
        if (!fs.existsSync("roommates.json")) {
            fs.writeFileSync('roommates.json', '{"roommates": []}', 'utf8');
        };
        const result = await agregar();
        res.send(" creado con éxito!!", result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
/*
/roommate GET: Devuelve todos los roommates almacenados.
/gastos GET: Devuelve el historial con todos los gastos registrados.
/gasto PUT: Edita los datos de un gasto.
/gasto DELETE: Elimina un gasto del historial.
*/