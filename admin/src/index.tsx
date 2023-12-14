import { prefixPluginTranslations } from "@strapi/helper-plugin";

import pluginPkg from "../../package.json";
import PluginIcon from "./components/PluginIcon";

const name = pluginPkg.strapi.name;
const pluginId = pluginPkg.name;

export default {
  register(app: any) {
    console.log({ name, pluginId });
    app.customFields.register({
      name,
      pluginId: name,
      type: "boolean",
      icon: PluginIcon,
      intlLabel: {
        id: "checkbox.label",
        defaultMessage: "Checkbox",
      },
      intlDescription: {
        id: "checkbox.description",
        defaultMessage: "Replacement for boolean switch",
      },
      inputSize: {
        default: 3,
        isResizable: true,
      },
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "input-component" */ "./components/Input"
          ),
      },
      options: {
        advanced: [
          {
            sectionTitle: null,
            items: [
              {
                autoFocus: true,
                type: "select-default-boolean",
                intlLabel: {
                  id: "form.attribute.settings.default",
                  defaultMessage: "Default value",
                },
                name: "default",
                options: [
                  {
                    value: "true",
                    key: "true",
                    metadatas: {
                      intlLabel: { id: "true", defaultMessage: "true" },
                    },
                  },
                  {
                    value: "",
                    key: "null",
                    metadatas: {
                      intlLabel: { id: "null", defaultMessage: "null" },
                    },
                  },
                  {
                    value: "false",
                    key: "false",
                    metadatas: {
                      intlLabel: { id: "false", defaultMessage: "false" },
                    },
                  },
                ],
              },
            ],
          },
          {
            sectionTitle: {
              id: "global.settings",
              defaultMessage: "Settings",
            },
            items: [
              {
                name: "required",
                type: "checkbox",
                intlLabel: {
                  id: "form.attribute.item.requiredField",
                  defaultMessage: "Required field",
                },
                description: {
                  id: "form.attribute.item.requiredField.description",
                  defaultMessage:
                    "You won't be able to create an entry if this field is empty",
                },
              },
              {
                name: "private",
                type: "checkbox",
                intlLabel: {
                  id: "form.attribute.item.privateField",
                  defaultMessage: "Private field",
                },
                description: {
                  id: "form.attribute.item.privateField.description",
                  defaultMessage:
                    "This field will not show up in the API response",
                },
              },
            ],
          },
        ],
      },
    });
  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, name),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
