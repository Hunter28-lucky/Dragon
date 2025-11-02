# 🗑️ Clear All Data - Update Instructions

## ✅ What's New?

I've added a **"Clear All Data"** option to your Website Tools menu!

---

## 📋 What It Does:

- **Deletes ALL data** from all 11 sheet tabs
- **Keeps header rows** intact (so structure remains)
- **Requires double confirmation** (so you don't accidentally delete)
- Useful when you want to:
  - Start fresh with your own content
  - Remove all sample data at once
  - Clean up before adding real gym data

---

## 🚀 How to Install the Update:

### Step 1: Open Google Apps Script
1. Open your [Google Sheet](https://docs.google.com/spreadsheets/d/1WqKMKlCnva4WoXKrpf5ZS89B5Vpu9dpRCEIIBrScwOE/edit)
2. Click **Extensions → Apps Script**

### Step 2: Replace the Code
1. Select ALL the existing code (Cmd+A)
2. Delete it
3. Open `GOOGLE-SHEETS-SCRIPT.js` from your project folder
4. Copy ALL the code (Cmd+A, then Cmd+C)
5. Paste it into Apps Script (Cmd+V)

### Step 3: Save & Test
1. Click **Save** (disk icon) or press Cmd+S
2. Close the Apps Script tab
3. Refresh your Google Sheet
4. You should now see **"🗑️ Clear All Data"** in the menu!

---

## 📖 New Menu Structure:

```
🔥 Website Tools
├── 📋 Create All Tabs
├── ✅ Validate Content
├── 🔄 Refresh Sample Data (does NOT delete)
├── 🗑️ Clear All Data (NEW! - deletes everything)
├── 📖 Show Help
├── ──────────────
└── 🌐 Open Website
```

---

## ⚠️ How "Clear All Data" Works:

1. Click **"🔥 Website Tools → 🗑️ Clear All Data"**
2. First warning appears: "Are you sure?"
3. Second warning appears: "LAST CHANCE!"
4. If you confirm both:
   - All data rows are deleted (rows 2+)
   - Header rows remain (row 1)
   - You get confirmation message

---

## 💡 Safety Features:

✅ **Double confirmation** - asks twice before deleting  
✅ **Keeps headers** - structure remains intact  
✅ **Clear message** - warns you what will happen  
✅ **Can cancel** - click NO to cancel at any time  
✅ **Can restore** - click "Refresh Sample Data" to add sample data back  

---

## 🔄 Comparison:

| Feature | Refresh Sample Data | Clear All Data |
|---------|-------------------|----------------|
| Action | Adds/updates sample data | Deletes all data |
| Existing data | Kept (not deleted) | Removed |
| Headers | Kept | Kept |
| Confirmation | None needed | Double confirmation |
| Use case | Test with sample data | Start fresh |

---

## 📝 Typical Workflow:

### When Starting:
1. **Create All Tabs** - sets up structure
2. **Refresh Sample Data** - adds examples
3. Edit sample data to learn the system
4. **Clear All Data** - remove all samples
5. Add your real gym content

### When Making Changes:
- Just edit cells directly
- No need to clear/refresh
- Changes appear on website after hard refresh

---

## 🆘 Need Help?

- The function has built-in safety warnings
- You must confirm TWICE to delete
- You can always click "Refresh Sample Data" to restore examples
- Headers are never deleted, only data rows

---

## ✅ Ready to Update!

1. Go to **Extensions → Apps Script**
2. Replace all code with the new version
3. Save and refresh
4. Test the new "Clear All Data" option!

🎉 Now you have full control over your data!
