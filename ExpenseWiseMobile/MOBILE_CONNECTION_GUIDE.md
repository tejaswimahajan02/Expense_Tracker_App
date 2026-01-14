# Mobile Connection Guide

## Quick Fix for Connection Issues

### Method 1: Use Android Emulator (Easiest)

If you have Android Studio installed:

1. **Start Android Emulator** from Android Studio
2. **In Expo terminal, press `a`**
3. App will automatically open in emulator
4. ✅ No network configuration needed!

---

### Method 2: Physical Device with LAN

#### Step 1: Check Network
- Ensure your phone and computer are on the **same WiFi network**
- Disable mobile data on your phone
- Disable VPN if active

#### Step 2: Find Your Computer's IP

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" under your WiFi adapter (e.g., 192.168.1.100)

**Mac/Linux:**
```bash
ifconfig | grep "inet "
```

#### Step 3: Start Expo with LAN Mode
```bash
npx expo start --lan
```

#### Step 4: Connect
1. Open **Expo Go** app on your phone
2. Scan the QR code
3. Wait for app to load

---

### Method 3: Tunnel Mode (If LAN doesn't work)

This works even if devices are on different networks:

```bash
npx expo start --tunnel
```

**Note:** First time will install @expo/ngrok globally

---

## Troubleshooting

### "Unable to connect to Metro"

**Solution 1: Check Firewall**
```bash
# Windows: Allow port 8081 through firewall
# Or temporarily disable Windows Defender Firewall for testing
```

**Solution 2: Use Tunnel Mode**
```bash
npx expo start --tunnel
```

### "Network request failed"

**Check Django Backend:**
```bash
# Make sure Django is running on 0.0.0.0:8000
python manage.py runserver 0.0.0.0:8000
```

**Check Django ALLOWED_HOSTS:**
Add your IP to `settings.py`:
```python
ALLOWED_HOSTS = ['localhost', '127.0.0.1', '192.168.1.100', '*']
```

### "Couldn't load exp://..."

1. **Clear Expo Go cache:**
   - Open Expo Go
   - Go to Settings
   - Clear cache

2. **Restart Expo server:**
   ```bash
   # Press Ctrl+C to stop
   npx expo start --clear
   ```

### QR Code not scanning

**Manual Connection:**
1. Note the URL shown (e.g., `exp://192.168.1.100:8081`)
2. Open Expo Go
3. Tap "Enter URL manually"
4. Type the URL
5. Tap "Connect"

---

## Connection Methods Comparison

| Method | Pros | Cons |
|--------|------|------|
| **Emulator** | ✅ Always works<br>✅ No network setup | ❌ Requires Android Studio<br>❌ Slower than physical device |
| **LAN** | ✅ Fast<br>✅ Best for development | ❌ Same WiFi required<br>❌ Firewall issues |
| **Tunnel** | ✅ Works anywhere<br>✅ No firewall issues | ❌ Slower<br>❌ Requires ngrok install |

---

## Recommended Approach

### For Development:
1. Try **Android Emulator** first (easiest)
2. If you need physical device, use **LAN mode**
3. Use **Tunnel mode** as last resort

### Commands:

```bash
# Default (LAN)
npx expo start

# Tunnel mode
npx expo start --tunnel

# LAN mode (explicit)
npx expo start --lan

# Localhost only
npx expo start --localhost
```

---

## Current Setup

Your app is configured with **automatic IP detection**. When it connects, check the console for:

```
🌐 API Base URL: http://[detected-ip]:8000
```

This confirms the backend connection will work.

---

## Still Can't Connect?

### Quick Checklist:
- [ ] Phone and computer on same WiFi
- [ ] Mobile data disabled on phone
- [ ] VPN disabled
- [ ] Expo Go app installed and updated
- [ ] Firewall allows port 8081
- [ ] Expo server is running
- [ ] Django backend is running on 0.0.0.0:8000

### Try This:
```bash
# Stop everything
Press Ctrl+C

# Clear cache and use tunnel
npx expo start --tunnel --clear
```

This should work in almost all cases!
