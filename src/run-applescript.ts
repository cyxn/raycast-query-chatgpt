import { runAppleScript } from "@raycast/utils";
import { showToast, Toast } from "@raycast/api";
import { composeApplescript } from "./compose-applescript";
import { TabOpenerArguments } from "./types";

export async function openBrowserTab({ browserName, prompt, gptUrl }: TabOpenerArguments): Promise<boolean> {
  try {
    console.log({ browserName, prompt, gptUrl });
    const appleScript = composeApplescript({
      browserName,
      prompt,
      gptUrl,
    });
    //    console.log({ appleScript });

    const jsResult = await runAppleScript(appleScript);
    //    const jsResult = await runAppleScript(
    //      `on run argv
    //  return "hello, " & item 1 of argv & "."
    //end run`,
    //      ["world"],
    //    );
    console.log({ jsResult });

    if (jsResult === "false") {
      await showToast({
        style: Toast.Style.Failure,
        title: "Unknown error occurred",
        message: `Unknown error occurred. Please submit an issue`,
      });

      return false;
    }
    await showToast({
      style: Toast.Style.Success,
      title: "Magic",
      message: `Happenning`,
    });

    return !!jsResult;
  } catch (e) {
    console.log(e);
    const message = e.message;

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
