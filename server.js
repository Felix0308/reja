const http = require("http");

const mongodb = require("mongodb");

let db;
const connectionString =
  "mongodb+srv://utkirbekm0327:19950327bek@cluster0.midoa.mongodb.net/Reja?retryWrites=true&w=majority&appName=Cluster0";

mongodb.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) console.log("ERROR on connection MongoDB");
    else {
      console.log("MongoDB connection succeed");
      module.exports = client; // clientni server js filemizdan export qilib oldik, clientni qayta-qayta ishlatish uchun
      //   console.log(client); // clientda nimalar borligini ko'rdik
      const app = require("./app");
      const server = http.createServer(app);
      let PORT = 3000;
      server.listen(PORT, function () {
        console.log(
          `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`
        );
      });
    }
  }
);
