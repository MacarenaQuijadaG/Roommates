// apis a utilizar
//https://randomuser.me/api

import axios from 'axios';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const agregar = async (req, res) => {
    const { data } = await axios.get('https://randomuser.me/api')
    //Guardar en una variable el objeto que estará en el indice 0 del arreglo. Este objeto representa el usuario random que se está consultando y contiene en sus propiedades la información del mismo.
    const random = data.results[0];

    const id = uuidv4().slice(24);

    const roommate = {
        id: id,
        nombre: random.name.first,
        debe: '',
        recibe: '',
    }
    const { roommates } = JSON.parse(fs.readFileSync("roommates.json", "utf8"));
    roommates.push(roommate);

   //escribe el nuevo romates en el json roommmates
    fs.writeFileSync("roommates.json", JSON.stringify({ roommates }));
    console.log("Roommate creado con éxito!!");
    return roommates;
};

export { agregar };