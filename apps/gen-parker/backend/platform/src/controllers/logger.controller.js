import { BadRequest } from '@gen-parker/shared-js/util';
import {
  FakeKafkaClient,
  KafkaClient,
} from '@gen-parker/shared-js/util';

const kafkaClient = process.env.SERVER
  ? new KafkaClient(process.env.KAFKA_SERVER, process.env.KAFKA_TOPIC_LOG, 'genparker')
  : FakeKafkaClient;

export const logEvent = (req) => {
  const mac = req.header('Mac');
  const key = req.header('Token');

  const messages = req.body
    .map((x) => {
      if (x.log == null || x.mess == null) return null;

      return {
        date: new Date(),
        log: x.log,
        mess: x.mess,
      };
    })
    .filter(Boolean);

  if (!messages.length) throw new BadRequest('no logs has been sent');
  if (!mac) throw new BadRequest('Mac is required');
  if (!key) throw new BadRequest('Token is required');

  const timestamp = new Date();
  kafkaClient.publishMessage(
    messages.map((x) => ({
      key: `${mac}~${key}`,
      value: JSON.stringify({
        mac,
        key,
        log: x.log,
        mess: x.mess,
        timestamp,
      })
    }))
  );
};
