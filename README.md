<<<<<<< HEAD
# My_MCP
=======
# MCP Server and Client

This project implements a Model Context Protocol (MCP) server and client using Node.js and TypeScript.

## Features
- MCP server with user creation functionality
- Data persistence to `data/users.json`
- TypeScript support
- Uses [@modelcontextprotocol/sdk](https://www.npmjs.com/package/@modelcontextprotocol/sdk) and [zod](https://www.npmjs.com/package/zod) for schema validation

## Prerequisites
- Node.js (v18 or higher recommended)
- npm

## Setup
1. Install dependencies:
   ```sh
   npm install
   ```
2. (Optional) If you encounter network issues, check your proxy or npm registry settings.

## Scripts
- `npm run server:dev` — Start the server in development mode
- `npm run server:build` — Compile TypeScript
- `npm run server:build:watch` — Compile TypeScript in watch mode
- `npm run server:inspect` — Start the server with the MCP Inspector

## Project Structure
```
MCP/
├── src/
│   └── server.ts         # Main MCP server code
│   └── data/
│       └── users.json    # User data (auto-created)
├── package.json
```

## Usage
- Run the server in development mode:
  ```sh
  npm run server:dev
  ```
- The server exposes a tool to create users, which are stored in `src/data/users.json`.

## Troubleshooting
- If you see `ECONNRESET` or network errors during `npm install`, check your internet connection or proxy settings.
- If you see `ENOENT` for `mcp-server-everything`, ensure your SDK usage and configuration are correct.

## License
MIT
>>>>>>> 0ab3628 (Initial commit)
