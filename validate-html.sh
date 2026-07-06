#!/usr/bin/env bash
# validate-html.sh — Paikallisen HTML-rakenteen validointi W3C API:n kautta.
# Ajetaan: Paikallisesti tai CI/CD-pipelinessa (GitHub Actions validate-job).
# Ympäristö: Bash, vaatii Internet-yhteyden W3C:n validaattoripalveluun.
# Riippuvuudet: curl, python3 (JSON-vastauksen parsimiseen).
# Palauttaa: exit 0 = HTML validi, exit 1 = validaatiovirheitä tai verkkovirhe.
set -euo pipefail

echo "Lähetetään index.html W3C Nu HTML Checker API:lle..."

# curl -s: hiljainen ajo (ei progress-palkkia), -H: Content-Type asetetaan html/utf-8,
# --data-binary: lähetetään index.html raakadatana HTTP POST -pyynnöllä.
# Validaattorin vaste palautetaan JSON-muodossa osoitteesta validator.w3.org/nu/
RESPONSE=$(curl -s -H "Content-Type: text/html; charset=utf-8" \
                --data-binary @index.html \
                "https://validator.w3.org/nu/?out=json")

# Suoritetaan validointi ja palautetaan sopiva poistumiskoodi
# python3 -c: suoritetaan koodi inline.
# data.get('messages'): W3C palauttaa listan viesteistä. Suodatetaan vain 'error'-tyyppiset.
# Jos virheitä löytyy, tulostetaan rivi ja virheviesti ja poistutaan virhemäärän mukaisella koodilla.
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
