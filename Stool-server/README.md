<a id="readme-top"></a>
# Stool Server Side

Stool Server Side is powered by the [Express.js](https://expressjs.com/) framework.</br> Express.js, or simply Express, is a back end web application framework for building RESTful APIs with Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.

- <b>[Entity-Relationship Diagram (ERD)](./ERD.png)</b>: Explore the project's database structure by checking out the ERD (Entity-Relationship Diagram) for a comprehensive overview.
- <b>[API Documentation](./api_doc.md)</b>: Understand and integrate with our APIs seamlessly using our detailed API documentation. It's your go-to resource for making the most of Stool Server Side.

&nbsp;

## Server Side Made With

<b>Please make sure you have already installed and set up all the required components in order to run this app</b></br></br>
[![Nodejs][Nodejs]][Nodejs-url] [![Postgres][PostgreSQL]][Postgres-url]</br>

- <b>Node.js</b> is a cross-platform, open-source JavaScript runtime environment that can run on Windows, Linux, Unix, macOS, and more. Node.js runs on the V8 JavaScript engine, and executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting.</br>
- <b>PostgreSQL</b>, also known as Postgres, is a free and open-source relational database management system emphasizing extensibility and SQL compliance. It was originally named POSTGRES, referring to its origins as a successor to the Ingres database developed at the University of California, Berkeley.

[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[Nodejs]: https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Express-url]: https://expressjs.com/
[Postgres-url]: https://www.postgresql.org/
[Nodejs-url]: https://nodejs.org/en/
[demo-url]: https://www.loom.com/share/d5962b1926d24607a61349afaed52d88?sid=22a49585-14fc-4f5f-8659-a939dd847ce5

&nbsp;

## &#128640; Getting Started

Make sure you already in a project folder, then open the folder address in the terminal and do the command below

- Installation

```bash
$ cd Stool-server
$ npm install
```

- How to run

```js
$ node index.js
// or you can simply use nodemon if you already installed one
$ nodemon
```

> you can see how to install [Nodemon](https://nodemon.io/) here

_It is recommended to install [Git Bash](https://git-scm.com/downloads) first_

&nbsp;

## &#127793; Setup and Seeding

setup your config [here ►](./config/config.json)

```js
// Make sure the server config has been setup
$ npx sequelize-cli db:create
$ npx sequelize-cli db:migrate
$ npx sequelize-cli db:seed:all

// == After success, the teacher, student and grade tables have been successfully created
```

&nbsp;

## &#9997; Test

_Must seeding it first_

```bash
npm run test
```

&nbsp;

## &#128104;&#8205;&#127979; Teacher Account

> email: dono@gmail.com <br/>
> password: 12345

```
To use this account, you must seeding it first or you can register it with postman and hit endpoint /teacher/register (see the api doc for teacher register)
```

&nbsp;

## &#129489;&#8205;&#127891; Student Account

> email: user@gmail.com <br/>
> password: 12345

```
You can make the student account in register page or hit endpoint /student/register (see the api doc for student register)
```

&nbsp;

## &#129302; OPEN AI
to use ai chat, you must create file `.env` first in the Stool-server root dir<br/>
- Just copy the `.env.template` file
- then paste it and rename it to `.env`
- then fill your OPENAI_API_KEY in `.env`

[tutorial how to get your open ai key ](https://www.maisieai.com/help/how-to-get-an-openai-api-key-for-chatgpt)


&nbsp;

<p align="right">(<a href="#readme-top">back to tsop</a>)</p>
