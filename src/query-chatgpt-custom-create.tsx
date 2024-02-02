import * as React from "react";
import { Action, ActionPanel, Form } from "@raycast/api";

const DEEP_LINK = "raycast://extensions/cyxn/query-chatgpt/query-chatgpt-execute-custom-command";

const MODE_OPTIONS = [
  { title: "Open in Background", value: "BACKGROUND" },
  { title: "Show Opened Tab", value: "FOREGROUND" },
];

const defaultMode = MODE_OPTIONS[0].value;

function composeFullUrl({ link, prompt, gptUrl, withCustomQuery }): string {
  // Construct the arguments object with the prompt and gptUrl values
  const args = {
    prompt: prompt,
    gptUrl: gptUrl,
    query: withCustomQuery ? `{Query}` : "",
  };

  // Convert the arguments object to a string
  let result = encodeURIComponent(JSON.stringify(args));
  if (!withCustomQuery) {
    return `${link}?arguments=${result}`;
  }

  // Manually replace the `{Query}` placeholder to ensure it is not encoded
  result = result.replace("%7BQuery%7D", "{Query}");

  // Construct and return the full URL
  return `${link}?arguments=${result}`;
}

export default function Command() {
  const [mode, setMode]: [string, React.Dispatch<React.SetStateAction<string>>] = React.useState(defaultMode);
  const [gptUrl, setGptUrl]: [string, React.Dispatch<React.SetStateAction<string>>] = React.useState("");
  const [prompt, setPrompt]: [string, React.Dispatch<React.SetStateAction<string>>] = React.useState("");
  const [withCustomQuery, setWithCustomQuery]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] =
    React.useState(true);

  function CustomCreateAction(props: { link: string; prompt: string; gptUrl: string; withCustomQuery: boolean }) {
    return (
      <ActionPanel>
        <Action.CreateQuicklink
          quicklink={{
            link: composeFullUrl(props),
          }}
        />
      </ActionPanel>
    );
  }

  return (
    <Form
      isLoading={false}
      actions={
        <CustomCreateAction link={DEEP_LINK} prompt={prompt} gptUrl={gptUrl} withCustomQuery={withCustomQuery} />
      }
    >
      <Form.Dropdown value={mode} id="mode" title="Tab Open Mode" onChange={setMode}>
        {MODE_OPTIONS.map(({ title, value }) => {
          return <Form.Dropdown.Item key={value} title={title} value={value} />;
        })}
      </Form.Dropdown>
      <Form.Checkbox
        label="Add additional query when executing custom command"
        value={withCustomQuery}
        onChange={setWithCustomQuery}
        id="shouldOpenAfterFinished"
      />
      <Form.TextArea
        id="gptUrl"
        title="GPT Url"
        placeholder="Enter GPT Url, e.g. https://chat.openai.com/?model=text-davinci-002-render-sha"
        value={gptUrl}
        onChange={setGptUrl}
      />
      <Form.TextArea id="prompt" title="Prompt" placeholder="Enter your prompt" value={prompt} onChange={setPrompt} />
    </Form>
  );
}
