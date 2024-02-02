import { runAppleScript } from "@raycast/utils";
import { showToast, Toast } from "@raycast/api";
import { composeApplescript } from "./compose-applescript";
import { TabOpenerArguments } from "./types";

function sanitizeInput(input: string): string {
  const disallowedChars = /[^a-zA-Z0-9,./?=\- %:#&;_]/g;

  const sanitizedInput = input.replace(disallowedChars, "");

  console.log({ input, sanitizedInput });
  return sanitizedInput;
}

export async function openBrowserTab({ browserName, prompt, gptUrl, query }: TabOpenerArguments): Promise<boolean> {
  try {
    const correctBrowserName = sanitizeInput(browserName);
    const correctPrompt = sanitizeInput(prompt + "\n\n" + query);
    const correctGptUrl = sanitizeInput(gptUrl);

    const appleScript = composeApplescript({
      browserName: correctBrowserName,
      prompt: correctPrompt,
      gptUrl: correctGptUrl,
    });

    const jsResult = await runAppleScript(appleScript);

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
