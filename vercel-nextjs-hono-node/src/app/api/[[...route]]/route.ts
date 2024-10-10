//https://github.com/honojs/node-server/issues/174
//import { handle } from "@hono/node-server/vercel";
import { handle } from "hono/vercel";
import configureOpenAPI from "@/server/api/configure-open-api";
import createApp from "@/server/api/create-app";
import index from "@/server/api/routes/index.route";
import tasks from "@/server/api/routes/tasks/tasks.index";
export const runtime = "nodejs";

const app = createApp();

configureOpenAPI(app);

const routes = [
  index,
  tasks,
] as const;

routes.forEach((route) => {
  app.route("/api", route);
});
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes[number];

