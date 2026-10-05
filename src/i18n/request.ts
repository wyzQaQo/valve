import { getRequestConfig } from "next-intl/server";
// @ts-nocheck
export default getRequestConfig(async ({ locale }) => {
  let messages;
  switch (locale) {
      case "ar": messages = (await import("../../messages/ar.json")).default; break;
      case "de": messages = (await import("../../messages/de.json")).default; break;
      case "en": messages = (await import("../../messages/en.json")).default; break;
      case "es": messages = (await import("../../messages/es.json")).default; break;
      case "fr": messages = (await import("../../messages/fr.json")).default; break;
      case "hi": messages = (await import("../../messages/hi.json")).default; break;
      case "pt": messages = (await import("../../messages/pt.json")).default; break;
      case "zh": messages = (await import("../../messages/zh.json")).default; break;

    default: messages = (await import("../../messages/en.json")).default; break;
  }
  return { locale, messages };
});
