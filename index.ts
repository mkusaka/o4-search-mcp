#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import OpenAI from "openai";
import { z } from "zod";
import packageJson from "./package.json" with { type: "json" };

// Create server instance
const server = new McpServer(
  {
    name: "o4-search-mcp",
    version: packageJson.version,
  },
  {
    instructions: `This extension provides advanced web search capabilities powered by OpenAI models. It's designed to help find the latest information, troubleshoot errors, and answer complex questions with comprehensive web research.

Capabilities:
1. Advanced natural language web search with deep reasoning capabilities.
2. Real-time information retrieval from the web for current events and recent data.
3. Comprehensive troubleshooting support for technical issues and error messages.
4. Context-aware searching with configurable search context size and reasoning effort.

When to use the o4-search tool:
- When you need up-to-date information beyond your knowledge cutoff
- For troubleshooting specific errors or technical issues
- When comprehensive web research is needed for accurate answers
- For fact-checking or finding latest developments on a topic

Configuration options:
- OPENAI_MODEL: Specify the OpenAI model to use (default: o4-mini, supports o4-mini, gpt-5, etc.)
- SEARCH_CONTEXT_SIZE: Controls the breadth of search results (low/medium/high)
- REASONING_EFFORT: Controls the depth of analysis (low/medium/high)

The tool accepts natural language queries in English and provides detailed, well-researched responses based on current web information.`,
  },
);

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Configuration from environment variables
const searchContextSize = (process.env.SEARCH_CONTEXT_SIZE || "high") as
  | "low"
  | "medium"
  | "high";
const reasoningEffort = (process.env.REASONING_EFFORT || "high") as
  | "low"
  | "medium"
  | "high";
const modelName = process.env.OPENAI_MODEL || "o4-mini";

// Define the o3-search tool
server.tool(
  "o4-search",
  `An AI agent with advanced web search capabilities. Useful for finding latest information and troubleshooting errors. Supports natural language queries.`,
  {
    input: z
      .string()
      .describe(
        "Ask questions, search for information, or consult about complex problems in English.",
      ),
  },
  async ({ input }) => {
    try {
      const response = await openai.responses.create({
        model: modelName,
        input,
        tools: [
          {
            type: "web_search_preview",
            search_context_size: searchContextSize,
          },
        ],
        tool_choice: "auto",
        parallel_tool_calls: true,
        reasoning: { effort: reasoningEffort },
      });

      return {
        content: [
          {
            type: "text",
            text: response.output_text || "No response text available.",
          },
        ],
      };
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
          },
        ],
      };
    }
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
