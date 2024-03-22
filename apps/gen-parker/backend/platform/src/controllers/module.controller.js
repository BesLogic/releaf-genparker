import {
  FakeKafkaClient,
  KafkaClient,
} from '@gen-parker/shared-js/util';

// setup kafka properly
const kafkaClient = process.env.SERVER
  ? new KafkaClient(process.env.KAFKA_SERVER, process.env.KAFKA_TOPIC_DATA, 'genparker')
  : FakeKafkaClient;

kafkaClient.connectProducer(undefined);

const addSensorData = async (req) => {
  const mac = req.header('Mac');
  const token = req.header('Authorization');

  const data = Object.keys(req.body).map((x) => {
    const senseur = x.replace(/^\D+/g, '');
    const position = x.replace(senseur, '');

    return {
      val: req.body[x],
      senseur: Number(senseur),
      position: position
    };
  });
  console.log('my kafka message')
  
  await kafkaClient.publishMessage(
    data.map((x, i) => ({
      key: `${mac}~${token}~${Date.now()}~${i}`,
      value: JSON.stringify({
        "schema": {
          "type": "struct",
          "optional": false,
          "version": 1,
          "fields": [
            {
              "type": "io.debezium.time.Date",
              "optional": false,
              "field": "date"
            },
            {
              "type": "int32",
              "optional": false,
              "field": "value"
            },
            {
              "type": "int32",
              "optional": false,
              "field": "sensor"
            },
            {
              "type": "string",
              "optional": false,
              "field": "key"
            }
          ],
        },
        "payload": {
          "date": Date.now(),
          "value": x.val,
          "sensor": x.senseur,
          "key": `${mac}~${token}`,
        }
    }),
      // value: JSON.stringify({
      //   val: x.val,
      //   senseur: x.senseur,
      //   position: x.position,
      // }),
    }))
  );
};

export default {
  addSensorData
};
