import {
  FakeKafkaClient,
  KafkaClient,
} from '@gen-parker/shared-js/util';
import { Tree } from '../models/tree';

// setup kafka properly
const kafkaClient = process.env.SERVER
  ? new KafkaClient(process.env.KAFKA_SERVER, process.env.KAFKA_TOPIC_MODULE, 'genparker')
  : FakeKafkaClient;

export const moduleSignup = async (req) => {
  const mac = req.header('Mac');
  const ip = req.ip;
  const token = req.header('Token');

  const tree = new Tree(req.body.treeId, req.body.treeNumber);

  kafkaClient.publishMessage([{
    key: `${mac}~${token}`,
    value: JSON.stringify({
      mac,
      ip,
      token,
      treeId: tree.treeId,
      treeNumber: tree.treeNumber,
    }),
  }]);
};