# STANDARDS.md — Standardit ja rajaukset

Tämä dokumentti määrittelee `patterns`-repositorion normatiiviset standardit ja tietoiset rajaukset. Kaikki kolme repoa (patterns, gcs-activitystreams, uutisseuranta.github.io) noudattavat näitä linjauksia.

---

## ActivityStreams 2.0

**Ensisijainen tavoite:** AS2-yhteensopivuus. Tämä projekti **ei** ole täysi ActivityPub-implementaatio.

- Context: `https://www.w3.org/ns/activitystreams`
- Spesifikaatio: [https://www.w3.org/TR/activitystreams-core/](https://www.w3.org/TR/activitystreams-core/)
- Sanasto: [https://www.w3.org/TR/activitystreams-vocabulary/](https://www.w3.org/TR/activitystreams-vocabulary/)

### Käytetyt objektityypit

| Tyyppi | Käyttö |
|---|---|
| `Article` | Uutisartikkeli, pääsisältöobjekti |
| `Note` | Kommentti (`replies`-kokoelman sisällä) |
| `Collection` | `replies`-kokoelma, tag-kokoelmat |
| `Hashtag` | Artikkelin tai kommentin tagi (`tag[]`) |
| `Like` | Käyttäjän “Samaa mieltä”-reaktio |
| `Dislike` | Käyttäjän “Eri mieltä”-reaktio |

### AS2-kenttätaulukko

| Kenttä | Tyyppi | Käytetään | HTML-vastine | Huomio |
|---|---|---|---|---|
| `@context` | IRI | ✅ | `data-ap-context` | `https://www.w3.org/ns/activitystreams` |
| `id` | absoluuttinen IRI | ✅ | `data-ap-id` | Yksilöivä tunniste, pakollinen jokaiselle objektille |
| `type` | string | ✅ | `data-ap-type` | `Article`, `Note`, `Collection`… |
| `name` | string | ✅ | `.article-card__title` | Artikkelin otsikko |
| `summary` | string | ✅ | `.article-card__text` (lyhyt) | Lyhyt kuvaus |
| `content` | HTML string | ✅ | `.article-card__text` (täysi) | Artikkelin leipäteksti |
| `published` | RFC 3339 | ✅ | `<time datetime="...">` | RFC 3339-muoto pakollinen, ks. alla |
| `updated` | RFC 3339 | ✅ | `<time datetime="...">` | RFC 3339-muoto pakollinen |
| `url` | IRI | ✅ | `<a href="...">` | Alkuperäinen URL |
| `url_archive` | IRI | ✅ | arkistolinkki (ks. #44) | Wayback Machine -URL, D-CENT-laajennus |
| `replies` | Collection | ✅ | `data-ap-type="Collection"` | Kommenttien kokoelma |
| `tag` | object[] | ✅ | `.article-tag` + `data-ap-type="Hashtag"` | Sisältötagit |
| `likes` | Collection | ✅ | tykkäyslaskuri | `totalItems`-kenttä |
| `shares` | Collection | ✅ | jakamislaskuri | `totalItems`-kenttä |
| `attributedTo` | Actor\|IRI | ⚠️ osittain | `.article-card__meta` (nimi) | Actor-endpointit backend-repossa, ks. poikkeama 1 |
| `inReplyTo` | IRI | ✅ | `data-ap-in-reply-to` | Kommentin viittaus artikkeliin |
| `to` / `cc` / `bto` / `bcc` | — | ❌ **ei käytetä** | — | Ks. poikkeama 2 |
| Actor-tyypit (`Person`, `Group`…) | — | ❌ **ei käytetä** | — | Ks. poikkeama 1 |

---

## RFC 3339 — Aikaleimastandardi

Kaikki aikaleimat käyttävät ISO 8601 / RFC 3339 -muotoa.

- **Normaalimuoto:** `2026-07-02T14:00:00Z` (UTC, `Z`-pääte)
- **HTML:** `<time datetime="2026-07-02T14:00:00Z">noin tunti sitten</time>`
  - `datetime`-attribuutti aina RFC 3339 — näkyvä teksti voi olla lokalisoitu
- **Aikavyöhyke:** UTC (`Z`) oletusarvo; lokalisointi tehdään UI-kerroksessa
- **Ei sallita:** pelkkä päivämäärä (`2026-07-02`) aikaleimaksi — vaaditaan kellonaika

Spesifikaatio: [https://www.rfc-editor.org/rfc/rfc3339](https://www.rfc-editor.org/rfc/rfc3339)

---

## WCAG 2.1 AA

Tavoitetaso kaikissa UI-komponenteissa: **WCAG 2.1 AA**.
Spesifikaatio: [https://www.w3.org/TR/WCAG21/](https://www.w3.org/TR/WCAG21/)

| Vaatimus | Kriteeri | Käytännön toteutus |
|---|---|---|
| Tekstin kontrasti | SC 1.4.3 | ≥ 4,5:1 normaaliteksti; ≥ 3:1 iso teksti (24 px+) |
| Ei-tekstuaaliset elementit | SC 1.4.11 | ≥ 3:1 (ikonit, lomakekehykset, focus-indikaattori) |
| Näppäimistökäyttö | SC 2.1.1 | Kaikki toiminnallisuudet saavutettavissa Tab/Enter/Space/Esc |
| Focus-indikaattori | SC 2.4.7 | Näkyvä `:focus-visible`-tila pakollinen |
| Hover/focus-sisällöt | SC 1.4.13 | Suljettavissa ilman siirtymistä, pysyvät osoittimen päällä |
| ARIA | — | Vain kun natiivi semantiikka riittämätön; `aria-label` kaikille ikonipainikkeille |
| Kuvien alt-teksti | SC 1.1.1 | Kaikilla `<img>`-elementeillä `alt`-attribuutti; koristekuvat `alt=""` |
| `<time>`-elementti | — | Kaikkiin aikaleimiin; `datetime` RFC 3339-muodossa |

---

## GDPR — Henkilötietojen käsittely

- **Frontend-templaateissa ei henkilökohtaisia tunnistetietoja** (ei sähköpostia, ei IP:tä, ei evästeidä) ilman eksplisiittistä suostumusta
- `data-ap-id` viittaa **artikkeliin tai kommenttiin**, ei käyttäjään
- Käyttäjäprofiilisivu käsitelee henkilötietoja erikseen (ks. uutisseuranta.github.io STANDARDS.md)
- Analytiikka vain anonymisoituna

---

## Hallitut poikkeamat

Nämä ovat **tietoisia suunnittelupäätöksiä**, eivät bugeja. Jokainen on dokumentoitu syineen.

### Poikkeama 1 — Ei Actor-endpointteja tässä repossa

**Mitä puuttuu:** ActivityPub edellyttää, että `attributedTo`-linkit osoittavat dereferointikelpoisen Actor-objektin (`inbox`, `outbox`, `publicKey`). Tämä repo ei toteuta Actor-endpointteja.

**Syy:** Actor-arkkitehtuuri kuuluu backend-repoon (`gcs-activitystreams`). Frontend mallintaa kirjoittajan nimen ja avatarin ilman täyttä Actor-rakennetta.

**Linjaus:** Backend vastaa Actor-yhteensopivuudesta. Stack-alignment tiketeissä #35 ja #41.

### Poikkeama 2 — Ei audience targeting (`to` / `cc` / `bto` / `bcc`)

**Mitä puuttuu:** AS2/ActivityPub käyttää `to`- ja `cc`-kenttiä sisällön kohdentamiseen. Tämä projekti ei toteuta kohdentamista.

**Syy:** Uutisseurannan sisältö on julkista. Kaikki objektit oletetaan oletusarvoisesti julkisiksi.

**Linjaus:** Jos yksityinen viestintä tai ryhmärajoitukset tulevat tarpeellisiksi, lisätään `"to": ["https://www.w3.org/ns/activitystreams#Public"]` -kenttä.

### Poikkeama 3 — `tag-agree` / `tag-disagree` ovat D-CENT-spesifistä semantiikkaa

**Mitä eroaa:** AS2-sanastossa ei ole `Agree`- tai `Disagree`-tyyppejä. Fediverse käyttää `Like`/`Dislike`-aktiviteetteja.

**Syy:** D-CENT:n kansalaisosallistumismalli tarvitsee eksplisiittisen kannanotto-semantiikan. UI näyttää “Samaa mieltä” / “Eri mieltä”, backend lähettää `Like`/`Dislike`.

**Linjaus:** Toteutetaan projektikohtaisena `@context`-laajennuksena. Voidaan ehdottaa upstreamiin FEP-prosessiin.

### Poikkeama 4 — Magenta-erikoiskorostus

**Mitä eroaa:** `--color-error` / `--c-maroon` käytetään korostukseen, ei pelkästään virhetilaan.

**Syy:** D-CENT-perintö; magenta toimii visuaalisena erotteluvärinä Disagree/Eri-mieltä -elementeille.

**Linjaus:** Säilytetään tietoisesti; dokumentoitu `DESIGN_GUIDELINES.md`:ssä (#45).

### Poikkeama 5 — `notification`-komponentti ei kartoidu AS2 Activity -tyyppeihin

**Mitä eroaa:** AS2-toimintamallissa ilmoitukset ovat semanttisesti tarkkoja `Activity`-objekteja (`Create`, `Like`, `Announce`). Nykyinen `.notif-main`/`.notif-special` on visuaalinen jaottelu, ei AS2-tyyppijako.

**Syy:** Komponentti on tällä hetkellä UI-tason palaute, ei federoidun verkon Activity.

**Linjaus:** Kun `inbox`-virta toteutetaan, `notification`-komponenttiin lisätään `data-ap-type="Create"` / `"Like"` / `"Announce"` -attribuutit.

---

## Viitteet

- ActivityStreams 2.0: [https://www.w3.org/TR/activitystreams-core/](https://www.w3.org/TR/activitystreams-core/)
- ActivityStreams 2.0 Vocabulary: [https://www.w3.org/TR/activitystreams-vocabulary/](https://www.w3.org/TR/activitystreams-vocabulary/)
- ActivityPub: [https://www.w3.org/TR/activitypub/](https://www.w3.org/TR/activitypub/)
- RFC 3339: [https://www.rfc-editor.org/rfc/rfc3339](https://www.rfc-editor.org/rfc/rfc3339)
- WCAG 2.1: [https://www.w3.org/TR/WCAG21/](https://www.w3.org/TR/WCAG21/)
- Fediverse Enhancement Proposals: [https://codeberg.org/fediverse/fep](https://codeberg.org/fediverse/fep)
