var map = L.map('map').setView([45.53971139337194, 10.221328339942707], 18);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Fetch Dati, Aggiunta Poligoni ZTL e Marker Varchi
fetchDatiVarchi();
fetchDatiZTL();

async function fetchDatiZTL() {
    try {
        //Fetch Dati
        const response = await fetch(
          "https://www.dati.lombardia.it/resource/ufkd-whtz.json",
        );
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        
        //Data contiene i dati del DataSet
        const data = await response.json();

        let coordinate = "";
        for(let i = 0; i < data.length; i++) {

            //Recupero Coordinate
            for (let j=0; j < data[i].the_geom.coordinates[0][0].length; j++){

                if (j == (data[i].the_geom.coordinates[0][0].length-1)){
                    coordinate += "[" +  data[i].the_geom.coordinates[0][0][j][1] + ", " +
                    data[i].the_geom.coordinates[0][0][j][0] + "]"
                } else { 
                    coordinate += "[" +  data[i].the_geom.coordinates[0][0][j][1] + ", " +
                    data[i].the_geom.coordinates[0][0][j][0] + "],"
                }
            }

            //Aggiunta Poligono alla Mappa
            coordinate = "var polygon = L.polygon([" + coordinate + "], {fillOpacity: 0.1,}).addTo(map);"
            eval(coordinate);

            polygon.bindPopup(
                "Periodo: " + data[i].periodo + "<br>" +
                "Nome ZTL: " + data[i].nome_ztl + "<br><br>" +
                "Dettagli: " + data[i].dettagli
            );

            coordinate = "";
        }
      } catch (error) {
        console.error(`Could not get data: ${error}`);
      }
}

async function fetchDatiVarchi() {
    try {
        const response = await fetch("https://www.dati.lombardia.it/resource/jffv-3yqx.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        var greenIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        for (let index = 0; index < data.length; index++) {
            const latitudine = parseFloat(data[index].latitudine);
            const longitudine = parseFloat(data[index].longitudine);

            let deroghe = data[index].deroghe;
            deroghe = caratteriSpecialiDeroghe(data, index, deroghe);
            deroghe.replace(/(?:\r\n|\r|\n)/g, '<br>');
            deroghe.replace(";", "<br>");

            const popup =
                "Via: " + data[index].via + "<br>" +
                "Tipo: " + data[index].tipo + "<br>" +
                "Deroghe: " + deroghe;

            L.marker([latitudine, longitudine], {icon: greenIcon}).addTo(map)
                .bindPopup(popup)
                .openPopup();

            
        }
    } catch (error) {
        console.error(`Could not get data: ${error}`);
    }

    // Funzione per togliere manualmente i caratteri speciali dalle Deroghe dei Varchi
    function caratteriSpecialiDeroghe(data, index, deroghe) {
        switch (data[index].via) {
            case "Via Musei":
                deroghe = "Possibile attivare il titolo Gratta e Sosta;Orari di carico scarico consentito per veicoli immatricolati autocarro: dal lunedi al sabato dalle ore 6:30 alle ore 10:30 (uscita entro le ore 10:45) e dalle ore 14:00 alle ore 15:30 (uscita entro le ore 15:45);Attenzione: Via Musei nel tratto compreso tra Via Gambara e Via Gabriele Rosa diviene Area a Pedonalità Privilegiata con orario di carico/scarico limitato dalle ore 6:30 alle ore 10:30 (uscita entro le ore 10:45)";
                break;
            case "Via Trieste":
                deroghe = "Area a Pedonalità privilegiata;Utilizzabile ticket Gratta e Sosta;L'accesso è consentito unicamente a veicoli in possesso di permesso specifico rilasciato dal Settore Mobilità del Comune di Brescia;Orario di carico scarico consentito per veicoli immatricolati autocarro: dal lunedi al sabato dalle ore 6:30 alle ore 10:30 (uscita entro le ore 10:45)";
                break;
            case "Via X Giornate/Loggia":
                deroghe = "Area Pedonale;Utilizzabile ticket Gratta e Sosta;L'accesso è consentito unicamente a veicoli in possesso di permesso specifico rilasciato dal Settore Mobilità del Comune di Brescia";
                break;
            case "Corso Zanardelli (Est)":
                deroghe = "Area Pedonale non utilizzabile ticket Gratta e Sosta;L'accesso è consentito unicamente ai veicoli in possesso di permesso specifico rilasciato dal Settore Mobilità del Comune di Brescia";
                break;
            case "Via Querini":
                deroghe = "Area a Pedonalità privilegiata;Utilizzabile ticket Gratta e Sosta;L'accesso è consentito unicamente ai veicoli in possesso di permesso specifico rilasciato dal Settore Mobilità del Comune di Brescia;Orario di carico/scarico consentito per veicoli immatricolati autocarro: dal lunedi al sabato dalle ore 6:30 alle ore 10:30 (uscita entro le ore 10:45)";
                break;
            case "Corso Zanardelli (Ovest)":
                deroghe = "Area Pedonale;Utilizzabile ticket Gratta e Sosta;L'accesso è consentito unicamente a veicoli in possesso di permesso specifico rilasciato dal Settore Mobilità del Comune di Brescia";
                break;
            default:
                deroghe = data[index].deroghe;
                break;
        }
        return deroghe;
    }
}


function toggleImage() {
    var imageContainer = document.getElementById('image-container');
    imageContainer.style.display = (imageContainer.style.display === 'none' || imageContainer.style.display === '') ? 'block' : 'none';
}