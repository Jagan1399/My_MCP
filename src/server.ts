import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { promises as fs } from 'fs';
import path from 'path';

const server = new McpServer({
    name:"J's MCP Server",
    version: '1.0.0',
    capabilities: {
        resources:{},
        prompts:{},
        tools:{}
    }
})

server.tool(
    "Create User",
    "Create a new user in DB",
    {
        name: z.string(),
        email: z.string(),
        address: z.string(),
        phone: z.string()
    },
    {
        title: "Create User",
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: true
    },
    async (params) => {
        try {
            const user_id = await createUser(params);
            return {
                content: [
                    {
                        type: 'text',
                        text: `User created successfully with ID: ${user_id}`
                    }
                ]
            };
        } catch (err) {
            return {
                content: [
                    {
                        type: 'text',
                        text: 'Failed to create user'
                    }
                ]
            };
        }
    }
);

type User = { id: string; name: string; email: string; address: string; phone: string };
async function createUser(params: { name: string, email: string, address: string, phone: string }): Promise<string> {
    const usersPath = path.resolve(__dirname, './data/users.json');
    let users: User[] = [];
    try {
        const data = await fs.readFile(usersPath, 'utf-8');
        users = JSON.parse(data);
    } catch (err: any) {
        // If file doesn't exist, start with empty array
        if (err.code !== 'ENOENT') throw err;
    }
    const user_id = `user_${Date.now()}`;
    const newUser: User = { id: user_id, ...params };
    users.push(newUser);
    await fs.writeFile(usersPath, JSON.stringify(users, null, 2), 'utf-8');
    return user_id;
}

async function startServer() {
    const transport = new StdioServerTransport()
    //await transport.start(server);
    await server.connect(transport);
    console.log('MCP Server is running...')
}

startServer().catch(err => {
    console.error('Failed to start MCP Server:', err);
    process.exit(1);
});
