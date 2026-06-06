const fs = require('fs');
let html = fs.readFileSync('website/src/index.html', 'utf-8');

// Update Tier 1 (was $199/month -> Monthly Base ₹599)
html = html.replace('Initiate</h2>', 'Monthly Phase</h2>');
html = html.replace('<span class="font-headline-lg text-headline-lg text-primary">$199</span>', '<span class="font-headline-lg text-headline-lg text-primary">₹599</span>');

// Update Tier 2 (was $499/month -> Yearly ₹6000)
html = html.replace('Elite</h2>', 'Yearly Elite</h2>');
html = html.replace('<span class="font-headline-lg text-headline-lg text-primary">$499</span>', '<span class="font-headline-lg text-headline-lg text-primary">₹6000</span>');
// Note: Elite already has `/month`, let's make it `/year`
html = html.replace('<span class="font-headline-lg text-headline-lg text-primary">₹6000</span>\n<span class="font-body-md text-body-md text-on-surface-variant ml-2">/month</span>', '<span class="font-headline-lg text-headline-lg text-primary">₹6000</span>\n<span class="font-body-md text-body-md text-on-surface-variant ml-2">/year</span>');

// Update Tier 3 (was INQUIRE -> Personal Training ₹2000/month)
html = html.replace('Dragon God</h2>', 'Personal Training</h2>');
html = html.replace('<span class="font-headline-lg text-headline-lg text-on-surface-variant">INQUIRE</span>', '<span class="font-headline-lg text-headline-lg text-primary">₹2000</span>\n<span class="font-body-md text-body-md text-on-surface-variant ml-2">/month</span>');

fs.writeFileSync('website/src/index.html', html);
console.log("Prices updated successfully.");
