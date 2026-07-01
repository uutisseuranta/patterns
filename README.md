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
Kun ratkaisu noudattaa kokonaisvaltaista lähestymistapaa semantiikassa ja logiikassa, sekä käyttäjänavigaatio että tuleva kehitys on tehokkaampaa. Ks. [http://www.w3.org/QA/Tips/](http://www.w3.org/QA/Tips/) ja [http://www.w3.org/TR/WCAG20/](http://www.w3.org/TR/WCAG20/). Yksinkertaisesti: väreissä tulee olla mahdollisimman paljon kontrastia, ja fonttien tulee olla niin suuria kuin mahdollista.

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
| `kalles-styles` | D-CENT-kohtaiset CSS-laajennukset ja JS sticky-header-logiikka |

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

---

## CSS-arkkitehtuuri

Tyylit noudattavat BEM-nimeämiskonventiota (Block__Element--Modifier). Tärkeimmät värit:

- **Primääri / brand:** `#007E84` (teal)
- **Primääri hover:** `#00D3CA` (kirkkaampi teal)
- **Taustaväri:** `#ffffff`
- **Teksti:** `#222222`
- **Kevyt tausta:** `#eeeeee`
- **Reunus:** `#666666`

Typografia käyttää fonttia **Comfortaa** navigaatioelementeissä. Muu teksti periytyy selaindefaultista tai projektikohtaisesta CSS-frameworkista.

Tiedostot:
- `style.css` — päätyylitiedosto
- `patterns.js` — JavaScript-toiminnallisuudet (sticky header, DOM-käsittely)

---

## Viitteet

- Alkuperäinen repo: [d-cent/patterns](https://github.com/d-cent/patterns)
- Pattern Lab: [http://d-cent.github.io/patterns/](http://d-cent.github.io/patterns/)
- Atomic Design -metodologia: [http://atomicdesign.bradfrost.com/](http://atomicdesign.bradfrost.com/)
