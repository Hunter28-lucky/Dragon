# Google Sheets Integration Setup Guide

## 📋 Overview
Your Red Dragon Gym website is now connected to Google Sheets! This allows you to update all website content directly from a Google Sheet without touching any code.

## 🔧 Setup Instructions

### Step 1: Get Your Google Sheets API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Sheets API**:
   - Click "Enable APIs and Services"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create credentials:
   - Click "Create Credentials" → "API Key"
   - Copy your API key
5. Open `config.js` and replace `YOUR_API_KEY_HERE` with your actual API key

### Step 2: Make Your Google Sheet Public

Your Google Sheet: `https://docs.google.com/spreadsheets/d/1WqKMKlCnva4WoXKrpf5ZS89B5Vpu9dpRCEIIBrScwOE/edit`

1. Open your Google Sheet
2. Click **Share** button (top right)
3. Click "Change to anyone with the link"
4. Set permission to **Viewer**
5. Click "Done"

### Step 3: Structure Your Google Sheet

Create the following tabs (sheets) in your Google Sheet:

#### **Hero** Tab
| title | subtitle | backgroundImage |
|-------|----------|-----------------|
| Unleash Your Inner\|Dragon | Transform your body, mind, and spirit at Dhanbad's premier fitness destination | https://your-image-url.jpg |

*Note: Use `|` (pipe) to separate title parts - the second part will be highlighted in gold*

#### **Stats** Tab
| number | suffix | label |
|--------|--------|-------|
| 15 | + | Years Experience |
| 500 | + | Active Members |
| 50 | + | Expert Trainers |
| 20 | + | Awards Won |

#### **About** Tab
| title | subtitle | description |
|-------|----------|-------------|
| About Red Dragon Gym | Dhanbad's Oldest & Most Trusted Fitness Center | Your complete description here... |

#### **Trainers** Tab
| name | specialty | bio | image |
|------|-----------|-----|-------|
| John Doe | Strength Training | Expert trainer with 10 years... | https://image-url.jpg |
| Jane Smith | Yoga Instructor | Certified yoga master... | https://image-url.jpg |

#### **Facilities** Tab
| name | description | icon |
|------|-------------|------|
| Modern Equipment | State-of-the-art fitness equipment | fas fa-dumbbell |
| Personal Training | One-on-one training sessions | fas fa-user-check |

*Note: Use [Font Awesome](https://fontawesome.com/icons) icon class names*

#### **Services** Tab
| name | description | icon |
|------|-------------|------|
| Weight Training | Build muscle and strength | fas fa-dumbbell |
| Cardio Fitness | Improve cardiovascular health | fas fa-heart-pulse |

#### **Pricing** Tab
| name | price | period | featured | features |
|------|-------|--------|----------|----------|
| Basic | 499 | month | FALSE | Access to gym\|Group classes\|Locker facility |
| Premium | 999 | month | TRUE | All Basic features\|Personal trainer\|Nutrition plan\|Priority booking |

*Note: Separate features with `|` (pipe). Use TRUE/FALSE for featured column*

#### **Testimonials** Tab
| name | role | text | avatar |
|------|------|------|--------|
| Mike Johnson | Member Since 2020 | This gym changed my life! The trainers are amazing. | https://avatar-url.jpg |

#### **Gallery** Tab
| image | caption |
|-------|---------|
| https://image-url1.jpg | Modern Gym Equipment |
| https://image-url2.jpg | Cardio Zone |

#### **Contact** Tab
| phone | email | address | mapUrl |
|-------|-------|---------|--------|
| +91 1234567890 | info@reddragon.gym | Saraidhela, Dhanbad | https://maps.google.com/embed-url |

#### **Footer** Tab
| copyrightText | facebook | instagram | twitter | youtube |
|---------------|----------|-----------|---------|---------|
| © {year} Red Dragon Gym. All Rights Reserved. | https://facebook.com/... | https://instagram.com/... | https://twitter.com/... | https://youtube.com/... |

*Note: Use `{year}` to automatically insert current year*

---

## 🚀 How It Works

1. **Update Content**: Edit any cell in your Google Sheet
2. **Refresh Website**: Reload your website - changes appear automatically!
3. **No Code Required**: Never touch HTML/CSS/JS files again

## 📝 Important Notes

### Image URLs
- Use direct image links (ending in .jpg, .png, etc.)
- Recommended sources:
  - Google Drive (set to "Anyone with link can view")
  - Imgur
  - Cloudinary
  - Your own server

### Icons
- Use [Font Awesome 6.5.1](https://fontawesome.com/icons) icon classes
- Format: `fas fa-icon-name` or `fab fa-brand-name`
- Examples: `fas fa-dumbbell`, `fas fa-heart`, `fab fa-facebook`

### Tips for Best Results
1. **Keep formatting consistent** - Don't add/remove columns
2. **Test changes locally** before going live
3. **Use high-quality images** for best visual appeal
4. **Keep text concise** for better mobile experience
5. **Backup your sheet** before major changes

## 🔒 Security

- Your API key only has **read** access
- Sheet is public but **view-only**
- No one can edit your content except you
- API key is client-side, but that's safe for read-only public data

## 🐛 Troubleshooting

### Content Not Loading?
1. Check if API key is correctly set in `config.js`
2. Verify sheet is public (anyone with link can view)
3. Check browser console for errors (F12)
4. Ensure sheet tab names match exactly (case-sensitive)

### Images Not Showing?
1. Verify image URLs are direct links
2. Check if images are publicly accessible
3. Try opening image URL directly in browser

### Changes Not Appearing?
1. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Wait a few seconds - API has rate limits

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console (F12 → Console tab)
2. Verify your Google Sheet structure matches the templates above
3. Ensure API key is valid and Sheets API is enabled

## 🎉 You're All Set!

Once configured, you can manage your entire website from Google Sheets. Update prices, add new trainers, change testimonials - all without coding!

---

**Last Updated**: November 2025  
**Version**: 1.0
