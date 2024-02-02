export type TabOpenerArguments = {
  browserName: string;
  prompt: string;
  gptUrl: string;
  query: string;
};

export type ExecuteCustomCommand = {
  fallbackText?: string;
  arguments: {
    prompt: string;
    gptUrl: string;
    query: string;
  };
  launchType: string;
  launchContext?: string;
};
