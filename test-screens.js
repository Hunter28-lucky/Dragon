const fs = require('fs');
const content = fs.readFileSync('/Users/krishyogi/Library/Application Support/Code/User/workspaceStorage/02f1cbb7a890dae055e74fe2bd52a5ec/GitHub.copilot-chat/chat-session-resources/36c4080f-a3ce-4545-a82e-642c87bacdd1/call_MHxNT1RCTENtT0VxQXNFWk5yQnU__vscode-1778515812726/content.txt', 'utf8');
const data = JSON.parse(content);
const resultObj = JSON.parse(data.result.content[0].text);
if (resultObj.screens) {
  resultObj.screens.forEach(s => {
    console.log(`Screen: ${s.name} - ${s.title}`);
  });
}
