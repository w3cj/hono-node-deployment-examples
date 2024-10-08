import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import nodeFetch from "node-fetch";

import env from "@/env";

import * as schema from "./schema";

const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
  fetch: async (request: Request) => {
    const decoder = new TextDecoder();
    let body = "{}";
    for await (const chunk of request.body!) {
      body = decoder.decode(chunk);
    }
    return nodeFetch(request.url, {
      method: "post",
      headers: Object.fromEntries([...request.headers.entries()]),
      body,
    });
  },
});

const db = drizzle(client, {
  schema,
});

export default db;
