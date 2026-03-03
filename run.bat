@echo off
cd /d "d:\Studying\English\website\nexops-v3-final\nexops-v3"
docker compose down 2>nul
docker compose up --build
