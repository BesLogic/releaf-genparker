import {
  BadRequest,
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
  const key = req.header('Token');

  const tree = new Tree(req.body.treeId, req.body.treeNumber);
  if (!mac) throw new BadRequest('Mac is required');
  if (!key) throw new BadRequest('Token is required');

  kafkaClient.publishMessage([{
    key: `${mac}~${key}`,
    value: JSON.stringify({
      mac,
      ip,
      key,
      treeId: tree.treeId,
      treeNumber: tree.treeNumber,
    }),
  }]);
};