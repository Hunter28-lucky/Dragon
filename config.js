// ===================================
// GOOGLE SHEETS CONFIGURATION
// ===================================

const CONFIG = {
    // Your Google Sheet ID (extracted from the URL)
    SHEET_ID: '1WqKMKlCnva4WoXKrpf5ZS89B5Vpu9dpRCEIIBrScwOE',
    
    // Web App Deployment URL (from your Google Apps Script deployment)
    WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbwqlyanl-_xuMFlvlEcUP5mR0XBNHfEwlA2xU8g-XO9PB2Y0SJmRKGj_WUQjU4Eb7WO/exec',
    
    // Deployment ID
    DEPLOYMENT_ID: 'AKfycbwqlyanl-_xuMFlvlEcUP5mR0XBNHfEwlA2xU8g-XO9PB2Y0SJmRKGj_WUQjU4Eb7WO',
    
    // Use Web App instead of API (no API key needed!)
    USE_WEB_APP: true,
    
    // Sheet names/tabs for different content sections
    SHEETS: {
        HERO: 'Hero',
        STATS: 'Stats',
        ABOUT: 'About',
        TRAINERS: 'Trainers',
        FACILITIES: 'Facilities',
        SERVICES: 'Services',
        PRICING: 'Pricing',
        TESTIMONIALS: 'Testimonials',
        GALLERY: 'Gallery',
        CONTACT: 'Contact',
        FOOTER: 'Footer'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
