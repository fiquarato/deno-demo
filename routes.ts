import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import db from "./mongodb.ts";

const pickingCentersCollection = db.collection("pickingCenters");

const errorBuilder = (id: String) => {
  return {
    errorCode: 404,
    errorMessage: "Not Found",
    errorDescription: `Picking center ${id} not exists`,
  };
};

const getPickingCenters = async (context: RouterContext) => {
  const pickingCenters = await pickingCentersCollection.find();
  context.response.body = pickingCenters;
};

const getPickingCentersById = async (context: RouterContext) => {
  const id = await context.params.id;
  const pickingCenter = await pickingCentersCollection.findOne(
    { _id: { $oid: id } },
  );
  context.response.body = pickingCenter;
};

const updatePickingCenterById = async (context: RouterContext) => {
  const id = await context.params.id as String;
  const { value: { name, address } } = await context.request.body();
  const { modifiedCount } = await pickingCentersCollection.updateOne(
    { _id: { $oid: id } },
    { $set: { name, address } },
  );

  if (!modifiedCount) {
    context.response.status = 404;
    context.response.body = errorBuilder(id);
    return;
  }

  const pickingCenter = await pickingCentersCollection.findOne(
    { _id: { $oid: id } },
  );
  context.response.body = pickingCenter;
};

const createPickingCenter = async (context: RouterContext) => {
  // console.log(await context.request.body());
  // Log expected:
  // {
  //   type: "json",
  //   value: { name: "Nuevcentro Shopping", address: "Duarte Quiros 1502" }
  // }
  const { value } = await context.request.body();
  const idPickingCenterCreated = await pickingCentersCollection.insertOne(
    value,
  );
  context.response.status = 201;
  context.response.body = { ...value, id: idPickingCenterCreated.$oid };
};

const deletePickingCenterById = async (context: RouterContext) => {
  const id = await context.params.id as String;
  const count = await pickingCentersCollection.deleteOne({ _id: { $oid: id } });
  if (!count) {
    context.response.body = errorBuilder(id);
    return;
  }
  context.response.status = 204;
};

export {
  getPickingCenters,
  createPickingCenter,
  getPickingCentersById,
  updatePickingCenterById,
  deletePickingCenterById,
};
