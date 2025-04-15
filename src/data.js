import { render } from "./domRenderer.js"

const giphiApiKey = "Ka0KnVifxMeN2QhIf7amGnIfoRTY8VU0"
const keyApi = "24a415dc67a0c7dfbb60dd85da5b59e3"

const location = {
    latitud: 0,
    longitud: 0,
    city: "medellin",
};

const options = {
    method: "GET",
};

async function getWeather(currentLocation) {
    try {
        let url = "";

        if (currentLocation.city) {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${currentLocation.city}&appid=${keyApi}&units=metric&lang=es`;
        } else {
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.latitud}&lon=${currentLocation.longitud}&appid=${keyApi}&units=metric&lang=es`;
        }

        const response = await fetch(url, options);
        const data = await response.json();

        if (response.status !== 200) {
            console.error("Error desde la API:", data);
            alert(`Error desde la API: ${data.message}`);
            return;
        }

        const datosFiltrados = {
            lugar: `${data.name}, ${data.sys.country}`,
            icons: [`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`],
            descripcion: [data.weather[0].description],
            temperatura: data.main.temp,
            viento: data.wind.speed,
            presipitacion: data.rain?.['1h'] ?? 0,
            presion: data.main.pressure
        };

        getGif(data.weather[0].description);
        render(datosFiltrados);

    } catch (error) {
        console.error("Error al obtener el clima:", error);
        alert("Hubo un error al obtener el clima. Verifica tu conexión o tu API key.");
    }
}


// Obtener la ubicación del usuario---------------------------------------------------------

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            if (position) {
                const latitud =  position.coords.latitude;
                const longitud =  position.coords.longitude;
                location.latitud = latitud;
                location.longitud = longitud;
                getWeather(location)
            } else {
                getWeather(location)
                alert("No se pudo obtener la ubicación del usuario.");
            }
        },
        (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("Tu navegador ha denegado la solicitud de ubicación. Permite que las aplicaciones accedan a tu ubicación.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Información de ubicación no disponible.");
                    break;
                case error.TIMEOUT:
                    alert("La solicitud de ubicación ha expirado.");
                    break;
                default:
                    alert("Error desconocido al obtener la ubicación.");
                    break;
            }
        }
    );
} else {
    alert("Tu navegador no soporta Geolocalización.");
}


async function getGif(currentWeather) {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphiApiKey}&q=${currentWeather}&limit=5`);
    const data = await response.json();
    let index = Math.floor(Math.random() * 5);
    const imageUrl = data.data[index].images['original'].url;
    const memeContainer = document.getElementById('memeContainerId');

    const image = document.createElement("img");
    image.style.backgroundImage = `url(${imageUrl})`;
    image.style.backgroundSize = "cover";
    image.style.backgroundRepeat = "no-repeat";
    image.style.backgroundPosition = "center center";
    image.style.height = "100%";
    image.style.width = "100%";
    image.style.filter = "sepia(100%) hue-rotate(191deg)";

    memeContainer.innerHTML = "";
    memeContainer.appendChild(image);
}

export { getWeather }

