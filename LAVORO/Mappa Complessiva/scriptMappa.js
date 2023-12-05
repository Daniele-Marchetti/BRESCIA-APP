var map = L.map('map').setView([45.53971139337194, 10.221328339942707], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Create Layer Groups for different types of markers
var parcheggiGroup = L.layerGroup().addTo(map);
var visitareGroup = L.layerGroup().addTo(map);
var mangiareGroup = L.layerGroup().addTo(map);
var dormireGroup = L.layerGroup().addTo(map);
var muoversiGroup = L.layerGroup().addTo(map);


// Definisci icone personalizzate
{
var parcheggioIcon = L.icon({
    iconUrl: "data:image/png;base64,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",
    iconSize: [29, 29],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var visitaIcon = L.icon({
    iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADCElEQVR4nO2aSWsUQRiGn0bFuAQPIniIoETx4iEXL55EMZrEMBqjAZeT/8CzgiBm5h5Q4sWbYtCDBhdkTAKi4EFwAU2UeBAUIRqXiVtcKaiGMKR7qruruqpn+oEP5tBVb71fN7V9Azk5OTk5OaZZDnQCJWAYGAemgVkZ4vdz4BpQBDpkm0zjSSNDwA/gX8T4DlwCdsm+MsV+4EkM00HxCOghA2wAyhqNV8dtYD2Osg/4ZNC8H1+AgziEB5xMwXh1lFyYGzzgrAXzfpyxnYSiRfN+nLJlvs8B834csjHbVxww7sdnoDXNBJQdMD3fEpkKvQ6YDYq9ps17CXd4kwoakwl3jEZXhY6Eb2hQQWMwocZOkwkYijmot8A9YJuChnjmvmwTR+uiKfPNEU51E3Ku2Ag0JdBskn30yj5VtL8BS7H8+bcZ0G+LoN9uQJ9ShAHUmogKwBgwI2MU6K56Zm5/yD5V9ftNJGA4wgDiJvL0nOfuztOfqv5VEwmY0JCAgkLb3SHtVfXF9Zp23mtIwJhC25GQ9qr6Uwb881NDAiqKFx5BqOqL1Uo7syklQBxsglDVFy9LO9MaEjCq0PZOSHtV/Q8G/DOuIQHdCm27Qtqr6j8z4J/rGhKAXOri3u6o6oslWzv9mhKAXOpG5JxQkZ992Jv3sXpN1qUxAXFR1RfVJO0sA74qDqDFgP4aRe0ZU4chwWXFQdzQnARh/qaitjiyG6M9wmdoK7abTIAHPHXAZFA8TqNQUnDAaJyDlFbKDpi1di0uWOdYYUQcoNaSMj3AXwfMizEcoIGLo0Us4gHnLZq/YLs8LlgE3LJgXpwfFuMIzcDDlNf7FTjGKuBFCuZfAatxlFbgnUHzU7JS5DSbDe0RRMlrCxmhE/il0fxvYA8Z47CmjZLo4ygZ5YSGBBwn4wwkMH+OOmABcCWGeXGzu5A6YUlVtbdWPJB3kHXFSlmwqGX+pdxU1SUtwOsQ829snOvTZhPwMaAoauKvNU6yteoPV6LyvIMGow/4Izc6R2hQjsnIycnBCv8BvTRjmCXEumEAAAAASUVORK5CYII=",
    iconSize: [29, 29],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var mangiareIcon = L.icon({
    iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEZElEQVR4nO2aWYgdRRSGv8QYt0RNXOKKijJ58SXghg+iBJGZMeJKRrzGB5GMaMQXdwnEB1HU4BaR+KAICoqiovhiFk1cULMKJjNjxkRQEYTEN6OJM3LgNByOvd+63T2xfygut6vqVP1/VVfVOdXQokWLFi1atCiJI4CPgHHgSv6HuByY1PQn0F93h4BLgUeBc6tobDYwYkTYDwxQH64H/ta+/AScXEWjpwGjToSrqZd8lNaGbuQoYBFwUoYIf2m5OslHKehgvKdGfwb6cohwDdWT3w68av5vCNnYZmP4l5wiXEu15E8E5gEH9NlBfRYEFwD7CoogHbyO6shH2GDygr6OF5UUQTpcFXnBSyZ/aZlGZgGrgVeA4wOJcCPVkBc8Y8rcW6ahZcbAN12IYM8J8l7eRO/JC94w5W4u09hluoAUFWF+DhEW95j8NGC3KbuAkug4Eb4F5gQSYahH5AULXX9EEJomwsGcU7Mo+ZnAFlP+cQKg40TYFFCEWwKSl5F+zZTfG9PPYCJsBub2cCYsKkHebn0TXS64XYnwhxPhvAwRxIE635XZUZD8KucDrKBH6DgRtuQQ4e0YOyLCmCnzustfZewXJf8UPUYnRoQTYkTYq/nLU7bayMaeGGJ9uqglQcq8WDX5JBG2xoggTsklJOMsU/83ikHIv1AX+SIipMGO3rqC5J+vm3ySCNtyup+zdaWO6gmhvOSfc+SfpmZ0SoggRDa6beueHHWebRr5CItNECLP1hV5nOsdIYnoJuEJV3YlDUPHzYTtLn4ogZEHdPpbET51xB6Jsb2yqSOfJYKs7i8Da8wzWb0tjgY+cQQfS/DtG00+SQSf4hyUI4GPXbknleyUIh9hUI/BtvMHdLWfmXLV9kGKcFOGvB1VuS67G7gVOINsHA68cyiQz4vpwJn6G2EG8OahQP6wjPxj9PpqUn9nuboya25giuIqdYbE4zslgfxnbppvdFvklEW/XpdHxIZykI/SF8CxCXblG4QPC8YTK8eABjgiQhL4OC6F/ISGsK1f8JWrE2Hc1BmmoVvffkNkVAMfaeTv1LylToSvY8Lw77q6w02e9mPA6e60t84RkO3R4nbgn5RAS5yNu2gg+R9ykJebpzh4EbY6p6pxIvS7aS83MmdndDjL7fUibGuqCAOO/J4M8pLuz2nbi7DDbae1izBQgry4wkXgRdgJnNoEEQZLkH+wZFtehBG3s1QuwqAjL5+jnZPSIUkPddlmY0RY6K6rftTQdtoJ775AbftzwkiOM0bQE+N0YJdb7bPIF33ni4ow5lxs34ff9VkQLDCG97lpH0e+22mfV4Rd6k7bvuw0+f0hvbtJTeszyD9MbzHsRBh3s3G1ybstVKN9xqisA0uAi4HPC4S1eynCbv0wc8hdzMr9YzB8meDCTmZcglYlgk+jGl0i5Cz4NaahiYRYfhW4w13I2HVKbqiDY57G6L5Tp+d94ArqxYXAWzri3+uXInZNaNGiRYsWLVrwH/wL+/e89mNrrX8AAAAASUVORK5CYII=",
    iconSize: [29, 29],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var dormireIcon = L.icon({
    iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABSklEQVR4nO2VsUoDQRCGv6AIWgRsxNrX8fJOAYNGn8HO2sb+EixiaWEXsLEwvUn6kcAcSrjcbXFmZ9b9YOA4lrn9+HfnYP/IjhrijGREfjNUiQ/gAqdkCSskkUTTZd+UK5IRycQ8Kq6Oi6Qiss0ZMFeJW5zSB15V4gHo4ZBj4FklnoBDHHIAPKrEC3CCQ3rAvUq8AaexNnKkl3IBfAJjfRfKnUq8A+dEZFwzMm86HL97G8GLmg9v3rkTkVR+ZJJFjCE5EWPIf0pkAEyBtdYEKLbWzAJHcRe1rttDm8h1w5pRQJ+/rlGIyCCgURFZRKo9NIlMA5qUBkTKNpFVQJOlAZFlFyJfBkSkTWQSGqt1kSKgwaUHEXS87VpzxQ/mRapkSr0zK32uknAl4gJJXUScFbE3kEXIiRD9+Ei+IySQiFUkixhDciLYojaRbwpx7maTxIfjAAAAAElFTkSuQmCC",
    iconSize: [29, 29],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
}

/* PARCHEGGI */
{
    var Fossa_Bagni = L.marker([45.5443137695457, 10.223934493688029], { icon: parcheggioIcon });
    Fossa_Bagni.bindPopup("Fossa Bagni<br>Via Cesare Lombroso - Brescia<br>Posti: 560");
    parcheggiGroup.addLayer(Fossa_Bagni);

    var Randaccio = L.marker([45.54482155863986, 10.21324207826075], { icon: parcheggioIcon });
    Randaccio.bindPopup("Randaccio<br>Via Lupi di Toscana - Brescia<br>Posti: 180");
    parcheggiGroup.addLayer(Randaccio);

    var Goito = L.marker([45.53491162260381, 10.23005841468577], { icon: parcheggioIcon });
    Goito.bindPopup("Goito<br>Via Spalto San Marco - Brescia<br>Posti: 215");
    parcheggiGroup.addLayer(Goito);

    var Arnaldo = L.marker([45.537199267510466, 10.231491328598915], { icon: parcheggioIcon });
    Arnaldo.bindPopup("Arnaldo Park<br>Piazzale Arnaldo - Brescia<br>Aperto 24 ore su 24");
    parcheggiGroup.addLayer(Arnaldo);

    var S_Faustino = L.marker([45.545753515422895, 10.221284431310679], { icon: parcheggioIcon });
    S_Faustino.bindPopup("Parcheggio San Faustino<br>Via Lombroso - Brescia<br>Parcheggio a pagamento ubicato tra piazzale Cesare Battisti e via Lombroso<br>Orari: tutti i giorni, compresi domenica e festivi, dalle 7.30 alle 24.00.<br>Ritiro della vettura possibile 24h su 24h.<br>Posti: 385");
    parcheggiGroup.addLayer(S_Faustino);

    var Vittoria = L.marker([45.53818190573765, 10.218936135602762], { icon: parcheggioIcon });
    Vittoria.bindPopup("Parcheggio di piazza Vittoria<br>Piazza Vittoria - Brescia<br>Posti: 520");
    parcheggiGroup.addLayer(Vittoria)

    var Palagiustizia = L.marker([45.53147456679863, 10.222974438055601], { icon: parcheggioIcon });
    Palagiustizia.bindPopup("Palagiustizia<br>Via Lattanzio Gambara - Brescia<br>Posti: 570");
    parcheggiGroup.addLayer(Palagiustizia);

    var Autosilo = L.marker([45.53435190922132, 10.223015175812472], { icon: parcheggioIcon });
    Autosilo.bindPopup("Autosilouno<br>Via Vittorio Emanuele II - Brescia<br>Posti: 350");
    parcheggiGroup.addLayer(Autosilo);

    var Castello = L.marker([45.54251722051137, 10.22534610054199], { icon: parcheggioIcon });
    Castello.bindPopup("Parcheggio del Castello<br>Area di parcheggio - Brescia<br>Aperto 24 ore su 24");
    parcheggiGroup.addLayer(Castello);

    var Stazione = L.marker([45.53291911737733, 10.215258756444268], { icon: parcheggioIcon });
    Stazione.bindPopup("Parcheggio Stazione<br>Viale Stazione - Brescia<br>Posti: 1000");
    parcheggiGroup.addLayer(Stazione);

    var S_Domenico = L.marker([45.53538243979665, 10.21936048599915], { icon: parcheggioIcon });
    S_Domenico.bindPopup("Parcheggio San Domenico<br>Piazzetta San Domenico - Brescia<br>Orari: Aperto 24h su 24h.<br>Posti: 72");
    parcheggiGroup.addLayer(S_Domenico);

    var V_Moro = L.marker([45.54142953182871, 10.213872130031938], { icon: parcheggioIcon });
    V_Moro.bindPopup("Garage Pallata <br>Vicolo del Moro - Brescia");
    parcheggiGroup.addLayer(V_Moro);
}
/* DA VISITARE */
{
    var Piazza_PaoloVI = L.marker([45.53884902819896, 10.221257683048664], { icon: visitaIcon });
    Piazza_PaoloVI.bindPopup("PIAZZA PAOLO VI<br>P.za Paolo VI, 25121 Brescia BS<br>Una delle grandi piazze del centro di Brescia che ospita il duomo nuovo e il duomo Vecchio.<br>Inoltre si può ammirare la torre del Pegol ed il palazzo del Broletto.<br> <img src='./IMG/brescia_piazza_paolo_VI_vista_aerea.jpg' alt='Piazza Paolo VI Image' width='200'>");
    visitareGroup.addLayer(Piazza_PaoloVI);

    var Teatro_Sociale = L.marker([45.53608610152377, 10.220230847810468], { icon: visitaIcon });
    Teatro_Sociale.bindPopup("TEATRO SOCIALE<br>Via Felice Cavallotti, 20, 25121 Brescia BS<br>Pièce di prosa in un'elegante sala liberty, con 3 ordini di palchi, all'interno di un edificio del 1873.<br> <img src='./IMG/news-Teatro-sociale-BANNER.jpg' alt='Teatro Sociale Image' width='200'>");
    visitareGroup.addLayer(Teatro_Sociale);

    var Teatro_Grande = L.marker([45.53699825156108, 10.220871628548561], { icon: visitaIcon });
    Teatro_Grande.bindPopup("TEATRO GRANDE<br>Via Zanardelli, 9 - Brescia<br>Costruito nel '600 è considerato un monumento di interesse nazionale.<br><img src='./IMG/brescia-teatro-grande.jpg' alt='Teatro Grande Image' width='200'>");
    visitareGroup.addLayer(Teatro_Grande);

    var Teatro_Romano = L.marker([45.54007465856828, 10.226662018757086], { icon: visitaIcon });
    Teatro_Romano.bindPopup("TEATRO ROMANO<br>Via dei Musei, 55, 25121 Brescia BS<br>Teatro d'età augustea sulle pendici di un colle, con un palazzo costruito nel '300 sui resti della platea.<br><img src='./IMG/Teatro-romano.jpg' alt='Teatro Romano Image' width='200'>");
    visitareGroup.addLayer(Teatro_Romano);

    var Museo_S_Giulia = L.marker([45.5393992173988, 10.229083113242098], { icon: visitaIcon });
    Museo_S_Giulia.bindPopup("MUSEO SANTA GIULIA<br>Via Musei, 81 - Brescia<br>Allestito in un complesso monastico di origine longobarda.<br><img src='./IMG/museo-santa-giulia-1.jpg' alt='Museo Santa Giulia VI Image' width='200'>");
    visitareGroup.addLayer(Museo_S_Giulia);

    var Piazza_Vittoria = L.marker([45.5382817416443, 10.219172337802318], { icon: visitaIcon });
    Piazza_Vittoria.bindPopup("PIAZZA VITTORIA<br>Piazza della Vittoria, 25121 Brescia BS<br>Piazza della Vittoria è una delle principali piazze di Brescia<br>costruita fra il 1927 e il 1932 attraverso la demolizione di una parte del centro storico medievale.<br>Oggetto di smantellamento degli elementi rappresentativi dell'ideologia fascista nel secondo dopoguerra è un emblema di architettura e organizzazione urbanistica del ventennio.<br><img src='./IMG/Piazza-Vittoria-Brescia-3.jpg' alt='Piazza Vittoria Image' width='200'>");
    visitareGroup.addLayer(Piazza_Vittoria);

    var Piazzale_Arnaldo = L.marker([45.536353032161436, 10.230023697488727], { icon: visitaIcon });
    Piazzale_Arnaldo.bindPopup("PIAZZALE ARNALDO<br>Bellissima piazza, molto frequentata da giovani e non giovani per aperitivi e una serata all'insegna del divertimento e della compagnia all'aperto. Sono presenti molti locali.<br><img src='./IMG/Piazzale_Arnaldo_a_Brescia.jpg' alt='Piazzale Arnaldo Image' width='200'>");
    visitareGroup.addLayer(Piazzale_Arnaldo);

    var Piazza_Loggia = L.marker([45.53998060615397, 10.219859929397712], { icon: visitaIcon });
    Piazza_Loggia.bindPopup("PIAZZA DELLA LOGGIA<br>Piazza della Loggia - Brescia<br>Ha forma quadrata, ed è stata progettata in epoca rinascimentale<br><img src='./IMG/brescia-piazza-della-loggia.jpg' alt='Piazza Loggia Image' width='200'>");
    visitareGroup.addLayer(Piazza_Loggia);

    var Brixia_Romana = L.marker([45.540103751701345, 10.225770787402373], { icon: visitaIcon });
    Brixia_Romana.bindPopup("BRIXIA ROMANA<br>Via dei Musei, 55, 25121 Brescia BS<br>Un percorso archeologico tra i più significativi e meglio conservati d’Italia, riconosciuto Patrimonio mondiale dell’umanità dall’Unesco.<br><img src='./IMG/BRIXIA.jpg' alt='Brixia Romano Image' width='200'>");
    visitareGroup.addLayer(Brixia_Romana);

    var Rinoceronte = L.marker([45.53870190373328, 10.220039063759776], { icon: visitaIcon });
    Rinoceronte.bindPopup("RINOCERONTE<br>Piazza della Vittoria, 3, 25121 Brescia BS<br>Operainstallata durante il periodo Covid,<br>Il rinoceronte sospeso è molto dettagliato, girandoci attorno sembra quasi vivo<br> e che ti osserva dalla sua scomoda posizione<br><img src='./IMG/RINOCERONTE.jpg' alt='Rinoceronte Image' width='200'>");
    visitareGroup.addLayer(Rinoceronte);
}
/* DA MANGIARE */
{
    var Piadineria = L.marker([45.538091456056094, 10.222264083336768], { icon: mangiareIcon });
    Piadineria.bindPopup("PIADINERIA<br>Via Trieste, 3, 25121 Brescia <br>Piadineria posta in centro a Brescia");
    mangiareGroup.addLayer(Piadineria);

    var Pizzium = L.marker([45.53713447493965, 10.223446451112757], { icon: mangiareIcon });
    Pizzium.bindPopup("PIZZIUM<br>Via Tosio, 1, 25121 Brescia <br>Pizzeria posta in centro a Brescia");
    mangiareGroup.addLayer(Pizzium);

    var Schiaccia = L.marker([45.53721438093545, 10.222239064965278], { icon: mangiareIcon });
    Schiaccia.bindPopup("SCHIACCIA<br>Via Mazzini, 5/a, 25121 Brescia <br>Paninoteca posta in centro a Brescia");
    mangiareGroup.addLayer(Schiaccia);

    var Rivale_In_Città = L.marker([45.53667417271814, 10.218763034185423], { icon: mangiareIcon });
    Rivale_In_Città.bindPopup("RISTORANTE IL RIVALE IN CITTA'<br>Via Antonio Gramsci, 10, 25122 Brescia<br>Un ristorante incastonato in una delle sale<br>di uno dei tanti splendidi palazzi storici di Brescia.");
    mangiareGroup.addLayer(Rivale_In_Città);

    var Trattoria_Mezzeria = L.marker([45.536833348262796, 10.229970851606062], { icon: mangiareIcon });
    Trattoria_Mezzeria.bindPopup("TRATTORIA MEZZERIA<br>Via Trieste, 66, 25121 Brescia<br>Trattoria che è un punto fermo nel centro di Brescia.<br>Ingresso all’interno di un volto, locale sicuramente storico e struttura davvero bella.<br>L’atmosfera è tipica da trattoria, ma i piatti sono anche meglio.");
    mangiareGroup.addLayer(Trattoria_Mezzeria);

    var Caffe_Floriam = L.marker([45.54060796915646, 10.22065161619215], { icon: mangiareIcon });
    Caffe_Floriam.bindPopup("CAFFE FLORIAM<br>Via Gasparo da Salò, 3, 25122 Brescia BS<br>Bel locale situato vicinissimo alla Piazza Loggia a Brescia<br>l'ambiente è molto bello con due sale completamente diverse l'una dall'altra");
    mangiareGroup.addLayer(Caffe_Floriam);

    var Trattoria_Mangiafuoco = L.marker([45.540280684119246, 10.21662201126393], { icon: mangiareIcon });
    Trattoria_Mangiafuoco.bindPopup("TRATTORIA MANGIAFUOCO<br>Via Calzavellia, 3A, 25122 Brescia<br>Ricette bresciane in un ristorante curato con colonne,<br> foto in bianco e nero e arredi di diversi colori.");
    mangiareGroup.addLayer(Trattoria_Mangiafuoco);;

    var Osteria_Mercanti = L.marker([45.54112317765782, 10.216120160770146], { icon: mangiareIcon });
    Osteria_Mercanti.bindPopup("OSTERIA DEI MERCANTI<br>Via delle Battaglie, 2, 25122 Brescia<br>Ambiente carino, intimo e piacevole. Pici al salmí di cinghiale davvero strepitosi.");
    mangiareGroup.addLayer(Osteria_Mercanti);

    var North_Département = L.marker([45.531128079850774, 10.225218066203416], { icon: mangiareIcon });
    North_Département.bindPopup("NORTH DEPARTMENT<br>Via Armando Diaz, 4, 25121 Brescia<br>Pizza, poké e cocktail, in una sala lounge con soffitto in vetro, piante rampicanti e fotografie.");
    mangiareGroup.addLayer(North_Département);
}
/* DA DORMIRE */
{
    var Hotel_Vittoria = L.marker([45.53856728952952, 10.220195148703237], { icon: dormireIcon });
    Hotel_Vittoria.bindPopup("HOTEL VITTORIA<br>Via X Giornate, 20, 25121 Brescia <br>⭐⭐⭐⭐⭐<br>Questo hotel sofisticato dista a piedi 2 minuti da Piazza della Loggia,<br>7 minuti dal museo di Palazzo Martinengo Cesaresco Novarino<br>e 4 km dal Castello di Brescia.");
    dormireGroup.addLayer(Hotel_Vittoria);

    var Albergo_Orologio = L.marker([45.53993494978266, 10.221482722537191], { icon: dormireIcon });
    Albergo_Orologio.bindPopup("ALBERGO OROLOGIO<br>Via Cesare Beccaria 17 25121 Brescia<br>⭐⭐⭐<br>Situato nel centro storico, questo hotel caratteristico dista a piedi 2 minuti<br> dal cinquecentesco Palazzo della Loggia <br>e dal rinascimentale Duomo Nuovo.");
    dormireGroup.addLayer(Albergo_Orologio);

    var BB_Musei = L.marker([45.538432031486686, 10.225216282427494], { icon: dormireIcon });
    BB_Musei.bindPopup("B&B AI MUSEI<br>Via Laura Cereto, 7/A, 25121 Brescia<br>⭐⭐⭐<br>Questo B&B accogliente in centro città dista 8 minuti a piedi da piazza Vittoria,<br> 5 minuti a piedi dal Museo di Santa Giulia, dedicato alla storia regionale,<br>e 12 minuti a piedi dal medievale Castello di Brescia.");
    dormireGroup.addLayer(BB_Musei);

    var Centro_Paolo_VI = L.marker([45.53503239165032, 10.228471142820121], { icon: dormireIcon });
    Centro_Paolo_VI.bindPopup("CENTRO PAOLO VI<br>Via Gezio Calini, 30, 25121 Brescia<br>⭐⭐⭐<br>Ospitato in un elegante edificio in stile barocco,<br> questo raffinato hotel centro congressi dista 7 minuti a piedi dal Museo di Santa Giulia <br>e 2 km dal Castello di Brescia, di epoca medievale.");
    dormireGroup.addLayer(Centro_Paolo_VI);

    var BB_Capitolium = L.marker([45.539849462937184, 10.227328838672872], { icon: dormireIcon });
    BB_Capitolium.bindPopup("B&B CAPITOLIUM<br>Via dei Musei, 75, 25121 Brescia<br>⭐⭐<br>Situato in una stradina secondaria, questo B&B confortevole dista 1 minuto a piedi dal tempio romano Capitolium, 12 minuti a piedi dal castello medievale di Brescia");
    dormireGroup.addLayer(BB_Capitolium);

    var AreaDocks = L.marker([45.531154477560605, 10.224927551408495], { icon: dormireIcon });
    AreaDocks.bindPopup("AREADOCKS<br>Via Gerolamo Sangervasio, 12/A, 25121 Brescia<br>⭐⭐⭐⭐⭐<br>L'hotel ripensa le regole dell'ospitalità Premium, aprendo a infinite possibilità di shopping, divertimento e relax. Situato nel centro storico di Brescia,<br> capitale italiana della cultura del 2023, in un punto strategico per turismo ed entertainment,<br>l'hotel propone una nuova filosofia di ospitalità,<br> intesa prima di tutto come esperienza");
    dormireGroup.addLayer(AreaDocks);

    var Novotel = L.marker([45.527000367486444, 10.220048168235756], { icon: dormireIcon });
    Novotel.bindPopup("NOVOTEL<br>Via Pietro Nenni, 22, 25124 Brescia <br>⭐⭐⭐⭐<br>Questo hotel confortevole dista 1,2 km sia dalla Pinacoteca Tosio Martinengo <br>sia dalla fermata della metropolitana MBS2 <br>e 3,3 km dal castello di Brescia, con torre e ponte levatoio.");
    dormireGroup.addLayer(Novotel);
}

// Define base layers and overlays for the Layers Control
var baseLayers = {
    "OpenStreetMap": L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
};

var overlays = {
    "Luoghi dove parcheggiare": parcheggiGroup,
    "Luoghi da visitare": visitareGroup,
    "Luoghi dove mangiare": mangiareGroup,
    "Luoghi dove dormire": dormireGroup,
};

// Add Layers Control to the map
L.control.layers(baseLayers, overlays).addTo(map);