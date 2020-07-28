# taller2-media-server

Master: [![Build Status](https://travis-ci.com/crpistillo/taller2-media-server.svg?token=5SNAVenGembV79qjWNx8&branch=master)](https://travis-ci.com/github/crpistillo/taller2-media-server) [![Coverage Status](https://coveralls.io/repos/github/crpistillo/taller2-media-server/badge.svg?branch=master&t=FTOw84)](https://coveralls.io/github/crpistillo/taller2-media-server?branch=master)

Develop:  [![Build Status](https://travis-ci.com/crpistillo/taller2-media-server.svg?token=5SNAVenGembV79qjWNx8&branch=develop)](https://travis-ci.com/github/crpistillo/taller2-media-server) [![Coverage Status](https://coveralls.io/repos/github/crpistillo/taller2-media-server/badge.svg?branch=develop&t=FTOw84)](https://coveralls.io/github/crpistillo/taller2-media-server?branch=develop)

### Para clonar el repositorio:
```
git clone https://github.com/crpistillo/taller2-media-server
```

### Para correr la app

Para correr la app con nodemon:

```
npm run dev
```

* Permite reiniciar el servidor cada vez que se guarda un archivo o se haga un cambio
* Ejecuta el script configurado en package.json: nodemon src/index.js



### Deploy de la app a Heroku
El Media Server esa hosteado en Heroku. Se deploya a partir del Dockerfile usando Heroku CLI.
Actualmente el deploy es manual, luego de instalar Heroku CLI, logearse en heroku:

```
heroku login -i
```
y configurar el remote "heroku" por unica vez:

```
heroku git:remote -a chotuve-mediaserver

```
Asegurarse de tener Docker instalado y finalmente correr:
```
heroku container:login
heroku container:push web 
heroku container:release webr
```
Para ver los logs:
```
heroku logs
```



