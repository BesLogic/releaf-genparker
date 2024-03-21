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
            "fields": [
                {
                    "type": "struct",
                    "fields": [
                        {
                            "type": "int32",
                            "optional": false,
                            "field": "id"
                        },
                        {
                            "type": "string",
                            "optional": false,
                            "field": "first_name"
                        },
                        {
                            "type": "string",
                            "optional": false,
                            "field": "last_name"
                        },
                        {
                            "type": "string",
                            "optional": false,
                            "field": "email"
                        }
                    ],
                    "optional": true,
                    "name": "PostgreSQL_server.inventory.customers.Value", 
                    "field": "before"
                },
                {
                    "type": "struct",
                    "fields": [
                        {
                            "type": "int32",
                            "optional": false,
                            "field": "id"
                        },
                        {
                            "type": "string",
                            "optional": false,
                            "field": "first_name"
                        },
                        {
                            "type": "string",
                            "optional": false,
                            "field": "last_name"
                        },
                        {
                            "type": "string",
                            "optional": false,
                            "field": "email"
                        }
                    ],
                    "optional": true,
                    "name": "PostgreSQL_server.inventory.customers.Value",
                    "field": "after"
                },
                {
                    "type": "struct",
                    "fields": [
                        {
                            "type": "string",
                            "optional": false,
                            "field": "version"
                        },
                        {
                            "type": "string",
                            "optional": false,
                            "field": "connector"
                        },
                        {
                            "type": "string",
                            "optional": false,
                            "field": "name"
                        },
                        {
                            "type": "int64",
                            "optional": false,
                            "field": "ts_ms"
                        },
                        {
                            "type": "boolean",
                            "optional": true,
                            "default": false,
                            "field": "snapshot"
                        },
                        {
                            "type": "string",
                            "optional": false,
                            "field": "db"
                        },
                        {
                            "type": "string",
                            "optional": false,
                            "field": "schema"
                        },
                        {
                            "type": "string",
                            "optional": false,
                            "field": "table"
                        },
                        {
                            "type": "int64",
                            "optional": true,
                            "field": "txId"
                        },
                        {
                            "type": "int64",
                            "optional": true,
                            "field": "lsn"
                        },
                        {
                            "type": "int64",
                            "optional": true,
                            "field": "xmin"
                        }
                    ],
                    "optional": false,
                    "name": "io.debezium.connector.postgresql.Source", 
                    "field": "source"
                },
                {
                    "type": "string",
                    "optional": false,
                    "field": "op"
                },
                {
                    "type": "int64",
                    "optional": true,
                    "field": "ts_ms"
                }
            ],
            "optional": false,
            "name": "PostgreSQL_server.inventory.customers.Envelope" 
        },
        "payload": { 
            "before": null, 
            "after": { 
                "id": 1,
                "first_name": "Anne",
                "last_name": "Kretchmar",
                "email": "annek@noanswer.org"
            },
            "source": { 
                "version": "2.5.3.Final",
                "connector": "postgresql",
                "name": "PostgreSQL_server",
                "ts_ms": 1559033904863,
                "snapshot": true,
                "db": "postgres",
                "sequence": "[\"24023119\",\"24023128\"]",
                "schema": "public",
                "table": "customers",
                "txId": 555,
                "lsn": 24023128,
                "xmin": null
            },
            "op": "c", 
            "ts_ms": 1559033904863 
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
