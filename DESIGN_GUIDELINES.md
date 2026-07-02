# DESIGN_GUIDELINES.md — Uutisseuranta UI Patterns visuaalinen kieli

> **Rajanveto:** UI-visuaalinen kieli tässä tiedostossa.
> Normatiiviset vaatimukset (WCAG, GDPR, AS2-kenttätaulukko) ovat [STANDARDS.md](./STANDARDS.md):ssä.

---

## 1. Visuaalinen kieli

### Värit (CSS custom properties)

Kaikki värit on määritelty CSS custom property -tokeneina `:root`-lohkossa (`index.html`). Ei hardcodattuja hex-arvoja komponenttityylistä — kaikki viittaavat tokeneihin.

#### Vaaleatila / tummotila

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

#### Uutisseuranta-spesifiset erikoisvärit

| Token | Arvo | Käyttö |
|-------|------|--------|
| `--color-agree` | `#007E84` (primary) | `tag-agree` -semantiikka — puolesta-tagit |
| `--color-disagree` | `#c0392b` | `tag-disagree` -semantiikka — vastaan-tagit |
| `--color-magenta` | `#c2185b` | Magenta-erikoiskorostus (ks. alla § Uutisseuranta-poikkeamat) |

### Typografia

| Token | Arvo | Käyttö |
|-------|------|--------|
| `--font-body` | `'Satoshi', 'Helvetica Neue', sans-serif` | Kaikki leipäteksti |
| `--font-display` | `'Cabinet Grotesk', 'Helvetica Neue', sans-serif` | Otsikot (`--text-xl`+) |
| `--text-xs` … `--text-2xl` | `clamp()`-funktiot | Fluid typography, ei kiinteitä px-arvoja |

### Ikonit

- Ikonit ovat SVG-muodossa, ei ikonifonttikirjastoja.
- Ikonin `aria-hidden="true"` kun visuaalinen koriste; tekstitoisto `aria-label` tai viereinen tekstielementti pakollinen toiminnallisissa ikoneissa.
- Minimikoko: 24×24 px klikkialueena.

### Spacing

`--space-1` (4 px) … `--space-16` (64 px) — 4 px:n ruudukko. Ei hardcodattuja px-arvoja layoutissa.

---

## 2. Komponenttiperiaatteet

### Artikkelikortti (`.article-card`)

- Rakenne: otsikko → metatiedot (ryhmä + aikaleima) → summary-teksti → tagit → laskurit (kommentit, tykkäykset, jakamiset).
- `data-ap-type="Article"` juurielementissä — ks. [STANDARDS.md § AS2-kenttätaulukko](./STANDARDS.md#as2-kenttätaulukko).
- Hover-tila: `box-shadow` korostus, ei värimuutosta tekstiin.
- Mobiilissa: täysilevyinen, ei sidepalkki.

### Kommentit (`.comment-card`)

- AS2 `Note`-objekti — `data-ap-type="Note"`, `data-ap-in-reply-to` pakollinen.
- Avatar: `--space-8` (32 px) pyöristetty neliö; fallback initiaalit `--color-primary-highlight`-taustalla.
- Kommenttitekstin max-leveys: `65ch` luettavuuden varmistamiseksi.
- Sisäkkäiset kommentit max 2 tasoa — kolmas taso litistetään samalle tasolle.

### Tagit (`.article-tag`)

- `data-ap-type="Hashtag"`, `data-ap-name="#tagname"`.
- Tyyli: pieni pilleri (`border-radius: 999px`), `--color-primary-highlight` tausta, `--color-primary` teksti.
- Klikkaus navigoi tag-sivulle (`/tags/{slug}`).

### Välilehdet (`.tabs`)

- `role="tablist"`, `role="tab"`, `role="tabpanel"` — ARIA Authoring Practices -malli.
- Nuolinäppäinnavigaatio pakollinen (SC 2.1.1).
- Aktiivinen välilehti: `aria-selected="true"`, `--color-primary` alapalkki.

---

## 3. Uutisseuranta-spesifiset poikkeamat

Nämä ovat tietoisia visuaalisia valintoja, jotka poikkeavat tai laajentavat yleistä komponenttimallia Uutisseuranta-kontekstiin.

### `tag-agree` / `tag-disagree` -semantiikka

Uutisseuranta-alustalla argumentointiominaisuus käyttää tageja puolesta/vastaan-semantiikkaan. Visuaalinen erottelu:

| Tyyppi | CSS-luokka | Väri | Käyttö |
|--------|-----------|------|--------|
| Puolesta | `.tag-agree` | `--color-agree` (#007E84) | Artikkelin kannattavat argumentit |
| Vastaan | `.tag-disagree` | `--color-disagree` (#c0392b) | Artikkelin vastustavat argumentit |

Nämä tagit **eivät** seuraa yleistä `--color-primary-highlight`-tyyliä — tämä on tarkoituksellinen poikkeama.

### Magenta-erikoiskorostus

`--color-magenta` (#c2185b) käytetään erityisissä korostustilanteissa:
- Uudet, lukemattomat ilmoitukset (notification badge)
- Kampanja- tai toimintakehotuspainikkeet joissa tarvitaan visuaalista erottumista primääriväristä

Magenta ei ole yleinen aksenttiväri — käyttö rajattu yllä mainittuihin tapauksiin.

### Hallittu poikkeama-lista (deviation list)

| # | Poikkeama | Perustelu | Vakiokomponentti johon poikkeaa |
|---|-----------|-----------|--------------------------------|
| D-1 | `tag-agree`/`tag-disagree` -värit | Uutisseuranta-argumentointisemantiikka vaatii selkeän visuaalisen erottelun | `.article-tag` yleinen tyyli |
| D-2 | Magenta ilmoitusbadgessa | Korkea näkyvyys kriittisissä toimintakehotuksissa | `--color-primary` normaalitilanteessa |
| D-3 | Kommenttitasot max 2 | Kognitiivisen kuorman rajoittaminen; D4.3-spesifikaatio | Rajaton hierarkia |

---

## 4. Tumma tila

Toteutettu `[data-theme="dark"]`-selektorilla — ei erillistä `@media (prefers-color-scheme: dark)` -lohkoa, jotta JS-toggle toimii oikein. FOUC estetään blocking-skriptillä `<head>`-tagissa ennen CSS:ää. Tokenien tummotilaarvot yllä § 1 Värit -taulukossa.

---

## Viitteet

- [STANDARDS.md](./STANDARDS.md) — normatiiviset vaatimukset (WCAG, AS2, GDPR)
- [TECHNICAL_DESIGN.md](./TECHNICAL_DESIGN.md) — arkkitehtuuri, CSS-konventiot, muutoshistoria
- Atomic Design: [http://atomicdesign.bradfrost.com/](http://atomicdesign.bradfrost.com/)
- WCAG 2.1: [https://www.w3.org/TR/WCAG21/](https://www.w3.org/TR/WCAG21/)
