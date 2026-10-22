@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Install Node.js LTS, then double-click RUN_ME.bat again.
  echo Alternatively, open a terminal in this folder and run: python -m http.server 4173
  pause
  exit /b 1
)
start "" http://127.0.0.1:4173
node server.js
pause
