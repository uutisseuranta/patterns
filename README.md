# D-CENT UI Patterns

Tämä repo dokumentoi D-CENT-projektin UI-suunnitteluperiaatteet ja Pattern Lab -objektihierarkian. Perustuu [d-cent/patterns](https://github.com/d-cent/patterns)-repoon.

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
  "summary": "Suomi siirtyy käyttämään ainoastaan uusiutuvaa energiaa vuoteen 2050 mennessä.",
  "content": "<p>Käynnistetään energiaremontti, joka tähtää siihen, että Suomi siirtyy käyttämään ainoastaan uusiutuvaa energiaa vuoteen 2050 mennessä.</p>",
  "attributedTo": {
    "type": "Group",
    "id": "https://uutisseuranta.fi/groups/suomen-uusenergiset",
    "name": "Suomen uusenergiset"
  },
  "published": "2025-03-15T09:00:00Z",
  "updated": "2025-03-15T10:42:00Z",
  "tag": [
    { "type": "Hashtag", "name": "#UusiutuvaEnergia",  "href": "https://uutisseuranta.fi/tags/uusiutuva-energia" },
    { "type": "Hashtag", "name": "#Ilmastonmuutos",    "href": "https://uutisseuranta.fi/tags/ilmastonmuutos" },
    { "type": "Hashtag", "name": "#UusiTalous",        "href": "https://uutisseuranta.fi/tags/uusi-talous" }
  ],
  "replies": {
    "type": "Collection",
    "totalItems": 2,
    "items": [
      {
        "type": "Note",
        "id": "https://uutisseuranta.fi/comments/1",
        "attributedTo": {
          "type": "Person",
          "id": "https://uutisseuranta.fi/users/mikko-mallikas",
          "name": "Mikko Mallikas"
        },
        "content": "Luvut ovat niin nannaa, että tuossa kannattaisi suoraan linkata alkuperäiseen lähteeseen epäilijöiden vakuuttamiseksi.",
        "published": "2025-03-15T10:05:00Z",
        "inReplyTo": "https://uutisseuranta.fi/articles/energiaremontti-2050"
      },
      {
        "type": "Note",
        "id": "https://uutisseuranta.fi/comments/2",
        "attributedTo": {
          "type": "Person",
          "id": "https://uutisseuranta.fi/users/elina-esimerkki",
          "name": "Elina Esimerkki"
        },
        "content": "Sana \"parantaisi\" toistuu. Joku muu saa miettiä korvaavan ilmaisun, kun täältä loppui kahvi.",
        "published": "2025-03-15T10:38:00Z",
        "inReplyTo": "https://uutisseuranta.fi/articles/energiaremontti-2050"
      }
    ]
  },
  "likes": {
    "type": "Collection",
    "totalItems": 47
  },
  "shares": {
    "type": "Collection",
    "totalItems": 12
  }
}
```

### Kenttäkartta — AS2 → UI-komponentti

| AS2-kenttä | Tyyppi | UI-vastine (`index.html`) |
|---|---|---|
| `name` | `string` | `.article-card__title` |
| `summary` | `string` | `.article-card__text` (lyhyt) |
| `content` | `HTML string` | `.article-card__text` (täysi) |
| `attributedTo.name` | `string` | `.article-card__meta a` (ryhmän nimi) |
| `published` | `xsd:dateTime` | `.article-card__meta` aikaleima |
| `updated` | `xsd:dateTime` | `.comment-time` (viimeksi muokattu) |
| `tag[].name` | `Hashtag[]` | `.article-tag` |
| `replies.totalItems` | `integer` | kommenttilaskuri |
| `replies.items[]` | `Note[]` | `.comment-card` (yksi per Note) |
| `replies.items[].attributedTo.name` | `string` | `.comment-author` + `.comment-avatar` (nimikirjaimet) |
| `likes.totalItems` | `integer` | tykkäyslaskuri |
| `shares.totalItems` | `integer` | jakamislaskuri |

### Miksi AS2 Article eikä Note

ActivityStreams 2.0 -spesifikaatiossa `Note` on lyhyt, kontekstiton viesti (twiitti, kommentti). `Article` on nimenomaan kirjoitettu, otsikollinen sisältöobjekti, jolla on `name`-kenttä ja joka on tarkoitettu luettavaksi pidempänä kokonaisuutena. D-CENT:n kansalaisaloitteet, kampanjakirjoitukset ja uutisanalyysit ovat rakenteeltaan artikkeleita, eivät lyhytviestejä — tämä tekee `Article`-tyypistä semanttisesti oikean valinnan.

`Note`-tyyppiä käytetään `replies`-kokoelman sisällä yksittäisille kommenteille, mikä vastaa AS2-spesifikaation suositeltua rakennetta.

### Pattern Lab -sijoitus

Templaatti sijoittuu `03-templates`-tasolle, mutta hyödyntää kaikki alla olevat tasot:

- **Atom:** `.article-tag` (Hashtag-linkki), `.comment-avatar` (Person-avatar)
- **Molecule:** `.comment-card` (Note-objekti), `.article-card__meta` (aikaleima + ryhmälinkki)
- **Organism:** `.article-card` (koko Article-objekti kommentteineen)
- **Template:** `template-article-page` — Article + replies-Collection + like/share-laskurit

---

## CSS-arkkitehtuuri

Tyylit noudattavat BEM-nimeämiskonventiota (Block__Element--Modifier).

### Design tokens (CSS custom properties)

Kaikki värit, typografia ja spacing on määritelty CSS custom property -tokeneina `index.html`:ssä (`:root`-lohko). Ei hardcodattuja hex-arvoja komponenttityylistä — kaikki viittaavat tokeneihin:

**Värit:**

| Token | Vaaleatila | Tummotila | Käyttö |
|-------|-----------|-----------|--------|
| `--color-primary` | `#007E84` | `#4f98a3` | Pääpainiketaustat, linkit, aksentit |
| `--color-primary-hover` | `#005f64` | `#227f8b` | Hover-tila — kontrasti valkoiseen ≥ 7:1 (WCAG AA) |
| `--color-primary-highlight` | `#cedcd8` | `#313b3b` | Badget, taustakorostukset |
| `--color-bg` | `#f7f6f2` | `#171614` | Sivun tausta |
| `--color-surface` | `#ffffff` | `#1c1b19` | Kortit, header |
| `--color-surface-2` | `#f3f0ec` | `#22211f` | Toissijainen pinta, koodiesimerkit |
| `--color-text` | `#28251d` | `#cdccca` | Leipäteksti |
| `--color-text-muted` | `#7a7974` | `#797876` | Toissijainen teksti |
| `--color-border` | `#d4d1ca` | `#393836` | Kehykset |

**Typografia:**

| Token | Arvo | Käyttö |
|-------|------|--------|
| `--font-body` | `'Satoshi', 'Helvetica Neue', sans-serif` | Kaikki leipäteksti |
| `--font-display` | `'Cabinet Grotesk', 'Helvetica Neue', sans-serif` | Otsikot (`--text-xl`+) |
| `--text-xs` … `--text-2xl` | `clamp()`-funktiot | Fluid typography, ei kiinteitä px-arvoja |

**Spacing:** `--space-1` (4 px) … `--space-16` (64 px) — 4 px:n ruudukko.

### Tumma tila (dark mode)

Toteutettu `[data-theme="dark"]`-selektorilla — ei erillistä `@media`-lohkoa, jotta JS-toggle toimii oikein. FOUC estetään blocking-skriptillä `<head>`-tagissa ennen CSS:ää.

### JavaScript (`patterns.js`)

Vanilla JS — ei jQuery-riippuvuutta. Toiminnallisuudet:

| Funktio | Kuvaus |
|---------|--------|
| `initThemeToggle()` | Tumma/vaalea-toggle, tallentaa `localStorage`-preferenssin, päivittää `aria-label` |
| `initStickyHeader()` | IntersectionObserver-pohjainen sticky header — ei scroll-event-kuuntelijaa |
| `initNavToggle()` | Mobiilinavigaation hamburger-toggle, `aria-expanded` päivittyy |
| `initNavHighlight()` | Aktiivinen navigaatiolinkin korostus IntersectionObserverin avulla |
| `initCommentToggle()` | Kommenttikentän avaus/sulkeminen, `aria-expanded` + `aria-controls` |
| `initEmbeddedItems()` | Upotettavien kohteiden klikkaukset |
| `initTabs()` | Välilehtikomponentti: `role="tab"`, nuolinäppäinnavigaatio (ARIA Authoring Practices) |
| `initNotificationDismiss()` | Ilmoitusten sulkeminen animaatiolla |

---

## Viitteet

- Alkuperäinen repo: [d-cent/patterns](https://github.com/d-cent/patterns)
- Pattern Lab: [http://d-cent.github.io/patterns/](http://d-cent.github.io/patterns/)
- Atomic Design -metodologia: [http://atomicdesign.bradfrost.com/](http://atomicdesign.bradfrost.com/)
- WCAG 2.1: [https://www.w3.org/TR/WCAG21/](https://www.w3.org/TR/WCAG21/)
- ActivityStreams 2.0: [https://www.w3.org/TR/activitystreams-core/](https://www.w3.org/TR/activitystreams-core/)
- ActivityStreams 2.0 Vocabulary: [https://www.w3.org/TR/activitystreams-vocabulary/](https://www.w3.org/TR/activitystreams-vocabulary/)
