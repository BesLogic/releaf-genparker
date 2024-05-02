import {
  FakeKafkaClient,
  KafkaClient,
} from '@gen-parker/shared-js/util';

// setup kafka properly
const kafkaClient = process.env.SERVER
  ? new KafkaClient(process.env.KAFKA_SERVER, process.env.KAFKA_TOPIC_DATA, 'genparker')
  : FakeKafkaClient;

kafkaClient.connectProducer(undefined);
const BATTERY_SENSOR_TYPE = 13;

const addSensorData = async (req) => {
  const mac = req.header('Mac');
  const key = req.header('Token');

  const data = Object.keys(req.body).map((x) => {
    const senseur = x.replace(/^\D+/g, '');
    const position = x.replace(senseur, '');

    return {
      val: req.body[x],
      senseur: Number(senseur),
      position: position
    };
  });

  // TODO: To be removed
  // This is a temporary fix to add battery data to the data sent by the sensors
  const dataWithBattery = data.reduce((acc, x, i) => {
    if (acc.find((sensor) => sensor.position === x.position)) {
      acc.push(x)
    } else {
      acc.push(x);
      acc.push({ 
        val: Number(((i / data.length) * 100).toFixed(2)),
        senseur: BATTERY_SENSOR_TYPE,
        position: x.position 
      });
    }
    
    return acc;
  }, []);

  console.log(req.body)
  const currentDate = Date.now();
  await kafkaClient.publishMessage(
    dataWithBattery.map((x) => ({
      key: `${mac}~${key}`,
      value: JSON.stringify({
        value: x.val,
        sensor: x.senseur,
        position: x.position,
        date: currentDate,
        mac,
        key
      }),
    }))
  );
};

export default {
  addSensorData
};
