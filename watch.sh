#!/bin/sh
# Script to watch for file changes and notify Next.js inside Docker
# This runs inside the container and watches all source files

WATCHED_DIRS="/app/app /app/components /app/public"
PREV_HASH=""

echo "🔍 File watcher started — polling every 1 second..."

while true; do
  CURRENT_HASH=$(find $WATCHED_DIRS -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" -o -name "*.js" \) -newer /app/.next/app-build-manifest.json 2>/dev/null | sort | md5sum)
  
  if [ "$CURRENT_HASH" != "$PREV_HASH" ] && [ -n "$PREV_HASH" ]; then
    echo "🔄 Change detected — triggering recompile..."
    # Touch a core file to trigger Next.js HMR
    touch /app/app/layout.tsx
  fi
  
  PREV_HASH="$CURRENT_HASH"
  sleep 1
done
