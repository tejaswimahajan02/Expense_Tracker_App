# ExpenseWise Mobile App

React Native Expo mobile application for ExpenseWise expense tracking system.

## Features

- 📱 Cross-platform (iOS & Android)
- 🔐 User authentication (Login/Register)
- 💰 Expense tracking with AI categorization
- 💵 Income management
- 📊 Dashboard with charts and statistics
- 🎯 Financial goals tracking
- 📈 Expense forecasting
- 📄 Reports generation

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Django backend running (see backend setup)

## Installation

1. **Install dependencies:**
   ```bash
   cd ExpenseWiseMobile
   npm install
   ```

2. **Configure API endpoint:**
   
   The app is pre-configured for Android emulator (`http://10.0.2.2:8000`).
   
   For other setups, see [API_CONFIG.md](./API_CONFIG.md) for detailed instructions.
   
   **Quick Reference:** 
   - Android emulator: `http://10.0.2.2:8000` (default)
   - iOS simulator: `http://localhost:8000`
   - Physical device: Your computer's IP (e.g., `http://192.168.1.100:8000`)

3. **Start the app:**
   ```bash
   npm start
   ```

4. **Run on device:**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or press `a` for Android emulator
   - Or press `i` for iOS simulator

## Backend Setup

The mobile app requires the Django backend to be running with REST API support.

### 1. Install additional Python packages:
```bash
pip install djangorestframework
```

### 2. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

### 3. Start Django server:
```bash
python manage.py runserver 0.0.0.0:8000
```

**Note:** Use `0.0.0.0:8000` to make the server accessible from your mobile device.

## Project Structure

```
ExpenseWiseMobile/
├── App.js                      # Main app entry point
├── src/
│   ├── config/
│   │   └── api.js             # API configuration
│   ├── context/
│   │   └── AuthContext.js     # Authentication context
│   ├── navigation/
│   │   ├── AuthNavigator.js   # Auth screens navigation
│   │   └── MainNavigator.js   # Main app navigation
│   └── screens/
│       ├── Auth/              # Authentication screens
│       │   ├── LandingScreen.js
│       │   ├── LoginScreen.js
│       │   └── RegisterScreen.js
│       └── Main/              # Main app screens
│           ├── DashboardScreen.js
│           ├── ExpensesScreen.js
│           ├── AddExpenseScreen.js
│           ├── EditExpenseScreen.js
│           ├── IncomeScreen.js
│           ├── AddIncomeScreen.js
│           ├── GoalsScreen.js
│           ├── ForecastScreen.js
│           └── SettingsScreen.js
├── package.json
└── app.json
```

## API Endpoints Used

- `POST /api/login/` - User login
- `POST /api/register/` - User registration
- `GET /api/expenses/` - Get expenses list
- `POST /api/expenses/` - Create expense
- `PUT /api/expenses/{id}/` - Update expense
- `DELETE /api/expenses/{id}/` - Delete expense
- `GET /api/income/` - Get income list
- `POST /api/income/` - Create income
- `GET /api/categories/` - Get expense categories
- `POST /api/predict-category/` - AI category prediction
- `GET /api/goals/` - Get financial goals

## Features Implementation Status

✅ **Completed:**
- User authentication (Login/Register)
- Landing page
- Dashboard with charts
- Expense management (CRUD)
- Income management (CRUD)
- AI-powered expense categorization
- Category prediction
- Settings screen

🚧 **In Progress:**
- Goals management
- Expense forecasting
- Reports generation
- User profile management

## Troubleshooting

### Cannot connect to backend

1. Make sure Django server is running on `0.0.0.0:8000`
2. Check your firewall settings
3. Verify the IP address in `src/config/api.js`
4. For Android emulator, use `10.0.2.2:8000`

### Token authentication errors

1. Make sure you've run migrations: `python manage.py migrate`
2. Check that `rest_framework.authtoken` is in INSTALLED_APPS
3. Verify token is being sent in request headers

### App crashes on startup

1. Clear Expo cache: `expo start -c`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check console for error messages

## Building for Production

### Android APK:
```bash
expo build:android
```

### iOS IPA:
```bash
expo build:ios
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
