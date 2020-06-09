import { MongoClient } from "./dependencies.ts";

const client = new MongoClient();
client.connectWithUri(
  "uri",
);

const db = client.database("demo");

export default db;
