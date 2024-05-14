// apis a utilizar
//https://randomuser.me/api
const axios = require('axios');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const agregar = async () => {
    try {
        if (!fs.existsSync("roommates.json")) {
            fs.writeFileSync('roommates.json', '{"roommates": []}', 'utf8');
        }
        
        const { data } = await axios.get('https://randomuser.me/api');
        const random = data.results[0];

        const id = uuidv4().slice(24);

        const roommate = {
            id: id,
            nombre: random.name.first,
            debe: '',
            recibe: '',
        };

        const { roommates } = JSON.parse(fs.readFileSync("roommates.json", "utf8"));
        roommates.push(roommate);

        fs.writeFileSync("roommates.json", JSON.stringify({ roommates }));
        console.log("Creado");
        return roommates;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { agregar };
