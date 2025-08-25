# o4-search-mcp

An MCP (Model Context Protocol) server that provides web search capabilities using OpenAI models. The `o4-search` tool accepts text queries and returns AI-powered search results with advanced reasoning capabilities.

> Note: This repository is a fork of [yoshiko-pg/o3-search-mcp](https://github.com/yoshiko-pg/o3-search-mcp).

## Supported Models

- `o4-mini` (default)
- `gpt-5`
- Any other OpenAI model that supports the responses API with web search tools

## Installation

### Using npx (Recommended)

Claude Code:

```
$ claude mcp add search -s user \
  -e OPENAI_API_KEY=your-api-key \
  -e OPENAI_MODEL=o4-mini \
  -e SEARCH_CONTEXT_SIZE=high \
  -e REASONING_EFFORT=high \
  -- npx @mkusaka/mcp-server-o4-search
```

json:

```json
{
  "mcpServers": {
    "o4-search": {
      "command": "npx",
      "args": ["@mkusaka/mcp-server-o4-search"],
      "env": {
        "OPENAI_API_KEY": "your-api-key",
        // Optional: o4-mini, gpt-5, etc. (default: o4-mini)
        "OPENAI_MODEL": "o4-mini",
        // Optional: low, medium, high (default: high)
        "SEARCH_CONTEXT_SIZE": "high",
        "REASONING_EFFORT": "high"
      }
    }
  }
}
```

### Local Development Setup

If you want to download and run the code locally:

   ```bash
   # setup
   git clone git@github.com:mkusaka/o4-search-mcp.git
   cd o4-search-mcp
   pnpm install
   pnpm build
   ```

Claude Code:

```
$ claude mcp add search -s user \
  -e OPENAI_API_KEY=your-api-key \
  -e OPENAI_MODEL=o4-mini \
  -e SEARCH_CONTEXT_SIZE=high \
  -e REASONING_EFFORT=high \
  -- node /path/to/o4-search-mcp/build/index.js
```

json:

```json
{
  "mcpServers": {
    "o4-search": {
      "command": "node",
      "args": ["/path/to/o4-search-mcp/build/index.js"],
      "env": {
        "OPENAI_API_KEY": "your-api-key",
        // Optional: o4-mini, gpt-5, etc. (default: o4-mini)
        "OPENAI_MODEL": "o4-mini",
        // Optional: low, medium, high (default: high)
        "SEARCH_CONTEXT_SIZE": "high",
        "REASONING_EFFORT": "high"
      }
    }
  }
}
```
