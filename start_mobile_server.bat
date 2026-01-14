@echo off
echo ========================================
echo ExpenseWise Mobile Backend Server
echo ========================================
echo.
echo Starting Django server for mobile access...
echo Server will be accessible at: http://0.0.0.0:8000
echo.
echo To find your IP address, open another terminal and run: ipconfig
echo Look for "IPv4 Address" under your WiFi adapter
echo.
echo Press CTRL+C to stop the server
echo ========================================
echo.
python manage.py runserver 0.0.0.0:8000
