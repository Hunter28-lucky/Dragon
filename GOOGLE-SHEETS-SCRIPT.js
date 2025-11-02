/**
 * ====================================================================
 * RED DRAGON GYM - GOOGLE SHEETS APPS SCRIPT
 * ====================================================================
 * 
 * This script helps manage your website content in Google Sheets.
 * It provides validation, formatting, and helper functions.
 * 
 * HOW TO INSTALL:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code
 * 4. Paste this entire code
 * 5. Click Save (disk icon)
 * 6. Refresh your Google Sheet
 * 7. A new "Website Tools" menu will appear!
 * 
 * ====================================================================
 */

/**
 * Creates custom menu when spreadsheet opens
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🔥 Website Tools')
    .addItem('📋 Create All Tabs', 'createAllTabs')
    .addItem('✅ Validate Content', 'validateAllContent')
    .addItem('🔄 Refresh Sample Data', 'populateSampleData')
    .addItem('�️ Clear All Data', 'clearAllData')
    .addItem('�📖 Show Help', 'showHelp')
    .addSeparator()
    .addItem('🌐 Open Website', 'openWebsite')
    .addToUi();
}

/**
 * Handles GET requests from the website
 * This allows the website to fetch data from the sheet
 */
function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = e.parameter.sheet;
  
  if (!sheetName) {
    return ContentService.createTextOutput(JSON.stringify({
      error: 'No sheet parameter provided'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({
      error: `Sheet '${sheetName}' not found`
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  const data = getSheetDataArray(sheet);
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    sheet: sheetName,
    data: data
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Gets all data from a sheet as array of objects
 */
function getSheetDataArray(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return [];
  
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const data = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
  
  return data
    .filter(row => row.some(cell => cell !== ''))
    .map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || '';
      });
      return obj;
    });
}

/**
 * Creates all required tabs with headers
 */
function createAllTabs() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  
  // Define all tabs with their headers
  const tabs = {
    'Hero': ['title', 'subtitle', 'backgroundImage'],
    'Stats': ['number', 'suffix', 'label'],
    'About': ['title', 'subtitle', 'description', 'image'],
    'Trainers': ['name', 'specialty', 'bio', 'image'],
    'Facilities': ['name', 'description', 'icon'],
    'Services': ['name', 'description', 'icon'],
    'Pricing': ['name', 'price', 'period', 'featured', 'features'],
    'Testimonials': ['name', 'role', 'text', 'avatar'],
    'Gallery': ['image', 'caption'],
    'Contact': ['phone', 'email', 'address', 'mapUrl'],
    'Footer': ['copyrightText', 'facebook', 'instagram', 'twitter', 'youtube']
  };
  
  let created = 0;
  let skipped = 0;
  
  Object.keys(tabs).forEach(tabName => {
    let sheet = ss.getSheetByName(tabName);
    
    if (!sheet) {
      // Create new sheet
      sheet = ss.insertSheet(tabName);
      created++;
    } else {
      skipped++;
    }
    
    // Set headers
    const headers = tabs[tabName];
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setValues([headers]);
    
    // Style headers
    headerRange.setBackground('#D4AF37');
    headerRange.setFontColor('#000000');
    headerRange.setFontWeight('bold');
    headerRange.setHorizontalAlignment('center');
    
    // Freeze header row
    sheet.setFrozenRows(1);
    
    // Auto-resize columns
    for (let i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }
  });
  
  ui.alert('✅ Tab Creation Complete!', 
    `Created: ${created} new tabs\nSkipped: ${skipped} existing tabs\n\nAll tabs now have proper headers!`,
    ui.ButtonSet.OK);
}

/**
 * Populates sample data for testing
 */
function populateSampleData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  
  const response = ui.alert('⚠️ Warning',
    'This will add sample data to your sheets. Existing data will NOT be deleted.\n\nContinue?',
    ui.ButtonSet.YES_NO);
  
  if (response !== ui.Button.YES) {
    return;
  }
  
  // Hero
  addSampleData(ss, 'Hero', [
    ['Unleash Your Inner|Dragon', 'Transform your body, mind, and spirit at Dhanbad\'s premier fitness destination', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=2400&q=90&fit=crop']
  ]);
  
  // Stats
  addSampleData(ss, 'Stats', [
    ['15', '+', 'Years Experience'],
    ['500', '+', 'Active Members'],
    ['50', '+', 'Expert Trainers'],
    ['20', '+', 'Awards Won']
  ]);
  
  // About
  addSampleData(ss, 'About', [
    ['About Red Dragon Gym', 'Dhanbad\'s Oldest & Most Trusted Fitness Center', 'Since 2009, Red Dragon Gym has been transforming lives through fitness. We are Dhanbad\'s oldest and most trusted unisex gym, offering world-class facilities and expert guidance.', 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=90']
  ]);
  
  // Trainers
  addSampleData(ss, 'Trainers', [
    ['Rajesh Kumar', 'Strength Training Expert', '15+ years of experience in bodybuilding and strength training. Certified fitness professional.', 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400'],
    ['Priya Singh', 'Yoga & Flexibility Coach', 'Certified yoga instructor specializing in flexibility and mind-body wellness.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'],
    ['Amit Sharma', 'Cardio & Weight Loss Specialist', 'Expert in cardiovascular fitness and personalized weight loss programs.', 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400']
  ]);
  
  // Facilities
  addSampleData(ss, 'Facilities', [
    ['Modern Equipment', 'State-of-the-art fitness machines and free weights from leading brands', 'fas fa-dumbbell'],
    ['Personal Training', 'One-on-one sessions with certified trainers for customized results', 'fas fa-user-check'],
    ['Group Classes', 'Zumba, Yoga, Spinning, and more group activities', 'fas fa-users'],
    ['Cardio Zone', 'Dedicated cardio area with treadmills, bikes, and ellipticals', 'fas fa-heart-pulse'],
    ['Steam & Sauna', 'Relax and recover in our premium steam and sauna rooms', 'fas fa-hot-tub-person'],
    ['Locker Facilities', 'Secure lockers and clean changing rooms for your convenience', 'fas fa-lock']
  ]);
  
  // Services
  addSampleData(ss, 'Services', [
    ['Weight Training', 'Build muscle and strength with our comprehensive weight training programs', 'fas fa-dumbbell'],
    ['Cardio Fitness', 'Improve cardiovascular health and endurance with expert guidance', 'fas fa-heart-pulse'],
    ['Yoga Classes', 'Find balance and flexibility through traditional and modern yoga', 'fas fa-spa'],
    ['Nutrition Counseling', 'Get personalized diet plans from certified nutritionists', 'fas fa-apple-whole'],
    ['Zumba Dance', 'Fun, high-energy dance fitness classes for all levels', 'fas fa-music'],
    ['Personal Training', 'Achieve your goals faster with dedicated one-on-one coaching', 'fas fa-person-running']
  ]);
  
  // Pricing
  addSampleData(ss, 'Pricing', [
    ['Basic', '499', 'month', 'FALSE', 'Gym access|Locker facility|Group classes|Free WiFi'],
    ['Premium', '999', 'month', 'TRUE', 'All Basic features|Personal trainer|Nutrition plan|Priority booking|Steam & Sauna'],
    ['Elite', '1499', 'month', 'FALSE', 'All Premium features|Dietician consultation|Spa access|Guest passes|24/7 access']
  ]);
  
  // Testimonials
  addSampleData(ss, 'Testimonials', [
    ['Rohit Verma', 'Member Since 2020', 'Best gym in Dhanbad! Lost 25kg in 8 months with their expert guidance. The trainers are amazing and facilities are top-notch.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200'],
    ['Anjali Gupta', 'Member Since 2021', 'Red Dragon Gym changed my life! The supportive environment and professional trainers helped me achieve my fitness goals.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200'],
    ['Vikram Singh', 'Member Since 2019', 'Excellent facilities and great atmosphere. The best investment I made in my health. Highly recommend!', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200']
  ]);
  
  // Gallery
  addSampleData(ss, 'Gallery', [
    ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800', 'Modern Gym Equipment'],
    ['https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800', 'Spacious Workout Area'],
    ['https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800', 'Cardio Zone'],
    ['https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800', 'Group Fitness Classes'],
    ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800', 'Personal Training Sessions'],
    ['https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800', 'Yoga Studio'],
    ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800', 'Free Weights Section'],
    ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800', 'Modern Facilities']
  ]);
  
  // Contact
  addSampleData(ss, 'Contact', [
    ['+91 9876543210', 'info@reddragon.gym', 'Saraidhela, Dhanbad, Jharkhand - 828127', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.3!2d86.4!3d23.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ4JzAwLjAiTiA4NsKwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890']
  ]);
  
  // Footer
  addSampleData(ss, 'Footer', [
    ['© {year} Red Dragon Gym - Saraidhela, Dhanbad. All Rights Reserved.', 'https://facebook.com/reddragongymsaraidhela', 'https://instagram.com/reddragongymsaraidhela', 'https://twitter.com/reddragongymsaraidhela', 'https://youtube.com/@reddragongymsaraidhela']
  ]);
  
  ui.alert('✅ Sample Data Added!',
    'All tabs now have sample data. You can edit any cell to customize for your gym.\n\nRefresh your website to see the changes!',
    ui.ButtonSet.OK);
}

/**
 * Helper function to add data to a sheet
 */
function addSampleData(ss, sheetName, data) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return;
  
  const lastRow = sheet.getLastRow();
  const startRow = lastRow + 1;
  
  const range = sheet.getRange(startRow, 1, data.length, data[0].length);
  range.setValues(data);
  
  // Alternate row colors for readability
  for (let i = 0; i < data.length; i++) {
    const rowRange = sheet.getRange(startRow + i, 1, 1, data[0].length);
    if ((startRow + i) % 2 === 0) {
      rowRange.setBackground('#f9f9f9');
    }
  }
}

/**
 * Validates all content
 */
function validateAllContent() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  
  let errors = [];
  let warnings = [];
  
  // Check Hero
  const hero = getSheetData(ss, 'Hero');
  if (hero.length === 0) {
    errors.push('Hero: No data found');
  } else if (!hero[0][0] || !hero[0][1]) {
    warnings.push('Hero: Title or subtitle is empty');
  }
  
  // Check Stats
  const stats = getSheetData(ss, 'Stats');
  if (stats.length < 4) {
    warnings.push('Stats: Less than 4 stats (recommended: 4)');
  }
  
  // Check Trainers
  const trainers = getSheetData(ss, 'Trainers');
  if (trainers.length === 0) {
    warnings.push('Trainers: No trainers added');
  }
  
  // Check Pricing
  const pricing = getSheetData(ss, 'Pricing');
  if (pricing.length === 0) {
    errors.push('Pricing: No pricing plans found');
  } else {
    let featuredCount = 0;
    pricing.forEach(plan => {
      if (plan[3] && (plan[3].toString().toUpperCase() === 'TRUE')) {
        featuredCount++;
      }
    });
    if (featuredCount > 1) {
      warnings.push('Pricing: Multiple plans marked as featured (recommended: 1)');
    }
  }
  
  // Check Contact
  const contact = getSheetData(ss, 'Contact');
  if (contact.length === 0) {
    errors.push('Contact: No contact information found');
  }
  
  // Check Gallery
  const gallery = getSheetData(ss, 'Gallery');
  if (gallery.length < 6) {
    warnings.push('Gallery: Less than 6 images (recommended: 6-8)');
  }
  
  // Generate report
  let report = '✅ CONTENT VALIDATION REPORT\n\n';
  
  if (errors.length === 0 && warnings.length === 0) {
    report += '🎉 Everything looks good!\n\nYour website is ready to go live.';
  } else {
    if (errors.length > 0) {
      report += '❌ ERRORS (Must Fix):\n';
      errors.forEach(error => report += '  • ' + error + '\n');
      report += '\n';
    }
    
    if (warnings.length > 0) {
      report += '⚠️ WARNINGS (Recommended):\n';
      warnings.forEach(warning => report += '  • ' + warning + '\n');
    }
  }
  
  ui.alert('Content Validation', report, ui.ButtonSet.OK);
}

/**
 * Helper function to get sheet data
 */
function getSheetData(ss, sheetName) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return [];
  
  const data = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
  return data.filter(row => row.some(cell => cell !== ''));
}

/**
 * Clears all data from all sheets (keeps headers)
 */
function clearAllData() {
  const ui = SpreadsheetApp.getUi();
  
  // Confirmation dialog
  const response = ui.alert(
    '⚠️ Clear All Data',
    '⚠️ WARNING: This will DELETE ALL DATA from ALL SHEETS!\n\n' +
    'Only the header rows will remain.\n\n' +
    'This action CANNOT be undone!\n\n' +
    'Are you sure you want to continue?',
    ui.ButtonSet.YES_NO
  );
  
  // If user doesn't confirm, exit
  if (response !== ui.Button.YES) {
    ui.alert('Cancelled', 'No data was deleted.', ui.ButtonSet.OK);
    return;
  }
  
  // Double confirmation
  const finalResponse = ui.alert(
    '⚠️ Final Confirmation',
    '⚠️ LAST CHANCE!\n\n' +
    'This will permanently delete all your website content.\n\n' +
    'Click YES to delete everything, or NO to cancel.',
    ui.ButtonSet.YES_NO
  );
  
  if (finalResponse !== ui.Button.YES) {
    ui.alert('Cancelled', 'No data was deleted.', ui.ButtonSet.OK);
    return;
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetNames = ['Hero', 'Stats', 'About', 'Trainers', 'Facilities', 
                      'Services', 'Pricing', 'Testimonials', 'Gallery', 
                      'Contact', 'Footer'];
  
  let clearedCount = 0;
  
  sheetNames.forEach(function(name) {
    const sheet = ss.getSheetByName(name);
    if (sheet) {
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        // Delete all rows except header (row 1)
        sheet.deleteRows(2, lastRow - 1);
        clearedCount++;
      }
    }
  });
  
  ui.alert(
    '✅ Data Cleared',
    '✅ Successfully cleared data from ' + clearedCount + ' sheets!\n\n' +
    'Header rows were preserved.\n\n' +
    'You can now:\n' +
    '• Add your own content manually\n' +
    '• Click "Refresh Sample Data" to restore sample data',
    ui.ButtonSet.OK
  );
}

/**
 * Shows help dialog
 */
function showHelp() {
  const ui = SpreadsheetApp.getUi();
  
  const helpText = 
    '🔥 RED DRAGON GYM - GOOGLE SHEETS HELP\n\n' +
    '📋 MENU OPTIONS:\n\n' +
    '1. Create All Tabs\n' +
    '   Creates all 11 required tabs with headers\n\n' +
    '2. Validate Content\n' +
    '   Checks for missing or invalid data\n\n' +
    '3. Refresh Sample Data\n' +
    '   Adds sample data for testing\n' +
    '   ⚠️ Does NOT delete existing data\n\n' +
    '4. Clear All Data\n' +
    '   ⚠️ DELETES all data (keeps headers only)\n' +
    '   Requires double confirmation\n\n' +
    '5. Show Help\n' +
    '   Shows this help dialog\n\n' +
    '6. Open Website\n' +
    '   Opens your website URL\n\n' +
    '📖 DOCUMENTATION:\n' +
    'Check the files in your project folder:\n' +
    '• SHEETS-TEMPLATE.html (visual guide)\n' +
    '• GOOGLE-SHEETS-SETUP.md (setup)\n' +
    '• QUICK-REFERENCE.md (daily use)\n\n' +
    '💡 TIPS:\n' +
    '• Use | (pipe) to separate features\n' +
    '• Get icons from fontawesome.com\n' +
    '• Use direct image URLs\n' +
    '• Refresh website after changes';
  
  ui.alert('Help', helpText, ui.ButtonSet.OK);
}

/**
 * Opens the website
 */
function openWebsite() {
  const ui = SpreadsheetApp.getUi();
  const html = '<html><body><script>window.open("index.html", "_blank");</script></body></html>';
  
  ui.alert('Open Website',
    'Open your index.html file in a web browser to see your website.\n\n' +
    'Make sure you have:\n' +
    '✅ Added your API key to config.js\n' +
    '✅ Made this sheet public\n' +
    '✅ Filled in your content',
    ui.ButtonSet.OK);
}

/**
 * ====================================================================
 * INSTALLATION COMPLETE!
 * ====================================================================
 * 
 * WHAT'S NEXT:
 * 
 * 1. Save this script (Ctrl+S or Cmd+S)
 * 2. Close this Apps Script tab
 * 3. Refresh your Google Sheet
 * 4. Look for "🔥 Website Tools" menu at the top
 * 5. Click "Create All Tabs" to set up structure
 * 6. Click "Refresh Sample Data" to add demo content
 * 7. Edit the content to match your gym
 * 8. Refresh your website to see changes!
 * 
 * ====================================================================
 */
