const fs = require('fs');
let html = fs.readFileSync('website/src/index.html', 'utf-8');

// 1. Add 'Anton' or 'Oswald' or 'Bebas Neue' to Google Fonts
html = html.replace(
  /family=Sora:wght@400;600;700;800/, 
  'family=Sora:wght@400;600;700;800&family=Bebas+Neue&family=Anton'
);

// 2. Add tailwind config for the new font
html = html.replace(
  /"display-xl": \[\s*"Sora"\s*\]/,
  `"display-xl": ["Anton", "sans-serif"]`
);
html = html.replace(
  /"headline-lg-mobile": \[\s*"Sora"\s*\]/,
  `"headline-lg-mobile": ["Anton", "sans-serif"]`
);

// 3. Update Hero Section Text & Styles
// Overline
html = html.replace(
  /<span class="inline-block mb-6 px-4 py-1 bg-secondary-container\/50 text-secondary border border-secondary\/30 rounded-full font-label-sm text-label-sm tracking-widest backdrop-blur-md">\s*WELCOME TO THE 1%\s*<\/span>/,
  `<div class="flex items-center justify-center gap-4 mb-6"><div class="w-12 h-[1px] bg-primary"></div><span class="text-primary font-label-sm text-[14px] tracking-[0.2em] uppercase">Dhanbad · Jharkhand</span><div class="w-12 h-[1px] bg-primary"></div></div>`
);

// Headline
html = html.replace(
  /<h1 class="font-display-xl text-5xl md:text-\[84px\] leading-tight md:leading-\[90px\] text-on-surface mb-8 tracking-tighter text-glow drop-shadow-2xl">\s*UNLEASH THE <span class="text-primary italic">BEAST<\/span>\s*<\/h1>/,
  `<h1 class="font-display-xl text-6xl md:text-[110px] leading-[1.1] md:leading-[1.1] text-on-surface mb-6 tracking-normal drop-shadow-2xl uppercase" style="font-family: 'Anton', sans-serif;">
    FORGE YOUR<br/><span class="text-[#ff3b00]">STRENGTH.</span>
  </h1>`
);

// Subtext
html = html.replace(
  /<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">\s*Red Dragon is not a gym\. It is a proving ground\. Engineered for elite athletes who demand intensity wrapped in premium, data-driven performance\.\s*<\/p>/,
  `<p class="font-body-lg text-[18px] md:text-[20px] text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
    Red Dragon Multi Gym is where Dhanbad lifts heavier. Professional trainers, a calm community, and equipment that actually works. Personal training & nutrition, built for results.
  </p>`
);

// Buttons
const oldButtons = `<div class="flex flex-col sm:flex-row items-center justify-center gap-6">
<button class="w-full sm:w-auto px-10 py-4 bg-surface border-2 border-primary text-primary font-headline-md text-headline-md text-[20px] rounded hover:bg-primary hover:text-on-primary hover:shadow-[0_0_30px_rgba(255,180,168,0.3)] transition-all duration-300 group" onclick="document.getElementById('section-contact').scrollIntoView({behavior:'smooth'})">
                    JOIN NOW
                </button>
<button class="w-full sm:w-auto px-10 py-4 glass-card text-on-surface font-headline-md text-headline-md text-[20px] rounded hover:bg-surface-container-high transition-all duration-300">
                    BOOK FREE TRIAL
                </button>
</div>`;

const newButtons = `<div class="flex flex-col sm:flex-row items-center justify-center gap-6">
<button class="w-full sm:w-auto px-8 py-4 bg-[#ff3b00] text-white font-headline-md text-[16px] uppercase tracking-wider rounded-sm hover:bg-[#d63200] transition-colors duration-300 shadow-lg" onclick="document.getElementById('section-branch2').scrollIntoView({behavior:'smooth'})">
    BRANCH 2
</button>
<button class="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/50 text-white font-headline-md text-[16px] uppercase tracking-wider rounded-sm hover:bg-white/10 transition-colors duration-300" onclick="document.getElementById('section-membership').scrollIntoView({behavior:'smooth'})">
    VIEW PLANS
</button>
</div>`;

html = html.replace(oldButtons, newButtons);

// Make sure that the regex for buttons works properly even with format inconsistencies, if not let's do a more robust replace
if (!html.includes('BRANCH 2') || !html.includes('VIEW PLANS')) {
    html = html.replace(/<div class="flex flex-col sm:flex-row items-center justify-center gap-6">[\s\S]*?<\/div>/, newButtons);
}

fs.writeFileSync('website/src/index.html', html);
console.log('Typography and hero style updated.');
