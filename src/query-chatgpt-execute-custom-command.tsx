import { showHUD, Clipboard, Application, getPreferenceValues } from "@raycast/api";
import { ExecuteCustomCommand } from "./types";
import { openBrowserTab } from "./run-applescript";

export default async function main(props: ExecuteCustomCommand) {
  const browser = getPreferenceValues<{ browser: Application }>().browser;
  await openBrowserTab({ browserName: browser.name, prompt: props.arguments.prompt, gptUrl: props.arguments.gptUrl });
  await Clipboard.copy(JSON.stringify({ browser, ...props }));
  return null;
}
