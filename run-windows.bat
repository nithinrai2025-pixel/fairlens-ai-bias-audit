@echo off
setlocal
cd /d "%~dp0"
echo ==========================================
echo   FairLens - AI Bias Audit Platform
echo ==========================================
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 22 LTS is not installed. Install it from https://nodejs.org/ and run this file again.
  pause
  exit /b 1
)
if not exist .env copy .env.example .env >nul
if not exist node_modules (
  echo Installing required packages. This may take a few minutes...
  call npm install
  if errorlevel 1 (
    echo Package installation failed. Check your internet connection and try again.
    pause
    exit /b 1
  )
)
echo Starting FairLens. Keep this window open while using the website.
call npm run dev
pause
