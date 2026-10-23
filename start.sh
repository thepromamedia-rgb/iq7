#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js 18 or newer is required: https://nodejs.org/" >&2
  exit 1
fi
node -e 'const v=Number(process.versions.node.split(".")[0]); if(v<18){console.error("Node.js 18 or newer is required");process.exit(1)}'
echo "Starting Crypto Bridge (virtual credits only) at http://localhost:3000"
node server.js
