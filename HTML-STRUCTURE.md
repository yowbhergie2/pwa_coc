# HTML Modular Structure

## Overview

Ang HTML file system ay na-refactor para maging **modular at maintainable**. Ang dating monolithic **Main.html** (4,449 lines) ay na-split into logical components.

## File Structure

```
firebase-coc/
├── Main.html              (39 lines) - Main entry point
├── Code.gs                - Backend Google Apps Script (with include() helper)
│
├── styles.html            (550 lines) - All CSS styles
├── navigation.html        (45 lines) - Navigation bar
├── page-views.html        (814 lines) - All application pages
├── modals.html            (157 lines) - Modal dialogs
└── app-script.html        (2,867 lines) - JavaScript application logic
```

## Main.html Structure

```html
<!DOCTYPE html>
<html>
<head>
  <!-- CDN links -->
  <?!= include('styles') ?>
</head>
<body>
  <?!= include('navigation') ?>
  <?!= include('page-views') ?>
  <?!= include('modals') ?>
  <?!= include('app-script') ?>
</body>
</html>
```

## Module Descriptions

### 1. **styles.html** (550 lines)
- All CSS styling rules
- Component styles (cards, buttons, forms, tables)
- Animation definitions
- Responsive design rules

### 2. **navigation.html** (45 lines)
- Top navigation bar
- Menu items (Dashboard, Employees, COC, Reports, Master)
- User info display

### 3. **page-views.html** (814 lines)
Contains all application page views:
- Dashboard (statistics and alerts)
- Employees Management
- Log Overtime Form
- Generate Certificate
- Employee Ledger
- Log CTO
- Reports (COC Liability)
- Holidays Management
- System Configuration
- Libraries (Offices & Positions)
- Historical Balance Migration

### 4. **modals.html** (157 lines)
Modal dialogs:
- Employee Modal (add/edit)
- Holiday Modal
- Library Modal (offices/positions)
- Universal Modal (success/error/confirm)

### 5. **app-script.html** (2,867 lines)
Complete JavaScript application:
- Firebase initialization
- Data loading and synchronization
- CRUD operations
- Form validation
- Event handlers
- Utility functions

## Benefits

✅ **Maintainability**: Easy to find and edit specific sections
✅ **Readability**: Clear separation of concerns
✅ **Reusability**: Modules can be reused or refactored independently
✅ **Version Control**: Easier to track changes in specific modules
✅ **Team Collaboration**: Multiple developers can work on different modules
✅ **Debugging**: Faster to locate and fix issues

## How Includes Work

The `include()` function in `Code.gs` loads external HTML files:

```javascript
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
```

Usage in HTML templates:
```html
<?!= include('filename') ?>
```

## Backup

The original monolithic file is preserved as `Main.html.backup` (4,449 lines).

---

**Refactored by:** Claude Code
**Date:** 2025-11-11
**Original Size:** 4,449 lines
**New Main.html:** 39 lines (~99% reduction!)
