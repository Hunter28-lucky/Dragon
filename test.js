async function main() {
    const API_KEY = "AQ.Ab8RN6JFQ1KkTvPC67td3J2UiqZejFZLHC8z_p35Q3JMnl3eTQ";
    const STITCH_URL = "https://stitch.googleapis.com/mcp";
    const res = await fetch(STITCH_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY
        },
        body: JSON.stringify({"jsonrpc":"2.0","id":1,"method":"tools/list"})
    });
    const text = await res.text();
    require('fs').writeFileSync('tools.json', text);
    const parsed = JSON.parse(text);
    console.log(parsed.result.tools.map(t => t.name).join(', '));
}
main();
