var map = L.map('map').setView([45.53971139337194, 10.221328339942707], 18);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

fetchDati();

async function fetchDati() {
    try {
        // using await outside an async function is only allowed in a module
        const response = await fetch("https://www.dati.lombardia.it/resource/nkxw-x4xd.json",);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        let latitudine = 0;
        let longitudine = 0;
        let popup = "";
        let attivo = "Sì";

        for (let index = 0; index < data.length; index++) {
            latitudine = data[index].latitudine;
            longitudine = data[index].longitudine;

            if (data[index].attivo == 'si')
                attivo = "Sì";
            else
                attivo = "No"; 

            popup = 
                "ID: " + data[index].id_accesso + "<br>" +
                "Dove: " + data[index].sito + "<br>" +
                "Attivo: " + attivo;

            L.marker([latitudine, longitudine]).addTo(map)
            .bindPopup(popup)
            .openPopup();    

            popup = "";
        }
    } catch (error) {
        console.error(`Could not get products: ${error}`);
    }
}