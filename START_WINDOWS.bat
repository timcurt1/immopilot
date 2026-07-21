@echo off
title ImmoPilot V25 SaaS
echo ImmoPilot V25 SaaS Base
where node >nul 2>nul
if %errorlevel% neq 0 (echo Installe Node.js LTS depuis https://nodejs.org & pause & exit /b)
if not exist ".env.local" copy ".env.example" ".env.local" >nul
if not exist "node_modules" npm install
npm run dev
pause
