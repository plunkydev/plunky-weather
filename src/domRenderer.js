const appContainer = document.getElementById('appContainerId');
const busquedaContainer = document.getElementById('busquedaContainerId');
const climaContainer = document.getElementById('climaContainerId');
const lugarContainer = document.getElementById('lugarContainerId');
const lugar = document.getElementById('lugarId');
const iconsContainer = document.getElementById('iconsContainerId');
const iconoClima = document.getElementById('iconoClimaId');
const description = document.getElementById('descriptionId');
const temperaturaContainer = document.getElementById('temperaturaContainerId');
const temperatura = document.getElementById('temperaturaId');
const windPrecipPressureContainer = document.getElementById('windPrecipPressureContainerId');
const viento = document.getElementById('vientoId');
const precipitacion = document.getElementById('precipitacionId');
const presion = document.getElementById('presionId');

async function render(data) {
    lugar.textContent = await data.lugar;
    iconoClima.src = await data.icons[0];
    description.textContent = await data.descripcion[0];
    temperatura.textContent = await data.temperatura + '°C';
    viento.textContent = await 'Wind: ' + data.viento + ' kmph';
    precipitacion.textContent = await 'Precip: ' + data.presipitacion + ' mm';
    presion.textContent = await 'Pressure: ' + data.presion + ' mb';
}

export { render };