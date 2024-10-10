import { apiReference } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "./types";

import packageJSON from "~/package.json" with { type: "json" };

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/api/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "Tasks API",
    },
  });

  app.get(
    "/api/reference",
    apiReference({
      theme: "kepler",
      layout: "classic",
      defaultHttpClient: {
        targetKey: "javascript",
        clientKey: "fetch",
      },
      spec: {
        url: "/api/doc",
      },
    }),
  );
}
