# Patterns

D-CENT-projektin suunnitteluperiaatteet ja Pattern Lab -objektit, sovitettuna [uutisseuranta.github.io](https://uutisseuranta.github.io)-projektin tekniseen ympäristöön.

Live: http://d-cent.github.io/patterns/

---

## Suunnitteluperiaatteet (Design Principles)

Suunnitteluperiaatteita käytetään pohjana, kun tehdään palvelun kehittämiseen liittyviä suunnittelupäätöksiä.

### 1. API first
Rakennamme sovellusrajapinnat ensin, ja käyttökokemuksen niiden päälle. Tämä mahdollistaa monikanavaisen käyttökokemuksen ja koneiden välisen viestinnän. D-CENT-projektissa tämä on erityisen tärkeää hajautuksen ja datanjakelun kannalta solmujen välillä.

### 2. Mobile first
Käytämme responsiivisia käyttöliittymiä ja varmistamme, että käyttäjät voivat käyttää haluamiaan laitteita. Aloita layoutin suunnittelu oleellisimmasta sisällöstä pienille laitteille ja minimaalisella kognitiivisella kuormituksella. Maailman väestö käyttää digitaalista maailmaa ensisijaisesti mobiililaitteillaan.

### 3. Minimalistinen tekninen käyttökokemus
Yksi käyttäjätarina jokaista käyttäjähyötyä kohden. Haluamme välttää kognitiivista kuormitusta ja jättää tilan ja käyttäjän ajan käyttäjien luomalle sisällölle.

### 4. Positiivisuus
Positiivinen palvelu palkitsee käyttäjää, innostaa kokeilemaan uusia asioita ja kannustaa tutkimaan lisää turvallisessa ympäristössä. Käyttäjä palaa mielellään palveluun, joka tervehtii ja kiittää häntä.

### 5. Yhteisöllisyys
Yhteisölliseksi työkaluksi ja vaikuttamisen välineeksi rakennettu palvelu mahdollistaa sisällön jakamisen ja kommunikaation käyttäjien välillä. Monipuolinen interaktiivinen palvelu luo positiivisia kokemuksia vaikuttamisesta.

### 6. Tasa-arvo ja osallisuus
Yhteiseen palveluun ovat kaikki yhtä lailla tervetulleita. Asianmukaisesti tiivis ja visuaalinen palvelu tekee vaikeistakin asioista ymmärrettäviä. Osallisuusperiaatteen noudattaminen tarkoittaa kaikkien ihmisten sisäisen arvon tunnistamista ja tukemista luomalla olosuhteet, jotka edistävät tasa-arvoa, voimaantumista, tietoisuutta ja osaamista henkilökohtaisella, ryhmä- ja organisaatiotasolla.

### 7. Helppokäyttöisyys
Kun käyttökokemus on minimaalinen ja suoraviivainen, ilman ylimääräisiä klikkauksia, luokitteluja tai vaiheita, ratkaisuista tulee selkeämpiä ja intuitiivisempia. Katso https://www.gov.uk/designprinciples

### 8. Tekninen saavutettavuus
Kun ratkaisu noudattaa kokonaisvaltaista lähestymistapaa semantiikassa ja logiikassa, sekä käyttäjänavigaatio että tuleva kehitys on tehokkaampaa. Katso http://www.w3.org/QA/Tips/ ja http://www.w3.org/TR/WCAG20/. Yksinkertaisesti sanottuna: väreissä tulisi olla niin paljon kontrastia kuin mahdollista, ja kirjasinten tulisi olla niin suuria kuin mahdollista.

### 9. Avuliaisuus
Kun käyttäjä on kiinnostuneempi omasta asiastaan kuin siihen liittyvistä oikeudellisista tai teknisistä prosesseista, hänelle tulee tarjota lisätietoja, esimerkkejä, apua ja käyttäjäystävällistä vuorovaikutusta. Tarkat ohjeet vähentävät epävarmuutta, ohjaavat käyttäjää rakentaviin käyttäytymismalleihin ja luovat positiivista palautetta.

### 10. Interaktiivisuus
Ohjeet ja toiminnot osoittavat selkeästi ja konkreettisesti, mitkä ovat käyttäjän toimien hyödyt, seuraukset ja vaikutukset. Osallistumisesta viestitään esimerkiksi, milloin tulokset ovat saatavilla ja että tilin vahvistamisen jälkeen vahvemmalla tunnistautumisella on mahdollisuus käyttää laajempia toimintoja kuten äänestämistä.

### 11. Yksinkertaisuus
Toimintoja suunniteltaessa rakennetaan ensin yksinkertaisin toiminto, jotta voidaan luoda ja validoida ydinetu, jonka toiminto tai käyttäjätarina on tarkoitus tuottaa. Lisätoimintoja tulisi lisätä vain mittareiden tai käyttäjäkokemuksen tutkimuksesta ja havainnoinnista saatujen konkreettisten löydösten perusteella.

---

## Pattern Lab -objektit

Pattern Lab -rakenne noudattaa Atomic Design -metodologiaa: Atomit → Molekyylit → Organismit → Mallipohjat.

### Atomit (Atoms)

Atomit ovat rakennuspalikkojen perusyksiköt – HTML-elementtejä kuten tekstikenttiä, painikkeita ja värejä, joita ei voi enää jakaa pienempiin osiin.

#### Globaalit (Global)
- **Värit** (`00-colors`) – D-CENT-väripaletti: teal `#007E84`, hover `#00D3CA`, ja taustavärit
- **Fontit** (`01-fonts`) – Muli (body), Comfortaa (otsikot), icomoon-ikonifontit
- **Näkyvyys** (`03-visibility`) – Apuluokat elementtien piilottamiseen/näyttämiseen
- **Grid** (`04-grid`) – Yksinkertainen kolumnipohjainen ruudukko

#### Teksti (Text)
- **Otsikot** (`00-headings`) – H1–H6, alpha–zeta-luokat
- **Kappale** (`01-paragraph`) – Peruskappaletyylit, lead/lede
- **Lainaus** (`02-blockquote`) – Blockquote-tyyli
- **Inline-elementit** (`03-inline-elements`) – strong, em, abbr, mark jne.
- **Aika** (`04-time`) – Aikaleiman muotoilu
- **Esimuotoiltu teksti** (`05-preformatted-text`) – code, pre, samp
- **Vaakaviiva** (`06-hr`) – Erotinviiva
- **Häivytettävä teksti** (`07-fade-out-text`) – Teksti, joka häivytetään loppua kohden

#### Listat (Lists)
- Järjestämätön lista
- Järjestetty lista
- Tyylitön lista (`.unstyled`)

#### Kuvat (Images)
- **Normaalikuva** – Responsiivinen kuva (`max-width: 100%`)
- **Pyöreä kuva** (`.img--round`) – `border-radius: 50%`
- **Kuva oikealle** (`.img--right`) – Float-sijoittelu
- **Kuva vasemmalle** (`.img--left`) – Float-sijoittelu
- **Kuva keskelle** (`.img--center`) – Centered-sijoittelu
- **Figure** – Kuva ja kuvateksti

#### Lomakkeet (Forms)
- **Tekstikentät** (`00-text-fields`) – input[type=text], textarea, label
- **HTML5-syötteet** (`04-html5-inputs`) – sähköposti, numero, puhelin, URL
- **Inline-muokkaus** (`05-inline-editing`) – Klikkaamalla muokattavat kentät (angular-xeditable)
- **Päivämäärävalitsin** (`06-datepicker`) – Datepicker-komponentti

#### Painikkeet (Buttons)
- **Painikkeet** (`00-buttons`) – Ensisijainen, toissijainen, ghost, destructive
- **Välilehdet** (`01-tabs`) – Perusvälilehdet
- **Välilehdet + haku** (`01-tabs-with-search`) – Välilehdet hakukentällä
- **Välilehdet alt** (`01-tabs-alt`) – Vaihtoehtoinen välilehtityyli
- **Tagit** (`02-tags`) – Tunniste/tag-elementit
- **Painikejoukko** (`04-button-group`) – Ryhmitellyt painikkeet

#### Taulukot (Tables)
- Perustaulu teal-reunaväreillä (`#48BEC4`)
- Otsikkosolut (`th`) teal-värillä

#### Media
- Mediatietue – kuva vasemmalla/oikealla, teksti vieressä

---

### Molekyylit (Molecules)

Molekyylit ovat atomeista koostuvia yksinkertaisia UI-komponentteja, joilla on oma selkeä tarkoituksensa.

#### Kommentit (`comments`)
- Kommenttiketju
- Yksittäinen kommentti
- Kommenttilaatikko

#### Aputekstit (`helper-text`)
- Ohjeteksti-palkki, joka avautuu/sulkeutuu painikkeesta (`.js-helper__toggle`)
- Sisältää otsikon, tekstin ja sulkemistoiminnon

#### Viestit (`messaging`)
- Ilmoitusviestit: virhe, varoitus, onnistuminen, info
- Sulkemisnapilla varustettuja viestibannereita

#### Navigaatiot (`navigations`)
- Sivupalkin navigaatio
- Leivänmurut
- Sivutus

#### Ilmoitukset (`notification`)
- Yksittäinen ilmoituskortti
- Ilmoituspisteen badge

#### Objektit (`objects`)
- **Media-objekti** – Kuva + tekstisisältö vierekkäin
- **Navigaatio-objekti** (`.nav`) – Vaakasuora navigaatiolista
- **Boxiobjekti** – Padding ylä/alas/vasemmalle/oikealle
- **Block-objekti** – Padding ylä- ja alaosaan
- **Paljas lista** – Marginaalien ja listatyylin poistaminen
- **Väriluokat** – Teal, harmaa, valkoinen jne.

#### Virrat (`streams`)
- Aktiviteettivirran yksittäinen kohde
- Virran aikaleima
- Virran tekijätiedot

---

### Organismit (Organisms)

Organismit ovat monimutkaisia käyttöliittymäkomponentteja, jotka koostuvat atomeista ja molekyyleistä.

#### Argumentointi (`argumenting`)
- Väittely-/argumentointilomake
- Puolesta/vastaan-äänestyspainikkeet
- Argumenttikortti kommenteilla

#### Keskustelu (`discussion`)
- Koko keskusteluosio otsikolla, sisällöllä ja kommenttiketjulla
- Sisältää häivytettävän tekstin ja "lue lisää" -toiminnon

#### Tapahtuma (`event`)
- Tapahtumakortti tiedoilla (otsikko, päivämäärä, paikka, osallistujat)
- Tapahtumalistaustila

#### Globaali (`global`)
- Sivuston ylätunniste (header)
- Sivuston alatunniste (footer)

#### Kirjautuminen (`login`)
- Kirjautumislomake (`.login`, `.js-login-open`)
- Sähköposti + salasanakenttä
- Kirjaudu sisään / Rekisteröidy -välilehdet

#### Navigaatio (`navigation`)
- Päänavigointi (`.nav--primary`)
- Hamburgeri-valikko mobiilille
- Käyttäjävalikko ilmoituspisteineen

#### Ilmoituslista (`notifications-list`)
- Koko ilmoituslistaus kellokuvakkeella
- Merkitse kaikki luetuiksi -toiminto

#### Profiili (`profile`)
- Käyttäjäprofiilisivun layout
- Avatar, nimi, bio, osallistumistilastot

#### Rekisteröinti (`registration`)
- Rekisteröintilomake vaiheistettuna
- Sähköposti, salasana, vahvistus

#### Asetukset (`settings`)
- Asetussivun layout (`.settings-container`, `.js-settings-open`)
- Profiili-, turvallisuus- ja ilmoitusasetukset

#### Virrat (`streams`)
- Koko aktiviteettivirta-osio
- Suodatus-, haku- ja järjestämistoiminnot

---

### Mallipohjat (Templates)

Mallipohjat ovat sivutason rakenteet, jotka kokoavat organismit yhteen.

- **Etusivu** (`frontpage.mustache`) – Pääsivu virrat ja navigaatio
- **Ryhmäsivu** (`group-page.mustache`) – Ryhmän tiedot ja aktiviteetit
- **Ryhmäsivu sisältö auki** (`group-page-with-content-open.mustache`) – Kuten ryhmäsivu, mutta sisältöpaneeli avattuna
- **Sivu: virrat + sisältö** (`page-stream-and-content.mustache`) – Kaksipalkkilayout
- **Sivu: virrat** (`page-stream.mustache`) – Yksipalkki, virta-näkymä
- **Perussivu** (`page.mustache`) – Geneerinen sivumallipohja

---

## Asennus

Nämä toimivat Linuxilla ja Macilla.

```bash
# Kloonaa repo paikallisesti
git clone https://github.com/uutisseuranta/patterns.git
cd patterns

# Asenna Grunt
npm install grunt-cli

# Muokkaa tiedostoja /source -hakemistossa
# Generoi muutokset skripteillä core/scripts/-hakemistossa
git push

# Julkaise GitHub Pagesille
git push master:gh-pages
```

---

## Lisenssi

MIT
