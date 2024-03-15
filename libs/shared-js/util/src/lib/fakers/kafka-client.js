const FakeKafkaClient = {
  topic: 'topic',
  url: 'url',
  clientId: 'clientId',
  getInstance: () => FakeKafkaClient,
  connectProducer: async () => Promise.resolve(),
  connectConsumer: async () => Promise.resolve(),
  disconnect: async () => Promise.resolve(),
  publishMessage: async () => Promise.resolve(),
  subscribe: async () => Promise.resolve(),
};

export { FakeKafkaClient };
