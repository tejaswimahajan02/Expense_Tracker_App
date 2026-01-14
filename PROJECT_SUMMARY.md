# ExpenseWise - Project Summary

## Quick Overview

**ExpenseWise** is a full-stack personal finance management system with:
- Django web application
- React Native mobile app (iOS & Android)
- REST API backend
- AI-powered expense categorization
- ML-based expense forecasting

---

## Technology Stack

### Backend
- **Framework:** Django 5.1.1
- **Database:** SQLite (dev) / MySQL (prod)
- **API:** Django REST Framework 3.15.2
- **ML:** scikit-learn, statsmodels, NLTK
- **Task Queue:** Celery + Redis

### Frontend (Web)
- **Templates:** Django Templates
- **CSS:** Bootstrap 4
- **Charts:** Chart.js

### Mobile
- **Framework:** React Native + Expo
- **Navigation:** React Navigation
- **State:** Context API
- **HTTP:** Axios

---

## Core Modules

### 1. Authentication (`authentication/`)
- User registration with email verification
- Login/logout
- Token-based API authentication

### 2. Expenses (`expenses/`)
- CRUD operations
- AI category prediction (Random Forest + TF-IDF)
- Search, sort, pagination
- Daily limit alerts

### 3. Income (`userincome/`)
- Multiple income sources
- CRUD operations
- Daily/weekly/monthly summaries
- Report generation (PDF, CSV, Excel)

### 4. Goals (`goals/`)
- Savings goal tracking
- Progress calculation
- Achievement notifications
- Daily savings recommendations

### 5. Forecast (`expense_forecast/`)
- ARIMA-based predictions
- 30-day expense forecast
- Visual trend analysis

### 6. Preferences (`userpreferences/`)
- Currency selection (200+ currencies)
- Daily expense limits
- User settings

### 7. Profile (`userprofile/`)
- User info editing
- Income source management

### 8. Reports (`report_generation/`)
- Automated weekly/monthly reports
- Email delivery via Celery

### 9. API (`api/`)
- REST endpoints for mobile
- Token authentication
- CRUD for expenses, income, goals
- AI prediction endpoint

---

## Key Features

### Web Application
✅ User authentication & email verification
✅ Expense tracking with AI categorization
✅ Income management
✅ Financial goals with progress tracking
✅ 30-day expense forecasting (ARIMA)
✅ Visual analytics (charts & graphs)
✅ Report generation (PDF, CSV, Excel)
✅ Multi-currency support
✅ Daily expense limit alerts
✅ Automated email reports

### Mobile App
✅ Cross-platform (iOS & Android)
✅ Token-based authentication
✅ Expense & income management
✅ Dashboard with charts
✅ AI category prediction
✅ Pull-to-refresh
✅ Bottom tab navigation
✅ Shared database with web app

---

## AI/ML Features

### 1. Expense Categorization
- **Algorithm:** Random Forest Classifier
- **Features:** TF-IDF vectorization
- **Process:** Text preprocessing → Vectorization → Classification
- **Learning:** Continuous learning from user corrections

### 2. Expense Forecasting
- **Algorithm:** ARIMA (5, 1, 0)
- **Prediction:** 30-day forecast
- **Visualization:** Matplotlib charts
- **Requirements:** Minimum 10 expenses

---

## Database Models

1. **User** (Django built-in)
2. **Expense** - amount, date, description, category, owner
3. **Category** - predefined expense categories
4. **ExpenseLimit** - daily spending limits
5. **UserIncome** - income entries
6. **Source** - income sources
7. **Goal** - savings goals
8. **UserPreference** - user settings
9. **Token** - API authentication

---

## API Endpoints

### Authentication
- `POST /api/login/` - Login
- `POST /api/register/` - Register

### Expenses
- `GET /api/expenses/` - List
- `POST /api/expenses/` - Create
- `PUT /api/expenses/{id}/` - Update
- `DELETE /api/expenses/{id}/` - Delete

### Income
- `GET /api/income/` - List
- `POST /api/income/` - Create
- `PUT /api/income/{id}/` - Update
- `DELETE /api/income/{id}/` - Delete

### Other
- `GET /api/categories/` - Categories
- `GET /api/goals/` - Goals
- `POST /api/predict-category/` - AI prediction

---

## Quick Start

### Backend
```bash
# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server (for mobile)
python manage.py runserver 0.0.0.0:8000
```

### Mobile App
```bash
cd ExpenseWiseMobile
npm install

# Update src/config/api.js with your IP
npm start
```

---

## Project Structure

```
ExpenseTracker/
├── api/                    # REST API
├── authentication/         # Auth module
├── expenses/              # Expense tracking
├── userincome/            # Income tracking
├── goals/                 # Financial goals
├── expense_forecast/      # ML forecasting
├── userpreferences/       # Settings
├── userprofile/           # Profile
├── report_generation/     # Reports
├── expensetracker/        # Django config
├── templates/             # HTML templates
├── static/                # CSS, JS, images
├── ExpenseWiseMobile/     # Mobile app
│   ├── src/
│   │   ├── screens/      # App screens
│   │   ├── navigation/   # Navigation
│   │   ├── config/       # API config
│   │   └── context/      # State management
│   └── package.json
├── manage.py
├── requirements.txt
└── dataset.csv           # ML training data
```

---

## User Flow

### Web Application
1. Landing page → Register → Email verification
2. Login → Dashboard (expense list)
3. Add expense → AI predicts category
4. View analytics → Charts & summaries
5. Generate forecast → 30-day predictions
6. Create goals → Track progress
7. Generate reports → Export PDF/CSV/Excel

### Mobile App
1. Landing screen → Login/Register
2. Dashboard → Balance & charts
3. Expenses tab → Add/edit/delete
4. Income tab → Manage income
5. Goals tab → Track savings
6. More tab → Settings & logout

---

## Data Synchronization

**Shared Database:**
- Web and mobile use same SQLite database
- Changes on one platform reflect on the other
- Pull-to-refresh on mobile for latest data
- Real-time sync via API

---

## Security

- Password hashing (PBKDF2)
- Token-based API authentication
- CSRF protection
- Email verification
- User-specific data isolation
- SQL injection prevention
- XSS protection

---

## Deployment

### Web
- Heroku, AWS, DigitalOcean, etc.
- Configure production database
- Set up Gunicorn + Nginx
- Enable HTTPS
- Start Celery workers

### Mobile
- `expo build:android` → Google Play
- `expo build:ios` → App Store
- Update API URL to production
- Configure app signing

---

## File Count & Statistics

- **Python Files:** 50+
- **JavaScript Files:** 30+
- **HTML Templates:** 20+
- **Total Lines of Code:** 10,000+
- **API Endpoints:** 15+
- **Mobile Screens:** 20+
- **Database Tables:** 9
- **Supported Currencies:** 200+

---

## Key Dependencies

### Backend
- Django 5.1.1
- djangorestframework 3.15.2
- pandas, numpy, scikit-learn
- statsmodels (ARIMA)
- nltk (NLP)
- matplotlib (charts)
- celery, redis
- xhtml2pdf, openpyxl

### Mobile
- React Native 0.81.5
- Expo SDK 54
- React Navigation 6
- Axios
- React Native Paper
- Chart Kit

---

## Documentation Files

1. **COMPREHENSIVE_PROJECT_README.md** - Complete documentation (this file)
2. **PROJECT_SUMMARY.md** - Quick summary
3. **README.md** - Original project README
4. **SETUP_COMPLETE.md** - Setup guide
5. **QUICK_REFERENCE.md** - Quick reference
6. **MOBILE_APP_SETUP.md** - Mobile setup
7. **START_BACKEND.md** - Backend start
8. **ExpenseWiseMobile/README.md** - Mobile docs

---

## License

MIT License - Copyright (c) 2023 Hemant Shirsath

---

**Built for better financial management** 💰📊📱
