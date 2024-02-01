import * as React from "react";
import { Action, ActionPanel, Form } from "@raycast/api";

const DEEP_LINK = "raycast://extensions/cyxn/query-chatgpt/query-chatgpt-execute-custom-command";

const MODE_OPTIONS = [
  { title: "Open in Background", value: "BACKGROUND" },
  { title: "Show Opened Tab", value: "FOREGROUND" },
];

const defaultMode = MODE_OPTIONS[0].value;

export default function Command() {
  const [mode, setMode]: [string, React.Dispatch<React.SetStateAction<string>>] = React.useState(defaultMode);
  const [gptUrl, setGptUrl]: [string, React.Dispatch<React.SetStateAction<string>>] = React.useState("");
  const [prompt, setPrompt]: [string, React.Dispatch<React.SetStateAction<string>>] = React.useState("");
  const [shouldOpenAfterFinished, setShouldOpenAfterFinished]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = React.useState(false);

  function CustomCreateAction(props: { link: string; prompt: string; gptUrl: string }) {
    return (
      <ActionPanel>
        <Action.CreateQuicklink
          quicklink={{
            link: `${props.link}?arguments=${encodeURIComponent(
              JSON.stringify({ prompt: props.prompt, gptUrl: props.gptUrl }),
            )}`,
          }}
        />
      </ActionPanel>
    );
  }

  return (
    <Form isLoading={false} actions={<CustomCreateAction link={DEEP_LINK} prompt={prompt} gptUrl={gptUrl} />}>
      <Form.Dropdown value={mode} id="mode" title="Tab Open Mode" onChange={setMode}>
        {MODE_OPTIONS.map(({ title, value }) => {
          return <Form.Dropdown.Item key={value} title={title} value={value} />;
        })}
      </Form.Dropdown>
      {/*<Form.Checkbox*/}
      {/*  label="Should open tab once answer is there"*/}
      {/*  value={shouldOpenAfterFinished}*/}
      {/*  onChange={setShouldOpenAfterFinished}*/}
      {/*  id="shouldOpenAfterFinished"*/}
      {/*/>*/}
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
