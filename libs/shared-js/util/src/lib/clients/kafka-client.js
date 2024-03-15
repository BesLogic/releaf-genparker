import { Kafka } from 'kafkajs';

export class KafkaClient {
  topic;
  url;
  clientId;

  /**
   * @param {string} url
   * @param {string} topic
   * @param {string} clientId
   */
  constructor(url, topic, clientId) {
    this.topic = topic;
    this.url = url;
    this.clientId = clientId;

    this.kafka = new Kafka({
      clientId,
      brokers: [url],
    });
  }

  /**
   * @param {string} url
   * @param {string} topic
   * @param {string} clientId
   */
  static getInstance = (url, topic, clientId) => {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new KafkaClient(url, topic, clientId);
    return this._instance;
  };

  /**
   * @param {import('kafkajs').ProducerConfig} producerConfig
   */
  async connectProducer(producerConfig) {
    this.producer = this.kafka.producer(producerConfig);
    await this.producer.connect();
  }

  /**
   * @param {import('kafkajs').ConsumerConfig | undefined} consumerConfig
   */
  async connectConsumer(consumerConfig) {
    this.consumer = this.kafka.consumer(consumerConfig);
    await this.producer.connect();
  }

  async disconnect() {
    if (this.consumer) {
      await this.consumer.disconnect();
      delete this.consumer;
    }

    if (this.producer) {
      await this.producer.disconnect();
      delete this.producer;
    }
  }

  /**
   * @param {import('kafkajs').Message[]} messages
   */
  async publishMessage(messages) {
    if (!this.producer) await this.connectProducer(undefined);
    this.producer.send({
      topic: this.topic,
      messages,
    });
  }

  /**
   * @param {boolean} fromBeginning
   * @param {import('kafkajs').EachMessageHandler} callback
   */
  async subscribe(fromBeginning, callback) {
    if (!this.consumer) await this.connectConsumer(undefined);
    await this.consumer.subscribe({ topic: this.topic, fromBeginning });

    await this.consumer.run({
      eachMessage: callback,
    });
  }
}
