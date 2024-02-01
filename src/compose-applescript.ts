import { getTabJavascript } from "./get-tab-javascript";
import { TabOpenerArguments } from "./types";

function runJS(browser: string, code: string): string {
  if (browser === "Safari") {
    return `do javascript "${code}"`;
  } else {
    return `execute javascript "${code}"`;
  }
}

export function composeApplescript({ browserName, prompt, gptUrl }: TabOpenerArguments): string {
  return `
set possibleChars to "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
set randomString to ""
set stringLength to 16 -- You can change the length of the string

repeat with i from 1 to stringLength
    set randomChar to some item of possibleChars
    set randomString to randomString & randomChar
end repeat

-- Use the random string
tell application "Arc"
    open location "${gptUrl}?id=" & randomString
end tell

delay 2

tell application "Arc"
    repeat with w in (every window)		
        repeat with t in (every tab whose URL equal "${gptUrl}?id=" & randomString) of w
          tell t
            return ${runJS(browserName, getTabJavascript(prompt))}
          end tell
        end repeat	
    end repeat
end tell
    `;
}
