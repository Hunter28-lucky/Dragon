#!/usr/bin/env node

const readline = require('readline');

// Securely read API Key from env if present, otherwise fallback to the provided key
const API_KEY = process.env.STITCH_API_KEY || "AQ.Ab8RN6JFQ1KkTvPC67td3J2UiqZejFZLHC8z_p35Q3JMnl3eTQ";
const STITCH_URL = "https://stitch.googleapis.com/mcp";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

// Logs are sent to stderr to avoid corrupting the stdout JSON-RPC stream
function log(msg) {
    process.stderr.write(`[Stitch Proxy] ${msg}\n`);
}

rl.on('line', async (line) => {
    if (!line.trim()) return;
    try {
        log(`==> Sending Request to Stitch: ${line.substring(0, 300)}...`);
        
        // Forward the exact JSON-RPC payload as HTTP POST to Google's Stitch MCP endpoint
        const response = await fetch(STITCH_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': API_KEY
            },
            body: line
        });

        if (!response.ok) {
            const errorText = await response.text();
            log(`[HTTP ERROR] ${response.status}: ${errorText}`);
            return;
        }

        const responseData = await response.text();
        log(`<== Received Response from Stitch: ${responseData.substring(0, 300)}...`);

        // Send back to the MCP Client (VS Code) over stdio
        console.log(responseData);
    } catch (err) {
        log(`[FATAL ERROR] ${err.message}`);
        try {
            const parsed = JSON.parse(line);
            if (parsed.id) {
                console.log(JSON.stringify({
                    jsonrpc: "2.0",
                    id: parsed.id,
                    error: { code: -32603, message: err.message }
                }));
            }
        } catch(e) {
            log(`[PARSE ERROR] Failed to parse original message to send JSON-RPC error.`);
        }
    }
});

log("Proxy started. Listening on stdio...");
