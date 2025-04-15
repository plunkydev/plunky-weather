import "./styles.css"

import { getWeather } from "./data.js";



const busquedaInput = document.getElementById('busquedaId');
const busquedaBoton = document.getElementById('busquedaBotonId');

busquedaBoton.addEventListener('click', () => {
    const location = {
        latitud: 0,
        longitud: 0,
        city: "",
    }
    location.city = busquedaInput.value;
    getWeather(location);
});
console.log('funcionando')