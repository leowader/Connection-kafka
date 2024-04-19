const express = require("express");
const app = express();
const kafka = require("kafka-node");
const client = new kafka.KafkaClient({ kafkaHost: "127.0.0.1:9092" });

var consumer = new kafka.Consumer(client, [{ topic: "test" }]);
consumer.on("message", (message) => {
  app.set("mensaje", message);
  console.log(message);
});
// producer
// var producer = new kafka.Producer(client);
// producer.on("ready", () => {
//   setInterval(() => {
//     producer.send(
//       [{ topic: "test", messages: "mensaje cada 5 seg" }],
//       function (err, data) {}
//     );
//   }, 5000);
// });

app.listen(4000, () => {
  console.log("server runing on port:400");
});
app.get("/kafka", (req, res) => {
  const mensaje = app.get("mensaje");
  res.send({status:"ultimo",message:mensaje});
});
