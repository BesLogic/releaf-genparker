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
  console.log(req.body)
  const data = Object.keys(req.body).map((x) => {
    const senseur = x.replace(/^\D+/g, '');
    const position = x.replace(senseur, '');

    return {
      val: req.body[x],
      senseur: Number(senseur),
      position: position,
      timestamp: new Date(),
      module: req.module._id,
    };
  });

  await kafkaClient.publishMessage(
    data.map((x) => ({
      key: `${x.module}`,
      value: JSON.stringify({
        val: x.val,
        senseur: x.senseur,
        position: x.position,
      }),
    }))
  );
};

export default {
  addSensorData
};
