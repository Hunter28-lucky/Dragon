const fs = require('fs');
let html = fs.readFileSync('website/index.html', 'utf-8');

html = html.replace(/"#"\s*>ROSTER<\/a>/g, '"#section-the">ROSTER</a>');
html = html.replace(/"#"\s*>PROGRAMS<\/a>/g, '"#section-performance">PROGRAMS</a>');
html = html.replace(/"#"\s*>THE LAB<\/a>/g, '"#section-red">THE LAB</a>');
html = html.replace(/"#"\s*>MEMBERSHIP<\/a>/g, '"#section-membership">MEMBERSHIP</a>');
html = html.replace(/<button([^>]*)>(\s*JOIN THE ELITE\s*)<\/button>/g, `<button$1 onclick="document.getElementById('section-contact').scrollIntoView({behavior:'smooth'})">$2</button>`);

fs.writeFileSync('website/index.html', html);
console.log("Navigation links fixed");
