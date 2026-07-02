# D-CENT UI Patterns

Tämä repo dokumentoi D-CENT-projektin UI-suunnitteluperiaatteet ja Pattern Lab -objektihierarkian. Perustuu [d-cent/patterns](https://github.com/d-cent/patterns)-repoon.

## Dokumentaatio

- [STANDARDS.md](./STANDARDS.md) — AS2-kenttätaulukko, RFC 3339, WCAG 2.1 AA, GDPR-rajaukset, hallitut poikkeamat
- [TECHNICAL_DESIGN.md](./TECHNICAL_DESIGN.md) — arkkitehtuuri, muutoshistoria, teknologiavalinnat
- [USER_PATHS.md](./USER_PATHS.md) — käyttäjäpolut ja user storyt (D-CENT + Uutisseuranta UP-1–15)
- [LICENSES.md](./LICENSES.md) — lisenssit ja attribuutio

## Liittyvät repot

- [uutisseuranta/gcs-activitystreams](https://github.com/uutisseuranta/gcs-activitystreams) — backend: Cloud Run, BigQuery, AS2-dataputki
- [uutisseuranta/uutisseuranta.github.io](https://github.com/uutisseuranta/uutisseuranta.github.io) — frontend-sovellus

---

## Design Principles

Design-periaatteita käytetään suunnittelupäätösten pohjana palvelua kehitettäessä.

### API first
Rakennamme sovelluksen rajapinnat ensin, ja käyttäjäkokemuksen sen päälle. Tämä mahdollistaa monikanavaisen käyttäjäkokemuksen ja koneiden välisen kommunikaation. D-CENT-kontekstissa tämä on erityisen tärkeää solmujen välisen datan hajautuksen ja jakelun kannalta.

### Mobile first
Käytämme responsiivisia käyttöliittymiä ja varmistamme, että käyttäjät voivat käyttää haluamiaan laitteita. Aloita layoutin suunnittelu pienimmillä laitteilla minimikognitiivisella kuormalla. Maailman väestö käyttää digitaalista maailmaa ensisijaisesti mobiililaitteiden kautta.

### Minimalistic technical user experience
Yksi user story kutakin käyttäjähyötyä kohden. Haluamme välttää kognitiivista kuormaa ja jättää tilan sekä käyttäjän ajan käyttäjän luomalle sisällölle.

### Positive
Positiivinen palvelu palkitsee käyttäjää, innostaa kokeilemaan uusia asioita ja kannustaa tutkimaan lisää turvallisen kokemuksen kautta. Käyttäjä palaa mielellään palveluun, joka tervehtii ja kiittää häntä.

### Communal
Yhteisölliseksi työkaluksi ja vaikutuskanavaksi rakennettu palvelu mahdollistaa käyttäjille sisällön jakamisen ja kommunikoinnin. Monipuolinen interaktiivinen palvelu luo positiivisia vaikuttamiskokemuksia.

### Equality and inclusiveness
Yhteiseen palveluun kaikki ovat tasavertaisesti tervetulleita. Asianmukaisesti tiivis ja visuaalinen palvelu tekee vaikeistakin asioista ymmärrettäviä. Yhdenvertaisuusperiaatteen noudattaminen tarkoittaa kaikkien ihmisten sisäisen arvon tunnistamista ja tukemista luomalla olosuhteet, jotka edistävät tasa-arvoa, voimaantumista, tietoisuutta ja kompetenssia henkilökohtaisella, ryhmä- ja organisaatiotasolla.

### Ease of use
Kun käyttäjäkokemus on minimaalinen ja suoraviivainen ilman ylimääräisiä klikkauksia, luokitteluja tai vaiheita, ratkaisut ovat selkeämpiä ja intuitiivisempia. Ks. [https://www.gov.uk/designprinciples](https://www.gov.uk/designprinciples)

### Technical accessibility
Kun ratkaisu noudattaa kokonaisvaltaista lähestymistapaa semantiikassa ja logiikassa, sekä käyttäjänavigaatio että tuleva kehitys on tehokkaampaa. Tavoitetaso on **WCAG 2.1 AA** — ks. [https://www.w3.org/TR/WCAG21/](https://www.w3.org/TR/WCAG21/).

Käytännön vaatimukset:
- Tekstin kontrasti vähintään **4,5:1** normaalitekstille ja **3:1** suurelle tekstille (SC 1.4.3)
- Ei-tekstuaalisten elementtien (ikonit, lomakekehykset, focus-indikaattori) kontrasti vähintään **3:1** (SC 1.4.11)
- Kaikki toiminnallisuudet käytettävissä näppäimistöllä (SC 2.1.1) — näkyvä focus-indikaattori pakollinen (SC 2.4.7)
- Hover- ja focus-tilassa esiin tulevat sisällöt suljettavissa ilman siirtymistä ja pysyvät näkyvissä osoittimen päällä (SC 1.4.13)

### Helpfulness
Kun käyttäjä on kiinnostuneempi omasta asiastaan kuin siihen liittyvistä oikeudellisista tai teknisistä prosesseista, hänelle on tarjottava lisätietoja, esimerkkejä, apua ja käyttäjäystävällistä vuorovaikutusta. Tarkat ohjeet vähentävät epävarmuutta, ohjaavat käyttäjää rakentaviin käyttäytymismalleihin ja luovat positiivista palautetta.

### Interactive
Ohjeet ja toiminnallisuudet osoittavat selkeästi ja konkreettisesti, mitkä ovat käyttäjän toimenpiteiden hyödyt, seuraukset ja vaikutukset. Esim. osallistumisesta kerrotaan, milloin tulokset ovat saatavilla, ja vahvemman tunnistautumisen jälkeen tarjotaan mahdollisuus laajempiin toiminnallisuuksiin kuten äänestämiseen.

### Simple
Toiminnallisuuksia suunniteltaessa rakennetaan ensin yksinkertaisin toiminnallisuus, jolla luodaan ja validoidaan toiminnallisuuden tai user storyn tuottama ydinetu. Lisätoiminnallisuuksia lisätään vain mittareiden tai käyttäjäkokemuksen konkreettisten havaintojen perusteella.

### AS2-yhteensopivuus

UI-komponenttien HTML-rakenne ja data-attribuutit ovat ensisijaisesti yhteensopivia [ActivityStreams 2.0](https://www.w3.org/TR/activitystreams-core/) -tietomallin kanssa. Normatiiviset standardit ja rajaukset: **[STANDARDS.md](./STANDARDS.md)**.

---

## AS2-poikkeamat — hallitut divergenssit

Nämä ovat tietoisia suunnittelupäätöksiä, jotka poikkeavat AS2/ActivityPub-standardista. Jokainen poikkeama on dokumentoitu syineen. Ne eivät ole bugeja. Täydellinen lista: **[STANDARDS.md § Hallitut poikkeamat](./STANDARDS.md#hallitut-poikkeamat)**.

---

## Pattern Lab -objektihierarkia

D-CENT patterns noudattaa [Atomic Design](http://atomicdesign.bradfrost.com/) -metodologiaa. Objektit jaotellaan neljään tasoon: **Atoms → Molecules → Organisms → Templates**.

### Atoms (00-atoms)

Atomit ovat pienimmät rakennuspalikat — HTML-elementtejä, joita ei voi enää jakaa pienemmiksi ilman että ne menettävät merkityksensä.

| Kansio | Kuvaus |
|--------|--------|
| `00-meta` | Meta-elementit (charset, viewport, title) |
| `01-global` | Globaalit tyylit ja CSS-reset |
| `02-text` | Typografia: otsikot (h1–h6), kappaleet, sitaatit, linkit |
| `03-lists` | Listat: järjestetty, järjestämätön, kuvauslista |
| `04-images` | Kuvat, logot, ikonit |
| `05-forms` | Lomake-elementit: input, textarea, select, checkbox, radio |
| `06-buttons` | Painikkeet: primary (`.btn`), secondary (`.btn-alt`), btn-group |
| `07-tables` | Taulukot |
| `08-media` | Media-elementit: video, audio |
| `kalles-styles` | D-CENT-kohtaiset CSS-laajennukset |

### Molecules (01-molecules)

Molekyylit ovat atomien yhdistelmiä, jotka muodostavat yksinkertaisia UI-komponentteja.

| Kansio | Kuvaus |
|--------|--------|
| `comments` | Kommenttikomponentti: avatar, teksti, metadata, toimintopainikkeet |
| `helper-text` | Ohjetekstit ja validointiviestit lomakkeissa |
| `messaging` | Viesti- ja ilmoituskomponentit |
| `navigations` | Navigaatiolinkit, leivänmurut, sivunumeroinit |
| `notification` | Yksittäinen ilmoitus (notification item) |
| `objects` | Sisältöobjektit: artikkeli-kortti (`.stream-item`), tapahtuma (`.event-date`), upotettava kohde (`.embedded-item`) |
| `streams` | Aktiviteettivirran yksittäinen syöte |

### Organisms (02-organisms)

Organismit ovat monimutkaisia UI-komponentteja, jotka koostuvat molekyyleistä ja/tai atomeista.

| Kansio | Kuvaus |
|--------|--------|
| `argumenting` | Argumentointinäkymä: for/against-kommentit, äänestys |
| `discussion` | Keskusteluketju: kommentit, vastaukset |
| `event` | Tapahtumasivunäkymä |
| `global` | Globaalit organizmit: footer |
| `login` | Kirjautumisnäkymä |
| `navigation` | Päänavigaatio (`.nav-primary`), sticky header (`.header--sticky`) |
| `notifications-list` | Ilmoituslista |
| `profile` | Profiilisivu |
| `registration` | Rekisteröitymisnäkymä |
| `settings` | Asetukset-näkymä |
| `streams` | Aktiviteettivirta (`.stream`), koko artikkeli (`.full-article`), ryhmäsivu (`.group-info`) |

### Templates (03-templates)

Templatet yhdistävät organismeja kokonaisiksi sivupohjiksi ilman oikeaa sisältöä.

| Malli | Kuvaus |
|-------|--------|
| `page` | Perusmallipohja: header + content + footer |
| `template-article-page` | AS2 `Article`-objekti: otsikko, sisältö, tagit, ryhmä, kommentit (`Note[]`), tykkäys- ja jakamislaskurit |

---

## AS2 Article -templaatti

ActivityStreams 2.0 `Article`-objekti on tietomalliltaan blogipostauksen tai uutisartikkelin vakiomuoto hajautetuissa sosiaalisissa verkoissa (ActivityPub-protokolla). D-CENT-kontekstissa se sopii kansalaisaloitteiden, kommentaarien ja kampanjakirjoitusten esittämiseen.

### Tietomalli

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Article",
  "id": "https://uutisseuranta.fi/articles/energiaremontti-2050",
  "url": "https://uutisseuranta.fi/articles/energiaremontti-2050",
  "name": "Energiaremontti 2050",
  "content": "<p>Artikkelin HTML-sisältö tässä.</p>",
  "published": "2026-07-01T12:00:00Z",
  "updated": "2026-07-02T08:00:00Z",
  "attributedTo": {
    "type": "Person",
    "id": "https://uutisseuranta.fi/users/anna",
    "name": "Anna Virtanen"
  },
  "tag": [
    { "type": "Hashtag", "name": "#energia" },
    { "type": "Hashtag", "name": "#ilmasto" }
  ],
  "replies": {
    "type": "Collection",
    "totalItems": 3,
    "items": []
  },
  "likes": { "type": "Collection", "totalItems": 12 },
  "shares": { "type": "Collection", "totalItems": 4 }
}
```

### HTML-rakenne (`data-ap-*`-attribuutit)

`data-ap-*`-attribuutit sitovat HTML-elementin AS2-tietomalliin ilman JS-riippuvuutta. Ne mahdollistavat semanttisen haravoinnin ja tulevaisuuden ActivityPub-integraation.

```html
<!-- AS2 Article -objekti: data-ap-context ankkuroi JSON-LD-kontekstin,
     data-ap-type kertoo objektityypin, data-ap-id on kanonikaalinen IRI -->
<article
  data-ap-context="https://www.w3.org/ns/activitystreams"
  data-ap-type="Article"
  data-ap-id="https://uutisseuranta.fi/articles/energiaremontti-2050"
  class="news-card">

  <header class="news-card__header">
    <span class="news-card__source" data-ap-field="attributedTo">Yle</span>
    <time class="news-card__time"
          data-ap-field="published"
          datetime="2026-07-01T12:00:00Z">tänään 12:00</time>
  </header>

  <h2 class="news-card__title">
    <a href="#" class="news-card__link" data-ap-field="url">Otsikko tähän</a>
  </h2>

  <p class="news-card__summary" data-ap-field="summary">
    Tiivistelmä uutisesta. Maksimissaan kaksi kolme virkettä.
  </p>

  <ul class="tag-list" role="list" data-ap-field="tag">
    <li><a href="#" class="tag">Energia</a></li>
    <li><a href="#" class="tag">EU</a></li>
  </ul>

  <!-- Replies-kokoelma: frontend kokoaa itse (ks. STANDARDS.md Poikkeama) -->
  <section data-ap-field="replies" data-ap-type="Collection" class="article-replies">
    <!-- Note[]-kommentit tässä -->
  </section>

  <footer class="news-card__actions">
    <!-- AS2 Like / Dislike: UI-teksti lokalisoitu, semantiikka erillään -->
    <button data-ap-type="Like" class="btn btn-ghost">Samaa mieltä</button>
    <button data-ap-type="Dislike" class="btn btn-ghost">Eri mieltä</button>
  </footer>

</article>
```

---

## CSS Design Tokens

Kaikki visuaaliset arvot määritellään CSS-muuttujina `:root`-tasolla. Komponentit käyttävät ainoastaan näitä muuttujia — ei kovia arvoja.

### Värit

```css
:root {
  /* Primääri — D-CENT-vihreä, hallitseva */
  --color-primary:           #007E84;
  --color-primary-hover:     #006368;
  --color-primary-active:    #00484c;
  --color-primary-highlight: #e0f6f7;

  /* Pinnat */
  --color-bg:      #f4f3f0;
  --color-surface: #f9f8f6;

  /* Teksti */
  --color-text:       #1a1917;
  --color-text-muted: #706e6b;
}
```

Sääntö: D-CENT-primääriväri on aina hallitseva. Aksentteja käytetään vain CTA-elementeissä, ei dekoratiivisesti.

### Typografia

Projekti käyttää järjestelmäfonttipinoa (system font stack) — ei ulkoisia CDN-fontteja. Tämä parantaa suorituskykyä, tietoturvaa ja PWA-offline-yhteensopivuutta.

```css
:root {
  --font-body:    system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --font-display: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

  --text-xs:   clamp(0.75rem,  0.7rem  + 0.25vw, 0.875rem);
  --text-sm:   clamp(0.875rem, 0.825rem + 0.25vw, 1rem);
  --text-base: clamp(1rem,     0.95rem  + 0.25vw, 1.125rem);
  --text-lg:   clamp(1.125rem, 1rem     + 0.75vw, 1.5rem);
  --text-xl:   clamp(1.5rem,   1.2rem   + 1.25vw, 2.25rem);
}
```

### Spacing ja Radius

```css
:root {
  --space-1: 0.25rem;  /* 4px  */
  --space-2: 0.5rem;   /* 8px  */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  --shadow-md: 0 4px 12px oklch(from var(--color-text) l c h / 0.08);

  --content-wide: 1200px;
}
```

---

## Komponentit

### Napit (Atoms)

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: 500;
  cursor: pointer;
  transition: background 180ms ease, color 180ms ease;
}
.btn-primary   { background: var(--color-primary); color: #fff; border: none; }
.btn-secondary { background: transparent; color: var(--color-primary); border: 1px solid var(--color-primary); }
.btn-ghost     { background: transparent; color: var(--color-text-muted); border: none; }

.btn-primary:hover   { background: var(--color-primary-hover); }
.btn-secondary:hover { background: oklch(from var(--color-primary) l c h / 0.07); }
```

### Listat ja tagit (Atoms)

```html
<ul role="list" class="tag-list">
  <li><a href="#" class="tag">Politiikka</a></li>
  <li><a href="#" class="tag">Talous</a></li>
</ul>
```

```css
.tag-list { list-style: none; display: flex; flex-wrap: wrap; gap: var(--space-2); }
.tag {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  border: 1px solid oklch(from var(--color-text) l c h / 0.12);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-decoration: none;
  transition: background 180ms ease;
}
.tag:hover { background: var(--color-primary-highlight); color: var(--color-primary); }
```

### Notifikaatiopalkki (Molecule)

```html
<div class="notification" role="status" aria-live="polite">
  <span class="notification__icon" aria-hidden="true">●</span>
  <span class="notification__text">3 uutta uutista aiheesta Energia</span>
  <button class="notification__dismiss btn-ghost" aria-label="Sulje ilmoitus">✕</button>
</div>
```

```css
.notification {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--color-surface);
  border-left: 3px solid var(--color-primary);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
}
/* Poikkeus: border-left sallittu notifikaatiossa semanttisena tilaindikaattorina.
   Korteissa border-left on kielletty. */
```

### Hakumolekyyli (Molecule)

```html
<form class="search" role="search">
  <label for="search-input" class="sr-only">Etsi uutisia</label>
  <input id="search-input" type="search" class="search__input" placeholder="Etsi...">
  <button type="submit" class="btn btn-primary search__btn">Hae</button>
</form>
```

### Navigaatiopalkki (Organism)

D-CENT Pattern Labin navigaatio-organismi: logo vasemmalla, linkit keskellä/oikealla, kirjautumistila oikeassa reunassa. Firebase Auth -tila päivittää vain `.nav__auth`-elementin — muu navigaatio pysyy staattisena.

```html
<header class="site-header">
  <nav class="nav" aria-label="Päänavigaatio">
    <a href="/" class="nav__logo" aria-label="Uutisseuranta – etusivu">
      <!-- SVG logo tähän -->
    </a>
    <ul class="nav__links" role="list">
      <li><a href="#virta" class="nav__link">Virta</a></li>
      <li><a href="#aiheet" class="nav__link">Aiheet</a></li>
    </ul>
    <div class="nav__auth">
      <!-- Firebase Auth päivittää tämän: anonyymi → kirjautunut -->
      <button class="btn btn-primary" id="login-btn">Kirjaudu</button>
    </div>
  </nav>
</header>
```

### Uutiskortti (Organism)

D-CENT:n stream-item-organismi sovitettuna uutisseurantaan. Ei `border-left`-väripalkki, ei ikoneita värillisissä ympyröissä — vain sisältö, lähde, aika ja tagit.

```css
.news-card {
  padding: var(--space-4) var(--space-5);
  background: var(--color-surface);
  border: 1px solid oklch(from var(--color-text) l c h / 0.08);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  transition: box-shadow 180ms ease;
}
.news-card:hover            { box-shadow: var(--shadow-md); }
.news-card__header          { display: flex; justify-content: space-between; align-items: center; }
.news-card__source          { font-size: var(--text-xs); font-weight: 600; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.05em; }
.news-card__time            { font-size: var(--text-xs); color: var(--color-text-muted); }
.news-card__title           { font-size: var(--text-lg); line-height: 1.3; margin: 0; }
.news-card__link            { color: var(--color-text); text-decoration: none; }
.news-card__link:hover      { color: var(--color-primary); }
.news-card__summary         { font-size: var(--text-base); color: var(--color-text-muted); max-width: 72ch; }
```

### Kirjautumismodaali (Organism)

Käytä natiivia `<dialog>`-elementtiä. Se hoitaa focus-loukon ja Escape-näppäimen automaattisesti ilman JS-kirjastoja.

```html
<dialog class="modal" id="login-modal" aria-labelledby="modal-title">
  <div class="modal__inner">
    <h2 id="modal-title" class="modal__title">Kirjaudu sisään</h2>
    <p class="modal__desc">Tallenna seurantasi kirjautumalla Google-tilillä.</p>
    <button class="btn btn-primary modal__google" id="google-signin-btn">
      Kirjaudu Google-tilillä
    </button>
    <button class="btn-ghost modal__close" aria-label="Sulje" id="modal-close">✕</button>
  </div>
</dialog>
```

```javascript
// Modaalin ohjaus — natiivi <dialog>, ei kirjastoja
const modal = document.getElementById('login-modal');
document.getElementById('login-btn').addEventListener('click', () => modal.showModal());
document.getElementById('modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
```

### Virta-template (Template)

```html
<main id="virta" class="template-stream">
  <aside class="sidebar">
    <!-- Organismi: aihesuodatin -->
  </aside>
  <section class="stream" aria-label="Uutisvirta">
    <!-- Organismi: news-card × N -->
  </section>
</main>
```

```css
.template-stream {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: var(--space-8);
  max-width: var(--content-wide);
  margin-inline: auto;
  padding: var(--space-6) var(--space-4);
}
@media (max-width: 768px) {
  .template-stream { grid-template-columns: 1fr; }
  .sidebar { display: none; } /* korvautuu bottom-sheet-suodattimella */
}
```

---

## Migraatiosuunnitelma

Nykyisen `index.html`:n korvaaminen patterneilla tapahtuu inkrementaalisesti. Jokainen vaihe on oma PR.

| Vaihe | Kuvaus | Tiedostot |
|-------|--------|-----------|
| 1 | Atomit: CSS design tokens ja utility-luokat `style.css`:ään | `style.css` |
| 2 | Molekyylit: notifikaatio, haku, tagit `style.css`:ään | `style.css` |
| 3 | Navorganismi: header + Firebase Auth -tila | `index.html`, `patterns.js` |
| 4 | Uutiskortti-organismi: korvaa nykyinen uutisvirta | `index.html`, `style.css` |
| 5 | Kirjautumismodaali: korvaa nykyinen modaali `<dialog>`-elementillä | `index.html`, `patterns.js` |
| 6 | Virta-template: sidebar + grid-layout | `index.html`, `style.css` |

Jokainen vaihe on itsenäisesti testattavissa smoke-testillä ennen mergeä.

---

## Arkkitehtuuripoikkeamat

Pattern-integraatio ei muuta perusperiaatteita:

- **Kaikki tiedostot juuressa** — ei `components/`-, `patterns/`- tai `src/`-alikansioita
- **Ei build-steppiä** — komponentit kirjoitetaan suoraan `index.html`:ään ja `style.css`:ään
- **Ei CDN-riippuvuuksia** — D-CENT Pattern Lab toimii inspiraationa ja rakennemallina, ei asennettavana pakettina
- **`<dialog>`-elementti on standardi HTML5** — ei vaadi JS-kirjastoa

Normatiiviset standardit ja laajemmat poikkeamat: **[STANDARDS.md](./STANDARDS.md)**.
