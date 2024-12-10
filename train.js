// // even loop single threaddagi requestlarni trheadlarga bo'lib beradi. kamida 4 ta trhead ishlab turadi

// console.log("Jack Ma maslahatlari");
// const list = [
//   "yaxshi talaba boling", // 0-20
//   "togri boshliq tanlang va koproq hato qiling", //20-30
//   "uzingizga ishlashni boshlang", //30-40
//   "siz kuchli bolgan narsalarni qiling", //40-50
//   "yoshlarga investitsiya qiling", //50-60
//   "endi dam oling, foydasi yoq endi", //60
// ];

// // *********************************************************************
// // CALLBACK function :
// function maslahatBering(a, callback) { //=> callback function yasab olinyapti-  a => yosh , callbackga har xil holat qiymatlar berib ko'riladi
//     if (typeof a !== "number") callback("insert a number", null);  // agar type number bo'lmasa error ber deyilyapti. callback(1-errorga tegishli- 'insert number', 2-dataga tegishli(data yuqligi uchun 'null' qo'yildi))
//     else if (a <= 20) callback(null, list[0]);  // qolgan holatlarda qiymatini solishtirgan holatda callback(1-error 2-javob ya'ni errayga tegishli ma'lumotlarni beradi.)
//     else if (a > 20 && a <= 30) callback(null, list[1]);  // bu yerda calback(1-data('null), datada 0chi qiymatni qaytaryapmiz('list[0]') )
//     else if (a > 30 && a <= 40) callback(null, list[2]);
//     else if (a > 40 && a <= 50) callback(null, list[3]);
//     else if (a > 50 && a <= 60) callback(null, list[4]);
//     else {
//         callback(null, list[5]);

//         // bu yerda kechikib javob berishini check qilib ko'rdik
//         // setTimeout(function () {     // 2 parametr oladi: function, type
//         //     callback(null, list[5]);
//         // }, 5000);

//         // setInterval(function () {
//         //     callback(null, list[5]);
//         // }, 1000);

//     }
// }

// // CALL:
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

// console.log("passed here 0");

// maslahatBering(65, (err, data) => {
//   if (err) console.log("ERROR:", err);
//   else {
//     console.log("javob:", data);
//   }
// });
// console.log("passed here 1");

// yuqoridagi setTime ishlatilgani va bu singlethread bo'lagi uchun kutmasdan birinchi tayyor javobni chiqarib keyin qolganini chiqaryapti.
// callback functionlarni => aynan band qilmaslik uchun ishlatiladi
// har doim run qilmaslik uchun package.jsonda starting script yozamiz: "train": "nodemon train.js"

// *********************************************************************
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

// *****************************************
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
// Bu single threadni band qilmaydigon type xisoblanadi.

// **************************************************************************************************
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

// Pattern nima va u nech xil turga bo'linadi?
// Pattern (dasturlashda shablon) - bu muayyan muammo yoki vazifani hal qilish uchun takrorlanadigan va keng qo'llaniladigan yechimlar to'plamidir. Patternlar asosan quyidagi turkumlarga bo'linadi:

// Creational patterns: Ob'ektlarni yaratish usullarini o'zgartirish (masalan, Singleton, Factory).
// Structural patterns: Tizimlar orasidagi bog'lanishni boshqarish (masalan, Adapter, Composite).
// Behavioral patterns: Ob'ektlar va klasslar o'rtasidagi o'zaro aloqalarni boshqarish (masalan, Observer, Strategy).

//****************************************************************************************** */

// homework:

// A-TASK
// Bizga ikkita  parametrli countLetter funksiyasini yaratish kerak.
// Birinchi parametr bitta harf (harf) bo'ladi, ikkinchi parametr esa string (jumla).
// Funksiya birinchi parametrdagi harfning ikkinchi parametrdagi jumla ichida necha marta uchrashishini qaytaradi.

// // countLetter funksiyasi:
// Birinchi parametrdagi harfning ikkinchi parametrdagi string ichidagi ishtirokini hisoblaydi.
// function countLetter(harf, jumla) {
//   if (
//     typeof harf !== "string" || // harfni type string bo'lmasa - Error
//     typeof jumla !== "string" || // jumlani type string bo'lmasa - Error
//     harf.length !== 1
//   ) {
//     // harfni uzunligi 1tadan ko'p yoki kam bo'lsa -Error
//     throw new Error("1-parametr harf va 2-parametr string bo'lishi kerak."); // agar shartlar bajarilmasa shu habar chiqadi
//   }
//   return jumla.split(harf).length - 1; // Harfni string ichida sanash
// }

// // Funksiyani test qilish
// console.log(countLetter("e", "engineer")); // 3 qaytaradi
// // console.log(countLetter("eb", "engineer")); // Error
// // console.log(countLetter("a", "engineer")); // 0 qaytaradi

// module.exports = countLetter; // bu orqali bu funksiyani export qilinadi ya'ni boshqa fayllarda ishlatish mumkin.
// // boshqa afaylda require yordamida import qilib foydalaniladi: const countLetter = require('./countLetter').

// // DEFINE
// function qoldiqBolish(a, b, callback) {
//   if (b === 0) {
//     callback("Mahraj nolga teng bolmasin!", null);
//   } else {
//     const c = a % b;
//     callback(null, c);
//   }
// }

// // CALL
// qoldiqBolish(10, 3, (err, data) => {
//   if (err) {
//     console.log("ERROR:", err);
//   } else {
//     console.log("data:", data);
//     console.log("ANY LOGIC");
//   }
// });

// ********************************************************************************************************

// // B - TASK
//Shunday function tuzing, u 1ta string parametrga ega bolsin, hamda osha stringda qatnashgan raqamlarni sonini bizga return qilsin.
// MASALAN countDigits("ad2a54y79wet0sfgb9") 7ni return qiladi.

//  function countDigits(str) {
//     let count = 0;
//     for (let char of str) {
//         if (char >= '0' && char <= '9') count++;
//     }
//     return count;
// }

// // Funksiyani chaqirish
// const result = countDigits("ad2a54y79wet0sfgb9");
// console.log(result); // Natija: 7

// ********************************************************************************************************
// C-TASK
// Shunday function tuzing, u 2ta string parametr ega bolsin, hamda agar har ikkala string bir hil harflardan iborat bolsa true aks holda false qaytarsin
// MASALAN checkContent("mitgroup", "gmtiprou") return qiladi true;

// function checkContent(str1, str2) {
//   return str1.split("").sort().join("") === str2.split("").sort().join("");
// }

// // call
// console.log(checkContent("mitgroup", "gmtiprou"));  // true
// console.log(checkContent("hello", "world"));        // false

// ***********************************************************************************************************
// D-TASK:

// Shunday class tuzing tuzing nomi Shop, va uni constructoriga 3 hil mahsulot pass bolsin, hamda classning 3ta methodi bolsin,
// biri qoldiq, biri sotish va biri qabul. Har bir method ishga tushgan vaqt ham log qilinsin.
// MASALAN: const shop = new Shop(4, 5, 2); shop.qoldiq() return hozir 20:40da 4ta non, 5ta lagmon va 2ta cola mavjud!
// shop.sotish('non', 3) & shop.qabul('cola', 4) & shop.qoldiq() return hozir 20:50da 1ta non, 5ta lagmon va 6ta cola mavjud!

// class Shop {
//   constructor(non, lagmon, cola) {
//     this.products = { non, lagmon, cola };
//   }

//   log(message) {
//     const now = new Date();
//     console.log(`[${now.getHours()}:${now.getMinutes()}] ${message}`);
//   }

//   qoldiq() {
//     const { non, lagmon, cola } = this.products;
//     this.log(`${non}ta non, ${lagmon}ta lagmon, ${cola}ta cola mavjud!`);
//   }

//   sotish(tur, miqdor) {
//     if (this.products[tur] >= miqdor) {
//       this.products[tur] -= miqdor;
//       this.log(`${miqdor}ta ${tur} sotildi!`);
//     } else {
//       this.log(`Yetarli ${tur} yo'q!`);
//     }
//   }

//   qabul(tur, miqdor) {
//     this.products[tur] += miqdor;
//     this.log(`${miqdor}ta ${tur} qabul qilindi!`);
//   }
// }

// // Foydalanish
// const shop = new Shop(4, 5, 2);

// shop.qoldiq();         // Masalan: [20:40] 4ta non, 5ta lagmon, 2ta cola mavjud!
// shop.sotish('non', 3); // Masalan: [20:41] 3ta non sotildi!
// shop.qabul('cola', 4); // Masalan: [20:42] 4ta cola qabul qilindi!
// shop.qoldiq();         // Masalan: [20:43] 1ta non, 5ta lagmon, 6ta cola mavjud!

// *****************************************************************************************
// E-TASK:

// Shunday function tuzing, u bitta string argumentni qabul qilib osha stringni teskari qilib return qilsin.
// MASALAN: getReverse("hello") return qilsin "olleh"

// function getReverse(str) {
//   return str.split("").reverse().join("");
// }

// console.log(getReverse("hello"));

// **********************************************************************************************

// F-TASK: 

// Shunday findDoublers function tuzing, unga faqat bitta string argument pass bolib, 
// agar stringda bir hil harf qatnashgan bolsa true, qatnashmasa false qaytarishi kerak.
// MASALAN: getReverse("hello") return true 

// function findDoublers(str) {
//     for (let letter of str) { 
//         if (str.indexOf(letter) !== str.lastIndexOf(letter)) {
//             return true; 
//         }
//     }
//     return false; 
// }

// // call
// console.log(findDoublers("hello"));   //=> true


// ***************************************************************
// G-TASK: 

// Shunday function tuzingki unga integerlardan iborat array pass bolsin va 
// function bizga osha arrayning eng katta qiymatiga tegishli birinchi indexni qaytarsin.
// MASALAN: getHighestIndex([5, 21, 12, 21, 8]) return qiladi 1 sonini.

// function getHighestIndex(arr) {
//     if (arr.length === 0) return -1; 

//     const maxValue = Math.max(...arr);
//     return arr.indexOf(maxValue);
// }

// // call
// console.log(getHighestIndex([5, 21, 12, 21, 8])); 
// console.log(getHighestIndex([3, 8, 8, 2]));       
// console.log(getHighestIndex([]));                 

// **********************************************************************
// TASK H:

// Raqamlardan iborat arrayni argument sifatida qabul qiladigan
// function tuzing. Ushbu function faqatgina positive sonlarni olib
// string holatida return qilsin.
// MASALAN: getPositive([1, -4, 2]) return qiladi "12".

function getPositive(arr) {
    return arr.filter(num => num > 0).join("");
}

console.log(getPositive([1, -4, 2]));         // "12" bu yerda 1 va 2 musbat son bo'lgani uchun ularni birlashtirib berdi
// console.log(getPositive([-1, -2, -3]));    // "" bu yerda musbat son yo'q, hammasi manfiy
// console.log(getPositive([5, 0, 10]));      // "510" barchasi musbat son
// console.log(getPositive([]));              // "" bu bo'sh array bo'lgani uchun