// ===================================
// GOOGLE SHEETS DATA LOADER (OPTIMIZED)
// ===================================

class GoogleSheetsLoader {
    constructor(config) {
        this.config = config;
        this.useWebApp = config.USE_WEB_APP || false;
        this.webAppUrl = config.WEB_APP_URL;
        this.sheetId = config.SHEET_ID;
        this.cache = this.loadFromLocalStorage() || {};
        this.cacheExpiry = 5 * 60 * 1000; // 5 minutes cache
    }

    /**
     * Load cached data from localStorage
     */
    loadFromLocalStorage() {
        try {
            const cached = localStorage.getItem('gym_sheets_cache');
            if (cached) {
                const data = JSON.parse(cached);
                if (Date.now() - data.timestamp < this.cacheExpiry) {
                    console.log('📦 Using cached data (faster loading)');
                    return data.content;
                }
            }
        } catch (error) {
            console.warn('Could not load cache:', error);
        }
        return null;
    }

    /**
     * Save data to localStorage
     */
    saveToLocalStorage(content) {
        try {
            localStorage.setItem('gym_sheets_cache', JSON.stringify({
                content: content,
                timestamp: Date.now()
            }));
        } catch (error) {
            console.warn('Could not save cache:', error);
        }
    }

    /**
     * Fetch data from a specific sheet/tab using Web App (with timeout)
     * @param {string} sheetName - Name of the sheet tab
     * @returns {Promise<Array<Object>>} - Array of objects
     */
    async fetchSheetWebApp(sheetName) {
        try {
            const url = `${this.webAppUrl}?sheet=${encodeURIComponent(sheetName)}&t=${Date.now()}`;
            
            // Add timeout to prevent hanging
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
            
            const response = await fetch(url, {
                signal: controller.signal,
                cache: 'no-store'
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (result.error) {
                throw new Error(result.error);
            }
            
            return result.data || [];
        } catch (error) {
            if (error.name === 'AbortError') {
                console.error(`⏱️ Timeout fetching ${sheetName} - using cached data if available`);
            } else {
                console.error(`❌ Error fetching sheet ${sheetName}:`, error);
            }
            return [];
        }
    }

    /**
     * Fetch and parse sheet data
     * @param {string} sheetName - Name of the sheet tab
     * @returns {Promise<Array<Object>>} - Parsed data
     */
    async getData(sheetName) {
        if (this.useWebApp) {
            return await this.fetchSheetWebApp(sheetName);
        } else {
            console.warn('Web App not configured. Please check config.js');
            return [];
        }
    }

    /**
     * Load all website content from sheets (PARALLEL LOADING - FASTER!)
     */
    async loadAllContent() {
        try {
            // Load all sheets in parallel for MUCH faster loading
            const [hero, stats, about, trainers, facilities, services, pricing, testimonials, gallery, contact, footer] = await Promise.all([
                this.getData('Hero'),
                this.getData('Stats'),
                this.getData('About'),
                this.getData('Trainers'),
                this.getData('Facilities'),
                this.getData('Services'),
                this.getData('Pricing'),
                this.getData('Testimonials'),
                this.getData('Gallery'),
                this.getData('Contact'),
                this.getData('Footer')
            ]);
            
            const content = {
                hero,
                stats,
                about,
                trainers,
                facilities,
                services,
                pricing,
                testimonials,
                gallery,
                contact,
                footer
            };
            
            // Save to cache for faster next load
            this.saveToLocalStorage(content);
            this.cache = content;
            
            return content;
        } catch (error) {
            console.error('❌ Error loading content:', error);
            return null;
        }
    }
}

// ===================================
// CONTENT RENDERER
// ===================================

class ContentRenderer {
    /**
     * Render Hero Section
     */
    static renderHero(data) {
        if (!data || data.length === 0) return;
        
        const heroData = data[0];
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroBg = document.querySelector('.hero-bg');
        
        if (heroTitle && heroData.title) {
            // Split title to apply highlight to specific word
            const titleParts = heroData.title.split('|');
            if (titleParts.length === 2) {
                heroTitle.innerHTML = `${titleParts[0]}<span class="highlight">${titleParts[1]}</span>`;
            } else {
                heroTitle.textContent = heroData.title;
            }
        }
        
        if (heroSubtitle && heroData.subtitle) {
            heroSubtitle.textContent = heroData.subtitle;
        }
        
        if (heroBg && heroData.backgroundImage) {
            heroBg.src = heroData.backgroundImage;
        }
    }

    /**
     * Render Stats Section
     */
    static renderStats(data) {
        if (!data || data.length === 0) return;
        
        const statsGrid = document.querySelector('.stats-grid');
        if (!statsGrid) return;
        
        statsGrid.innerHTML = data.map(stat => `
            <div class="stat-item">
                <div class="stat-number" data-target="${stat.number}" data-suffix="${stat.suffix || ''}">0</div>
                <div class="stat-label">${stat.label}</div>
            </div>
        `).join('');
        
        // Reinitialize counters
        initCounters();
    }

    /**
     * Render About Section
     */
    static renderAbout(data) {
        if (!data || data.length === 0) return;
        
        const aboutData = data[0];
        const sectionTitle = document.querySelector('#about .section-title h2');
        const sectionSubtitle = document.querySelector('#about .section-subtitle');
        const aboutText = document.querySelector('#about .card-text');
        const aboutImage = document.querySelector('#about img');
        
        if (sectionTitle && aboutData.title) {
            sectionTitle.textContent = aboutData.title;
        }
        
        if (sectionSubtitle && aboutData.subtitle) {
            sectionSubtitle.textContent = aboutData.subtitle;
        }
        
        if (aboutText && aboutData.description) {
            aboutText.textContent = aboutData.description;
        }
        
        if (aboutImage && aboutData.image) {
            aboutImage.src = aboutData.image;
        }
    }

    /**
     * Render Trainers Section
     */
    static renderTrainers(data) {
        if (!data || data.length === 0) return;
        
        const trainersGrid = document.querySelector('#trainers .grid');
        if (!trainersGrid) return;
        
        trainersGrid.innerHTML = data.map(trainer => `
            <div class="card trainer-card">
                <img src="${trainer.image || 'https://via.placeholder.com/150'}" 
                     alt="${trainer.name}" 
                     class="trainer-image">
                <h3 class="card-title">${trainer.name}</h3>
                <p class="card-subtitle">${trainer.specialty}</p>
                <p class="card-text">${trainer.bio}</p>
            </div>
        `).join('');
    }

    /**
     * Render Facilities Section
     */
    static renderFacilities(data) {
        if (!data || data.length === 0) return;
        
        const facilitiesGrid = document.querySelector('#facilities .grid');
        if (!facilitiesGrid) return;
        
        facilitiesGrid.innerHTML = data.map(facility => `
            <div class="card facility-card">
                <div class="icon-box">
                    <i class="${facility.icon} facility-icon"></i>
                </div>
                <h3 class="card-title">${facility.name}</h3>
                <p class="card-text">${facility.description}</p>
            </div>
        `).join('');
    }

    /**
     * Render Services Section
     */
    static renderServices(data) {
        if (!data || data.length === 0) return;
        
        const servicesGrid = document.querySelector('#services .grid');
        if (!servicesGrid) return;
        
        servicesGrid.innerHTML = data.map(service => `
            <div class="card">
                <div class="icon-box">
                    <i class="${service.icon}"></i>
                </div>
                <h3 class="card-title">${service.name}</h3>
                <p class="card-text">${service.description}</p>
            </div>
        `).join('');
    }

    /**
     * Render Pricing Section
     */
    static renderPricing(data) {
        if (!data || data.length === 0) return;
        
        const pricingGrid = document.querySelector('#pricing .grid');
        if (!pricingGrid) return;
        
        pricingGrid.innerHTML = data.map(plan => {
            const features = plan.features ? plan.features.split('|') : [];
            const isFeatured = plan.featured === 'TRUE' || plan.featured === 'true';
            
            return `
                <div class="card pricing-card ${isFeatured ? 'featured' : ''}">
                    ${isFeatured ? '<div class="pricing-badge">Most Popular</div>' : ''}
                    <h3 class="card-title">${plan.name}</h3>
                    <div class="pricing-price">$${plan.price}</div>
                    <div class="pricing-period">per ${plan.period || 'month'}</div>
                    <ul class="pricing-features">
                        ${features.map(feature => `<li>${feature.trim()}</li>`).join('')}
                    </ul>
                    <button class="btn btn-primary">Get Started</button>
                </div>
            `;
        }).join('');
    }

    /**
     * Render Testimonials Section
     */
    static renderTestimonials(data) {
        if (!data || data.length === 0) return;
        
        const testimonialsGrid = document.querySelector('#testimonials .grid');
        if (!testimonialsGrid) return;
        
        testimonialsGrid.innerHTML = data.map(testimonial => `
            <div class="card testimonial-card">
                <div class="testimonial-quote">"</div>
                <p class="testimonial-text">${testimonial.text}</p>
                <div class="testimonial-author">
                    <img src="${testimonial.avatar || 'https://via.placeholder.com/50'}" 
                         alt="${testimonial.name}" 
                         class="testimonial-avatar">
                    <div>
                        <div class="testimonial-name">${testimonial.name}</div>
                        <div class="testimonial-role">${testimonial.role}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Render Gallery Section
     */
    static renderGallery(data) {
        if (!data || data.length === 0) return;
        
        const galleryGrid = document.querySelector('.gallery-grid');
        if (!galleryGrid) return;
        
        galleryGrid.innerHTML = data.map(item => `
            <div class="gallery-item">
                <img src="${item.image}" 
                     alt="${item.caption || 'Gallery image'}" 
                     class="gallery-image">
                <div class="gallery-overlay">
                    <p style="color: white; font-weight: 600;">${item.caption || ''}</p>
                </div>
            </div>
        `).join('');
    }

    /**
     * Render Contact Section
     */
    static renderContact(data) {
        if (!data || data.length === 0) return;
        
        const contactData = data[0];
        
        if (contactData.phone) {
            const phoneElements = document.querySelectorAll('[data-contact="phone"]');
            phoneElements.forEach(el => el.textContent = contactData.phone);
        }
        
        if (contactData.email) {
            const emailElements = document.querySelectorAll('[data-contact="email"]');
            emailElements.forEach(el => el.textContent = contactData.email);
        }
        
        if (contactData.address) {
            const addressElements = document.querySelectorAll('[data-contact="address"]');
            addressElements.forEach(el => el.textContent = contactData.address);
        }
        
        if (contactData.mapUrl) {
            const mapIframe = document.querySelector('.map-container iframe');
            if (mapIframe) mapIframe.src = contactData.mapUrl;
        }
    }

    /**
     * Render Footer Section
     */
    static renderFooter(data) {
        if (!data || data.length === 0) return;
        
        const footerData = data[0];
        
        if (footerData.copyrightText) {
            const copyrightElement = document.querySelector('[data-footer="copyright"]');
            if (copyrightElement) {
                copyrightElement.textContent = footerData.copyrightText.replace('{year}', new Date().getFullYear());
            }
        }
        
        // Social links
        const socialLinks = {
            facebook: footerData.facebook,
            instagram: footerData.instagram,
            twitter: footerData.twitter,
            youtube: footerData.youtube
        };
        
        Object.entries(socialLinks).forEach(([platform, url]) => {
            if (url) {
                const linkElement = document.querySelector(`[data-social="${platform}"]`);
                if (linkElement) linkElement.href = url;
            }
        });
    }

    /**
     * Render all content
     */
    static renderAll(content) {
        this.renderHero(content.hero);
        this.renderStats(content.stats);
        this.renderAbout(content.about);
        this.renderTrainers(content.trainers);
        this.renderFacilities(content.facilities);
        this.renderServices(content.services);
        this.renderPricing(content.pricing);
        this.renderTestimonials(content.testimonials);
        this.renderGallery(content.gallery);
        this.renderContact(content.contact);
        this.renderFooter(content.footer);
    }
}

// ===================================
// INITIALIZATION
// ===================================

let sheetsLoader;

async function initGoogleSheets() {
    // Check if Web App is configured
    if (!CONFIG.WEB_APP_URL || CONFIG.WEB_APP_URL === '') {
        console.warn('⚠️ Google Sheets Web App not configured. Using static content.');
        console.info('💡 Add your Web App URL to config.js to enable dynamic content.');
        return;
    }
    
    try {
        // Initialize loader with config
        sheetsLoader = new GoogleSheetsLoader(CONFIG);
        
        // Use cached content immediately if available (INSTANT LOAD!)
        if (sheetsLoader.cache && Object.keys(sheetsLoader.cache).length > 0) {
            console.log('⚡ Rendering cached content (instant load)');
            ContentRenderer.renderAll(sheetsLoader.cache);
            console.log('✅ Cached content displayed');
            
            // Then fetch fresh data in background and update
            console.log('🔄 Fetching fresh data in background...');
            sheetsLoader.loadAllContent().then(content => {
                if (content) {
                    ContentRenderer.renderAll(content);
                    console.log('✅ Fresh content loaded and updated');
                }
            });
        } else {
            // No cache - show loading indicator
            showLoadingIndicator();
            
            // Load all content
            const content = await sheetsLoader.loadAllContent();
            
            if (content) {
                // Render all sections
                ContentRenderer.renderAll(content);
                console.log('✅ Content loaded from Google Sheets successfully');
                console.log('📊 Loaded sections:', Object.keys(content));
            }
            
            // Hide loading indicator
            hideLoadingIndicator();
        }
        
    } catch (error) {
        console.error('❌ Error initializing Google Sheets:', error);
        console.error('💡 Make sure your Google Sheet is public and Web App is deployed.');
        hideLoadingIndicator();
    }
}

function showLoadingIndicator() {
    const loader = document.createElement('div');
    loader.id = 'content-loader';
    loader.innerHTML = `
        <div style="position: fixed; top: 80px; right: 20px; 
                    background: rgba(0,0,0,0.8); padding: 1rem 1.5rem;
                    border-radius: 0.5rem; display: flex; align-items: center; 
                    gap: 1rem; z-index: 9999; backdrop-filter: blur(10px);
                    border: 1px solid rgba(212,175,55,0.3);">
            <div class="spinner" style="width: 20px; height: 20px; border: 2px solid rgba(212,175,55,0.3); 
                 border-top-color: #D4AF37; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
            <span style="color: #D4AF37; font-size: 0.9rem; font-weight: 500;">Loading...</span>
        </div>
        <style>
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        </style>
    `;
    document.body.appendChild(loader);
}

function hideLoadingIndicator() {
    const loader = document.getElementById('content-loader');
    if (loader) {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.3s';
        setTimeout(() => loader.remove(), 300);
    }
}

/**
 * Clear cache and reload fresh data
 * Use this when you make changes to Google Sheets and want immediate update
 */
function clearCacheAndReload() {
    try {
        localStorage.removeItem('gym_sheets_cache');
        console.log('🗑️ Cache cleared!');
        location.reload();
    } catch (error) {
        console.error('Error clearing cache:', error);
    }
}

// Make it available globally
window.clearCacheAndReload = clearCacheAndReload;

// Export for use in other files
if (typeof window !== 'undefined') {
    window.GoogleSheetsLoader = GoogleSheetsLoader;
    window.ContentRenderer = ContentRenderer;
    window.initGoogleSheets = initGoogleSheets;
}
