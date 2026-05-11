async function main() {
    const args = process.argv.slice(2);
    const method = args[0];
    const params = JSON.parse(args[1] || '{}');
    const API_KEY = process.env.STITCH_API_KEY || "AQ.Ab8RN6JFQ1KkTvPC67td3J2UiqZejFZLHC8z_p35Q3JMnl3eTQ";
    const STITCH_URL = "https://stitch.googleapis.com/mcp";
    const res = await fetch(STITCH_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY
        },
        body: JSON.stringify({"jsonrpc":"2.0", "id": 1, "method": "tools/call", "params": { "name": method, "arguments": params }})
    });
    const text = await res.text();
    console.log(text);
}
main();
