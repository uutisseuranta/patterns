# TECHNICAL_DESIGN.md — Uutisseuranta UI Patterns tekniset linjaukset

Tämä dokumentti määrittää `patterns`-repositorion tekniset linjaukset, komponenttimallin ja release-prosessin. Kaikki muutokset noudattavat näitä linjauksia.

---

## 1. Komponenttimalli ja rakenne

Kuviointikirjasto toteuttaa **Atomic Design** -hierarkian mukaisen rakenteen:

- **Atomit (Atoms):** Perustyylit, värit, fontit, painikkeet (`style.css`).
- **Molekyylit ja Organismit (Molecules & Organisms):** Komponenttikokonaisuudet (kuten kommenttikortti, välilehtipalki ja navigointi).
- **Esikatselusivu (`index.html`):** Monoliittinen sivu, joka kokoaa kaikki komponentit yhteen helppoa katselmointia ja saavutettavuusauditointia varten.

### Normatiivinen komponenttilista (iteraatio 2 alku)

| Komponentti | Taso | Tila | Issue |
|---|---|---|---|
| Typografia, värit, välilyönnit | Atom | ✅ Toteutettu | — |
| Painike (button) | Atom | ✅ Toteutettu | — |
| Artikkelikortti (article-card) | Molecule | 🔄 Kehitteillä | [#40](https://github.com/uutisseuranta/patterns/issues/40) |
| Footer | Organism | 🔄 Kehitteillä | [#28](https://github.com/uutisseuranta/patterns/issues/28) |
| Navigaatio (header/nav) | Organism | 🔄 Kehitteillä | — |
| Välilehtipalki (tabs) | Molecule | 🔄 Kehitteillä | — |
| Kommenttikortti | Molecule | 📋 Suunniteltu | — |

> Tätä listaa päivitetään jokaisen iteraation alussa. Lista on normatiivinen — komponentti, jota ei ole tässä taulukossa, ei kuulu iteration laajuuteen.

### `patterns.js` — vastuualue

`patterns.js` on esikatselusivun (`index.html`) JavaScript-tiedosto. Sen ainoa vastuualue on:

- **Teeman vaihto (dark/light mode):** toggle-napin logiikka, `data-theme`-attribuutin asetus `<html>`-elementille ja `localStorage`-tallennus.
- **Komponenttien demointeraktiivisuus:** esim. välilehtipalkin klikkaus, modal-avaus — vain esikatselusivun demokäyttöön.

`patterns.js` **ei** ole osa komponenttikirjaston julkaistua API:ta. Kuluttajasovellus (`uutisseuranta.github.io`) ei lataa eikä käytä `patterns.js`:ää — se toteuttaa oman interaktiivisuuden itsenäisesti.

---

## 2. Teknologiavalinnat

### Sallitut teknologiat

| Teknologia | Perustelu |
|---|---|
| Vanilla CSS (natiivi, ei Tailwind) | Ei build-riippuvuutta; CSS Custom Properties + natiivi nesting riittävät |
| Vanilla JS (ES Modules, ei bundleria) | Selainyhteensopivuus ilman transpilointia; esikatselusivulle riittää |
| HTML5 semanttiset elementit | Standardi, a11y-pohja |
| CSS Custom Properties (`--var`) | Design token -pohja; teeman vaihto ilman JS-riippuvuutta |

### Kielletyt teknologiat

| Teknologia | Syy |
|---|---|
| Tailwind CSS | Lisää build-vaiheen; ristiriidassa Vanilla-periaatteen kanssa |
| React / Vue / Svelte | Komponenttikirjasto on framework-agnostinen; ei side-efektejä kuluttajalle |
| npm / node_modules | Ei build-työkalua — kaikki riippuvuudet ladataan CDN:stä tai ovat natiiveja |
| CSS preprocessorit (Sass, Less) | Natiivi CSS nesting korvaa tarpeen |
| Web Components (Custom Elements) | Harkitaan uudelleen jos tarvitaan — ks. revisit-kriteeri muutoshistoriassa |

### Ei build-vaihetta

`patterns`-repo julkaistaan suoraan GitHub Pagesin kautta ilman build-vaihetta. Tiedostot (`index.html`, `style.css`, `patterns.js`) ovat lähdekoodia ja tuotantokoodia yhtä aikaa.

---

## 3. Saavutettavuusvaatimukset (a11y)

Kaikki `patterns`-kirjaston komponentit noudattavat **WCAG 2.1 AA** -tasoa minimissään.

| Vaatimus | Taso | Tarkistustapa |
|---|---|---|
| Värikontrasti (teksti) | AA (4.5:1) | Lighthouse CI / manuaalinen |
| Värikontrasti (suuret elementit) | AA (3:1) | Lighthouse CI |
| Näppäimistönavigaatio | AA | Manuaalinen + axe |
| Focus-indikaattori näkyvissä | AA | Manuaalinen |
| Alt-tekstit kuvissa | AA | axe |
| ARIA-attribuutit oikein | AA | axe |

**Milloin tarkistetaan:** Jokaisen komponentti-PR:n yhteydessä manuaalisesti; Lighthouse-raportti ajetaan `index.html`:lle ennen mergeä. Lighthouse CI -integraatio lisätään GitHub Actionsiin iteraatiossa 3 (ks. muutoshistoria-taulukko).

---

## 4. Cross-repo-kulutus (`uutisseuranta.github.io` → `patterns`)

`uutisseuranta.github.io` kuluttaa `patterns`-kirjastoa **suoralla URL-viittauksella** GitHub Pagesin kanoniseen osoitteeseen. Ei git submodulia, ei npm-pakettia, ei manuaalista copy-pastea.

```html
<!-- uutisseuranta.github.io/index.html -->
<link rel="stylesheet" href="https://patterns.uutisseuranta.fi/style.css">
```

**Päivitysstrategia:** `patterns`-repoon mergettävä muutos julkaistaan automaattisesti GitHub Pagesin kautta. `uutisseuranta.github.io` saa muutoksen heti seuraavalla sivulatauksella — ei erillistä versiopäivitystä.

**Breaking changes:** Koska kulutus on suora URL-viittaus ilman pinnattua versiota, `style.css`:n rikkova muutos (esim. CSS Custom Propertyn uudelleennimeäminen) vaikuttaa `uutisseuranta.github.io`:hon välittömästi. Breaking changeista ilmoitetaan PR:n kuvauksessa merkinnällä `⚠️ BREAKING`. Kuluttajasovellus testaa visuaalisesti ennen mergeä.

---

## 5. Versionumerointi ja julkaisut (Release)

Projektissa noudatetaan yhtenäistä versionumerointi- ja julkaisukäytäntöä kaikkien repositorioiden välillä:
- **SemVer (Semantic Versioning):** Versionumerot noudattavat muotoa `vX.Y.Z` (esim. `v0.1.0`).
- **Tagien luominen:** Uusi julkaisu luodaan tekemällä vastaava Git-tagi (`vX.Y.Z`) ja julkaisemalla se GitHub Releases -palvelussa.
- **Julkaisuvastuu:** Jokaisesta tuotantoon viedystä merkittävästä välitavoitteesta (kuten Iteraatioiden valmistumisesta) luodaan virallinen SemVer-julkaisu.

---

## 6. Release-prosessi ja automaatio

Kaikki kuviointikirjaston muutokset ja julkaisut viedään läpi täysin automatisoidun julkaisuprosessin (release-prosessi) kautta. Ylläpito (ops) ei tee manuaalisia muutoksia tai asetusten ylikirjoituksia GitHub Pages -ympäristöön.

### CI/CD-työnkulku (GitHub Actions)

1. **Kehitys ja PR-katselmointi:**
   - Muutokset kehitetään omassa haarassaan ja yhdistetään `main`-haaraan Pull Requestin kautta.
2. **Automaattinen julkaisu (Deploy):**
   - Push `main`-haaraan käynnistää automaattisen GitHub Pages -julkaisuprosessin (`pages build and deployment` -työnkulku).
   - Tuotanto-URL on kanonisesti **`https://patterns.uutisseuranta.fi`**.
3. **Laadunvalvonta PR:n yhteydessä:**
   - **W3C HTML-validointi:** `index.html` validoidaan W3C-validaattorilla ennen mergeä (manuaalinen tässä vaiheessa, CI-integraatio iteraatiossa 3).
   - **Lighthouse-auditointi:** Saavutettavuus (a11y), suorituskyky ja parhaiden käytäntöjen pisteytys ajetaan `index.html`:lle. Tavoite: a11y-pisteet ≥ 90.
   - **Savutestit:** HTTP 200 -tarkistus tuotanto-URL:lle onnistuneen deployn jälkeen.

---

## 7. Suunnittelu- ja kehityskäytännöt

### Teknologiavalintojen ensisijaisuusperiaate
Kuviointikirjaston kehityksessä noudatetaan ensisijaisuusperiaatetta riippuvuuksien minimoimiseksi ja järjestelmän pitkäikäisyyden takaamiseksi:
1. **Ensisijaisesti:** Avoimet standardit (kuten ActivityStreams 2.0, WCAG 2.1 AA, standardit web-rajapinnat).
2. **Toissijaisesti:** Standardoidut, de facto standardoidut tai puhtaat "vanilla"-teknologiat (kuten Vanilla JS, Vanilla CSS).

### Activity Streams 2.0 standardinmukaisuus
Kaikessa tietomallinnuksessa ja rajapintatiedonsiirrossa käytetään W3C:n määrittelemiä Activity Streams 2.0 -kenttiä ja schemaa.
- Kanoninen spesifikaatio: [W3C Activity Streams 2.0 Core](https://www.w3.org/TR/activitystreams-core/) ja [Vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/)
- Kaikki JSON-LD `@context`-tunnisteet ja objektien ominaisuudet noudattavat suoraan standardissa sovittuja nimiä ja tyyppejä (kuten `Article` uutisille ja `Like`/`Dislike` reaktioille).
- Koodissa käytetään aina standardinmukaista Activity Streams 2.0 -nimitystä rajapintakommunikaatiossa (esim. `Like`/`Dislike`), vaikka käyttöliittymän näyttöniminä (displayname) käytetään `Samaa mieltä` / `Eri mieltä` (tai `Agree`/`Disagree`).

### Avoimen datan agnostisuusperiaate

Kun käsitellään avointa dataa (kuten RSS-syötteitä tai ulkoisia datasettejä), noudatetaan datan suhteen agnostista periaatetta.
- Datan laatua, puutteita tai virheitä ei yritetä korjata tai hylätä ingestion (fetch) -vaiheessa, vaan sisäänluku pidetään mahdollisimman sallivana.
- Mahdolliset datan laatuongelmat, suodatukset ja korjaukset suoritetaan prosessin lopussa — joko lukupäässä (API) tai erillisellä rikastus-jobilla.

---


### Luonnos-Pull Requestit (Draft PR) ja kysymykset kontekstissa
Monimutkaiset tai laajat komponenttilisäykset voidaan aloittaa avaamalla luonnos-Pull Request (Draft PR).
- PR voi aluksi olla tyhjä esikatselurunko, johon kirjataan suunnitteluvaihtoehdot.
- Avoimet arkkitehtuuri- ja visualisointikysymykset jätetään Pull Requestin kommenteiksi koodikontekstiin, jotta niistä voidaan päättää suoraan GitHubissa.
- Draft PR muutetaan valmiiksi kun DoD (Definition of Done) täyttyy — ks. [Definition of Done (DoD) -määritelmä patterns#49](https://github.com/uutisseuranta/patterns/issues/49).

### Koodi- ja nimeämiskäytännöt (Code Conventions)
- **BEM-nimeäminen:** CSS-luokkien nimeämisessä käytetään virallisesti BEM (Block-Element-Modifier) -nimeämiskonventiota (esim. `.vote-stats`, `.vote-stats__bar`, `.vote-stats__segment--agree`).
- **Avoimien standardien mukainen nimeäminen:** Sovelletaan avoimien standardien seuraamisohjetta. Nimeämisessä käytetään ensisijaisesti standardien (kuten ActivityStreams 2.0 / `as2` tai `rss`) käyttämiä termejä ja nimiä asioille (esim. `like`, `dislike` sijaan käytetään AS2-kontekstin mukaisia termejä, tai jos kyseessä on uutissyöte, käytetään `rss`-termejä).

### Koodin laadun valvonta
Kuviointikirjaston HTML- ja CSS-koodin laadun ja virheettömyyden valvontaan otetaan myöhemmin käyttöön seuraavat työkalut:
- **W3C Markup Validator** – HTML-komponenttien validointi ja standardienmukaisuuden varmistus.
- **Stylelint** – CSS-sääntöjen ja muotoilujen laadunvalvonta.
Näät integroidaan automaattiseen CI-pipelineen iteraatiossa 3.

---

## 8. Muutoshistoria

| Päivämäärä | Päätös | Perustelu | Vaihtoehto jota harkittiin | Revisit-kriteeri | Issue |
|---|---|---|---|---|---|
| 2026-07-02 | AS2-first, ei täyttä ActivityPub | ActivityPub vaatii Actor-endpointit ja federaation; AS2 riittää | Täysi ActivityPub | Jos tarvitaan federoitu verkosto | [#40](https://github.com/uutisseuranta/patterns/issues/40) |
| 2026-07-02 | Ei audience targeting -kenttiä | Kaikki objektit julkisia; kentät lisäisivät monimutkaisuutta ilman hyötyä | to/cc/bcc-kentät | Jos tarvitaan kohdennettua jakelua | [#41](https://github.com/uutisseuranta/patterns/issues/41) |
| 2026-07-02 | SCREAMING_SNAKE_CASE sopimusdokumenteille | Yhtenäinen nimeäminen kaikkien repojen välillä; erottaa sopimukset ops-tiedostoista | kebab-case kaikille | — | [#46](https://github.com/uutisseuranta/patterns/issues/46) |
| 2026-07-02 | Cross-repo -linkit absoluuttisina GitHub-URL:eina | Relatiiviset polut eivät toimi GitHubissa cross-repo | Relatiiviset polut | — | [#46](https://github.com/uutisseuranta/patterns/issues/46) |
| 2026-07-02 | Release-prosessiin perustuva automaatio | Kaikki muutokset menevät automatisoidun putken läpi; ops ei tee manuaalisia muutoksia | Manuaalinen ylläpito | — | [#46](https://github.com/uutisseuranta/patterns/issues/46) |
| 2026-07-02 | Vanilla CSS + JS, ei build-vaihetta | Riippuvuuksien minimointi; GitHub Pages julkaisee suoraan lähdekoodista | Tailwind + Vite | Jos komponenttien määrä kasvaa merkittävästi | — |
| 2026-07-02 | Suora URL-viittaus cross-repo-kulutukseen | Yksinkertaisin kulutustapa; ei submodulia tai npm-pakettia | git submodule | Jos tarvitaan pinnattu versio | — |
| 2026-07-03 | WCAG 2.1 AA minimivaatimus | Julkinen palvelu; saavutettavuus on perusvaatimus | WCAG 2.1 A | — | [#35](https://github.com/uutisseuranta/patterns/issues/35) |
| 2026-07-03 | Normatiivinen komponenttilista §1:een | Tekee iteraation laajuuden eksplisiittiseksi; estää scope creepin | Vapaa komponenttilisäys | Kun iteraatio-käsite poistuu käytöstä | — |
| 2026-07-03 | patterns.js-vastuualue kirjattu §1:een | Tiedoston rooli oli epäselvä kolmessa eri kohdassa; yksi kanoninen kuvaus | Erillinen PATTERNS_JS.md | — | — |
| 2026-07-03 | Tuotanto-URL vahvistettu kanoniseksi (patterns.uutisseuranta.fi) | Poistaa epäselvyyden kahdesta vaihtoehtoisesta URL:sta | uutisseuranta.github.io/patterns | Jos domain muuttuu | — |
| 2026-07-03 | style.css rakenteellistaminen lisätty backlogiin | Tiedosto kasvaa iteraatioittain; osiokommenttijako parantaa ylläpidettävyyttä | Ei toimenpidettä | — | [#56](https://github.com/uutisseuranta/patterns/issues/56) |
| 2026-07-03 | Yhtenäinen SemVer-versionumerointi (`vX.Y.Z`) | Yhtenäiset julkaisukäytännöt kaikkien repositorioiden välillä | Ei tagitusta / repo-kohtainen versionumerointi | — | — |

---

## Iteraatiot

### Iteraatio 3 — Scope

#### Teema 1: Rajapintaintegraatio ja dynaaminen uutisvirta (Core MVP)

| # | Tiketti | Kuvaus |
|---|---|---|
| 2 | [#24](https://github.com/uutisseuranta/patterns/issues/24) | Vaihe 2 — Molecules + Organisms: lisätään visualisoinnit `index.html`-tiedoston alaosaan erilliseksi komponenttikirjasto-osioksi demosivun alapuolelle, jotta sovelluksen varsinainen demo-leiska pysyy siistinä ja erillään. |
| 3 | [#40](https://github.com/uutisseuranta/patterns/issues/40) | feat: lisää AS2 `@context` ja `id` semanttiset `data-as2-id` -attribuutit artikkelikortille (JavaScript lukee `dataset.as2Id` käyttäjäinteraktioihin, yhteensopiva `uutisseuranta.github.io`-repon kanssa) |

#### Teema 3: Laadunvalvonta, testaus ja vakauttaminen (QA & Refactoring)

| # | Tiketti | Kuvaus |
|---|---|---|
| 7 | [#55](https://github.com/uutisseuranta/patterns/issues/55) | chore: ota W3C Markup Validator ja Stylelint käyttöön GitHub Actions CI-putkessa PR-tarkistuksena (virheet katkaisevat PR-mergen automaattisesti) |
| 8 | [#56](https://github.com/uutisseuranta/patterns/issues/56) | style.css rakenteellistaminen: jaottelu osioihin kommenteilla (`/* --- Reset & Variables --- */` → `/* --- Atoms --- */` → `/* --- Molecules --- */` → `/* --- Organisms --- */` → `/* --- Templates --- */` → `/* --- Utilities --- */`) |

Koko Iteraatio 3 scope (kaikki kolme repoa): ks. [uutisseuranta.github.io PR #32](https://github.com/uutisseuranta/uutisseuranta.github.io/pull/32)
