# 🖼️ About Section Image - Now Editable!

## ✅ What I Added:

I've added the **About section image** to your Google Sheets so you can easily change it!

---

## 📋 How to Edit the About Image:

### Step 1: Update Google Sheets Script
1. Open your [Google Sheet](https://docs.google.com/spreadsheets/d/1WqKMKlCnva4WoXKrpf5ZS89B5Vpu9dpRCEIIBrScwOE/edit)
2. Go to **Extensions → Apps Script**
3. Select ALL the code (Cmd+A) and delete it
4. Open `GOOGLE-SHEETS-SCRIPT.js` from your project folder
5. Copy ALL the code and paste it
6. Click **Save** (disk icon)
7. Close Apps Script tab
8. Refresh your Google Sheet

### Step 2: Create/Refresh the About Tab
1. In your Google Sheet, click **"🔥 Website Tools → 📋 Create All Tabs"**
2. Then click **"🔥 Website Tools → 🗑️ Clear All Data"** (if you want fresh start)
3. Then click **"🔥 Website Tools → 🔄 Refresh Sample Data"**

### Step 3: Find the Image Column
1. Go to the **"About"** tab in your Google Sheet
2. You'll now see **4 columns**:
   - Column A: **title**
   - Column B: **subtitle**
   - Column C: **description**
   - Column D: **image** ← NEW!

### Step 4: Change the Image
1. Click on cell **D2** (the image column)
2. Paste your image URL
3. Wait 15-20 seconds
4. Hard refresh your website (Cmd+Shift+R)

---

## 🎯 About Tab Structure:

| Column | Field | Example | What It Does |
|--------|-------|---------|--------------|
| A | title | "About Red Dragon Gym" | Main heading |
| B | subtitle | "Dhanbad's Oldest & Most Trusted" | Subtitle under heading |
| C | description | "Since 2009, Red Dragon Gym..." | Main text description |
| D | **image** | `https://...image.jpg` | **The gym interior photo** ← NEW! |

---

## 🖼️ Image Recommendations:

### Best Images for About Section:
- ✅ Gym interior with equipment
- ✅ Wide angle shots showing space
- ✅ Well-lit, professional photos
- ✅ People working out (optional)

### Image Specs:
- **Width**: 1000-1500px
- **Format**: JPG or WebP
- **Quality**: High (80%+)
- **Aspect Ratio**: Landscape (16:9 or 4:3)

### Where to Get Images:
1. **Your own gym photos** (best option!)
2. **Unsplash.com** (free high-quality stock photos)
3. **Pexels.com** (free stock photos)

### Example URLs:
```
https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=90
https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=90
https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200&q=90
```

---

## 🔄 All Editable Images Now:

| Section | Google Sheet Tab | Column | Cell |
|---------|-----------------|--------|------|
| Hero Background | Hero | backgroundImage | C2 |
| About Image | About | image | D2 |
| Trainer Photos | Trainers | image | D2, D3, D4... |
| Gallery Photos | Gallery | image | A2, A3, A4... |
| Testimonial Avatars | Testimonials | avatar | D2, D3, D4... |

---

## 💡 Quick Test:

1. Go to your [Google Sheet](https://docs.google.com/spreadsheets/d/1WqKMKlCnva4WoXKrpf5ZS89B5Vpu9dpRCEIIBrScwOE/edit)
2. Make sure you've updated the Apps Script code
3. Click **"🔥 Website Tools → 📋 Create All Tabs"**
4. Go to **"About"** tab
5. Check if column D exists (labeled "image")
6. If not, click **"🔥 Website Tools → 🔄 Refresh Sample Data"**
7. Change the URL in cell D2
8. Wait 20 seconds
9. Hard refresh website (Cmd+Shift+R)
10. Your new image should appear! 🎉

---

## 🆘 Troubleshooting:

### Image Not Showing?
1. ✅ Check if Apps Script is updated with new code
2. ✅ Check if "About" tab has 4 columns (not 3)
3. ✅ Check if cell D2 has an image URL
4. ✅ Wait 15-20 seconds after editing
5. ✅ Do HARD refresh (Cmd+Shift+R)
6. ✅ Check browser console (F12) for errors

### Column D Missing?
1. Delete the "About" tab completely
2. Click **"🔥 Website Tools → 📋 Create All Tabs"**
3. It will recreate with 4 columns

---

## 🎉 Success!

Now you can change **ALL images** on your website by editing Google Sheets:
- Hero background image
- About section image
- Trainer photos
- Gallery images
- Testimonial avatars

No coding required! Just paste image URLs and refresh! 🚀
