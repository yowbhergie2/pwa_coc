# Progressive Web App (PWA) Setup Guide

## Overview

Your CompTime Tracker application has been converted into a Progressive Web App! This document explains what was added and how to complete the setup.

---

## What's Been Added

### 1. **Web App Manifest** (`manifest.json`)
- Defines app metadata (name, description, icons, colors)
- Enables "Add to Home Screen" functionality
- Configures app appearance when installed

### 2. **Service Worker** (`service-worker.js`)
- Enables offline functionality
- Caches assets for faster loading
- Provides network resilience
- Supports background sync and push notifications (future)

### 3. **PWA Meta Tags** (in `Main.html`)
- Theme color for browser chrome
- Apple-specific meta tags for iOS devices
- App icons for various platforms
- Web app manifest link

---

## Required: Create App Icons

You need to create app icons in the following sizes. Place them in an `icons/` folder:

### Required Icon Sizes

| Size | File Name | Purpose |
|------|-----------|---------|
| 72x72 | `icon-72x72.png` | Small devices |
| 96x96 | `icon-96x96.png` | Badge icon |
| 128x128 | `icon-128x128.png` | Small tablets |
| 144x144 | `icon-144x144.png` | Medium tablets |
| 152x152 | `icon-152x152.png` | iOS devices |
| **192x192** | `icon-192x192.png` | **Required minimum for PWA** |
| 384x384 | `icon-384x384.png` | Large devices |
| **512x512** | `icon-512x512.png` | **Required for maskable icons** |

### Creating Icons

#### Option 1: Use an Online Generator (Easiest)
1. Create a single 512x512px icon with your app logo
2. Use one of these free tools to generate all sizes:
   - **PWA Asset Generator**: https://www.pwabuilder.com/imageGenerator
   - **RealFaviconGenerator**: https://realfavicongenerator.net/
   - **Favicon.io**: https://favicon.io/

3. Download the generated icons
4. Create `icons/` folder in your project root
5. Place all PNG files in the `icons/` folder

#### Option 2: Manual Creation
Using any image editor (Photoshop, GIMP, Figma, Canva):
1. Design a square icon (512x512px recommended)
2. Export in all required sizes listed above
3. Save as PNG files
4. Name them according to the table above
5. Place in `icons/` folder

#### Option 3: Command Line (ImageMagick)
If you have ImageMagick installed:

```bash
# Create icons folder
mkdir icons

# Generate all sizes from a single source image (replace 'logo.png' with your source)
convert logo.png -resize 72x72 icons/icon-72x72.png
convert logo.png -resize 96x96 icons/icon-96x96.png
convert logo.png -resize 128x128 icons/icon-128x128.png
convert logo.png -resize 144x144 icons/icon-144x144.png
convert logo.png -resize 152x152 icons/icon-152x152.png
convert logo.png -resize 192x192 icons/icon-192x192.png
convert logo.png -resize 384x384 icons/icon-384x384.png
convert logo.png -resize 512x512 icons/icon-512x512.png
```

### Icon Design Guidelines

**Best Practices:**
- Use a simple, recognizable design
- Avoid text (may be too small on smaller icons)
- Use high contrast colors
- Keep important elements centered (safe area: 80% of canvas)
- Use a transparent or solid color background
- Test on both light and dark backgrounds

**CompTime Tracker Suggestions:**
- Use a clock icon with overtime/time-off symbolism
- Include your organization's colors
- Consider using Bootstrap Icons as inspiration (e.g., clock, calendar, hourglass)

---

## Optional: Create Screenshots

For better installation prompts, add screenshots to the `screenshots/` folder:

1. **Desktop Screenshot** (`desktop-1.png`):
   - Recommended size: 1280x720px or 1920x1080px
   - Capture the main dashboard view

2. **Mobile Screenshot** (`mobile-1.png`):
   - Recommended size: 750x1334px (iPhone) or 1080x1920px (Android)
   - Capture mobile-optimized view

These screenshots appear in:
- Browser installation prompts
- App store listings (if published)
- PWA directories

---

## Deployment Steps

### For Google Apps Script Deployment

Since this app runs within Google Apps Script, you'll need to serve it as a web app:

1. **Deploy as Web App** (if not already done):
   ```
   In Apps Script Editor:
   - Click "Deploy" > "New deployment"
   - Select type: "Web app"
   - Description: "CompTime Tracker PWA"
   - Execute as: "Me"
   - Who has access: Choose appropriate access level
   - Click "Deploy"
   ```

2. **Update Service Worker Registration**:
   - The service worker registration code has been added to `app-script.html`
   - Make sure the deployment URL matches your actual deployment

3. **Test the PWA**:
   - Open your deployed web app URL in Chrome/Edge
   - Open DevTools (F12) > Application tab > Service Workers
   - Verify the service worker is registered and running
   - Check Manifest tab to verify manifest.json is loaded

4. **Install the PWA**:
   - Look for the install icon in the browser address bar
   - Or use browser menu: "Install CompTime Tracker..."
   - The app will be added to your device like a native app

### For Standalone Web Server Deployment

If deploying to a standard web server (Apache, Nginx, etc.):

1. **Upload all files** to your web server
2. **Ensure HTTPS** is enabled (required for service workers)
3. **Configure MIME types** (usually automatic):
   - `.json` → `application/json`
   - `.js` → `application/javascript`
4. **Access via HTTPS** and test installation

---

## Testing Your PWA

### 1. Lighthouse Audit (Chrome DevTools)
```
1. Open your app in Chrome
2. Press F12 to open DevTools
3. Go to "Lighthouse" tab
4. Select "Progressive Web App" category
5. Click "Generate report"
```

**Target Score**: 90+ for PWA compliance

### 2. Manual Testing Checklist

- [ ] App loads without errors
- [ ] Service worker registers successfully
- [ ] Manifest.json loads without errors
- [ ] Icons display correctly in DevTools
- [ ] Install prompt appears (may need to meet engagement criteria)
- [ ] App works offline (after initial load)
- [ ] App can be added to home screen
- [ ] Installed app opens in standalone mode
- [ ] Theme color appears correctly

### 3. Cross-Browser Testing

Test on:
- ✅ Chrome/Edge (Chromium) - Full PWA support
- ✅ Firefox - Good PWA support
- ⚠️ Safari (iOS/macOS) - Limited PWA support (no service worker install prompt)
- ⚠️ Samsung Internet - Full PWA support on Android

---

## Features Enabled

### Current Features ✅

1. **Offline Support**: App works without internet (cached resources)
2. **Installable**: Can be installed on desktop and mobile devices
3. **Fast Loading**: Cached assets load instantly
4. **Standalone Mode**: Runs in its own window (no browser UI)
5. **App-like Experience**: Full-screen on mobile devices
6. **Resilient**: Falls back to cache if network fails

### Future Enhancements 🚀

The service worker is prepared for:
1. **Push Notifications**: Alert users about overtime approvals, CTO expirations
2. **Background Sync**: Sync offline changes when connection restored
3. **Periodic Background Sync**: Check for updates while app is closed
4. **Advanced Caching**: Cache Firebase data for full offline functionality

---

## Troubleshooting

### Service Worker Not Registering

**Problem**: Service worker registration fails

**Solutions**:
1. Ensure you're accessing via HTTPS (or localhost)
2. Check browser console for errors
3. Verify `service-worker.js` is in the root directory
4. Clear browser cache and hard reload (Ctrl+Shift+R)

### Install Prompt Not Showing

**Problem**: No "Add to Home Screen" prompt

**Solutions**:
1. Ensure manifest.json is valid (check DevTools > Application > Manifest)
2. Add all required icons (at minimum: 192x192 and 512x512)
3. Meet engagement criteria (user has visited at least once)
4. Clear cache and revisit after 30+ seconds
5. Manually trigger: Chrome menu > "Install CompTime Tracker"

### Icons Not Displaying

**Problem**: Icons show as broken images

**Solutions**:
1. Verify icons exist in `icons/` folder
2. Check file names match exactly (case-sensitive)
3. Ensure icons are PNG format
4. Check browser console for 404 errors
5. Update manifest.json paths if icons are elsewhere

### Offline Mode Not Working

**Problem**: App doesn't work offline

**Solutions**:
1. Visit app at least once while online
2. Check Service Worker status in DevTools
3. Verify cached resources in DevTools > Application > Cache Storage
4. Force service worker update: DevTools > Application > Service Workers > "Update"

### Cache Not Clearing

**Problem**: Old version of app keeps loading

**Solutions**:
1. Update `CACHE_NAME` version in `service-worker.js`
2. Unregister service worker: DevTools > Application > Service Workers > "Unregister"
3. Clear all cache storage
4. Hard reload (Ctrl+Shift+R)

---

## Browser Support

| Browser | PWA Support | Notes |
|---------|-------------|-------|
| Chrome (Desktop) | ✅ Full | Recommended |
| Chrome (Android) | ✅ Full | Best mobile experience |
| Edge | ✅ Full | Chromium-based |
| Firefox | ✅ Good | Most features supported |
| Safari (iOS) | ⚠️ Limited | No install prompt, limited service worker |
| Safari (macOS) | ⚠️ Limited | Basic PWA support |
| Opera | ✅ Full | Chromium-based |
| Samsung Internet | ✅ Full | Android only |

---

## Security Considerations

### HTTPS Requirement
- Service workers require HTTPS in production
- Localhost is exempt (for development)
- Use Let's Encrypt for free HTTPS certificates

### Service Worker Permissions
- Service workers can intercept network requests
- Only register service workers from trusted sources
- Regularly update service worker to patch vulnerabilities

### Content Security Policy (CSP)
Consider adding CSP headers if deploying to standalone server:
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' https://cdn.jsdelivr.net https://cdn.sheetjs.com https://www.gstatic.com;
  style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
  connect-src 'self' https://*.googleapis.com https://*.firebaseio.com;
  img-src 'self' data: https:;
  font-src 'self' https://cdn.jsdelivr.net;
">
```

---

## Next Steps

1. **Create app icons** (see "Creating Icons" section above)
2. **Test the PWA** using Lighthouse and manual testing
3. **Deploy your app** via Google Apps Script or web server
4. **Share with users** and guide them to install
5. **Monitor usage** via Google Analytics or Firebase Analytics
6. **Iterate based on feedback**

---

## Resources

### Official Documentation
- [Progressive Web Apps (Google)](https://web.dev/progressive-web-apps/)
- [Service Worker API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest (MDN)](https://developer.mozilla.org/en-US/docs/Web/Manifest)

### Tools
- [PWA Builder](https://www.pwabuilder.com/) - Generate PWA assets
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - PWA auditing
- [Workbox](https://developers.google.com/web/tools/workbox) - Advanced service worker library

### Icon Generators
- [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator)
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [Favicon.io](https://favicon.io/)

---

## Support

If you encounter issues:
1. Check the Troubleshooting section above
2. Review browser console for errors
3. Test in Chrome DevTools (F12 > Application tab)
4. Verify all files are uploaded correctly
5. Ensure HTTPS is enabled (production)

---

**Version**: 2.0.0
**Last Updated**: 2025-11-14
**Status**: PWA Conversion Complete ✅

---

## Summary

Your CompTime Tracker is now a Progressive Web App! Complete these final steps:

1. ✅ Manifest created
2. ✅ Service worker created
3. ✅ PWA meta tags added
4. ⏳ **Create app icons** (icons folder)
5. ⏳ **Test with Lighthouse**
6. ⏳ **Deploy and share**

Once you add the icons, your app will be fully installable as a PWA on all supported devices!
