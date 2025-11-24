import { useChat } from '@ai-sdk/react';
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls,
} from 'ai';
import { useMemo } from 'react';

export interface AgentStudioConfig {
  applicationId: string; // e.g. 'ABCD12345'
  apiKey: string;        // search-only key
  agentId: string;       // published Agent Studio agent ID
}

export type Item = {
  imageUrl: string;
  name: string;
  objectID: string;
};

export type ItemGroup = {
  title: string;
  items: Item[];
};

export type ToolCallInput = {
  combinations: ItemGroup[];
};

export type ToolCallOutput = {
  status: 'Successfully composed combination stop';
  combination: {
    items: ItemGroup[];
  };
};

export type ToolCall = {
  tool: 'compose-combinations';
  toolCallId: string;
  input: ToolCallInput;
  output?: ToolCallOutput;
}


export function useAgentStudio(config: AgentStudioConfig) {
  if (!config) {
    throw new Error('config is required for useAgentStudio');
  }

  // Agent Studio completions endpoint (AI SDK v5 compatible + streaming)
  const apiUrl = useMemo(
    () =>
      `https://${config.applicationId}.algolia.net/agent-studio/1/agents/${config.agentId}/completions?stream=true&compatibilityMode=ai-sdk-5`,
    [config.applicationId, config.agentId]
  );

  const transport = useMemo(() => {
    return new DefaultChatTransport({
      api: apiUrl,
      headers: {
        'x-algolia-application-id': config.applicationId,
        'x-algolia-api-key': config.apiKey,
        'content-type': 'application/json',
      },
    });
  }, [apiUrl, config.applicationId, config.apiKey]);

  const chat = useChat({
    transport,
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    async onToolCall({ toolCall }) {
      // Handle client-side tools here if you define any on the agent.
      console.log('toolCall', toolCall);
      if (toolCall.dynamic) return;

      if (toolCall.toolName === 'compose-combinations') {
        // toolCall.input is ToolCallInput which has { items: ItemGroup[] }
        // Each ItemGroup has { title: string, items: Item[] }
        console.log('toolCall.input', toolCall);
        const input = toolCall.input as ToolCallInput;
        chat.addToolOutput({
          tool: 'compose-combinations',
          toolCallId: toolCall.toolCallId,
          output: { 
            status: 'Successfully composed combination stop', 
            combination: { items: input.combinations || [] }
          },
        });
      }
    },
  });

  const isGenerating =
    chat.status === 'submitted' || chat.status === 'streaming';

  return {
    ...chat,
    isGenerating,
  };
}
