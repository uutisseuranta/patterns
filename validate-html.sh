#!/bin/bash
# validate-html.sh — Validoidaan index.html käyttäen W3C Nu HTML Checker APIa
set -euo pipefail

echo "Lähetetään index.html W3C Nu HTML Checker API:lle..."
RESPONSE=$(curl -s -H "Content-Type: text/html; charset=utf-8" \
                --data-binary @index.html \
                "https://validator.w3.org/nu/?out=json")

# Suoritetaan validointi ja palautetaan sopiva poistumiskoodi
if ! echo "$RESPONSE" | python3 -c "
import sys, json
data = json.load(sys.stdin)
errors = [msg for msg in data.get('messages', []) if msg.get('type') == 'error']
if errors:
    for err in errors:
        print('VIRHE rivillä {}: {}'.format(err.get('lastLine', '?'), err.get('message', '')))
    sys.exit(len(errors))
else:
    print('HTML-dokumentti on validi ✓')
    sys.exit(0)
"; then
    echo "HTML-validointi epäonnistui."
    exit 1
fi
