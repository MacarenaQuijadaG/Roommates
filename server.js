const express = require('express');
const fs = require('fs');
//import { agregar } from './modulo/agregar.js';
const { agregar } = require('./modulo/agregar.js');

const app = express();
const PORT = 3000;
// salida del servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// no se puede ejecutar nodemon por problemas de ejecucion del script esta desabilitada en el sistema operativo
//Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

 // Rutas

// / GET: Debe devolver el documento HTML disponible en el apoyo.
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
// middleware
app.use(express.json());

//---  /roommate POST: Almacena un nuevo roommate ocupando random user.
app.post('/roommate', async (req, res) => {
    try {
      if (!fs.existsSync("roommates.json")) {
           fs.writeFileSync('roommates.json', '{"roommates": []}', 'utf8');
     }
        const result = await agregar();
        res.send("Creado con éxito: " + JSON.stringify(result));
    } catch (error) {
        res.status(500).send(error.message);
    }
});
// --- /roommate GET: Devuelve todos los roommates almacenados.
app.get('/roommate', (req, res) => {
    try {
        const roommates = JSON.parse(fs.readFileSync("roommates.json", "utf8")).roommates;
        res.json({ roommates });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- /gastos GET: Devuelve el historial con todos los gastos registrados.
app.get('/gastos', (req, res) => {
  try {
      const gastos = JSON.parse(fs.readFileSync("gastos.json", "utf8"));
      res.json({ gastos }); // Devuelve los gastos como JSON
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

//---   /gasto PUT: Edita los datos de un gasto.
app.put('/gasto/:id', (req, res) => {
  try {
      
      const { id } = req.params;
      const { roommate, descripcion, monto } = req.body;
      let gastos = JSON.parse(fs.readFileSync("gastos.json", "utf8"));
      const index = gastos.findIndex(gasto => gasto.id === id);
      
      if (index !== -1) {
          // actualiza los combios
          gastos[index] = { id, roommate, descripcion, monto };
          fs.writeFileSync("gastos.json", JSON.stringify(gastos));
          res.json({ message: 'exitosamente añadido', gasto: gastos[index] });
      } else {
          res.status(404).json({ error: 'no encontrado o no existe' });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// ----  /gasto DELETE: Elimina un gasto del historial.

app.delete('/gasto/:id', (req, res) => {
  try {
      const { id } = req.params;
      
      let gastos = JSON.parse(fs.readFileSync("gastos.json", "utf8"));
     
      gastos = gastos.filter(gasto => gasto.id !== id);
      fs.writeFileSync("gastos.json", JSON.stringify(gastos));
      
      res.json({ message: 'Gasto eliminado exitosamente' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});





