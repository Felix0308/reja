console.log("Jack Ma maslahatlari");
const list = [
  "yaxshi talaba boling", // 0-20
  "togri boshliq tanlang va koproq hato qiling", //20-30
  "uzingizga ishlashni boshlang", //30-40
  "siz kuchli bolgan narsalarni qiling", //40-50
  "yoshlarga investitsiya qiling", //50-60
  "endi dam oling, foydasi yoq endi", //60
];

// *********************************************************************
// CALLBACK function :
function maslahatBering(a, callback) { //=> callback yasab olinyapti-  a => yosh , callbackga har xil holat qiymatlar berib ko'riladi
    if (typeof a !== "number") callback("insert a number", null);  // agar type number bo'lmasa error ber deyilyapti. callback(1-errorga tegishli- 'insert number', 2-dataga tegishli(data yuqligi uchun 'null' qo'yildi))
    else if (a <= 20) callback(null, list[0]);  // qolgan holatlarda qiymatini solishtirgan holatda callback(1-error 2-javob ya'ni errayga tegishli ma'lumotlarni beradi.)
    else if (a > 20 && a <= 30) callback(null, list[1]);  // bu yerda calback(1-data('null), datada 0chi qiymatni qaytaryapmiz('listp[0]') )
    else if (a > 30 && a <= 40) callback(null, list[2]);
    else if (a > 40 && a <= 50) callback(null, list[3]);
    else if (a > 50 && a <= 60) callback(null, list[4]);
    else {
        // callback(null, list[5]);

        // bu yerda kechikib javob berishini check qilib ko'rdik
        // setTimeout(function () {     // 2 parametr oladi: function, type
        //     callback(null, list[5]);
        // }, 5000);

        setInterval(function () {
            callback(null, list[5]);
        }, 1000);

    }
}

// maslahatBering(10, (err, data) => {  //bu callback functionni chaqirishda parametr sifatida function ishga tushadi
//     if(err) console.log('ERROR:', err);  // => agar xatolik bo'lsa uni ko'rsat
//     console.log('javob:', data);         // => xatolik bo'lmasa datani ko'rsat
// });

// maslahatBering(25, (err, data) => {
//     if(err) console.log('ERROR:', err);
//     console.log('javob:', data);
// });

// maslahatBering("salom", (err, data) => {  // bu yerda error bo'lgani uchun => ERROR:insert a number / javob:null
//   if (err) console.log("ERROR:", err);
//   console.log("javob:", data);
// });

// maslahatBering("salom", (err, data) => {  // => xatolikni ko'rsatadi yoki qaytargan qiymatni
//   if (err) console.log("ERROR:", err);
//   else {
//     console.log("javob:", data);
//   }
// });

console.log("passed here 0");

maslahatBering(65, (err, data) => {
  if (err) console.log("ERROR:", err);
  else {
    console.log("javob:", data);
  }
});
console.log("passed here 1");

// yuqoridagi setTime ishlatilgani va bu singlethread bo'lagi uchun kutmasdan birinchi tayyor javobni chiqarib keyin qolganini chiqaryapti.
// callback functionlarni => aynan band qilmaslik uchun ishlatiladi
// har doim run qilmaslik uchun package.jsonda starting script yozamiz: "train": "nodemon train.js"

// ********************************************************************************************************
// ASYNC function:

// defination:
// async function maslahatBering(a) {
//   if (typeof a !== "number")
//     throw new Error(
//       "insert a number"
//     ); // qachonki Error kerak bo'lsa uni 'throw' qilishimiz kerak.
//   else if (a <= 20) return list[0];
//   else if (a > 20 && a <= 30) return list[1];
//   else if (a > 30 && a <= 40) return list[2];
//   else if (a > 40 && a <= 50) return list[3];
//   else if (a > 50 && a <= 60) return list[4];
//   else {
//     return list[5];
//     return new Promise((resolve, reject) => {  // promise functionlar ham mavjud va unda setTimeout/ setInterval yaxshi ishlaydi, asyncs functiondan farqi ham shunda.
      
//       setTimeout(() => {
//         resolve(list[5]);
//       }, 5000);
//     });
//     // setTimeout(function () {  // asyncs functionda setTime() setInterval() kabi core modullar ishlamaydi.

//     //   return list[5];
//     // }, 5000);
//   }
// }

// ********************************************
// CALL via then/catch
// console.log("passed here 0");
// maslahatBering(25)                 // => bu yerga 'a' ni qiymati berilyapti
//   .then((data) => {                // => agar hech qanday xatolik bo'lmasa datani shu yerda qabul qilinadi, xatolik bo'lsa bu ishlamaydi, keyingiisga o'tadi
//     console.log("javob:", data);
//   })
//   .catch((err) => {                // => bu bizga xatolikni ushlab oladi va bizga beradi
//     console.log("ERROR:", err);
//   });
// console.log("passed here 1");

// ASYNC function - sync functionlar to'liq ishga tushib bo'lgach, async function natijalari bilan node.js ishlay boshlaydi.
// shuning uchun ham Async functionlar 'single thread'ni band qilmaydi. ya'ni operatsiyalarni event loop orqali thread poolga tashlayveradi.
// Bu single threadni band qilmaydigon taype xisoblanadi.

// **********************************************
// Yoki then/ catch ni o'rniga async functionni call qismida ham ishlatib ko'rishimiz mumkin.
// bu esa callback promise/promise halldan qutilishga yordam beradi. bu maydon vazifasini yasab beradi
//  async via async/await orqali qurib oldik. bu esa sourceni tiniq sodda yozilishiga olib keladi.

// async function run() {
//   let javob = await maslahatBering(25); // => await - kutadi, javob olmaguncha keyingisiga o'tmaydi.
//   console.log(javob);
//   javob = await maslahatBering(70);
//   console.log(javob);
//   javob = await maslahatBering(41);
//   console.log(javob);
// }
// run();

// odatda async function ishlatganda try catch ishlatish kerak.
// promise all degani bor arraylarni mapi bilan juda ajoyib ishlaydi.

// 