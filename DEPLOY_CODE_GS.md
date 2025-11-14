# Deploy Code.gs to Google Apps Script

## ⚠️ IMPORTANT: Manual Deployment Required

The changes to `Code.gs` in this repository **do NOT automatically deploy** to Google Apps Script. You must manually update the script in the Google Apps Script editor.

## 🐛 Critical Bugs Fixed

### 1. Date Validation Bug
**Issue:** Date validation was calculating wrong month ranges, causing all certificate generation to fail.

**Error Message:** "Date of Issuance must be between December 31, 2024 and January 31, 2025" (for January 2025)

**Correct Range:** "Date of Issuance must be between January 31, 2025 and February 28, 2025" (for January 2025)

### 2. Certificate PDF Generation Issues
**Issues Fixed:**
- ✅ Missing signatory name and position in certificates
- ✅ Multiple pages (5 pages) instead of 1 page with 2 certificates
- ✅ Visible gridlines in PDF output
- ✅ Scale/fit not working properly

## 📝 Deployment Steps

### 1. Open Google Apps Script Editor
- Go to https://script.google.com
- Open your Firebase COC project

### 2. Find the Function
- Locate the `generateCOCCertificate_SERVER` function
- Go to approximately **line 815-820**
- Look for the section with comment: `// Calculate valid date range`

### 3. Replace the OLD Code

**OLD (BUGGY) CODE:**
```javascript
// Calculate valid date range: last day of earned month to last day of following month
const lastDayOfMonth = new Date(data.year, data.month, 0);
const followingMonth = data.month === 12 ? 1 : data.month + 1;
const followingYear = data.month === 12 ? data.year + 1 : data.year;
const lastDayOfFollowingMonth = new Date(followingYear, followingMonth, 0);
```

**NEW (FIXED) CODE:**
```javascript
// Calculate valid date range: last day of earned month to last day of following month
// Note: data.month is 0-based (0=Jan, 1=Feb, ..., 11=Dec)
const lastDayOfMonth = new Date(data.year, data.month + 1, 0);
const followingMonth = data.month === 11 ? 0 : data.month + 1;
const followingYear = data.month === 11 ? data.year + 1 : data.year;
const lastDayOfFollowingMonth = new Date(followingYear, followingMonth + 1, 0);
```

### 4. Save the Script
- Press **Ctrl+S** (Windows/Linux) or **Cmd+S** (Mac)
- Or click the **Save** icon

### 5. Test
- Try generating a certificate for January 2025 with Date of Issuance = February 1, 2025
- Should now work correctly ✅

## 🔍 What Changed?

| Line | Old | New | Why |
|------|-----|-----|-----|
| 817 | `data.month, 0` | `data.month + 1, 0` | Month is 0-indexed, need +1 |
| 818 | `data.month === 12` | `data.month === 11` | December is 11, not 12 |
| 820 | `followingMonth, 0` | `followingMonth + 1, 0` | Same +1 fix |

## ✅ Verification

After deploying, for **January 2025** (month=0):
- ✅ Valid range: January 31, 2025 - February 28, 2025
- ✅ Accepts: February 1, 2025
- ❌ Old range was: December 31, 2024 - January 31, 2025

For **December 2024** (month=11):
- ✅ Valid range: December 31, 2024 - January 31, 2025
- ✅ Accepts: January 1, 2025

## 📌 Remember

This fix needs to be applied **EVERY TIME** you update Code.gs from this repository to Google Apps Script.

Consider using `clasp` (Google's Apps Script CLI) for automatic deployment in the future.

---

## 📄 Certificate PDF Generation Fixes (NEW)

### Issues Fixed:
1. **Missing Signatory Information** - Signatory name and position now appear in certificates
2. **Multiple Pages** - Now generates 1 page with 2 certificates (was 5 pages)
3. **Visible Gridlines** - Gridlines are now hidden
4. **Fit to Page** - Properly scales content to fit on 1 page

### New Functions Added:

#### 1. `getSignatoryConfig()` (Lines ~1110-1135)
Retrieves signatory configuration from Firestore `libraries/signatory` document.

```javascript
function getSignatoryConfig() {
  try {
    const db = getFirestore();
    const signatoryDoc = db.getDocument('libraries/signatory');

    if (signatoryDoc && signatoryDoc.obj) {
      return {
        name: signatoryDoc.obj.name || '',
        position: signatoryDoc.obj.position || ''
      };
    }

    return { name: '', position: '' };
  } catch (error) {
    Logger.log('Error getting signatory config: ' + error.toString());
    return { name: '', position: '' };
  }
}
```

#### 2. `convertSheetToPDF()` (Lines ~1137-1164)
Converts sheet to PDF with proper export settings.

```javascript
function convertSheetToPDF(spreadsheet, sheet) {
  const sheetId = sheet.getSheetId();
  const spreadsheetId = spreadsheet.getId();

  const url = 'https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/export' +
    '?format=pdf' +
    '&size=a4' +              // A4 paper size
    '&portrait=true' +        // Portrait orientation
    '&fitw=true' +            // Fit to page width
    '&sheetnames=false' +     // Don't show sheet names
    '&printtitle=false' +     // Don't show title
    '&pagenumbers=false' +    // Don't show page numbers
    '&gridlines=false' +      // Don't show gridlines
    '&fzr=false' +            // Don't repeat frozen rows
    '&gid=' + sheetId +       // Specific sheet ID
    '&scale=4';               // Fit to page

  const token = ScriptApp.getOAuthToken();
  const response = UrlFetchApp.fetch(url, {
    headers: { 'Authorization': 'Bearer ' + token }
  });

  return response.getBlob().setName(sheet.getName() + '.pdf');
}
```

### Updated Function: `generateCertificatePDF()` (Lines ~1166+)

**Key Changes:**

1. **Get Signatory** (Line ~1152-1153):
```javascript
// Get signatory configuration
const signatory = getSignatoryConfig();
```

2. **Fill Signatory Fields** (Lines ~1168-1169, 1178-1179):
```javascript
// TOP certificate
tempSheet.getRange(15, 6).setValue(signatory.name);      // F15
tempSheet.getRange(16, 6).setValue(signatory.position);  // F16

// BOTTOM certificate
tempSheet.getRange(39, 6).setValue(signatory.name);      // F39
tempSheet.getRange(40, 6).setValue(signatory.position);  // F40
```

3. **Hide Gridlines** (Line ~1183-1184):
```javascript
// ISSUE 4 FIX: Hide gridlines
tempSheet.setHiddenGridlines(true);
```

4. **Clean Up Extra Rows/Columns** (Lines ~1186-1198):
```javascript
// ISSUE 2 FIX: Clean up extra rows and columns
const maxRow = tempSheet.getMaxRows();
const maxCol = tempSheet.getMaxColumns();

// Delete extra rows beyond row 44
if (maxRow > 44) {
  tempSheet.deleteRows(45, maxRow - 44);
}

// Delete extra columns beyond column F (column 6)
if (maxCol > 6) {
  tempSheet.deleteColumns(7, maxCol - 6);
}
```

5. **Set Print Area** (Lines ~1200-1202):
```javascript
// Set print area to A1:F44
tempSheet.getRange('A1:F44').activate();
ss.setNamedRange('Print_Area', tempSheet.getRange('A1:F44'));
```

6. **Use New PDF Converter** (Line ~1207-1208):
```javascript
// ISSUE 3 FIX: Convert to PDF with proper settings
const pdfBlob = convertSheetToPDF(ss, tempSheet);
```

### Deployment Instructions:

1. **Copy ALL THREE functions** to your Google Apps Script editor:
   - `getSignatoryConfig()`
   - `convertSheetToPDF()`
   - Updated `generateCertificatePDF()`

2. **Save** the script (Ctrl+S or Cmd+S)

3. **Test** by generating a certificate - verify:
   - ✅ Signatory name appears in F15 and F39
   - ✅ Signatory position appears in F16 and F40
   - ✅ PDF is exactly 1 page
   - ✅ No gridlines visible
   - ✅ Both certificates fit on one page

### Certificate Cell Mapping:

**TOP Certificate (Rows 1-23):**
- E4: Employee Name
- B6: Position
- F6: Office
- B9: Total Hours
- F15: **Signatory Name** ⭐ NEW
- F16: **Signatory Position** ⭐ NEW
- D19: Date Issued
- D20: Valid Until

**BOTTOM Certificate (Rows 24-44):**
- E28: Employee Name
- B30: Position
- F30: Office
- B33: Total Hours
- F39: **Signatory Name** ⭐ NEW
- F40: **Signatory Position** ⭐ NEW
- D43: Date Issued
- D44: Valid Until
