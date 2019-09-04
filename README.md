# Application Companion

Application Companion is a tool to help keep track of your job applications during your job hunt.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Have [MongoDB](https://docs.mongodb.com/manual/installation/) installed
* Have [Nodejs](https://nodejs.org/en/) installed
* Have [yarn](https://yarnpkg.com/en/) installed if you would rather use it than npm

### Installation

1) Clone the repo:
```
$ git clone https://github.com/noahjstewart/application-companion.git
```

2) Install the dependencies:

```bash
cd client
npm install      # or with yarn: yarn install
cd ../server
npm install      # or with yarn: yarn install
```

3) Create a `.env` file in the root folder with the following:
```
DATABASE_URL='mongodb://localhost:27017/applicationtracker'
PORT=5000
BASE_URL='localhost:8080'
```


4) Run the app (3 terminals):

 * Start the Vue front end:
```bash
cd client
npm run serve      # or with yarn: yarn serve
```

 * MongoDB instance:
```bash
mongod
```

 * Node back end:
```bash
cd server
npm run dev
```

 * Visit at: http://localhost:8080/


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## Built With

* [Node](https://nodejs.org/en/)
* [Express](http://expressjs.com/)
* [Vue](https://vuejs.org/)
* [Mongoose](https://mongoosejs.com/)
* [MongoDB](https://www.mongodb.com/)

## License
[MIT](https://choosealicense.com/licenses/mit/)
