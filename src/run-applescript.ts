import { runAppleScript } from "run-applescript";
import { Application, getPreferenceValues, showToast, Toast } from "@raycast/api";
import { composeApplescript } from "./compose-applescript";
import { TabOpenerArguments } from "./types";

interface OsaError {
  stderr: string;
}

export async function openBrowserTab({ browserName, prompt, gptUrl }: TabOpenerArguments): Promise<boolean> {
  try {
    const jsResult = await runAppleScript(
      composeApplescript({
        browserName,
        prompt,
        gptUrl,
      }),
    );

    if (jsResult === "false") {
      await showToast({
        style: Toast.Style.Failure,
        title: "Unknown error occurred",
        message: `Unknown error occurred. Please submit an issue`,
      });

      return false;
    }

    return !!jsResult;
  } catch (e) {
    const message = (e as OsaError).stderr;

    if (message.includes("Allow JavaScript from Apple Events")) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Cannot run JavaScript in selected browser.",
        message: `Enable the 'Allow JavaScript from Apple Events' option in ${browserName}'s Develop menu.`,
      });
    }

    return false;
  }
}
