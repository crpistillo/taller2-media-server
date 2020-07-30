# taller2-media-server

Master: [![Build Status](https://travis-ci.com/crpistillo/taller2-media-server.svg?token=5SNAVenGembV79qjWNx8&branch=master)](https://travis-ci.com/github/crpistillo/taller2-media-server) [![Coverage Status](https://coveralls.io/repos/github/crpistillo/taller2-media-server/badge.svg?branch=master&t=FTOw84)](https://coveralls.io/github/crpistillo/taller2-media-server?branch=master)

Develop:  [![Build Status](https://travis-ci.com/crpistillo/taller2-media-server.svg?token=5SNAVenGembV79qjWNx8&branch=develop)](https://travis-ci.com/github/crpistillo/taller2-media-server) [![Coverage Status](https://coveralls.io/repos/github/crpistillo/taller2-media-server/badge.svg?branch=develop&t=FTOw84)](https://coveralls.io/github/crpistillo/taller2-media-server?branch=develop)
 
### Para clonar el repositorio:
```
git clone https://github.com/crpistillo/taller2-media-server
```

### Para correr la app
Instalar todas las dependencias presentes en *package-json* con:
```
npm install 
```
Crear un archivo *.env* con las variables de entorno y finalmente:

```
npm run dev
```
Se corre con nodemon:
* Permite reiniciar el servidor cada vez que se guarda un archivo o se haga un cambio
* Ejecuta el script configurado en package.json: nodemon src/index.js

### Testing
Los tests utilizan el framework *mocha* de JavaScript y *istanbul/nyc* para el coverage.
Para que los test puedan correrse correctamente la variable de entorno TESTING debe estar en falso. 
Los tests de corren de manera online en un firebase-storage a parte.
Para correr los tests:
```
npm run test
```
Para obtener el reporte de coverage:
```
npm run coverage
```
Dentro de la carpeta coverage/lcov-report podrá encontrar el *index.html* que ofrece una mejor presentación.

Para obtener el reporte de coverage en *coveralls*:
```
npm run coveralls
```
Todos los comandos recién mencionados son scripts definidos en *package.json*


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

El host de heroku es: https://chotuve-mediaserver.herokuapp.com/

Contiene un /swagger donde pueden verse los endpoints detallados de la API REST




