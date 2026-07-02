# USER_PATHS.md — Käyttäjäpolut

Tämä dokumentti sisältää kaksi osiota:

1. **D-CENT-käyttäjäpolut** — D-CENT D4.3 -spesifikaation pilottikohtaiset polut
2. **Uutisseuranta-sovelluksen käyttäjäpolut (UP-1–UP-15)** — uutisseuranta.net-sovelluksen toteutetut ja suunnitellut polut

---

## Osa 1: D-CENT-käyttäjäpolut

Tarkennus: [patterns/STANDARDS.md](./STANDARDS.md) — normatiiviset vaatimukset | [patterns/DESIGN_GUIDELINES.md](./DESIGN_GUIDELINES.md) — komponenttikirjasto

### 1. Helsinki — Kansalaistoiminta kaupunkipäätösten pohjalta

**Konteksti:** Käyttäjä seuraa Helsingin kaupungin avointa päätöksentekodataa (OpenAhjo API) ja ryhtyy kollektiiviseen toimintaan.

**Käyttäjätarina:** *"Äänioikeutettuna Helsingin kaupunkilaisena tarvitsen välineitä levittää tietoa valtuuston kokouksen esityslistasta ennen kokousta, tehdä se ymmärettävämmiksi ja ryhtyä toimiin."*

#### Polku

1. Käyttäjä kirjautuu sisään ja asettaa hakusana-alertit omalle sivulleen (esim. `#pyöräily`, `#kallio`).
2. Käyttäjä seuraa aktiviteettivirran päivityksiä.
3. Käyttäjä luo ryhmän: määrittää aktiviteettivirran suodattimen ja toiminta-algoritmin, kutsuu muita ja asettaa yksityisyysasetuksen (`julkinen` / `yksityinen`).
4. Käyttäjä näkee jaetun artikkelin ja voi kommentoida sitä lomakkeen kautta.

#### Vaihtoehtoisia jatkopolkuja

- **Yhteisohjaus:** Etherpad + jako ryhmälle yhteismuokkausta varten.
- **Tehtavät:** Käyttäjä luo tehtäviä ja jakaa ne ryhmän jäsenille; tehtävillä on aikataulu ja kalenteri.
- **Äänestys:** Käyttäjä aloittaa ryhmässä äänestyksen (Loomio-tyyli).
- **API-päivitys:** Decisions API päivittää keskustelun automaattisesti valtuuston päätöstuloksella.

---

### 2. Helsinki — Julkinen kuulemispalvelu (virkamiehen polku)

**Konteksti:** Virkamies haluaa kerätä kansalaisten palautetta kaavahankkeesta.

**Käyttäjätarina:** *"Kaupunkisuunnittelua luonnostelevana virkamiehenä haluan julkaista kysymykseni kansalaisten kommentoitavaksi."*

#### Polku

1. Virkamies klikkaa **"Luo uusi artikkeli"**.
2. Virkamies syöttää asiakirjan diaarinumeron — metadata ja liitteet haetaan automaattisesti OpenAhjo-päätös-API:sta.
3. Virkamies muokkaa lomakkeen, johon hän kirjaa omat kysymyksensä.
4. Virkamies tallentaa, julkaisee ja jakaa projektin.

---

### 3. Islanti — Better Reykjavík / Better Iceland

**Konteksti:** Kansalainen ehdottaa kaupungin kehittamisideöita; kaupunki käsittelee kuukausittain 10–15 suosituinta ehdotusta.

#### Polku

1. Käyttäjä kirjautuu sisään ja lähettää idean tai kannattaa olemassa olevaa ehdotusta.
2. Käyttäjä kommentoi ja lisää perusteluja puolesta tai vastaan (`for` / `against`).
3. Rekisteröityneet käyttäjät äänestävät ehdotuksia — kaupunginvaltuusto ottaa kuukausittain käsittelyyn eniten ääniä saaneet.
4. Kaupungin vastaus julkaistaan; käyttäjät arvioivat vastauksen laadun **tähtiasteikolla (1–5)**.

#### Osallistava budjetti (Better Neighborhoods)

1. Käyttäjät lähettävät naapurustoparannusehdotuksia.
2. Virkamiehet laskevat kustannukset.
3. Käyttäjät tekevät sitovan budjettipäätösäänestyksen (300 M ISK:n jaosta).

---

### 4. Suomi — Open Ministry / Kansalaisaloitekampanja

**Konteksti:** Aktivisti koordinoi kansalaisaloitekampanjaa, joka tarvitsee 50 000 tukijaa päästäkseen parlamenttikäsittelyyn.

#### Polku

1. Aktivisti luo projektin tai ryhmän aiheen ympärille.
2. Aktivisti kutsuu yhteistyökumppaneita ja jakaa projektin sosiaalisessa mediassa.
3. Ryhmä yhteismuokkaa dokumenttia (lehdistotiedote, tietopyynto, lakiehdotus).
4. Ryhmän jäsenille jaetaan tehtäviä (deadline, vastuuhenkilö, estivaatimukset).
5. Kampanja kerää tukijoita — eteneminen näkyy aktiviteettivirrassa.

---

### 5. Espanja — Podemos Ciencia

**Konteksti:** Podemos-puolueen tietdepiiri tarvitsee virtuaalisen kokoontumistilan avoimen kokouksen pitämiseen.

#### Polku

1. Käyttäjä kirjautuu sisään Facebook- tai sähköpostitunnuksella.
2. Käyttäjä siirtyy kokouksen näkymään — näkyy 19 keskusteluSäiettä.
3. Käyttäjä osallistuu vähintään yhteen säikeeseen kommentoimalla tai äänestämällä.
4. Käyttäjä äänestää palautessäikeessä: positiivinen / negatiivinen / tyhjä.
5. Käyttäjä voi kirjoittaa ehdotuksen `#propuesta`-hashtagilla.

---

### 6. Espanja — Podemos I+D+i

**Konteksti:** Podemos-puolueen tutkimus- ja innovaatiopiiri testaa D-CENT-alustaa kollektiiviseen päätöksentekoon.

#### Polku

1. Käyttäjä kirjautuu D-CENT-instanssiin.
2. Käyttäjä lukee piirin avoimet agendapisteet ja voi kommentoida niitä.
3. Käyttäjä osallistuu äänestykseen piirin dokumenteista tai ehdotuksista.
4. Äänestystulos kootaan ja jaetaan piirin jäsenille.

---

### 7. Espanja — Guanyem Barcelona

**Konteksti:** Guanyem Barcelona on kansalaisvetoinen kaupunginvaltuustoehdokkuus, joka tarvitsee läpinäkyvän osallistumisprosessin.

#### Polku

1. Käyttäjä rekisteröityy kampanja-alustalle ja vahvistaa henkilöllisyytensä.
2. Käyttäjä selaa ehdotuksia ja agendakohtia sekä kommentoi niitä.
3. Käyttäjä osallistuu deliberaatioon: esittää puolesta/vastaan -argumentteja.
4. Käyttäjä äänestää — prosessissa käytetään blockchain-pohjaista allekirjoitusta.
5. Äänestystulos julkistetaan ja dokumentoituu kampanjan kollektiiviseen muistiin.

---

### 8. Artikkeli-ominaisuuden käyttäjäpolku

1. Käyttäjä luo artikkelin — tukee tekstiä, HTML:ää ja Markdownia.
2. Artikkelin omistaja muokkaa tekstiä ja metatietoja (avainsanat, omistajat) suoraan paikalla.
3. Omistaja voi muuttaa artikkelin tilaa painikkeilla: **Äänestys**, **Yhteismuokkaus**, **Annotaatio**.
4. Ensimmäinen 297 merkin luku erotetaan omaksi dataobjektikseen sosiaalisen median jakoa varten.

---

### 9. Keskustelu ja kommentointi

1. Käyttäjä kirjoittaa mikroblogikommentin (max. 297 merkkiä) artikkelin alle.
2. Kommentti tallennetaan — käyttäjälle tarjoutuu mahdollisuus kopioida pysyväislinkki leikepöydälle.
3. Käyttäjä voi jakaa kommentin kolmannen osapuolen sosiaalisen median palveluun.
4. Muut käyttäjät voivat kommentoida kommenttia — syntyy hierarkiaton ketju.
5. "Tykkäys" tallennetaan tyhjänä mikroblogikommenttina.

---

### 10. Äänestys

1. Artikkelin omistaja avaa äänestyksen artikkelin toimintopainikkeesta.
2. Äänioikeutettu käyttäjä klikkaa haluamaansa äänestystulosta.
3. Äänestys tallennetaan allekirjoitettuna blockchain-avaimena.
4. Jos käyttäjä muuttaa mieltään ennen määräaikaa — blockchain ylikirjoitetaan.
5. Äänestystulokset visualisoidaan; argumentit voidaan ryhmätellä `for/against`-näkymään.

---

### 11. Yhteismuokkaus

1. Artikkelin omistaja klikkaa **"Avaa yhteismuokkaukseen"** -painiketta.
2. Kaikki, jotka on merkitty editoriksi, voivat nyt muokata tekstiä samanaikaisesti.
3. Omistaja sulkee yhteismuokkauksen — uusi artikkeliversio tallennetaan ja julkaistaan.

---

### 12. Annotaatio

1. Artikkelin omistaja sallii annotoinnin.
2. Muut käyttäjät voivat korostaa tekstikohtia ja liittää niihin annotaatio-objekteja.
3. Annotaatiot ovat artikkelin omistajan hallinnassa.

---

### 13. Tehtävät

1. Käyttäjä luo tehtävän: otsikko, vastuuhenkilö, deadline, estivaatimukset.
2. Tehtävä lähetetään vastuuhenkilölle ilmoituksena.
3. Tehtävälistat näkyvät kalenterinäkymässä tai aikajanarakenteessa.

---

### 14. Kirjautuminen ja identiteetinhallinta

#### Polku (uusi käyttäjä)

1. Käyttäjä syöttää käyttäjänimen ja salasanan.
2. Selain luo kryptografisen verifierin (SRP-protokolla + SHA-256) — salasana ei koskaan siirry palvelimelle.
3. Verifier ja salt tallennetaan palvelimen tietokantaan.

#### Polku (palannut käyttäjä)

1. Käyttäjä syöttää salasanan.
2. Selain luo ephemeral-avaimen — palvelin vahvistaa omistajuuden ilman salasanan siirtoa (zero-knowledge proof).
3. Istunto alkaa; yksityinen avain palautetaan paikallisesti allekirjoittamista varten.

---

### 15. Ryhmän pääsynhallinta

1. Käyttäjä liittyy ryhmään — palvelin lisää ryhmän yksityisen avaimen käyttäjän profiiliin.
2. Ryhmäavain todistaa jäsenyyden (capability-malli).
3. Käyttäjä poistuu ryhmästä — palvelin poistaa ryhmäavaimen käyttäjän profiilista.
4. Kaikki ryhmän sisäiset viestit allekirjoitetaan digitaalisesti — alkuperä tarkistettavissa WebFinger-protokollalla.

---

## Osa 2: Uutisseuranta-sovelluksen käyttäjäpolut (UP-1–UP-15)

Lähde: [uutisseuranta/uutisseuranta.github.io](https://github.com/uutisseuranta/uutisseuranta.github.io)

Tämä osio kuvaa uutisseuranta.net-sovelluksen käyttäjäpolut ja käyttotapaukset — sekä toteutetut (UP-1–8) että suunnitellut laajennukset (UP-9–15).

### Käyttäjäprofiilit

| Rooli | Kuvaus | Autentikointi |
|---|---|---|
| **Anonyymi käyttäjä** | Vierailee sivustolla ilman kirjautumista | Ei vaadi |
| **Kirjautunut käyttäjä** | Tunnistautunut Google-tunnuksella | Firebase Auth / Google Sign-In |

---

### UP-1 · Ensivierailu (anonyymi)

**Lähtötilanne:** Käyttäjä saapuu sivustolle ensimmäistä kertaa.

```
Saapuu uutisseuranta.net
  └─ Näkee hero-osion
       ├─ Lukee arvolupauksen
       ├─ [CTA] "Aloita seuranta" → vie GitHubiin
       └─ [CTA] "Katso esimerkkejä" → ankkuroi #uutiset-osioon
```

---

### UP-2 · Uutisvirran selaaminen

```
Klikkaa navigaation "Uutiset" tai "Katso esimerkkejä" -linkkiä
  └─ Scrollaa #uutiset-osioon
       ├─ Näkee pääuutisen (feed-item--lead)
       └─ Näkee 2 sivuuutista (feed-item--small)
```

---

### UP-3 · Teeman vaihto

```
Klikkaa navigaation aurinko/kuu-ikonipainike
  └─ JavaScript vaihtaa data-theme-attribuuttia
       ├─ "light" → CSS-muuttujat vaaleat sävyt
       └─ "dark"  → CSS-muuttujat tummat sävyt
```

---

### UP-4 · Kirjautuminen Google-tunnuksella

```
Klikkaa "Kirjaudu"-painiketta (btn-login)
  └─ Firebase Auth käynnistää signInWithPopup(GoogleAuthProvider)
       ├─ [Onnistuu] → onAuthStateChanged laukeaa, user ≠ null
       └─ [Epäonnistuu] → Alert: "Tämä verkkotunnus ei ole sallittu..."
```

---

### UP-5 · Uloskirjautuminen

```
Klikkaa "Ulos"-painiketta
  └─ signOut(auth)
       └─ onAuthStateChanged laukeaa, user = null
```

---

### UP-6 · Lähteiden aktiivisuuden tarkastelu

Staattinen esittelykomponentti (`aria-hidden="true"`). Reaaliaikainen data integroidaan myöhemmin.

---

### UP-7 · Avoin lähdekoodi – osallistuminen

```
Klikkaa "Katso GitHubissa" tai navigaation "GitHub"
  └─ Uusi välilehti: github.com/jaakkokorhonen/uutisseuranta
```

---

### UP-8 · Mobiiliselaus

```
Mobiiliselain lataa sivuston (≤ 768px)
  └─ Responsiiviset mediakysely aktivoituvat
       ├─ Navigaation linkit piilotetaan
       ├─ feed-grid yksisarakkeiseksi
       └─ features-visual -widget piilotetaan
```

---

### UP-9 · Henkilökohtainen uutisvirtanakymä

**D-CENT-malli:** `streams`

```
Käyttäjä klikkaa tagiä uutiskortissa
  ├─ [Anonyymi] Tag lisätään istuntokohtaiseen suodatinlistaan (JS-muistissa)
  └─ [Kirjautunut] Sama + tallennetaan localStorage:iin UID:lla avainparina
```

**Tekniset valinnat:** `selectedTags = new Set()` muistissa; kirjautuneelle `localStorage.setItem('prefs_' + uid, ...)`.

---

### UP-10 · Käyttäjäasetusten hallinta

**D-CENT-malli:** `settings`

```
Kirjautunut käyttäjä avaa asetukset
  └─ Asetuspaneeli aukeaa
       ├─ Seuratut tagit – poistettavissa
       ├─ Teemavalinta (vaalea/tummä/järjestelmä)
       └─ "Tyhjennekäikki asetukset"
```

**Tekniset valinnat:** `localStorage.setItem('prefs_' + uid, JSON.stringify({tags, theme}))`.

---

### UP-11 · "Uutta seuraamissasi aiheissa" -ilmoitus

**D-CENT-malli:** `notifications-list`

```
Käyttäjä palaa sivulle (uusi istunto)
  └─ Sovellus vertaa: nykyinen syöte vs. edellisen käynnin "viimeisin artikkeli" per tagi
       ├─ Uusia → kellokuvakkeessa numero
       └─ Ei uusia → kelloa ei näytetä
```

---

### UP-12 · Käyttäjäprofiilisivu

**D-CENT-malli:** `profile`

```
Klikkaa avatarikuvaa → "Profiili"
  └─ Profiilipaneeli aukeaa
       ├─ Google-profiilikuva ja nimi (Firebase Auth currentUser)
       ├─ Seurantatilastot (localStorage-datasta)
       └─ "Kirjaudu ulos" ja "Poista tili"
```

---

### UP-13 · Artikkelin kontekstuaalinen vertailu

**D-CENT-malli:** `discussion` + `argumenting`

```
Käyttäjä klikkaa uutiskorttia
  └─ Artikkelimodal aukeaa
       └─ "Sama aihe muualla" -osio
            └─ Jaccard-samankaltaisuus tokenisoiduille otsikoille (kynnys > 0.2)
                 └─ 2–5 artikkelia eri lähteistä
```

---

### UP-14 · Hakutoiminto

**D-CENT-malli:** `streams` (hakusuodatin)

```
Hakuikoni → hakukenttä laajenee
  └─ Käyttäjä kirjoittaa
       └─ Debounce 200ms → client-side suodatus
            ├─ Hakusana korostetaan otsikoissa (<mark>)
            └─ Hash-parametri: #haku=... (jaettava linkki)
```

---

### UP-15 · Kirjautuminen ja anonyymiyS (suunnitteluperiaatteet)

Kirjautuminen on valinnaista eikä toimi porttina sisällölle.

| Tilanne | Toiminto |
|---|---|
| Anonyymi avaa etusivun | Diskreetti "Kirjaudu tallentaaksesi valinnat" -linkki |
| Anonyymi klikkaa tallennusta vaativaa toimintoa | Kirjautumismodaali selityksellä |
| Kirjautunut käyttäjä | Avatar headerissa; ei kirjautumiskehotteita |
| Kirjautuminen epäonnistuu | Virheilmoitus: "Kirjautuminen peruutettiin" |

---

### Käyttötapausten yhteenveto (UP-1–UP-15)

| Tunnus | Käyttötapaus | Autentikointi | Nykyinen tila |
|---|---|---|---|
| UP-1 | Ensivierailu | Ei vaadi | ✅ Toteutettu |
| UP-2 | Uutisvirran selaaminen | Ei vaadi | ✅ Staattinen demo |
| UP-3 | Teeman vaihto | Ei vaadi | ✅ Toteutettu |
| UP-4 | Kirjautuminen Google-tunnuksella | Vaatii | ✅ Toteutettu |
| UP-5 | Uloskirjautuminen | Vaatii | ✅ Toteutettu |
| UP-6 | Lähteiden aktiivisuus | Ei vaadi | 🔲 Staattinen demo |
| UP-7 | Osallistuminen avoimeen lähdekoodiin | Ei vaadi | ✅ Toteutettu |
| UP-8 | Mobiiliselaus | Ei vaadi | ✅ Toteutettu |
| UP-9 | Tagipohjainen suodatus | Ei vaadi | 🔲 Ehdotettu |
| UP-10 | Asetuspaneeli | Ei vaadi | 🔲 Ehdotettu |
| UP-11 | Uusien artikkelien ilmoitus | Ei vaadi | 🔲 Ehdotettu |
| UP-12 | Profiilipaneeli | Vaatii | 🔲 Ehdotettu |
| UP-13 | Kontekstuaalinen vertailu | Ei vaadi | 🔲 Ehdotettu |
| UP-14 | Hakutoiminto | Ei vaadi | 🔲 Ehdotettu |
| UP-15 | Kirjautuminen ja anonyymiys | Ei vaadi | 🔲 Ehdotettu |

**Legenda:** ✅ = toiminnallinen · 🔲 = placeholder / tuleva ominaisuus

---

## Ristiin-linkit

- [uutisseuranta/uutisseuranta.github.io](https://github.com/uutisseuranta/uutisseuranta.github.io) — frontend-sovellus
- [uutisseuranta/gcs-activitystreams](https://github.com/uutisseuranta/gcs-activitystreams) — backend AS2-rajapinta
- [patterns/DESIGN_GUIDELINES.md](./DESIGN_GUIDELINES.md) — komponenttikirjasto
- [patterns/STANDARDS.md](./STANDARDS.md) — normatiiviset vaatimukset
