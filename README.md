# Itinerary

## Install dependencies
Go in itinerary with the following command
```
cd itinerary
```

Install all the dependencies
```
npm install
```
Let's do the same for each packages
```
cd packages/auth-service
npm install

cd ../pdf-service
npm install

cd ../travel-service
npm install

cd ../web-app
npm install
```
Start each service in different terminals (don't forget to cd in the itinerary repository)
```
npx nx run auth-service:dev 
npx nx run travel-service:dev
npx nx run pdf-service:dev
npx nx run web-app:dev
```
Now, start your browser and [lauch web-app](http://localhost:3000)
## Easter Egg 
- Try to use the username **Dinnerbone** (: