# 📊 ExpenseWise - Complete Project Documentation

## 🎯 Project Overview

**ExpenseWise** is a comprehensive personal finance management system that helps users track expenses, manage income, set financial goals, and predict future spending patterns using AI/ML algorithms. The project consists of:

1. **Django Web Application** - Full-featured web interface
2. **React Native Mobile App** - Cross-platform mobile application (iOS & Android)
3. **REST API** - Backend API for mobile app integration
4. **AI/ML Features** - Automated expense categorization and forecasting

---

## 📁 Project Structure

```
ExpenseTracker/
├── api/                          # REST API for mobile app
├── authentication/               # User authentication & registration
├── expenses/                     # Expense management module
├── userincome/                   # Income tracking module
├── goals/                        # Financial goals management
├── expense_forecast/             # ML-based expense prediction
├── userpreferences/              # User settings & preferences
├── userprofile/                  # User profile management
├── report_generation/            # Automated report generation
├── expensetracker/              # Django project settings
├── templates/                    # HTML templates for web app
├── static/                       # CSS, JS, images
├── ExpenseWiseMobile/           # React Native mobile app
├── manage.py                     # Django management script
├── requirements.txt              # Python dependencies
├── currencies.json               # Currency data
├── dataset.csv                   # ML training dataset
└── mydatabase                    # SQLite database
```

---

## 🚀 Key Features

### Web Application Features

✅ **User Authentication**
- User registration with email verification
- Secure login/logout
- Password reset functionality
- Token-based authentication for API

✅ **Expense Management**
- Add, edit, delete expenses
- AI-powered automatic categorization
- Search and filter expenses
- Sort by amount, date, category
- Daily expense limit alerts
- Email notifications when limit exceeded

✅ **Income Tracking**
- Multiple income sources
- Add, edit, delete income entries
- Income categorization
- Date validation
- Search functionality

✅ **Dashboard & Analytics**
- Visual expense breakdown (pie charts)
- Income vs Expense comparison
- Daily, weekly, monthly, yearly summaries
- Category-wise expense analysis
- Real-time balance calculation

✅ **Expense Forecasting**
- ARIMA-based ML model for predictions
- 30-day expense forecast
- Category-wise predictions
- Visual trend analysis
- Historical data comparison

✅ **Financial Goals**
- Set savings goals with deadlines
- Track progress towards goals
- Daily savings recommendations
- Goal achievement notifications
- Email alerts on goal completion

✅ **Reports Generation**
- Custom date range reports
- Export to PDF, CSV, Excel
- Income and expense summaries
- Automated weekly/monthly email reports
- Visual charts and graphs

✅ **User Preferences**
- Multi-currency support (200+ currencies)
- Daily expense limit settings
- Customizable categories
- Income source management
- Profile customization

### Mobile App Features

✅ **Cross-Platform Support**
- iOS and Android compatible
- Built with React Native & Expo
- Native performance
- Responsive design

✅ **Authentication**
- Login and registration
- Token-based authentication
- Secure credential storage
- Auto-login functionality

✅ **Expense Management**
- View all expenses
- Add new expenses
- Edit existing expenses
- Delete expenses
- AI category prediction
- Date picker integration

✅ **Income Management**
- View income list
- Add income entries
- Edit income
- Delete income
- Source categorization

✅ **Dashboard**
- Current balance display
- Income vs Expenses chart
- Category breakdown (pie chart)
- Quick action buttons
- Pull-to-refresh

✅ **Navigation**
- Bottom tab navigation
- Stack navigation
- Smooth transitions
- Intuitive UI/UX

---

## 🏗️ Architecture & Technology Stack

### Backend (Django)

**Framework:** Django 5.1.1
**Database:** SQLite (development) / MySQL (production ready)
**API:** Django REST Framework 3.15.2

**Key Libraries:**
- `djangorestframework` - REST API
- `djangorestframework.authtoken` - Token authentication
- `pandas` - Data manipulation
- `numpy` - Numerical operations
- `scikit-learn` - Machine learning
- `statsmodels` - Time series forecasting
- `nltk` - Natural language processing
- `matplotlib` - Data visualization
- `xhtml2pdf` - PDF generation
- `openpyxl` - Excel export
- `celery` - Task scheduling
- `redis` - Caching & task queue

### Frontend (Web)

**Template Engine:** Django Templates
**CSS Framework:** Bootstrap 4
**JavaScript Libraries:**
- jQuery
- Chart.js (data visualization)
- Feather Icons

### Mobile App

**Framework:** React Native with Expo SDK 54
**Navigation:** React Navigation 6
**State Management:** React Context API
**HTTP Client:** Axios

**Key Dependencies:**
- `@react-navigation/native` - Navigation
- `@react-navigation/bottom-tabs` - Tab navigation
- `@react-navigation/stack` - Stack navigation
- `react-native-paper` - UI components
- `react-native-chart-kit` - Charts
- `@react-native-async-storage/async-storage` - Local storage
- `@react-native-community/datetimepicker` - Date picker
- `expo-linear-gradient` - Gradients

---

## 📦 Installation & Setup

### Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn
- Git

### Backend Setup

1. **Clone the repository:**
```bash
git clone <repository-url>
cd ExpenseTracker
```

2. **Create virtual environment:**
```bash
python -m venv venv
```

3. **Activate virtual environment:**
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

4. **Install dependencies:**
```bash
pip install -r requirements.txt
```

5. **Download NLTK data:**
```bash
python nltk_downloader.py
```

6. **Run migrations:**
```bash
python manage.py migrate
```

7. **Create superuser:**
```bash
python manage.py createsuperuser
```

8. **Start development server:**
```bash
# For web only
python manage.py runserver

# For mobile app access
python manage.py runserver 0.0.0.0:8000
```

### Mobile App Setup

1. **Navigate to mobile app directory:**
```bash
cd ExpenseWiseMobile
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure API endpoint:**

Edit `src/config/api.js`:
```javascript
// For physical device, use your computer's IP
export const API_BASE_URL = 'http://YOUR_IP_ADDRESS:8000';

// For Android emulator
export const API_BASE_URL = 'http://10.0.2.2:8000';

// For iOS simulator
export const API_BASE_URL = 'http://localhost:8000';
```

4. **Find your IP address:**
```bash
# Windows
ipconfig

# macOS/Linux
ifconfig
```

5. **Start the app:**
```bash
npm start
# or
expo start
```

6. **Run on device:**
- Install "Expo Go" app on your phone
- Scan QR code from terminal
- Or press 'a' for Android emulator
- Or press 'i' for iOS simulator

---

## 📱 Module Details

### 1. Authentication Module (`authentication/`)

**Purpose:** Handles user registration, login, logout, and email verification

**Files:**
- `models.py` - No custom models (uses Django User)
- `views.py` - Registration, login, logout, email verification views
- `urls.py` - Authentication URL patterns
- `utils.py` - Token generation for email verification

**Key Features:**
- Email validation
- Username validation
- Password strength validation
- Email verification with activation link
- Secure password hashing
- Session management

**Flow:**
1. User registers → Account created (inactive)
2. Activation email sent with unique token
3. User clicks link → Account activated
4. User can login → Session created
5. User can logout → Session destroyed

### 2. Expenses Module (`expenses/`)

**Purpose:** Core expense tracking functionality

**Files:**
- `models.py` - Expense, Category, ExpenseLimit models
- `views.py` - CRUD operations, search, statistics
- `urls.py` - Expense-related URLs
- `admin.py` - Admin interface configuration

**Models:**
- **Expense:** amount, date, description, category, owner
- **Category:** name (predefined categories)
- **ExpenseLimit:** daily_expense_limit, owner

**Key Features:**
- Add expense with AI category prediction
- Edit/delete expenses
- Search expenses by amount, date, description, category
- Sort by amount or date (ascending/descending)
- Pagination (5 items per page)
- Daily expense limit tracking
- Email alerts when limit exceeded
- Category-wise expense summary
- Date validation (no future dates)
- Dataset update for ML model

**AI Integration:**
- Uses TF-IDF vectorization
- Random Forest Classifier
- Cosine similarity for matching
- Automatic category prediction
- Continuous learning from user corrections

### 3. User Income Module (`userincome/`)

**Purpose:** Track income from various sources

**Files:**
- `models.py` - UserIncome, Source models
- `views.py` - Income CRUD, summaries, reports
- `urls.py` - Income URL patterns

**Models:**
- **UserIncome:** amount, date, description, source, owner
- **Source:** name, owner (custom income sources)

**Key Features:**
- Multiple income sources
- Add/edit/delete income
- Search functionality
- Sort by amount or date
- Daily, weekly, monthly, yearly summaries
- Monthly income chart
- Report generation (PDF, CSV, Excel)
- Date range filtering
- Income vs Expense comparison

**Reports:**
- Custom date range selection
- Combined income and expense report
- Savings calculation
- Export formats: PDF, CSV, XLSX
- Email delivery option

### 4. Goals Module (`goals/`)

**Purpose:** Financial goal setting and tracking

**Files:**
- `models.py` - Goal model
- `views.py` - Goal management, progress tracking
- `urls.py` - Goal URL patterns
- `forms.py` - Goal and amount forms

**Model:**
- **Goal:** name, start_date, end_date, amount_to_save, current_saved_amount, owner

**Key Features:**
- Create savings goals
- Set target amount and deadline
- Add money towards goals
- Progress calculation (percentage)
- Daily savings recommendation
- Goal achievement detection
- Congratulatory email on completion
- Automatic goal deletion when achieved
- Validation (prevent over-saving)

**Calculations:**
- Saved percentage: (current_saved / target) × 100
- Days remaining: end_date - today
- Daily savings required: (target - current) / days_remaining

### 5. Expense Forecast Module (`expense_forecast/`)

**Purpose:** Predict future expenses using ML

**Files:**
- `models.py` - No models (uses Expense model)
- `views.py` - Forecasting logic
- `urls.py` - Forecast URL

**Technology:**
- ARIMA (AutoRegressive Integrated Moving Average)
- Order: (5, 1, 0)
- 30-day forecast
- Historical data: Last 30 expenses

**Features:**
- Time series analysis
- 30-day expense prediction
- Category-wise forecasts
- Visual trend charts
- Total forecasted amount
- Minimum 10 expenses required
- Matplotlib chart generation

**Output:**
- Daily predicted expenses
- Total forecast amount
- Category breakdown
- Visual plot (saved as image)

### 6. User Preferences Module (`userpreferences/`)

**Purpose:** User settings and preferences

**Files:**
- `models.py` - UserPreference model
- `views.py` - Preference management
- `urls.py` - Preference URL

**Model:**
- **UserPreference:** user, currency

**Features:**
- Currency selection (200+ currencies)
- Daily expense limit setting
- Preference persistence
- Default values
- Currency display across app

**Supported Currencies:**
- All major world currencies
- Cryptocurrency (Bitcoin)
- Precious metals (Gold, Silver)
- Loaded from `currencies.json`

### 7. User Profile Module (`userprofile/`)

**Purpose:** User profile and income source management

**Files:**
- `models.py` - No custom models
- `views.py` - Profile editing, source management
- `urls.py` - Profile URLs
- `forms.py` - Profile form

**Features:**
- Edit username, first name, last name, email
- Add custom income sources
- Delete income sources
- View all sources
- Profile validation

### 8. Report Generation Module (`report_generation/`)

**Purpose:** Automated report generation and email delivery

**Files:**
- `models.py` - No models
- `views.py` - No views (background tasks)
- `tasks.py` - Celery tasks for scheduled reports

**Features:**
- Weekly report generation (every Sunday)
- Monthly report generation (1st of month)
- Excel format reports
- Email delivery to users
- Separate sheets for income and expenses
- Total calculations
- User-specific reports

**Technology:**
- Celery for task scheduling
- Redis as message broker
- Pandas for data processing
- Django email backend

### 9. API Module (`api/`)

**Purpose:** REST API for mobile app

**Files:**
- `models.py` - No custom models
- `views.py` - API endpoints and ViewSets
- `urls.py` - API URL routing
- `serializers.py` - Data serialization

**Endpoints:**

**Authentication:**
- `POST /api/login/` - Login (returns token)
- `POST /api/register/` - Register new user

**Expenses:**
- `GET /api/expenses/` - List expenses (paginated)
- `POST /api/expenses/` - Create expense
- `GET /api/expenses/{id}/` - Get expense detail
- `PUT /api/expenses/{id}/` - Update expense
- `DELETE /api/expenses/{id}/` - Delete expense

**Income:**
- `GET /api/income/` - List income
- `POST /api/income/` - Create income
- `GET /api/income/{id}/` - Get income detail
- `PUT /api/income/{id}/` - Update income
- `DELETE /api/income/{id}/` - Delete income

**Categories:**
- `GET /api/categories/` - List all categories

**Goals:**
- `GET /api/goals/` - List goals
- `POST /api/goals/` - Create goal
- `GET /api/goals/{id}/` - Get goal detail
- `PUT /api/goals/{id}/` - Update goal
- `DELETE /api/goals/{id}/` - Delete goal

**AI:**
- `POST /api/predict-category/` - Predict expense category
- `POST /api/update-dataset/` - Update ML dataset

**Authentication:**
- Token-based authentication
- Header: `Authorization: Token <token>`
- Tokens stored in database
- Automatic token generation on registration

**Serializers:**
- ExpenseSerializer
- IncomeSerializer
- CategorySerializer
- GoalSerializer
- UserSerializer

### 10. Django Project Settings (`expensetracker/`)

**Files:**
- `settings.py` - Project configuration
- `urls.py` - Main URL routing
- `wsgi.py` - WSGI configuration
- `asgi.py` - ASGI configuration
- `celery.py` - Celery configuration

**Installed Apps:**
- Django core apps
- `rest_framework` - REST API
- `rest_framework.authtoken` - Token auth
- All custom apps

**Middleware:**
- Security middleware
- Session middleware
- CSRF middleware
- Authentication middleware
- Message middleware

**Database:**
- SQLite (development): `mydatabase`
- MySQL (production ready)

**Email Configuration:**
- SMTP backend (Gmail)
- Email verification
- Report delivery
- Goal notifications

**REST Framework Settings:**
- Token authentication
- Session authentication
- IsAuthenticated permission
- Pagination (10 items per page)

**CORS Settings:**
- Allow all origins (development)
- Configure for production

---

## 🎨 Web Application Flow

### User Journey

1. **Landing Page** (`/`)
   - Beautiful gradient hero section
   - Feature showcase
   - Call-to-action buttons
   - Login/Register links

2. **Registration** (`/authentication/register/`)
   - Username validation (alphanumeric only)
   - Email validation
   - Password strength check
   - Email verification sent
   - Activation required

3. **Email Verification**
   - Click activation link
   - Account activated
   - Redirect to login

4. **Login** (`/authentication/login/`)
   - Username/password authentication
   - Session creation
   - Redirect to dashboard

5. **Dashboard** (`/dashboard/`)
   - Expense list (paginated)
   - Search functionality
   - Sort options
   - Add expense button
   - Quick stats

6. **Add Expense** (`/add-expense`)
   - Amount input
   - Description field
   - AI category prediction
   - Date picker
   - Manual category override
   - Daily limit check
   - Email alert if exceeded

7. **Income Management** (`/income/`)
   - Income list
   - Add income
   - Edit/delete income
   - Search and sort
   - Source management

8. **Expense Summary** (`/stats`)
   - Category-wise pie chart
   - Last 6 months data
   - Visual breakdown

9. **Income Summary** (`/income/income-summary/`)
   - Daily income
   - Weekly income
   - Monthly income
   - Yearly income
   - Monthly chart

10. **Forecast** (`/forecast/`)
    - 30-day prediction
    - Visual trend chart
    - Category forecasts
    - Total amount

11. **Reports** (`/income/report/`)
    - Date range selection
    - Income and expense list
    - Savings calculation
    - Export options (PDF, CSV, Excel)

12. **Goals** (`/goals/list_goals/`)
    - Active goals list
    - Progress bars
    - Add money
    - Create new goal
    - Delete goal

13. **Preferences** (`/preferences/`)
    - Currency selection
    - Daily expense limit
    - Save settings

14. **Profile** (`/account/`)
    - Edit user info
    - Manage income sources
    - Add/delete sources

15. **Logout** (`/authentication/logout/`)
    - Session destroyed
    - Redirect to landing

---

## 📱 Mobile App Flow

### Screen Navigation

**Authentication Stack:**
1. **Splash Screen**
   - App logo
   - Loading indicator
   - Token check

2. **Landing Screen**
   - App introduction
   - Feature highlights
   - Login button
   - Register button

3. **Login Screen**
   - Username input
   - Password input
   - Login button
   - Register link
   - Error handling

4. **Register Screen**
   - Username input
   - Email input
   - Password input
   - Register button
   - Login link
   - Validation

**Main App (Bottom Tabs):**

**Tab 1: Dashboard**
- Current balance card
- Income vs Expense summary
- Category pie chart
- Quick action buttons
- Pull-to-refresh

**Tab 2: Expenses**
- Expense list (scrollable)
- Search bar
- Add expense FAB
- Swipe actions
- Empty state

**Expense Screens:**
- **Add Expense:**
  - Amount input
  - Description field
  - Category picker (with AI prediction)
  - Date picker
  - Save button
  
- **Edit Expense:**
  - Pre-filled form
  - Update button
  - Delete button

**Tab 3: Income**
- Income list
- Add income FAB
- Edit/delete actions

**Income Screens:**
- **Add Income:**
  - Amount input
  - Description field
  - Source picker
  - Date picker
  - Save button
  
- **Edit Income:**
  - Pre-filled form
  - Update button
  - Delete button

**Tab 4: Goals**
- Goals list
- Progress indicators
- Add goal button
- Add money button

**Goal Screens:**
- **Add Goal:**
  - Goal name
  - Target amount
  - Start date
  - End date
  - Create button

**Tab 5: More**
- Settings options
- Profile link
- Forecast link
- Reports link
- Logout button

### Data Synchronization

**Real-time Sync:**
- Pull-to-refresh on all list screens
- Automatic refresh after CRUD operations
- Token-based authentication
- Shared database with web app

**Offline Handling:**
- Error messages for network failures
- Retry mechanisms
- Loading states

---

## 🤖 AI/ML Features

### 1. Expense Categorization

**Algorithm:** Random Forest Classifier with TF-IDF

**Process:**
1. **Data Preprocessing:**
   - Tokenization using NLTK
   - Lowercase conversion
   - Stop words removal
   - Alphanumeric filtering

2. **Feature Extraction:**
   - TF-IDF vectorization
   - Term frequency calculation
   - Inverse document frequency

3. **Model Training:**
   - Random Forest Classifier
   - Training data from `dataset.csv`
   - Continuous learning from user corrections

4. **Prediction:**
   - User enters description
   - Text preprocessing
   - TF-IDF transformation
   - Cosine similarity matching
   - Category prediction
   - User can override

5. **Dataset Update:**
   - User corrections saved
   - Dataset updated automatically
   - Model retrained
   - Improved accuracy over time

**Categories:**
- Food & Dining
- Transportation
- Shopping
- Entertainment
- Bills & Utilities
- Healthcare
- Education
- Travel
- Personal Care
- Others

### 2. Expense Forecasting

**Algorithm:** ARIMA (AutoRegressive Integrated Moving Average)

**Parameters:**
- Order: (5, 1, 0)
- p=5: Autoregressive terms
- d=1: Differencing order
- q=0: Moving average terms

**Process:**
1. **Data Collection:**
   - Fetch last 30 expenses
   - Sort by date
   - Create time series

2. **Model Fitting:**
   - ARIMA model initialization
   - Parameter optimization
   - Model fitting

3. **Forecasting:**
   - 30-day prediction
   - Daily expense amounts
   - Confidence intervals

4. **Visualization:**
   - Historical data plot
   - Forecast line
   - Matplotlib chart
   - Saved as image

5. **Analysis:**
   - Total forecasted amount
   - Category-wise breakdown
   - Trend identification

**Requirements:**
- Minimum 10 expenses
- Recent data preferred
- Regular spending patterns

---

## 🔐 Security Features

### Authentication & Authorization
- Secure password hashing (Django's PBKDF2)
- Token-based API authentication
- Session management
- CSRF protection
- Email verification
- User-specific data isolation

### Data Protection
- SQL injection prevention (Django ORM)
- XSS protection (template escaping)
- HTTPS ready
- Secure cookie settings
- Password validation rules

### API Security
- Token authentication required
- Permission classes
- Rate limiting ready
- CORS configuration
- Input validation

---

## 📊 Database Schema

### User (Django built-in)
- id (PK)
- username (unique)
- email (unique)
- password (hashed)
- first_name
- last_name
- is_active
- date_joined

### Expense
- id (PK)
- amount (float)
- date (date)
- description (text)
- category (varchar)
- owner (FK → User)

### Category
- id (PK)
- name (varchar, unique)

### ExpenseLimit
- id (PK)
- owner (FK → User)
- daily_expense_limit (integer)

### UserIncome
- id (PK)
- amount (float)
- date (date)
- description (text)
- source (varchar)
- owner (FK → User)

### Source
- id (PK)
- name (varchar)
- owner (FK → User)

### Goal
- id (PK)
- name (varchar)
- start_date (date)
- end_date (date)
- amount_to_save (decimal)
- current_saved_amount (decimal)
- owner (FK → User)

### UserPreference
- id (PK)
- user (FK → User, one-to-one)
- currency (varchar)

### Token (Django REST Framework)
- key (PK)
- user (FK → User, one-to-one)
- created (datetime)

---

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- [ ] Register new user
- [ ] Receive activation email
- [ ] Activate account
- [ ] Login with credentials
- [ ] Logout successfully

**Expenses:**
- [ ] Add expense with AI prediction
- [ ] Edit expense
- [ ] Delete expense
- [ ] Search expenses
- [ ] Sort expenses
- [ ] Exceed daily limit (check email)

**Income:**
- [ ] Add income
- [ ] Edit income
- [ ] Delete income
- [ ] View summaries

**Goals:**
- [ ] Create goal
- [ ] Add money to goal
- [ ] Achieve goal (check email)
- [ ] Delete goal

**Forecast:**
- [ ] Generate forecast (with 10+ expenses)
- [ ] View predictions
- [ ] Check chart

**Reports:**
- [ ] Generate report
- [ ] Export PDF
- [ ] Export CSV
- [ ] Export Excel

**Mobile App:**
- [ ] Login on mobile
- [ ] View dashboard
- [ ] Add expense
- [ ] Add income
- [ ] Sync with web app

### Integration Testing

**Web ↔ Mobile Sync:**
1. Add expense on web → Refresh mobile → Verify appears
2. Add expense on mobile → Refresh web → Verify appears
3. Edit on web → Refresh mobile → Verify updated
4. Delete on mobile → Refresh web → Verify removed

---

## 🚀 Deployment

### Web Application (Django)

**Production Checklist:**
1. Set `DEBUG = False`
2. Configure `ALLOWED_HOSTS`
3. Use PostgreSQL/MySQL
4. Set up static files serving
5. Configure email backend
6. Set up Redis for Celery
7. Use environment variables for secrets
8. Enable HTTPS
9. Set up backup system

**Deployment Options:**
- Heroku
- AWS (EC2, Elastic Beanstalk)
- DigitalOcean
- PythonAnywhere
- Google Cloud Platform

**Steps:**
1. Install dependencies on server
2. Configure database
3. Run migrations
4. Collect static files
5. Set up Gunicorn/uWSGI
6. Configure Nginx
7. Set up SSL certificate
8. Start Celery workers

### Mobile App

**Android:**
```bash
expo build:android
```
- Generates APK or AAB
- Submit to Google Play Store
- Configure app signing
- Set up app listing

**iOS:**
```bash
expo build:ios
```
- Generates IPA
- Submit to App Store
- Apple Developer account required
- Configure certificates

**Configuration:**
- Update `API_BASE_URL` to production
- Configure app icons
- Set up splash screen
- Update app.json metadata
- Test on physical devices

---

## 📈 Future Enhancements

### Planned Features
- [ ] Multi-user support (family accounts)
- [ ] Budget planning
- [ ] Recurring expenses
- [ ] Bill reminders
- [ ] Receipt scanning (OCR)
- [ ] Bank account integration
- [ ] Investment tracking
- [ ] Tax calculation
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Biometric authentication
- [ ] Push notifications
- [ ] Social sharing
- [ ] Expense splitting
- [ ] Advanced analytics

### Technical Improvements
- [ ] GraphQL API
- [ ] Real-time updates (WebSockets)
- [ ] Offline mode
- [ ] Data encryption
- [ ] Performance optimization
- [ ] Unit tests
- [ ] Integration tests
- [ ] CI/CD pipeline
- [ ] Docker containerization
- [ ] Kubernetes deployment

---

## 🐛 Troubleshooting

### Common Issues

**1. "Goals table doesn't exist"**
```bash
python manage.py migrate
```

**2. "Token authentication failed"**
```bash
python manage.py migrate
# Restart server
```

**3. "TF-IDF vectorizer error"**
- Already fixed in code
- Ensure `dataset.csv` exists

**4. "Mobile app can't connect"**
- Use `0.0.0.0:8000` for Django
- Check IP address in `api.js`
- Same WiFi network
- Check firewall

**5. "Email not sending"**
- Configure email settings in `settings.py`
- Use app-specific password for Gmail
- Check SMTP settings

**6. "Forecast not working"**
- Need minimum 10 expenses
- Check matplotlib installation
- Verify static folder permissions

---

## 📞 Support & Contact

### Documentation Files
- `README.md` - Original project README
- `SETUP_COMPLETE.md` - Setup completion guide
- `QUICK_REFERENCE.md` - Quick reference card
- `MOBILE_APP_SETUP.md` - Mobile app setup
- `START_BACKEND.md` - Backend start guide
- `START_MOBILE_BACKEND.md` - Mobile backend guide
- `ExpenseWiseMobile/README.md` - Mobile app docs

### Resources
- Django Documentation: https://docs.djangoproject.com/
- Django REST Framework: https://www.django-rest-framework.org/
- React Native: https://reactnative.dev/
- Expo: https://docs.expo.dev/

---

## 📄 License

This project is licensed under the MIT License.

Copyright (c) 2023 Hemant Shirsath

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

---

## 🙏 Acknowledgments

- Django community for the excellent framework
- React Native and Expo teams
- scikit-learn for ML capabilities
- All open-source contributors

---

## 📊 Project Statistics

- **Total Files:** 100+
- **Lines of Code:** 10,000+
- **Modules:** 10
- **API Endpoints:** 15+
- **Mobile Screens:** 20+
- **Supported Currencies:** 200+
- **ML Models:** 2 (Classification, Forecasting)

---

**Built with ❤️ for better financial management**

---

*Last Updated: December 2024*
