const express = require("express");
const app = express();
const kafka = require("kafka-node");
const client = new kafka.KafkaClient({ kafkaHost: "127.0.0.1:9092" });
const PORT = process.env.PORT || 4000;
var consumer = new kafka.Consumer(client, [{ topic: "test" }]);
consumer.on("message", (message) => {
  app.set("mensaje", message);
  console.log(message);
});
app.use(express.json())
// producer
var producer = new kafka.Producer(client);

app.listen(PORT, () => {
  console.log(`server runing on port:${PORT}`);
});
app.post("/producer", (req, res) => {
  try {
    const { message } = req.body;
    producer.send(
      [{ topic: "test", messages: message }],
      (err,data)=>{
        if (err) {
          res.send({error:err}).status(400)
        }
        console.log("data",data);
      }
    );
    res.send({ data: "mensaje enviado" }).status(200);
  } catch (error) {
    res.send({ error: error.message }).status(400);
  }
});
app.get("/kafka", (req, res) => {
  const mensaje = app.get("mensaje");
  res.send({ status: "ultimo", message: mensaje });
});
