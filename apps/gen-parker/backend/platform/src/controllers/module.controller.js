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

  console.log(req.body)
  const currentDate = Date.now();
  await kafkaClient.publishMessage(
    data.map((x) => ({
      key: `${mac}~${token}`,
      value: JSON.stringify({
        value: x.val,
        sensor: x.senseur,
        date: currentDate,
        mac,
        key: token
      }),
    }))
  );
};

export default {
  addSensorData
};
