import express, {} from 'express';
import { DataSource } from "typeorm"
import { Travel } from './db/Entities/Travel'
import { verifyTokenMiddleware } from './verifyToken'

// import travelRouter from './router/TravelRouter'
const app = express();
const PORT = 4001;

const cors = require("cors");
const corsOptions = {
  origin: '*'
};
app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  res.header(corsOptions);
  next();
});

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './db/travel.sqlite',
  entities: [Travel],
  synchronize: true,
})

AppDataSource.initialize()
    .catch((error) => console.log(error))

const travelRepository = AppDataSource.getRepository(Travel)


// app.use('/api/travel', travelRouter)

app.get('/api/bike-data', async (req, res) => {
  //TODO: check inputs
  try {
    const response = await fetch(
      'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-disponibilite-en-temps-reel/records?limit=-1&refine=nom_arrondissement_communes%3A%22Paris%22&refine=is_installed%3A%22OUI%22'
    );
    const data = await response.json();
    res.json(data.results);
  } catch (error) {
    console.error('Error fetching bike data', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/travel/:id', verifyTokenMiddleware, async (req : any, res) => {
  //TODO: check inputs
  try {
    const travel = await travelRepository.findOneBy({id: Number(req.params.id)})
    if(travel && (travel.idUser == req.user.id)){
      try {
        const responseStartPoint = await fetch(
          `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-disponibilite-en-temps-reel/records?limit=-1&refine=nom_arrondissement_communes%3A%22Paris%22&refine=is_installed%3A%22OUI%22&refine=stationcode%3A%22${travel.startPoint}%22`
        );

        const responseEndPoint = await fetch(
          `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-disponibilite-en-temps-reel/records?limit=-1&refine=nom_arrondissement_communes%3A%22Paris%22&refine=is_installed%3A%22OUI%22&refine=stationcode%3A%22${travel.endPoint}%22`
        );
        const dataStartPoint = await responseStartPoint.json();
        const dataEndPoint = await responseEndPoint.json();

        travel.startPoint = dataStartPoint.results[0].coordonnees_geo
        travel.endPoint = dataEndPoint.results[0].coordonnees_geo
        // delete travel.idUser;
      } catch (error) {
        console.error('Error fetching bike data', error);
        res.status(500).json({ error: 'Internal server error' });
      }
      res.status(200).json(travel);
    } else res.status(401).send();
  } catch (error) { res.status(500).json({ error: 'Internal server error' });}
})

app.get('/api/travel/all/:idUser', verifyTokenMiddleware, async (req: any, res) => {
  //TODO: check inputs
  try {
  let allTravels = await travelRepository.find({where : {idUser: Number(req.params.idUser)}})
    const promisesInfo = allTravels.map(async (travel) => {
      if(travel && (travel.idUser == req.user.id)){
        try {
          // console.log(`https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-disponibilite-en-temps-reel/records?limit=-1&refine=nom_arrondissement_communes%3A%22Paris%22&refine=is_installed%3A%22OUI%22&refine=stationcode%3A%22${travel.endPoint}%22`)
          const responseStartPoint = await fetch(
            `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-disponibilite-en-temps-reel/records?limit=-1&refine=nom_arrondissement_communes%3A%22Paris%22&refine=is_installed%3A%22OUI%22&refine=stationcode%3A%22${travel.startPoint}%22`
          );

          const responseEndPoint = await fetch(
            `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-disponibilite-en-temps-reel/records?limit=-1&refine=nom_arrondissement_communes%3A%22Paris%22&refine=is_installed%3A%22OUI%22&refine=stationcode%3A%22${travel.endPoint}%22`
          );
          const dataStartPoint = await responseStartPoint.json();
          const dataEndPoint = await responseEndPoint.json();
          travel.startPoint = dataStartPoint.results[0].coordonnees_geo
          travel.endPoint = dataEndPoint.results[0].coordonnees_geo
          // delete travel.idUser;
        } catch (error) {
          console.error('Error fetching bike data', error);
          res.status(500).json({ error: 'Internal server error' });
        }
    } else { res.status(401).send(); }
    });
    await Promise.all(promisesInfo);
    res.json(allTravels)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/travel/save', verifyTokenMiddleware, async (req, res) => {
  //TODO: check inputs
  const travel: Travel = {
    ...req.body.travel,
    idUser: req.body.idUser
  }
  try {
    await travelRepository.save(travel);
    res.status(201).send();
  } catch (error) {
    res.status(500).send();
  }
});

app.post('/api/travel/update', verifyTokenMiddleware, async (req, res) => {
  //TODO: check inputs
  const travel: Travel = {
    ...req.body.travel
  }
  try {
    await AppDataSource
    .createQueryBuilder()
    .update(Travel)
    .set(travel)
    //TODO : add verification on userId
    .where("id = :id", { id: travel.id})
    .execute()
    res.status(204).send();
  } catch (error) {
    console.log(error)
    res.status(500).send();
  }
});

app.delete('/api/travel/delete/:id', verifyTokenMiddleware, async (req : any, res) => {
  //TODO: check inputs
  try {
    const travel = await travelRepository.findOneBy({id: Number(req.params.id)})
    if(travel && (travel.idUser == req.user.id)){
    try {
      await travelRepository.delete({id: Number(req.params.id)});
      res.status(204).send();
    } catch (error) {
      res.status(500).send();
    }
    } else {
      res.status(401).send();
    }
  } catch (error) { 
    res.status(500).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});