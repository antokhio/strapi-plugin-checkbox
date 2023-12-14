"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = __importDefault(require("../package.json"));
const name = package_json_1.default.strapi.name;
const pluginId = package_json_1.default.name;
exports.default = ({ strapi }) => {
    console.log({ name, pluginId });
    strapi.customFields.register({
        name,
        plugin: name,
        type: "boolean",
    });
};
