@echo off
cd "C:\Users\HP\Desktop\Suborno\HTML\VideoPlayer"
start serve
timeout /t 2 >nul
start http://localhost:3000
