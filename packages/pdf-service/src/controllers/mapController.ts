// controllers/mapController.ts

import { Request, Response } from 'express';
// import { generatePdfFromHtml } from '../services/mapService';
import puppeteer from 'puppeteer';

export const generateMap = async (req: Request, res: Response) => {
  const jsonData = req.body;

  if (!jsonData || !jsonData.points || !Array.isArray(jsonData.points)) {
    return res.status(400).json({ status: 'Erreur', message: 'JSON incorrect' });
  }

  const htmlResponse = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carte Leaflet</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <style>
        #container {
            text-align: center; /* Centrez le contenu horizontalement */
        }
        #map {
            height: 500px; /* Hauteur fixe de 800 pixels */
            width: 600px; /* Largeur fixe de 800 pixels */
            margin: 0 auto; /* Centrez le contenu horizontalement */
        }
    </style>
</head>
<body>
    <div id="container">
        <h1>ITINERARY</h1> <!-- Titre "ITINERARY" -->
        <div id="map"></div>
    </div>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <script>
        // Données JSON pour initialiser la carte
        const jsonData = ${JSON.stringify(jsonData)};

        // Fonction pour initialiser la carte Leaflet avec les données JSON
        function initMap() {
          const firstPoint = jsonData.points[0];
            const map = L.map('map').setView([parseFloat(firstPoint.lat), parseFloat(firstPoint.lon)], 10); // Centrez la carte à une position de départ

            // Ajoutez une couche de tuiles OpenStreetMap à la carte
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Ajoutez des marqueurs pour les points GPS à partir des données JSON
            jsonData.points.forEach((point, index) => {
                L.marker([parseFloat(point.lat), parseFloat(point.lon)]).addTo(map)
                    .bindPopup(\`Point \${index + 1}: Lat: \${point.lat}, Lon: \${point.lon}\`);
            });

            // Ajustez le zoom de la carte Leaflet (par exemple, à un zoom de 10)
            map.setZoom(14); // Vous pouvez personnaliser le niveau de zoom ici
        }

        // Appelez la fonction d'initialisation de la carte lorsque la page est chargée
        document.addEventListener('DOMContentLoaded', initMap);
    </script>
</body>
</html>
`;

  // Utilisez Puppeteer pour générer un fichier PDF à partir de la page HTML
  try {
    const browser = await puppeteer.launch({ headless: 'new' }); // Utilisez le nouveau mode Headless
    const page = await browser.newPage();
    await page.setContent(htmlResponse, { waitUntil: 'networkidle2' });

    const pdfBuffer = await page.pdf({ format: 'A4' }); // Vous pouvez personnaliser le format ici

    await browser.close();

    // Envoyez le fichier PDF en réponse
    res.contentType('application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Erreur lors de la génération du PDF :', error);
    res.status(500).json({ status: 'Erreur', message: 'Erreur lors de la génération du PDF' });
  }
}