import {
  FakeKafkaClient,
  KafkaClient,
} from '@gen-parker/shared-js/util';

// setup kafka properly
const kafkaClient = process.env.SERVER
  ? new KafkaClient(process.env.KAFKA_SERVER, process.env.KAFKA_TOPIC_MODULE, 'genparker')
  : FakeKafkaClient;

export const moduleSignup = async (req) => {
  const mac = req.header('Mac');
  const ip = req.ip;
  const user = req.user;

  // CREATE MODULE THROUGH KAFKA
};