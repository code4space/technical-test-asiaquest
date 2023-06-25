<a id="readme-top"></a>
# &#127930; Sevima Hackathon - Stool Project &#127930;
Stool, singkatan dari Semesta School, adalah sebuah proyek aplikasi berbasis web yang dirancang untuk membantu siswa dan guru dalam memberikan dan mengevaluasi tugas secara online. Dengan Stool, siswa dapat dengan mudah menerima tugas dari guru dan guru dapat dengan cepat memeriksa hasil tugas yang dikumpulkan. Selain itu, aplikasi ini juga menyediakan fitur yang memungkinkan pengguna untuk membuat catatan, daftar tugas, dan jadwal rutin. Dengan kehadiran fitur chat AI, Stool siap digunakan untuk mendukung kegiatan sehari-hari dan meningkatkan produktivitas.

## Client Side Dibuat dengan

[![React][React.js]][React-url]
 framework JavaScript front-end sumber terbuka dan gratis untuk membangun antarmuka pengguna berdasarkan komponen UI. Itu dikelola oleh Meta dan komunitas pengembang dan perusahaan individu.

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/


&nbsp;

## Untuk mulai
Siapkan folder project, lalu buka address folder tersebut di terminal dan lakukan command dibawah ini 

  ```
  $ git clone https://github.com/code4space/Sevima-Stool.git
  $ cd Stool-client
  $ npm install
  $ npm run dev
  ```

*Disarankan menginstall [Git Bash](https://git-scm.com/downloads) terlebih dahulu*

&nbsp;

&nbsp;

## Server Side Dibuat dengan

[![Postgres][PostgreSQL]][Postgres-url][![Express][Express.js]][Express-url]
  Express, adalah kerangka kerja aplikasi web back end untuk membangun RESTful API dengan Node.js, dirilis sebagai perangkat lunak bebas dan sumber terbuka di bawah Lisensi MIT. Ini dirancang untuk membangun aplikasi web dan API. Itu telah disebut kerangka kerja server standar de facto untuk Node.js

[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[Express-url]: https://expressjs.com/
[Postgres-url]: https://www.postgresql.org/
[demo-url]: https://www.loom.com/share/d5962b1926d24607a61349afaed52d88?sid=22a49585-14fc-4f5f-8659-a939dd847ce5


&nbsp;

## Untuk mulai
Siapkan folder project, lalu buka address folder tersebut di terminal dan lakukan command dibawah ini 

  ```
  $ git clone https://github.com/code4space/Sevima-Stool.git
  $ cd Stool-server
  $ npm install
  $ node index.js / $ nodemon (harus install terlebih dahulu)
  ```

*Disarankan menginstall [Git Bash](https://git-scm.com/downloads) terlebih dahulu*


 &nbsp;

# Bagus untuk diketahui

## Cara Seeding data

  ```js
// Pastikan config server sudah di setup
  $ npx sequelize-cli db:migrate
  $ npx sequelize-cli db:seed:all

  // == Setelah berhasil table guru, murid dan grade berhasil terbuat 
  ```
 &nbsp;

## Akun guru

> email: dono@gmail.com <br/>
> password: 12345

```js
Wajib merestore database / seeding terlebih dahulu
```
 &nbsp;

## Akun murid

```js
Akun Student dapat langsung dibuat di halaman register
```

 &nbsp;
## Entity Relation

```js
Entity Relation dapat dilihat di Stool-server, dengan nama ERD.png
```

 &nbsp;

## Lainnya
link video [demo](https://www.loom.com/share/d5962b1926d24607a61349afaed52d88?sid=9ab27690-36ff-4e2f-b0c2-42d7c956a196)
```js
ppt terdapat di root directory project, sedangkan database terdapat di server side
```

 &nbsp;


<p align="right">(<a href="#readme-top">back to top</a>)</p>