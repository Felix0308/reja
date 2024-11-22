console.log("Web Serverni boshlash");
const express = require("express");
const res = require("express/lib/response");
const app = express();
const http = require("http");
const fs = require("fs");

let user;
fs.readFile("database/user.json", "utf8", (err, data) => {
  if (err) {
    console.log("ERROR:", err);
  } else {
    user = JSON.parse(data);
  }
});

// 1 => Kirish code. expressga kirib kelayotgan ma'lumotlarga bog'liq bo'lgan codelar yoziladi.
app.use(express.static("public")); // => har qanday browserdan kirib kelayotgan zaproslar uchun public folderlar ochiq degan ma'noni anglatadi. Faqat public folderni ko'ra oladi.
app.use(express.json()); // =>  MIDDDLEWARE DP => Rest API => kirib kelayotgan json formatdagi datani object holatiga o'girib beradi. client va webserver orasidagi data json format ko'rinishida.
app.use(express.urlencoded({ extended: true })); // => traditional API => htmldan traditional form request qilish instrumenti. ya'ni formdan biror nimani post qilsak bizni express serverimiz qabul qilib oladi. agar bu code ni yozmasak html formdan post qilingan narsalarni express qabul qilmaydi, va serverga kiritmaydi.

// 2 => Session code

// 3 => views code. express uchun bssr(backend server site randing) yo'nalishini tanladik. ya'ni backendda view(frontend) yasaladi. backendda htmlni yasab clientga yuboriladi.
app.set("views", "views"); // folderni ko'rsatilyapti.
app.set("view engine", "ejs"); // view engine ajs ekankligini ko'rsatilyapti. ejs orqali backendni ichida frontendni yasaymiz.

// 4 =>Routing code
app.post("/create-item", (req, res) => {
  // console.log(req);
  // res.json({test: "success" });
  // TODO: code with db here
});

app.get("/author", (req, res) => {
  res.render("author", { user: user });
});
app.get("/", function (req, res) {
  res.render("reja");
});

// app.get("/hello", function(req, res) {
//     // res.end(`<h1 style="background: red">HELLO WORLD by Utkirbek</h1>`);
//     res.end(`<h1>HELLO WORLD</h1>`);
// });
// app.get("/gift", function (req, res) {
//   // res.end(`<h1 style="background: red">HELLO WORLD by Utkirbek</h1>`);
//   res.end(`<h1>Siz sovgalar bolimidasiz</h1>`);
// });

const server = http.createServer(app); // http serverimizni qurib olamiz. aynan shu single thread hisoblanadi. userlarni responselari aynan shu yerga keladi.  shu yer
let PORT = 3000; //
server.listen(PORT, function () {
  console.log(
    `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`
  );
}); // serverga pass qilinadi

// 'npm start' = aslida 'npm run start'. faqat star so'zi bilan boshlash uchungina node ruxsat beradi. Lekin start scriptdan boshqa barcha starting scriptga run berish shart.
// .gitignore => bu filega gitimizga yozilishi kerak bo'lmagan narsalarni yozadi:
// - node_modules - katta bo'lganligi uchun yozilmaydi. boshqa komopyuterdan kirganda 'npm install' ni yozgandi node package.jsondagi barcha dependenslarni barchasini internetdan olib instal qilib beradi. shuning uchun proektga yozish shart emas.

// packaje.jyson => loyihani yuragi.
// pdependence va devdepense ko'rinishdagi packages
// starting enpointlar => boshlab beruvchi comandalar
// npm run dev => package.jsonadagi devga bog'langan nodemon orqali serverni ishga tushirib beryapti
// server.js => loyihani o'zagi
// express => backend serverni ishga tushirib beradigon framework
// backend server => restoran misolida, vazifasi frontendga xizmat qiladi.backend to'liq yopiq bo'lib api lar bilan tashqariga xizmat qiladi.
// api lar tashqi olamga ochiq bo'ladi:  app.use /app.set /app.post / app.get/
// paradigma => OOP & function programmer
// express 4 qismdan iborat: kirish codeb & session code & views code & routing code
// api request turlari : traditional & rest api & graphicquel
// api strukturasi bo'yicha turlari: header & body
// API methodlari :  get & post
// middleware dizayn pattern : dizayn & architicture
// fronend developer => bssr (ejs) & SPI -single page aplicataion (react) traditional yo'l bilan quriladi frontend alohida backend alohida
