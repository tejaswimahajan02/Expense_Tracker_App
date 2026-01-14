# Runtime Error Fixes

## Common "Invariant Violation" Errors and Solutions

### 1. "Invariant Violation: Element type is invalid"

**Cause:** Component import/export mismatch

**Solutions:**

#### Check Default vs Named Exports
```javascript
// If component uses default export:
export default function MyComponent() { ... }
// Import as:
import MyComponent from './MyComponent';

// If component uses named export:
export function MyComponent() { ... }
// Import as:
import { MyComponent } from './MyComponent';
```

#### Fix Applied:
- Removed unused `Stack` import from App.js
- All screen components use default exports

---

### 2. "Invariant Violation: requireNativeComponent: MaterialCommunityIcons was not found"

**Cause:** Vector icons not loaded properly

**Solutions:**

#### Option A: Clear Cache and Restart
```bash
# Stop the server (Ctrl+C)
npx expo start --clear
```

#### Option B: Reinstall Vector Icons
```bash
npm install react-native-vector-icons --legacy-peer-deps
```

#### Option C: Use Expo Vector Icons Instead
Replace in MainNavigator.js:
```javascript
// Change from:
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// To:
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
```

---

### 3. "Invariant Violation: Text strings must be rendered within a <Text> component"

**Cause:** Trying to render plain text outside Text component

**Solution:**
```javascript
// Wrong:
<View>Hello World</View>

// Correct:
<View><Text>Hello World</Text></View>
```

---

### 4. "Invariant Violation: View config getter callback for component"

**Cause:** Native module not linked or incompatible version

**Solutions:**

#### Clear Everything
```bash
# Stop server
# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install --legacy-peer-deps

# Clear cache and restart
npx expo start --clear
```

---

### 5. "Invariant Violation: TurboModuleRegistry.getEnforcing(...)"

**Cause:** Native module mismatch with Expo version

**Solution:**
```bash
# Update to compatible versions
npx expo install --fix
```

---

## Quick Fixes to Try (In Order)

### 1. Reload the App
Press `r` in Expo terminal

### 2. Clear Cache
```bash
# Stop server (Ctrl+C)
npx expo start --clear
```

### 3. Restart Expo Go App
- Close Expo Go completely
- Reopen and reconnect

### 4. Check Console for Specific Error
Look for the exact error message after "Invariant Violation:"

### 5. Fix Vector Icons (Most Common)
```bash
# Install Expo vector icons
npx expo install @expo/vector-icons
```

Then update MainNavigator.js:
```javascript
import { MaterialCommunityIcons } from '@expo/vector-icons';

// In tabBarIcon:
return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
```

---

## Applied Fixes

### ✅ Fixed in App.js:
- Removed unused Stack import
- Added LogBox to ignore non-critical warnings
- Proper error handling in async functions

### ✅ Created metro.config.js:
- Proper Metro bundler configuration
- Asset loading optimization

### ✅ All Screens Verified:
- All use default exports
- Proper component structure
- No text outside Text components

---

## If Error Persists

### Get Exact Error Details:

1. **Check Metro Bundler Console**
   - Look for red error messages
   - Note the exact error text

2. **Check Expo Go App**
   - Tap on the error
   - Read full error message
   - Note the component/file mentioned

3. **Check Device Logs**
   ```bash
   # Android
   adb logcat | grep -i "error"
   
   # iOS
   # Check Xcode console
   ```

### Share This Information:
- Exact error message
- Component name mentioned
- Stack trace if available

---

## Specific Component Fixes

### If Error in DashboardScreen:
```javascript
// Check PieChart import
import { PieChart } from 'react-native-chart-kit';

// Ensure data format is correct
const chartData = categoryData.map((item, index) => ({
  name: item.name,
  amount: parseFloat(item.amount),
  color: getColor(index),
  legendFontColor: '#7F7F7F',
  legendFontSize: 12,
}));
```

### If Error in Navigation:
```javascript
// Ensure all screen components are properly imported
// Check that no circular dependencies exist
```

### If Error with Icons:
```javascript
// Use Expo vector icons (more reliable)
import { MaterialCommunityIcons } from '@expo/vector-icons';

<MaterialCommunityIcons 
  name="view-dashboard" 
  size={24} 
  color="#667eea" 
/>
```

---

## Prevention Tips

1. **Always use default exports for screens**
2. **Import from @expo/vector-icons instead of react-native-vector-icons**
3. **Clear cache after dependency changes**
4. **Keep Expo SDK versions consistent**
5. **Test on emulator first before physical device**

---

## Need More Help?

If you're still seeing the error:

1. **Take a screenshot** of the full error
2. **Copy the error text** from Metro console
3. **Note which screen** you're on when it happens
4. **Share the exact steps** to reproduce

This will help identify the specific issue!
