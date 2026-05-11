const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const STITCH_URL = "https://stitch.googleapis.com/mcp";
const API_KEY = process.env.STITCH_API_KEY || "AQ.Ab8RN6JFQ1KkTvPC67td3J2UiqZejFZLHC8z_p35Q3JMnl3eTQ";

async function mcpCall(method, params) {
    const res = await fetch(STITCH_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY
        },
        body: JSON.stringify({"jsonrpc":"2.0", "id": 1, "method": "tools/call", "params": { "name": method, "arguments": params }})
    });
    const result = await res.json();
    if (result.error || (result.result && result.result.isError)) {
        return null;
    }
    try {
        const text = result.result.content[0].text;
        const sanitized = text.replace(/[\u0000-\u001F]+/g, " ");
        return JSON.parse(sanitized);
    } catch(e) {
        return null;
    }
}

async function main() {
    const projectId = "7095792614443073090";
    const dir = path.join(__dirname, 'website');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    if (!fs.existsSync(path.join(dir, 'src'))) fs.mkdirSync(path.join(dir, 'src'));

    const project = await mcpCall('get_project', { name: "projects/" + projectId });
    if (project && project.designMd) {
        fs.writeFileSync(path.join(dir, 'src', 'design.md'), project.designMd);
    }

    const screensData = await mcpCall('list_screens', { projectId: projectId });
    if (!screensData || !screensData.screens) return;

    for (let s of screensData.screens) {
        const screen = await mcpCall('get_screen', { name: s.name });
        
        let title = s.title.replace(/[\/\\]/g, '-');
        
        if (screen && screen.htmlCode && screen.htmlCode.downloadUrl) {
           const res = await fetch(screen.htmlCode.downloadUrl);
           const html = await res.text();
           fs.writeFileSync(path.join(dir, 'src', `${title}.html`), html);
           console.log(`Saved ${title}.html`);
        }
        if (screen && screen.tsCode && screen.tsCode.downloadUrl) {
           const res = await fetch(screen.tsCode.downloadUrl);
           const code = await res.text();
           fs.writeFileSync(path.join(dir, 'src', `${title}.tsx`), code);
           console.log(`Saved ${title}.tsx`);
        }
    }
}
main();
