# Cumulus

Cumulus is an minimalistic weather app built in Vue JS, currently intended for primary use from users located in Oslo, Norway (as this is the standard location for the app). It fetches location data from a custom MongoDB database containing records on over 41 000 cities worldwide and timezone data from [TimezoneDB](https://timezonedb.com), as well as weather data from [Yr's Locationforecast 2.0](https://developer.yr.no/doc/locationforecast/HowTO/).

The BETA version is live on: https://cumulus-weather.herokuapp.com

## Project setup

```
npm install
```

To enable location searches you will need to create your own MongoDB database of cities at [cloud.mongodb.com](https://cloud.mongodb.com) and connect a search index. [This](https://www.kaggle.com/juanmah/world-cities) is the dataset that was imported into the database of this project. To enable timezone corrections you will have to sign up to [TimezoneDB](https://timezonedb.com) and generate an API key. Finally, create a local **.env** file in the root directory of the project, and add the following environment variables:

     MONGO_DB_URI = mongodb+srv://YOUR_MONGO_USERNAME:YOUR_MONGO_PASSWORD@YOUR_MONGO_COLLECTION_NAME.hp2jw.mongodb.net/YOUR_MONGO_DB_NAME?retryWrites=true&w=majority
     VUE_APP_TIMEZONEDB_API_KEY=YOUR_TIMEZONEDB_API_KEY

### Compiles and hot-reloads for development

```
cd frontend
npm run serve
```

Then, in a seperate terminal

```
cd backend
npm run dev
```

### Build for production

```
cd frontend
npm run build
```

The built project will be in the **public** directory inside the **backend** directory. Deploy the project without the **frontend** directory.
