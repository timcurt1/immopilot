#!/bin/bash
clear
echo "ImmoPilot V25 SaaS Base"
if ! command -v node &> /dev/null; then echo "Installe Node.js LTS depuis https://nodejs.org"; read -p "Entrée pour fermer..."; exit 1; fi
if [ ! -f ".env.local" ]; then cp ".env.example" ".env.local"; fi
if [ ! -d "node_modules" ]; then npm install; fi
npm run dev
