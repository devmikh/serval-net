<img src='https://raw.githubusercontent.com/devmikh/serval-net-client/3f94cd4c7f9f11d36236664bfc4b35377775e1fa/public/icons/serval-logo.svg' width='128'>

# Serval-net (Back-end)

## Table of contents

- [Description](#desc)
  - [Server](#server)
  - [Database](#database)
- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)
- [Technologies & Tools](#tools)
- [License](#license)

<a id="desc"></a>

## Description

This is a back-end of the Serval-net project, which is used together with a [front-end client](https://github.com/devmikh/serval-net-client) of the app. This back-end is responsible for handling server-side logic and interaction with a database. It consists of the following components:

<a id="server"></a>

### Server

The server of this app is built with the Express.js framework in a Node environment, enabling it to direct incoming requests from the client-side to the relevant handlers and return back the responses. To enhance its scalability, the server routes are organized according to their feature, allowing for a modular design.

<a id="database"></a>

### Database

A MySQL database is used to store and manage the data required by the application. To facilitate interaction with the database, the Sequelize ORM is employed. It abstracts the database layer from the application code, enhancing development speed and simplifying data manipulation.

<a id="installation"></a>

## Installation

1. Download or clone the repository:

   ```
   $ git clone https://github.com/devmikh/serval-net-server.git
   ```

2. Go to the project folder and install the dependencies:

   ```
   $ cd serval-net-server
   $ npm install
   ```

3. Make a copy of `.env.example` file, rename it to `.env` and provide your info into the respective fields. It is required to have a running MySQL database for this project. Here is how your .env might look like:

   ```
   DB_HOST="localhost"
   DB_USER="root"
   DB_PASSWORD="123"
   DB_NAME="db_name"
   DB_PORT=3306
   SESSION_SECRET="session_secret"
   PORT=3030
   CLIENT_URL="http://localhost:3000"
   ```

4. In `app.ts`, comment out or remove `secure` and `sameSite` cookie properties on lines `47` and `48`:

   ```
       cookie: {
               maxAge: 1000 * 60 * 60 * 24,
               // secure: true,
               // sameSite: 'none'
           }
   ```

   These properties are only required to be used in a production environment, and will prevent the intended cookies behaviour during the development.

5. Start the server
   ```
   $ npm run dev
   ```

<a id="usage"></a>

## Usage

This server should be used together with the [front-end of Serval-net application](https://github.com/devmikh/serval-net-client), which will send requests to this server.

<a id="demo"></a>

## Demo Link

Try out a deployed version of the app by following this link:

https://serval-net-client.vercel.app/

<a id="tools"></a>

## Technologies & Tools

- [Node](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [sequelize](https://sequelize.org/)

<a id="license"></a>

## License

This project is licensed under the MIT License - see the LICENSE file for details.
