
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  let messages;
  switch (locale) {
    case "zh": messages = (await import("./messages/zh.json")).default; break;
    case "es": messages = (await import("./messages/es.json")).default; break;
    case "fr": messages = (await import("./messages/fr.json")).default; break;
    default: messages = (await import("./messages/en.json")).default; break;
  }
  return { locale, messages };
});
