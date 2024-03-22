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
    data.map((x) => ({
      key: `${mac}~${token}`,
      value: JSON.stringify({
        "schema": {
          "type": "struct",
          "optional": false,
          "version": 1,
          "fields": [
            {
              "type": "string",
              "optional": false,
              "field": "date"
            },
            {
              "type": "int32",
              "optional": false,
              "field": "val"
            },
            {
              "type": "int32",
              "optional": false,
              "field": "senseur"
            },
            {
              "type": "string",
              "optional": false,
              "field": "position"
            },
            {
              "type": "string",
              "optional": false,
              "field": "key"
            }
          ],
        },
        "payload": {
          "date": new Date().toISOString(),
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
