# o4-search-mcp

An MCP (Model Context Protocol) server that provides web search capabilities using OpenAI's o4-mini model. The `o4-search` tool accepts text queries and returns AI-powered search results with advanced reasoning capabilities.

## Installation

### Using npx (Recommended)

Claude Code:

```
$ claude mcp add search -s user \
  -e OPENAI_API_KEY=your-api-key \
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
        // Optional: low, medium, high (default: high)
        "SEARCH_CONTEXT_SIZE": "high",
        "REASONING_EFFORT": "high"
      }
    }
  }
}
```