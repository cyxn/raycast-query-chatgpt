export type TabOpenerArguments = {
  browserName: string;
  prompt: string;
  gptUrl: string;
};

export type ExecuteCustomCommand = {
  fallbackText?: string;
  arguments: {
    prompt: string;
    gptUrl: string;
  };
  launchType: string;
  launchContext?: string;
};
