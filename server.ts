import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import {
  getPickingCenters,
  createPickingCenter,
  getPickingCentersById,
  updatePickingCenterById,
  deletePickingCenterById,
} from "./routes.ts";

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  .get("/picking-centers", getPickingCenters)
  .get("/picking-centers/:id", getPickingCentersById)
  .post("/picking-centers", createPickingCenter)
  .put("/picking-centers/:id", updatePickingCenterById)
  .delete("/picking-centers/:id", deletePickingCenterById);

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());
app.listen({ port: 4444 });

console.log("Picking Center MS running");
