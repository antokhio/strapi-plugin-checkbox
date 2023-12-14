import { Strapi } from "@strapi/strapi";
import pluginPkg from "../package.json";

const name = pluginPkg.strapi.name;
const pluginId = pluginPkg.name;

export default ({ strapi }: { strapi: Strapi }) => {
  console.log({ name, pluginId });
  strapi.customFields.register({
    name,
    plugin: name,
    type: "boolean",
  });
};
