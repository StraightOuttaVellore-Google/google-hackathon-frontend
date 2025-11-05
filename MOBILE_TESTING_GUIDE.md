# How to Test Mobile Views on Desktop

## Method 1: Chrome DevTools (Recommended - Easiest)

1. **Open your app** in Chrome: `http://localhost:5173` (or your dev server URL)

2. **Open DevTools:**
   - Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
   - Or right-click → "Inspect"

3. **Toggle Device Toolbar:**
   - Press `Ctrl+Shift+M` (Windows) / `Cmd+Shift+M` (Mac)
   - Or click the device icon in the toolbar (📱)

4. **Select a device:**
   - Click the device dropdown at the top
   - Choose: iPhone SE, iPhone 12/13/14, iPhone 14 Pro Max, etc.
   - Or set custom dimensions

5. **Test different breakpoints:**
   - iPhone SE: 375px width
   - iPhone 12/13: 390px width
   - iPhone 14 Pro Max: 430px width
   - iPad: 768px width
   - Desktop: 1024px+ width

6. **Refresh the page** to see changes

## Method 2: Firefox DevTools

1. Open Firefox
2. Press `F12` to open DevTools
3. Click the "Responsive Design Mode" icon (📱) or press `Ctrl+Shift+M`
4. Select device from dropdown

## Method 3: Browser Window Resize

1. Open your app
2. Manually resize browser window
3. Watch how layout changes
4. Use DevTools to see current width (shown in toolbar)

## Method 4: Browser Extensions

### Window Resizer (Chrome Extension)
- Install "Window Resizer" extension
- Click extension icon → Select device size
- Window resizes automatically

## Recommended Testing Workflow

1. **Start Dev Server:**
   ```bash
   npm run dev
   ```

2. **Open Chrome DevTools** (F12)

3. **Enable Device Toolbar** (Ctrl+Shift+M)

4. **Test in this order:**
   - ✅ iPhone SE (375px) - Smallest modern device
   - ✅ iPhone 12/13 (390px) - Most common
   - ✅ iPhone 14 Pro Max (430px) - Largest phone
   - ✅ iPad (768px) - Tablet
   - ✅ Desktop (1024px+) - Original layout

5. **Test both orientations:**
   - Portrait (default)
   - Landscape (click rotate icon in DevTools)

6. **Test interactions:**
   - Click all buttons
   - Open all overlays
   - Scroll through content
   - Check navigation

## What to Look For

### ✅ Good Signs:
- No horizontal scrolling
- Text is readable (min 16px)
- Buttons are touchable (min 44x44px)
- Cards stack vertically on mobile
- Header elements don't overlap
- Overlays work correctly
- Forms are usable

### ❌ Bad Signs:
- Horizontal scrolling appears
- Text too small to read
- Buttons too small to click
- Content cut off or overlapping
- Layout breaks at certain widths
- Performance issues (laggy)

## Quick Test Checklist

After implementation, test:
- [ ] Study Dashboard loads correctly on mobile
- [ ] Wellness Dashboard loads correctly on mobile
- [ ] MoodBoard widget stacks vertically on mobile
- [ ] Bottom cards stack vertically on mobile
- [ ] Header elements (logo, dropdowns, toggle) don't overlap
- [ ] Calendar overlay opens and closes correctly
- [ ] History overlay opens and closes correctly
- [ ] Matrix overlay opens and closes correctly
- [ ] All buttons are clickable/touchable
- [ ] No horizontal scrolling
- [ ] Text is readable
- [ ] Works in portrait and landscape

## Pro Tips

1. **Keep DevTools open** while developing - see changes instantly
2. **Use multiple browser windows** - one for mobile view, one for desktop
3. **Test on real devices** when possible (deploy to staging or use ngrok)
4. **Use breakpoint debugger** - add temporary colored borders to see breakpoints:
   ```css
   @media (max-width: 768px) {
     body { border: 2px solid red; }
   }
   ```

## Command to Start Dev Server

```bash
cd GoogleFrontend/google-hackathon-frontend
npm run dev
```

Then open: `http://localhost:5173` (or the port shown in terminal)

