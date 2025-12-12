#!/usr/bin/env bash
set -euo pipefail

# Deploy only the built dist/ to the deploy branch

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "[deploy] Building production..."
npm run build

ORIGIN_URL="$(git config --get remote.origin.url)"
if [[ -z "$ORIGIN_URL" ]]; then
  echo "[deploy] Error: remote.origin.url not found"
  exit 1
fi

echo "[deploy] Preparing dist/ git repo..."
cd "$ROOT_DIR/dist"

# Fresh repo inside dist
rm -rf .git
git init

# Configure author (fallback values to avoid warnings)
git config user.name "Deploy Bot"
git config user.email "deploy@local"

git add -A
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"

git remote add origin "$ORIGIN_URL"

echo "[deploy] Pushing dist to deploy branch (force)..."
git push origin HEAD:deploy --force

echo "[deploy] Done. Branch: deploy"
