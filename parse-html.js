const fs = require('fs');
const path = require('path');

const files = [
  "Red Dragon | Unleash the Beast.html",
  "The Dragon's Den | Trainers & Facilities.html",
  "Performance | Transformation & Tools.html",
  "Membership | Join the Elite.html",
  "Contact | Find Your Sanctuary.html"
];

function extractBodyContent(html) {
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (!bodyMatch) return "";
    let content = bodyMatch[1];
    
    // Attempt to remove common headers (nav) and footers so we only keep them once if desired,
    // or we just inject id attributes onto the main sections.
    // Let's just wrap each in a <section> for now.
    return content;
}

const headHtmlMatch = fs.readFileSync(path.join('website/src', files[0]), 'utf-8').match(/(<!DOCTYPE html>[\s\S]*?<body[^>]*>)/i);

let finalHtml = headHtmlMatch ? headHtmlMatch[1] : "<!DOCTYPE html>\n<html>\n<body>\n";

finalHtml += "<style> html { scroll-behavior: smooth; } * { outline: none; } </style>\n";

let navInjected = false;
let footerInjected = false;

for (let i=0; i<files.length; i++) {
   const file = files[i];
   const p = path.join('website/src', file);
   if (fs.existsSync(p)) {
      let content = fs.readFileSync(p, 'utf-8');
      
      let bodyData = extractBodyContent(content);
      
      // If we are appending multiple pages, we might get duplicate Navbar and Footer.
      // Let's do a simple regex hack:
      // Remove header/nav if not first
      if (i > 0) {
          bodyData = bodyData.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
          bodyData = bodyData.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '');
      }

      // Remove footer if not last
      if (i < files.length - 1) {
          bodyData = bodyData.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
      }

      // Assign an ID to the first main tag or section for smooth scrolling
      const sectionId = file.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
      
      finalHtml += `<div id="section-${sectionId}">\n${bodyData}\n</div>\n`;
   }
}

finalHtml += "\n</body>\n</html>";

fs.writeFileSync('website/index.html', finalHtml);
console.log("Combined to website/index.html");

