# TECHNICAL_DESIGN.md — Uutisseuranta UI Patterns tekniset linjaukset

Tämä dokumentti määrittää `patterns`-repositorion tekniset linjaukset, komponenttimallin ja release-prosessin. Kaikki muutokset noudattavat näitä linjauksia.

---

## 1. Komponenttimalli ja rakenne

Kuviointikirjasto toteuttaa **Atomic Design** -hierarkian mukaisen rakenteen:

- **Atomit (Atoms):** Perustyylit, värit, fontit, painikkeet (`style.css`).
- **Molekyylit ja Organismit (Molecules & Organisms):** Komponenttikokonaisuudet (kuten kommenttikortti, välilehtipalki ja navigointi).
- **Esikatselusivu (`index.html`):** Monoliittinen sivu, joka kokoaa kaikki komponentit yhteen helppoa katselmointia ja saavutettavuusauditointia varten.

---

## 2. Release-prosessi ja automaatio

Kaikki kuviointikirjaston muutokset ja julkaisut viedään läpi täysin automatisoidun julkaisuprosessin (release-prosessi) kautta. Ylläpito (ops) ei tee manuaalisia muutoksia tai asetusten ylikirjoituksia GitHub Pages -ympäristöön.

### CI/CD-työnkulku (GitHub Actions)

1. **Kehitys ja PR-katselmointi:**
   - Muutokset kehitetään omassa haarassaan ja yhdistetään `main`-haaraan Pull Requestin kautta.
2. **Automaattinen julkaisu (Deploy):**
   - Push `main`-haaraan käynnistää automaattisen GitHub Pages -julkaisuprosessin (`pages build and deployment` -työnkulku).
   - Työnkulku varmistaa tiedostojen oikeellisuuden ja siirtää esikatselusivun resurssit (`index.html`, `style.css`, `patterns.js`) tuotanto-osoitteeseen `https://patterns.uutisseuranta.fi` (tai vastaavaan uutisseuranta.github.io/patterns -osoitteeseen).
3. **Automatisoitu laadunvalvonta:**
   - Kaikki infraan liittyvät savutestit ajetaan osana julkaisuprosessia. Koodimuutoksia tai julkaisuja ei tehdä manuaalisesti tuotantoon.

---

## 3. Muutoshistoria

| Päivämäärä | Päätös | Perustelu | Vaihtoehto jota harkittiin | Revisit-kriteeri | Issue |
|---|---|---|---|---|---|
| 2026-07-02 | AS2-first, ei täyttä ActivityPub | ActivityPub vaatii Actor-endpointit ja federaation; AS2 riittää | Täysi ActivityPub | Jos tarvitaan federoitu verkosto | [#40](https://github.com/uutisseuranta/patterns/issues/40) |
| 2026-07-02 | Ei audience targeting -kenttiä | Kaikki objektit julkisia; kentät lisäisivät monimutkaisuutta ilman hyötyä | to/cc/bcc-kentät | Jos tarvitaan kohdennettua jakelua | [#41](https://github.com/uutisseuranta/patterns/issues/41) |
| 2026-07-02 | SCREAMING_SNAKE_CASE sopimusdokumenteille | Yhtenäinen nimeäminen kaikkien repojen välillä; erottaa sopimukset ops-tiedostoista | kebab-case kaikille | — | [#46](https://github.com/uutisseuranta/patterns/issues/46) |
| 2026-07-02 | Cross-repo -linkit absoluuttisina GitHub-URL:eina | Relatiiviset polut eivät toimi GitHubissa cross-repo | Relatiiviset polut | — | [#46](https://github.com/uutisseuranta/patterns/issues/46) |
| 2026-07-02 | Release-prosessiin perustuva automaatio | Kaikki muutokset medevät automatisoidun putken läpi; ops ei tee manuaalisia muutoksia | Manuaalinen ylläpito | — | [#46](https://github.com/uutisseuranta/patterns/issues/46) |
