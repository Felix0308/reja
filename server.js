const http = require("http");   // => core package. loyihani boshlab beradi

const mongodb = require("mongodb");

let db;
const connectionString =
  "mongodb+srv://utkirbekm0327:19950327bek@cluster0.midoa.mongodb.net/Reja?retryWrites=true&w=majority&appName=Cluster0";

mongodb.connect(          // connect () => callback method. database seulda joylashganligi sabali callback ishlatilyapti. 3 ta argumenti bor:
  connectionString,
  {
    useNewUrlParser: true,     // =>1-argument
    useUnifiedTopology: true,  // => 2-argument
  },
  (err, client) => {           // => 3-argument (callback)
    if (err) console.log("ERROR on connection MongoDB");
    else {
      console.log("MongoDB connection succeed");
      module.exports = client; // clientni server js filemizdan export qilib oldik, clientni qayta-qayta ishlatish uchun
      //   console.log(client); // clientda nimalar borligini ko'rdik
      const app = require("./app");
      const server = http.createServer(app);
      // let PORT = 3000;
      let PORT = 1906;
      server.listen(PORT, function () {
        console.log(
          `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`
        );
      });
    }
  }
);
