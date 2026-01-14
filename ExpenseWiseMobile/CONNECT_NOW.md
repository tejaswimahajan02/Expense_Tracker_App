# 📱 Connect Your Phone NOW

## Your Computer's IP: `10.118.161.3`

---

## Option 1: Scan QR Code (Easiest)

1. **Install Expo Go** on your phone:
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)

2. **Open Expo Go** app

3. **Scan the QR code** shown in your terminal

4. **Wait** for the app to load (may take 1-2 minutes first time)

---

## Option 2: Manual Connection (If QR doesn't work)

1. **Open Expo Go** app on your phone

2. **Tap "Enter URL manually"**

3. **Type this URL:**
   ```
   exp://10.118.161.3:8081
   ```

4. **Tap "Connect"**

---

## Option 3: Use Android Emulator (No phone needed)

1. **Start Android Studio** and launch an emulator

2. **In the Expo terminal, press `a`**

3. App will open automatically in emulator

---

## ⚠️ Important Checks

### Before connecting, make sure:

✅ **Same WiFi Network**
- Your phone and computer must be on the same WiFi
- Check WiFi name on both devices

✅ **Disable Mobile Data**
- Turn off mobile data on your phone
- Use WiFi only

✅ **Disable VPN**
- Turn off any VPN on phone or computer

✅ **Expo Server Running**
- You should see the QR code in terminal
- If not, run: `npx expo start --lan`

✅ **Django Backend Running**
- Open another terminal
- Run: `python manage.py runserver 0.0.0.0:8000`

---

## 🔥 If Still Can't Connect

### Try Tunnel Mode (Works anywhere):

1. **Stop current server** (Press Ctrl+C)

2. **Run with tunnel:**
   ```bash
   npx expo start --tunnel
   ```

3. **Wait for ngrok to install** (first time only)

4. **Scan the new QR code**

Tunnel mode works even if you're on different networks!

---

## 🐛 Troubleshooting

### "Couldn't connect to Metro"

**Solution:**
```bash
# Stop server (Ctrl+C)
# Clear cache and restart
npx expo start --clear --lan
```

### "Network request failed"

**Check Django:**
```bash
python manage.py runserver 0.0.0.0:8000
```

**Update Django settings.py:**
```python
ALLOWED_HOSTS = ['*']  # Allow all hosts for development
```

### Firewall Blocking

**Windows:**
1. Search "Windows Defender Firewall"
2. Click "Allow an app through firewall"
3. Find "Node.js" and check both Private and Public
4. Or temporarily disable firewall for testing

---

## ✅ Success Indicators

When connected successfully, you'll see:

1. **On Phone:** ExpenseWise landing screen
2. **In Terminal:** Log messages showing app activity
3. **Console Log:** `🌐 API Base URL: http://10.118.161.3:8000`

---

## 🎯 Quick Commands

While Expo is running:

- **`r`** - Reload app
- **`a`** - Open Android emulator
- **`m`** - Toggle menu
- **`j`** - Open debugger
- **Ctrl+C** - Stop server

---

## Need Help?

See [MOBILE_CONNECTION_GUIDE.md](./MOBILE_CONNECTION_GUIDE.md) for detailed troubleshooting.
