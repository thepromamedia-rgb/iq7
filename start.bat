@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Install Node.js 18 or newer from https://nodejs.org/
  pause
  exit /b 1
)
echo Starting Crypto Bridge (virtual credits only)...
start "Crypto Bridge" cmd /c "timeout /t 2 /nobreak ^>nul ^& start http://localhost:3000"
node server.js
if errorlevel 1 echo Server stopped with an error. Read the message above.
pause
