#!/bin/bash

# Build the site
echo "🔨 Building site..."
npm run build

# Navigate to dist folder
cd dist

# Initialize git repo
echo "📦 Preparing deploy..."
git init
git add -A
git commit -m "Deploy: $(date +'%Y-%m-%d %H:%M:%S')"

# Add deploy branch remote
git branch -M main

# Get current repo URL
REPO_URL=$(git -C .. config --get remote.origin.url)

# Push to deploy branch
echo "🚀 Pushing to deploy branch..."
git remote add origin $REPO_URL
git push origin main:deploy --force

# Cleanup
cd ..
echo "✅ Deployed successfully!"
