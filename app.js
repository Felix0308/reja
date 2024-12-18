console.log("Web Serverni boshlash");
const express = require("express");
const res = require("express/lib/response");
const app = express(); // app => beckend serverni qurish uchun ishlatiladi.

// const fs = require("fs");

// MongoDB choqirish
const db = require("./server").db(); // MongoDB object ini qurub olamiz va bu orqali databasega turli xil ma'lumotlarni hosil qilish, o'qish, yangilash, o'chirish (CRUD)operatsiyalarni amalga oshirishimiz mumkin
const mongodb = require("mongodb");

// let user;
// fs.readFile("database/user.json", "utf8", (err, data) => {
//   if (err) {
//     console.log("ERROR:", err);
//   } else {
//     user = JSON.parse(data);
//   }
// });

// 1 => Kirish code. expressga kirib kelayotgan ma'lumotlarga bog'liq bo'lgan codelar yoziladi.
app.use(express.static("public")); // => tashqi foydalanauvchilar uchun ochiq bo'lgan (static)public folder. Har qanday browserdan kirib kelayotgan zaproslar uchun public folderlar ochiq degan ma'noni anglatadi. Faqat public folderni ko'ra oladi.
app.use(express.json()); // =>  MIDDDLEWARE DP => Rest API => kirib kelayotgan json formatdagi datani object holatiga o'girib beradi. client va webserver orasidagi data json format ko'rinishida.
app.use(express.urlencoded({ extended: true })); // => traditional API => htmldan traditional form request qilish instrumenti. ya'ni formdan biror nimani post qilsak bizni express serverimiz qabul qilib oladi. agar bu code ni yozmasak html formdan post qilingan narsalarni express qabul qilmaydi, va serverga kiritmaydi.

// 2 => Session code

// 3 => views code. express uchun bssr(backend server site randing) yo'nalishini tanladik. ya'ni backendda view(frontend) yasaladi. backendda htmlni yasab clientga yuboriladi.
app.set("views", "views"); // folderni ko'rsatilyapti.
app.set("view engine", "ejs"); // view engine ajs ekankligini ko'rsatilyapti. ejs orqali backendni ichida frontendni yasaymiz.

// 4 =>Routing code
app.post("/create-item", (req, res) => {
  console.log("user entered /create-item");
  // console.log(req.body);
  // res.end("success");
  const new_reja = req.body.reja;
  db.collection("plans").insertOne({ reja: new_reja }, (err, data) => {
    console.log(data.ops);
    res.json(data.ops[0]);

    // if (err) {
    //   console.log("something went wrong");
    // } else {
    //   res.end("successfully added");
    // }
  });

  // res.json({test: "success" });
  // TODO: code with db here
});

app.post("/delete-item", (req, res) => {
  const id = req.body.id;
  db.collection("plans").deleteOne(
    { _id: new mongodb.ObjectId(id) },
    function (err, data) {
      res.json({ state: "success" });
    }
  );
  // console.log(id);
  // res.end("done");
});
// app.get("/author", (req, res) => {
//   res.render("author", { user: user });
// });

app.post("/edit-item", (req, res) => {
  const data = req.body;
  console.log(data);
  db.collection("plans").findOneAndUpdate(
    { _id: new mongodb.ObjectId(data.id) },
    { $set: { reja: data.new_input } },
    function (err, data) {
      res.json({ state: "success" });
    }
  );
});

app.post("/delete-all", (req, res) => {
  if (req.body.delete_all) {
    db.collection("plans").deleteMany(function () {
      res.json({ state: "hamma rejalar ochirildi" });
    });
  }
});

app.get("/", function (req, res) {
  console.log("user entered /");
  console.log("STEP2: FRONTEND => BACKEND KIRIB KELDIK!");

  console.log("STEP3: BACKEND => DB BORISH"); // BACKEND => DATABASE SERVER
  db.collection("plans")
    .find()
    .toArray((err, data) => {
      if (err) {
        console.log(err);
        res.end("something went wrong");
      } else {
        console.log("STEP4: DB => BACKEND QYATIB KELDIK");
        console.log(data);

        console.log("STEP5: BACKEND => FRONTEND JAVOB YUBORYAPMIZ!");
        // res.send("DONE");

        res.render("reja", { items: data });
      }
    });
});

module.exports = app;
// app.get("/hello", function(req, res) {
//     // res.end(`<h1 style="background: red">HELLO WORLD by Utkirbek</h1>`);
//     res.end(`<h1>HELLO WORLD</h1>`);
// });
// app.get("/gift", function (req, res) {
//   // res.end(`<h1 style="background: red">HELLO WORLD by Utkirbek</h1>`);
//   res.end(`<h1>Siz sovgalar bolimidasiz</h1>`);
// });
