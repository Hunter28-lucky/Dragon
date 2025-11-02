# Quick Reference Guide - Google Sheets Integration

## 🎯 Common Tasks

### How to Update Content

1. **Open your Google Sheet**: [Click here](https://docs.google.com/spreadsheets/d/1WqKMKlCnva4WoXKrpf5ZS89B5Vpu9dpRCEIIBrScwOE/edit)
2. **Edit any cell** with your new content
3. **Refresh your website** - changes appear instantly!

---

## 📱 Updating Different Sections

### Change Hero Banner
**Tab:** `Hero`
- **Title**: Column A (use `|` to split highlighted text)
- **Subtitle**: Column B
- **Background Image**: Column C (direct image URL)

### Update Stats Numbers
**Tab:** `Stats`
- Add/remove rows to change stats
- **Number**: Column A
- **Suffix**: Column B (e.g., `+`, `K`, `%`)
- **Label**: Column C

### Add/Remove Trainers
**Tab:** `Trainers`
- **Add trainer**: Insert new row with all details
- **Remove trainer**: Delete the row
- **Update**: Edit any cell

### Change Membership Prices
**Tab:** `Pricing`
- Update **price** column (numbers only)
- Update **features** column (separate with `|`)
- Set **featured** to `TRUE` for highlighted plan

### Add New Testimonial
**Tab:** `Testimonials`
- Insert new row
- Fill: name, role, text, avatar URL

### Update Gallery
**Tab:** `Gallery`
- Add row with image URL and caption
- Remove row to delete image

### Update Contact Info
**Tab:** `Contact`
- Edit phone, email, address, or map URL
- Only use first row

### Update Social Links
**Tab:** `Footer`
- Update Facebook, Instagram, Twitter, YouTube URLs

---

## 🖼️ Working with Images

### Best Image Sources
1. **Unsplash** (Free): https://unsplash.com/
2. **Pexels** (Free): https://pexels.com/
3. **Google Drive**: 
   - Upload image
   - Right-click → Get link
   - Change to "Anyone with link"
   - Use direct link
4. **Imgur** (Free): https://imgur.com/

### Image Size Recommendations
- **Hero Background**: 1920x1080px (landscape)
- **Trainers**: 500x500px (square)
- **Testimonial Avatars**: 200x200px (square)
- **Gallery**: 800x600px (landscape)

### Getting Direct Image URLs
From Google Drive:
```
Original: https://drive.google.com/file/d/FILE_ID/view
Direct: https://drive.google.com/uc?export=view&id=FILE_ID
```

---

## 🎨 Using Icons

### Font Awesome Icons
Website: https://fontawesome.com/icons

### Format
```
fas fa-icon-name    (Solid icons)
far fa-icon-name    (Regular icons)
fab fa-brand-name   (Brand icons)
```

### Popular Icons
- Dumbbell: `fas fa-dumbbell`
- Heart: `fas fa-heart`
- User: `fas fa-user`
- Star: `fas fa-star`
- Check: `fas fa-check`
- Times: `fas fa-times`
- Facebook: `fab fa-facebook`
- Instagram: `fab fa-instagram`

---

## 📋 Formatting Tips

### Text Formatting

#### Split Title (Hero)
```
Unleash Your Inner|Dragon
           ↑
      Second part gets gold color
```

#### List Features (Pricing)
```
Access to gym|Personal trainer|Nutrition plan|Locker facility
             ↑ Separate with pipe symbol
```

#### Featured Plan
```
featured column: TRUE or FALSE
```

### Special Codes

#### Auto Year (Footer)
```
© {year} Red Dragon Gym
   ↑ Automatically shows current year
```

---

## 🐛 Troubleshooting

### Problem: Changes not showing
**Solution:**
1. Hard refresh: `Ctrl+Shift+R` (Win) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Check if sheet is public

### Problem: Images not loading
**Solution:**
1. Verify image URL is direct link
2. Open URL in incognito browser
3. Check if image is publicly accessible
4. Try different image host

### Problem: "API Key not configured" warning
**Solution:**
1. Open `config.js`
2. Replace `YOUR_API_KEY_HERE` with your actual API key
3. Get key from: https://console.cloud.google.com/

### Problem: Sheet not accessible
**Solution:**
1. Open your Google Sheet
2. Click "Share" button
3. Change to "Anyone with the link"
4. Set permission to "Viewer"

---

## ⚡ Pro Tips

### 1. Test Before Publishing
- Make changes in a copy first
- Test on local computer
- Then update live sheet

### 2. Keep Backups
- File → Make a copy (weekly)
- Version History → Name current version

### 3. Organize Your Sheet
- Use colors for different sections
- Add notes to cells for reference
- Freeze header row (View → Freeze → 1 row)

### 4. Batch Updates
- Make multiple changes
- Refresh website once
- Saves time!

### 5. Mobile Optimization
- Keep text concise
- Use clear, simple language
- Test on mobile after changes

---

## 📞 Quick Links

- **Your Google Sheet**: https://docs.google.com/spreadsheets/d/1WqKMKlCnva4WoXKrpf5ZS89B5Vpu9dpRCEIIBrScwOE/edit
- **Google Cloud Console**: https://console.cloud.google.com/
- **Font Awesome Icons**: https://fontawesome.com/icons
- **Unsplash Images**: https://unsplash.com/
- **Setup Guide**: Open `GOOGLE-SHEETS-SETUP.md`
- **Template Structure**: Open `SHEETS-TEMPLATE.html` in browser

---

## 🔄 Workflow Example

### Adding a New Trainer

1. Open Google Sheet → Go to `Trainers` tab
2. Click on empty row (e.g., Row 4)
3. Fill in:
   - Column A: Trainer name
   - Column B: Specialty
   - Column C: Bio
   - Column D: Image URL
4. Save (auto-saves)
5. Refresh website
6. Done! ✅

### Updating a Price

1. Open Google Sheet → Go to `Pricing` tab
2. Find the plan you want to update
3. Edit the **price** column
4. Update **features** if needed (separate with `|`)
5. Save and refresh website
6. Done! ✅

---

**Remember**: The website updates automatically when you refresh. No code needed! 🎉
