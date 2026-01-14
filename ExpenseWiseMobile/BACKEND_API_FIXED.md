# ✅ Backend API Connection Fixed

## Issue Resolved: CSRF Cookie Error

### Problem
The mobile app was getting "403 Forbidden (CSRF cookie not set)" errors when trying to login or register.

### Root Cause
The mobile app was calling the wrong API endpoints:
- ❌ Was calling: `/authentication/login/` (web view endpoint)
- ❌ Was calling: `/authentication/register/` (web view endpoint)

These are Django template views that require CSRF tokens for web browsers.

### Solution Applied

**Updated API Endpoints:**
- ✅ Now calling: `/api/login/` (REST API endpoint)
- ✅ Now calling: `/api/register/` (REST API endpoint)

These API endpoints:
- Have `@permission_classes([AllowAny])` - no authentication required
- Return JSON responses with tokens
- Don't require CSRF tokens
- Are designed for mobile/API clients

### Files Modified

1. **LoginScreen.js**
   - Changed endpoint from `/authentication/login/` to `/api/login/`
   - Already handles token response correctly

2. **RegisterScreen.js**
   - Changed endpoint from `/authentication/register/` to `/api/register/`
   - Now auto-logs in user after registration
   - Uses returned token immediately

### API Endpoints Available

#### Authentication
- `POST /api/login/` - Login and get token
  ```json
  Request: { "username": "user", "password": "pass" }
  Response: { "token": "abc123...", "user": {...} }
  ```

- `POST /api/register/` - Register new user
  ```json
  Request: { "username": "user", "email": "user@example.com", "password": "pass" }
  Response: { "token": "abc123...", "user": {...} }
  ```

#### Expenses (Requires Token)
- `GET /api/expenses/` - List expenses
- `POST /api/expenses/` - Create expense
- `PUT /api/expenses/{id}/` - Update expense
- `DELETE /api/expenses/{id}/` - Delete expense

#### Income (Requires Token)
- `GET /api/income/` - List income
- `POST /api/income/` - Create income
- `PUT /api/income/{id}/` - Update income
- `DELETE /api/income/{id}/` - Delete income

#### Categories (Requires Token)
- `GET /api/categories/` - List categories

#### Goals (Requires Token)
- `GET /api/goals/` - List goals
- `POST /api/goals/` - Create goal
- `PUT /api/goals/{id}/` - Update goal
- `DELETE /api/goals/{id}/` - Delete goal

#### AI Features (Requires Token)
- `POST /api/predict-category/` - Predict expense category
  ```json
  Request: { "description": "coffee at starbucks" }
  Response: { "predicted_category": "Food & Dining" }
  ```

### How It Works Now

1. **User Registers:**
   - App sends POST to `/api/register/`
   - Backend creates user and returns token
   - App automatically logs in user with token
   - User sees dashboard immediately

2. **User Logs In:**
   - App sends POST to `/api/login/`
   - Backend validates credentials and returns token
   - App stores token in AsyncStorage
   - Token is automatically added to all future requests

3. **Authenticated Requests:**
   - All API requests include: `Authorization: Token abc123...`
   - Backend validates token
   - Returns user-specific data

### Testing

**Try Now:**
1. Open the mobile app
2. Tap "Get Started"
3. Register a new account
4. You should be logged in automatically
5. Try adding an expense

**Or Login:**
1. Tap "I Already Have an Account"
2. Enter credentials
3. Should login successfully

### No More CSRF Errors! 🎉

The app now uses proper REST API endpoints that are designed for mobile clients. No CSRF tokens needed!

### Additional Notes

- The API uses Token Authentication (not session-based)
- Tokens are stored securely in AsyncStorage
- Tokens persist across app restarts
- Logout removes the token

### If You Still See Errors

Check that:
1. Django backend is running: `python manage.py runserver 0.0.0.0:8000`
2. `rest_framework.authtoken` is in INSTALLED_APPS (already configured)
3. API endpoints are accessible: Try `http://YOUR_IP:8000/api/` in browser

Everything should work now! 🚀
