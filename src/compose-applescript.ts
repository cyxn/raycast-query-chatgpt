import { randomUUID } from "node:crypto";

import { getTabJavascript } from "./get-tab-javascript";
import { TabOpenerArguments } from "./types";

function runJS(browser: string, code: string): string {
  if (browser === "Safari") {
    return `do javascript "${code}"`;
  } else {
    return `execute javascript "${code}"`;
  }
}

function composeUrlWithRandomId(gptUrl: string): string {
  const id = randomUUID();

  const url = new URL(gptUrl);
  url.searchParams.set("id", id);

  return url.toString();
}

export function composeApplescript({ browserName, prompt, gptUrl }: TabOpenerArguments): string {
  const completeUrl = composeUrlWithRandomId(gptUrl);
  return `
tell application "${browserName}"
    open location "${completeUrl}"
end tell

delay 2

tell application "${browserName}"
    repeat with w in (every window)		
        repeat with t in (every tab whose URL equal "${completeUrl}") of w
          tell t
            return ${runJS(browserName, getTabJavascript(prompt))}
          end tell
        end repeat	
    end repeat
end tell
    `;
}
