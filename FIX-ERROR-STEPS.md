# 🔧 FIX CONNECTION ERROR - Step by Step

## Current Status
- ✅ Deployment ID: Confirmed
- ✅ Web App URL: Configured
- ✅ Code file: Ready (GOOGLE-SHEETS-SCRIPT.js)
- ⚠️ Connection: Not working yet

## 🎯 Fix It in 5 Steps

### Step 1: Update Apps Script Code

1. **Open your Google Sheet**:
   https://docs.google.com/spreadsheets/d/1WqKMKlCnva4WoXKrpf5ZS89B5Vpu9dpRCEIIBrScwOE/edit

2. **Go to Apps Script**:
   - Click: **Extensions** → **Apps Script**

3. **Replace ALL code**:
   - Select all existing code (Ctrl+A or Cmd+A)
   - Delete it
   - Open file: `GOOGLE-SHEETS-SCRIPT.js` from your project
   - Copy ALL code (Ctrl+A, Ctrl+C)
   - Paste into Apps Script (Ctrl+V)

4. **Save**:
   - Click the 💾 Save icon (or Ctrl+S)
   - Wait for "Saved" message

---

### Step 2: Create New Deployment

**IMPORTANT:** Don't edit the old deployment - create a NEW one!

1. In Apps Script, click: **Deploy** → **New deployment**

2. Click the ⚙️ gear icon → Select **Web app**

3. Fill in:
   - **Description:** "Website Data API v2" (or anything)
   - **Execute as:** Me (your email)
   - **Who has access:** **Anyone** ← CRITICAL!

4. Click **Deploy**

5. Click **Authorize access**

6. Select your Google account

7. Click **Advanced** → **Go to [your project name] (unsafe)**
   
8. Click **Allow**

9. **Copy the NEW Web App URL**

---

### Step 3: Update config.js

1. Open file: `config.js` in your project

2. Replace the `WEB_APP_URL` with your NEW URL:

```javascript
WEB_APP_URL: 'YOUR_NEW_URL_HERE',
```

3. Save the file

---

### Step 4: Test Connection

1. Open: `diagnostic-test.html` (already open in browser)

2. Click: **🔬 Test Direct URL**
   - A new tab opens
   - You should see JSON data like:
   ```json
   {
     "success": true,
     "sheet": "Hero",
     "data": [...]
   }
   ```

3. If you see JSON: ✅ Success! Go to Step 5

4. If you see error: ⚠️ Check below

---

### Step 5: Test Website

1. Open: `index.html` in your browser

2. You should see:
   - Loading screen
   - Content appears from Google Sheets
   - No errors in console (F12)

3. ✅ Done! Your website now pulls from Google Sheets!

---

## 🐛 Troubleshooting

### Problem: "Authorization needed" when deploying

**Solution:**
1. Click "Authorize access"
2. Select your account
3. Click "Advanced"
4. Click "Go to [project] (unsafe)"
5. Click "Allow"

### Problem: New tab shows "Script function not found: doGet"

**Solution:**
- You didn't copy the complete code
- Go back to Step 1
- Make sure you copy **ALL** code from GOOGLE-SHEETS-SCRIPT.js

### Problem: New tab shows blank or error page

**Solution:**
- Deployment access not set to "Anyone"
- Create NEW deployment (Step 2)
- Make sure "Who has access" = "Anyone"

### Problem: New tab shows "Sheet not found"

**Solution:**
1. Go to your Google Sheet
2. Check if "Hero" tab exists
3. If not: Use Website Tools → Create All Tabs
4. Then: Website Tools → Refresh Sample Data

### Problem: Still not working after all steps

**Solution:**
1. Make sure you created a NEW deployment (not edited old one)
2. Make sure access is set to "Anyone"
3. Try in incognito/private browser window
4. Wait 1-2 minutes for changes to propagate
5. Check browser console (F12) for errors

---

## ✅ Quick Verification Checklist

Before testing, confirm:

- [ ] Opened Apps Script (Extensions → Apps Script)
- [ ] Deleted old code completely
- [ ] Pasted ALL code from GOOGLE-SHEETS-SCRIPT.js
- [ ] Saved successfully (see "Saved" message)
- [ ] Created NEW deployment (not edited old)
- [ ] Selected "Web app" type
- [ ] Set "Who has access" to "Anyone"
- [ ] Clicked "Deploy" and authorized
- [ ] Copied the NEW Web App URL
- [ ] Updated config.js with NEW URL
- [ ] Saved config.js
- [ ] Tested in diagnostic-test.html
- [ ] Saw JSON data in new tab
- [ ] Tested index.html
- [ ] Content loads successfully

---

## 🎯 Expected Results

### When you test the direct URL:
```json
{
  "success": true,
  "sheet": "Hero",
  "data": [
    {
      "title": "Unleash Your Inner|Dragon",
      "subtitle": "Transform your body...",
      "backgroundImage": "https://..."
    }
  ]
}
```

### When you open index.html:
1. Loading screen appears
2. Content loads from Google Sheets
3. All sections populate
4. No errors in console

---

## 📞 Still Having Issues?

1. Open `diagnostic-test.html`
2. Click all three test buttons
3. Copy the error messages
4. Check which step is failing

---

## 💡 Pro Tip

The most common issue is **NOT creating a NEW deployment**. 

Don't edit the old one - create a brand NEW deployment with "Anyone" access!

---

**Last Updated:** November 2025  
**Your Deployment ID:** AKfycbwqlyanl-_xuMFlvlEcUP5mR0XBNHfEwlA2xU8g-XO9PB2Y0SJmRKGj_WUQjU4Eb7WO
