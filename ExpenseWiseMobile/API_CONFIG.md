# API Configuration Guide

## Automatic IP Detection ✨

The mobile app now **automatically detects** the best API URL based on your setup!

### How It Works

The app intelligently chooses the correct URL:

- **Android Emulator**: Uses `http://10.0.2.2:8000` (special alias for host machine)
- **iOS Simulator**: Uses `http://localhost:8000`
- **Physical Devices**: Automatically detects your computer's IP from Expo's development server
- **Production**: Uses your production URL when `__DEV__` is false

### Current Configuration

Check the Metro bundler console when the app starts. You'll see:
```
🌐 API Base URL: http://YOUR_DETECTED_IP:8000
```

### No Configuration Needed! 🎉

In most cases, you don't need to change anything. The app will automatically:
1. Detect if you're using an emulator or physical device
2. Use the appropriate IP address
3. Connect to your Django backend on port 8000

### Manual Configuration (If Needed)

If auto-detection doesn't work for your setup, you can manually set the URL:

1. Open `ExpenseWiseMobile/src/config/api.js`
2. Find the `getApiUrl()` function
3. Modify the return value or add your custom logic

#### Example: Force a Specific IP
```javascript
const getApiUrl = () => {
  // Force a specific IP for all environments
  return 'http://192.168.1.100:8000';
};
```

#### Example: Different URLs for Different Platforms
```javascript
const getApiUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:8000';
  } else if (Platform.OS === 'ios') {
    return 'http://localhost:8000';
  }
  return 'http://192.168.1.100:8000';
};
```

### Important Notes

- Make sure your Django backend is running on port 8000
- Ensure your firewall allows connections on port 8000
- Both devices must be on the same WiFi network (for physical devices)
- The Django backend must have your IP in `ALLOWED_HOSTS` in `settings.py`

### Testing the Connection

1. Start your Django backend: `python manage.py runserver 0.0.0.0:8000`
2. Try to login or register in the mobile app
3. Check the Metro bundler console for any network errors
