#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js 22 LTS is required. Install it from https://nodejs.org/ and rerun this script."
  exit 1
fi
[ -f .env ] || cp .env.example .env
[ -d node_modules ] || npm install
npm run dev
