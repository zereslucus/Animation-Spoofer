@echo off
title GLOBAL LEAKS ON TOP REALCUHSSS!

:: Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js not found! Please install Node.js first.
    pause
    exit /b 1
)

:: Run the bot script
node IgnoreThis.mjs

:: Keep the window open after execution
pause