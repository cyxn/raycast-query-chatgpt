# Query ChatGPT Changelog

## [Initial Version] - 2024-02-10

- Create custom command: provide GPT URL and custom prompt.
- Execute custom command with provided parameters.

## [New Additions] - 2024-04-13

- Reuse the same browser tab only for conversations, i.e., if the URL in the custom command starts
  with `https://chat.openai.com/c/`

## [Fix] - 2024-05-15

- Breaking change: need to recreate quicklinks since ChatGPT has change their ChatGPT link to `https://chatgpt.com/` (previously it was `https://chat.openai.com`). Fixed extension to support breaking changes.
