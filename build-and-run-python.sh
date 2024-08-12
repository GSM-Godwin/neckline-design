#!/bin/bash
# Install dependencies
npm install

# Run the Next.js build
npm run build:next

# Run the Python script
python model/main.py
