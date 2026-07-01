# D-CENT User Paths

Tämä dokumentti kokoaa D-CENT D4.3 -spesifikaatiossa kuvatut käyttäjien toimintapolut piloteittain ja ominaisuuksittain.

---

## 1. Helsinki — Kansalaistoiminta kaupunkipäätösten pohjalta

**Konteksti:** Käyttäjä seuraa Helsingin kaupungin avointa päätöksentekodataa (OpenAhjo API) ja ryhtyy kollektiiviseen toimintaan.

**Käyttäjätarina:** *"Helsingin kaupunkilaisena tarvitsen välineitä levittää tietoa valtuuston kokouksen esityslistasta ennen kokousta, tehdä se ymmärrettävämmäksi ja ryhtyä toimiin."*

### Polku

1. Käyttäjä kirjautuu sisään ja asettaa hakusana-alertit omalle sivulleen (esim. `#pyöräily`, `#kallio`).
2. Käyttäjä seuraa aktiviteettivirran päivityksiä.
3. Käyttäjä luo ryhmän ("projektin"): määrittää aktiviteettivirran suodattimen ja toiminta-algoritmin, kutsuu muita ja asettaa yksityisyysasetuksen (`julkinen` / `yksityinen`).
4. Käyttäjä näkee jaetun artikkelin ja voi kommentoida sitä lomakkeen kautta.

### Vaihtoehtoisia jatkopolkuja

- **Yhteisohjaus:** Käyttäjä avaa Etherpadin ja jakaa sen ryhmälle yhteismuokkausta varten (esim. sähköposti kaupunginvaltuutetuille, tiedote, kansalaisaloite).
- **Tehtävät:** Käyttäjä luo tehtäviä ja jakaa ne ryhmän jäsenille; tehtävillä on aikataulu ja kalenteri.
- **Äänestys:** Käyttäjä aloittaa ryhmässä äänestyksen (Loomio-tyyli).
- **Jakominen:** Käyttäjä jakaa artikkelin tai linkin ryhmään ja luo ilmoituksia jäsenille.
- **API-päivitys:** Decisions API päivittää keskustelun automaattisesti valtuuston päätöstuloksella.

---

## 2. Helsinki — Julkinen kuulemispalvelu (virkamiehen polku)

**Konteksti:** Virkamies haluaa kerätä kansalaisten palautetta kaavahankkeesta.

**Käyttäjätarina:** *"Kaupunkisuunnittelua luonnostelevana virkamiehenä haluan julkaista kysymykseni kansalaisten kommentoitavaksi."*

### Polku

1. Virkamies klikkaa **"Luo uusi artikkeli"**.
2. Virkamies syöttää asiakirjan diaarinumeron — metadata ja liitteet haetaan automaattisesti OpenAhjo-päätös-API:sta.
3. Virkamies muokkaa lomakkeen, johon hän kirjaa omat kysymyksensä.
4. Virkamies tallentaa, julkaisee ja jakaa projektin.

---

## 3. Islanti — Better Reykjavík / Better Iceland

**Konteksti:** Kansalainen ehdottaa kaupungin kehittämisideoita; kaupunki käsittelee kuukausittain 10–15 suosituinta ehdotusta.

### Polku

1. Käyttäjä kirjautuu sisään ja lähettää idean tai kannattaa olemassa olevaa ehdotusta.
2. Käyttäjä kommentoi ja lisää perusteluja puolesta tai vastaan (argumentit ryhmitellään `for` / `against`).
3. Rekisteröityneet käyttäjät äänestävät ehdotuksia — kaupunginvaltuusto ottaa kuukausittain käsittelyyn eniten ääniä saaneet.
4. Kaupungin vastaus ehdotukseen julkaistaan, ja käyttäjät arvioivat vastauksen laadun **tähtiasteikolla (1–5)** — tämä kannustaa parempaan vastauskulttuuriin.

### Osallistava budjetti (Better Neighborhoods)

1. Käyttäjät lähettävät naapurustoparannusehdotuksia.
2. Virkamiehet laskevat kustannukset.
3. Käyttäjät tekevät sitovan budjettipäätösäänestyksen (300 M ISK:n jaosta).

---

## 4. Suomi — Open Ministry / Kansalaisaloitekampanja

**Konteksti:** Aktivisti koordinoi kansalaisaloitekampanjaa, joka tarvitsee 50 000 tukijaa päästäkseen parlamenttikäsittelyyn.

**Käyttäjätarina:** *"Kansalaisaloitekampanjaan osallistuvana aktivistina tarvitsen tehokkaan tavan organisoida omaa ja muiden aikaa ja tehtäviä."*

### Polku

1. Aktivisti luo projektin tai ryhmän aiheen ympärille (esim. lakiehdotus tai kaupunginosatason ehdotus).
2. Aktivisti kutsuu yhteistyökumppaneita ja jakaa projektin sosiaalisessa mediassa.
3. Ryhmä yhteismuokkaa dokumenttia (lehdistötiedote, tietopyyntö, lakiehdotus).
4. Ryhmän jäsenille jaetaan tehtäviä (deadline, vastuuhenkilö, estivaatimukset).
5. Kampanja kerää tukijoita — eteneminen näkyy aktiviteettivirrassa.

---

## 5. Artikkeli-ominaisuuden käyttäjäpolku

**Käyttäjätarve:** Dokumenttidata kannattaa hallita rakenteisina artikkeleina URL-viitteiden sijaan — tämä mahdollistaa tehokkaan haun ja sisällön uudelleenkäytön.

### Polku

1. Käyttäjä luo artikkelin — tukee tekstiä, HTML:ää ja Markdownia.
2. Artikkelin omistaja muokkaa tekstiä ja metatietoja (avainsanat, omistajat) suoraan paikalla.
3. Omistaja voi muuttaa artikkelin tilaa painikkeilla: **Äänestys**, **Yhteismuokkaus**, **Annotaatio**.
4. Ensimmäinen 297 merkin luku erotetaan omaksi dataobjektikseen sosiaalisen median jakoa varten.

---

## 6. Keskustelu ja kommentointi

**Käyttäjätarve:** Käyttäjät tarvitsevat tilan omille argumenteilleen artikkelin sisällöstä menettämättä tekstin omistajuutta.

### Polku

1. Käyttäjä kirjoittaa mikroblogikommentin (max. 297 merkkiä) artikkelin alle.
2. Kommentti tallennetaan — käyttäjälle tarjoutuu mahdollisuus kopioida pysyväislinkki leikepöydälle.
3. Käyttäjä voi jakaa kommentin kolmannen osapuolen sosiaalisen median palveluun (Twitter, Facebook jne.).
4. Muut käyttäjät voivat kommentoida kommenttia — syntyy hierarkiaton ketju.
5. "Tykkäys" tallennetaan tyhjänä mikroblogikommenttina; tykätyn objektin URI lisätään käyttäjän profiiliin hakusuodattimia varten.

---

## 7. Äänestys

**Käyttäjätarve:** *"Artikkelin editorina tarvitsen tavan viedä artikkeliin dokumentoidut ehdotukset käyttäjien ratifioitaviksi."*

### Polku

1. Artikkelin omistaja avaa äänestyksen artikkelin toimintopainikkeesta.
2. Äänioikeutettu käyttäjä klikkaa haluamaansa äänestystulosta.
3. Äänestys tallennetaan allekirjoitettuna blockchain-avaimena.
4. Jos käyttäjä muuttaa mieltään ennen määräaikaa — blockchain ylikirjoitetaan.
5. Äänestystulokset visualisoidaan; argumentit voidaan ryhmitellä `for/against`-näkymään.

---

## 8. Yhteismuokkaus

**Käyttäjätarve:** *"Artikkelin omistajana haluan antaa muille pääsyn muokata dokumenttia kanssani."*

### Polku

1. Artikkelin omistaja klikkaa **"Avaa yhteismuokkaukseen"** -painiketta.
2. Kaikki, jotka on merkitty editoriksi, voivat nyt muokata tekstiä samanaikaisesti paikanpäällä.
3. Omistaja sulkee yhteismuokkauksen — uusi artikkeliversio tallennetaan ja julkaistaan.

---

## 9. Annotaatio

**Käyttäjätarve:** *"Artikkelin editorina haluan sallia muiden annotoida tekstiäni ja ehdottaa muutoksia."*

### Polku

1. Artikkelin omistaja sallii annotoinnin.
2. Muut käyttäjät voivat korostaa tekstikohtia ja liittää niihin annotaatio-objekteja.
3. Annotaatiot ovat artikkelin omistajan hallinnassa — ne eivät ole annotaattorin omaisuutta.

---

## 10. Tehtävät

**Käyttäjätarve:** *"Kansalaisaktivistina tarvitsen tavan jakaa tehtäviä tapahtumien ja vapaaehtoistyön organisoimiseksi nopeasti."*

### Polku

1. Käyttäjä luo tehtävän (artikkeli erityisellä metatiedolla): otsikko, vastuuhenkilö, deadline, estivaatimukset.
2. Tehtävä lähetetään vastuuhenkilölle ilmoituksena.
3. Tehtävässä riippuvuudet: `estivaatimukset` (mitkä tehtävät pitää tehdä ensin) ja `estää` (mitä tämä tehtävä estää).
4. Tehtävälistat näkyvät kalenterinäkymässä tai aikajanarakenteessa.

---

## 11. Kirjautuminen ja identiteetinhallinta

**Käyttäjätarve:** Käyttäjä haluaa kirjautua ilman, että salasana tallennetaan selväkielisenä palvelimelle.

### Polku (uusi käyttäjä)

1. Käyttäjä avaa D-CENT-noden osoitteen ja syöttää käyttäjänimen ja salasanan.
2. Selain luo kryptografisen verifierin (SRP-protokolla + SHA-256) — salasana ei koskaan siirry palvelimelle.
3. Verifier ja salt tallennetaan palvelimen tietokantaan.
4. Käyttäjä saa pääsyn D-CENT-palveluihin (päätöksenteko, dokumentit, ryhmät).

### Polku (palannut käyttäjä)

1. Käyttäjä syöttää salasanan.
2. Selain luo ephemeral-avaimen — palvelin vahvistaa omistajuuden ilman salasanan siirtoa (zero-knowledge proof).
3. Istunto alkaa; yksityinen avain palautetaan paikallisesti allekirjoittamista varten.

---

## 12. Ryhmän pääsynhallinta

**Käyttäjätarve:** Ryhmä haluaa rajoittaa sisältönsä vain jäsenille.

### Polku

1. Käyttäjä liittyy ryhmään — palvelin lisää ryhmän yksityisen avaimen käyttäjän profiiliin.
2. Ryhmäavain todistaa jäsenyyden; sen hallussapito riittää pääsynhallintaan (capability-malli).
3. Käyttäjä poistuu ryhmästä — palvelin poistaa ryhmäavaimen käyttäjän profiilista.
4. Kaikki ryhmän sisäiset viestit allekirjoitetaan digitaalisesti — vastaanottajat voivat tarkistaa alkuperän WebFinger-protokollalla.
