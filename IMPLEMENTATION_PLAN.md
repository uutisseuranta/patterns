# Toteutussuunnitelma — patterns

Kukin label vastaa yhtä PR:ää. Issuet on ryhmitelty labeleittain toteutusjärjestyksessä.
Merkintä `→` tarkoittaa riippuvuutta: edellinen PR on oltava mergettynä ensin.

---

## Label: `hardened` — Laadunvalvonta ja tietoturva (tehdään ensin)

Nämä luovat pohjan muille töille: validointi- ja lintaustyökalut on oltava paikallaan ennen kuin komponenttitoteutus kasvaa.

| Issue | Otsikko | Huomio |
|---|---|---|
| [#55](https://github.com/uutisseuranta/patterns/issues/55) | chore: W3C Markup Validator + Stylelint CI-putkeen | GitHub Actions -status check joka estää mergen jos rikkoo |
| [#1](https://github.com/uutisseuranta/patterns/issues/1) | Pakota HTTPS ja tarkista julkaisu | Enforce HTTPS GitHub Pages -asetuksissa |

**PR-jako:**
- PR `hardened/lint-ci` — issue #55 (W3C + Stylelint + Actions-workflow)
- PR `hardened/https` — issue #1 (HTTPS-pakotus + mixed content -tarkistus)

---

## Label: `chore` — Tekninen velka ja nimeämiskonventiot

Tehtävä ennen komponenttitoteutusta jotta codebase on siistässä kunnossa.

| Issue | Otsikko | Huomio |
|---|---|---|
| [#64](https://github.com/uutisseuranta/patterns/issues/64) | chore: nimeä as2_attributes.csv → as2-attributes.csv | `kebab-case`-rikkomus, 1-rivi git mv |

**PR-scope:** PR `chore/kebab-rename` — yksi commit, tiedostonimen korjaus + kaikki viittaukset.

---

## Label: `documentation` — Dokumentaatio

Tehtävissä missä vaiheessa tahansa, mutta README:n yhdistäminen on tehtävä ennen kuin uusia komponentteja dokumentoidaan.

| Issue | Otsikko | Riippuu |
|---|---|---|
| [#58](https://github.com/uutisseuranta/patterns/issues/58) | docs: yhdistä PATTERNS_CATALOG.md README.md:hen | — |
| [#49](https://github.com/uutisseuranta/patterns/issues/49) | chore: määritä ja kirjaa DoR ja DoD | — |
| [#66](https://github.com/uutisseuranta/patterns/issues/66) | docs: lisää business case -osio puuttuviin issueisiin | — |
| [#36](https://github.com/uutisseuranta/patterns/issues/36) | docs: Linkitys Espanja-pilottien käyttäjäpolut index.html:lle | — |

**PR-jako:**
- PR `docs/readme-merge` — issuet #58 + #49 (README + DoR/DoD yhdessä, molemmat vaikuttavat TECHNICAL_DESIGN.md:hen)
- PR `docs/issue-cleanup` — issue #66 (issueiden business case -lisäykset, vain issue-päivityksiä, ei koodia)
- PR `docs/user-paths-link` — issue #36 (pieni lisäys index.html:iin)

---

## Label: `AS2` — ActivityStreams 2.0 -semantiikka

Nämä voidaan tehdä rinnakkain komponenttityön kanssa. #40 on tehtävä ennen #50:ä.

| Issue | Otsikko | Riippuu |
|---|---|---|
| [#40](https://github.com/uutisseuranta/patterns/issues/40) | feat: AS2 @context ja id data-attribuutit artikkelikorteille | — |
| [#50](https://github.com/uutisseuranta/patterns/issues/50) | chore: tarkista AS2-kenttätoteutus — replies, shares, Like/Dislike | → #40 valmis |
| [#38](https://github.com/uutisseuranta/patterns/issues/38) | AS2 stack-alignment: frontend ↔ backend ↔ standardi | → #40 + #50 valmis, koordinoi bq-activitystreams |
| [#59](https://github.com/uutisseuranta/patterns/issues/59) | refactor: korvaa data-*-attribuutit avoimilla standardeilla (ARIA, JSON-LD) | → #40 + #50 valmis |

**PR-jako:**
- PR `as2/context-id` — issue #40 (@context ja id -attribuutit)
- PR `as2/replies-shares-votes` — issue #50 (replies + shares + Like/Dislike)
- PR `as2/stack-alignment` — issue #38 (dokumentaatio + cross-repo katselmus)
- PR `as2/aria-refactor` — issue #59 (data-* → ARIA/JSON-LD, isompi refaktorointi)

---

## Label: `accessibility` — Saavutettavuus

| Issue | Otsikko | Riippuu |
|---|---|---|
| [#35](https://github.com/uutisseuranta/patterns/issues/35) | a11y/perf: poista Google Fonts -CDN, käytä paikallisia fontteja | — |
| [#27](https://github.com/uutisseuranta/patterns/issues/27) | atom-datepicker: suunnittele ja toteuta päivämäärävalitsin | → #26 CSS-kartoitus |

**PR-jako:**
- PR `a11y/local-fonts` — issue #35 (Google Fonts → @font-face paikallisesti)
- PR `a11y/datepicker` — issue #27 (datepicker-komponentti, natiivi `<input type=date>` lähtökohta)

---

## Label: `enhancement` — Komponenttikehitys (Atomic Design -hierarkia)

Nämä on toteutettava järjestyksessä: CSS-kartoitus ensin, sitten Atoms, sitten Molecules+Organisms, sitten Templates. Komponenttistrategiapäätös (#48) on tehtävä ennen mihinkään komponenttikoodia.

| Issue | Otsikko | Riippuu |
|---|---|---|
| [#48](https://github.com/uutisseuranta/patterns/issues/48) | chore: Vite + Web Components vai Svelte (päätös) | — |
| [#56](https://github.com/uutisseuranta/patterns/issues/56) | style.css rakenteellistaminen osioihin | → #48 päätös |
| [#26](https://github.com/uutisseuranta/patterns/issues/26) | CSS-luokkien holistinen kartoitus ennen pattern-toteutusta | → #56 |
| [#23](https://github.com/uutisseuranta/patterns/issues/23) | Vaihe 1 — Atoms: perusatomit index.html:iin | → #26 |
| [#24](https://github.com/uutisseuranta/patterns/issues/24) | Vaihe 2 — Molecules + Organisms | → #23 |
| [#28](https://github.com/uutisseuranta/patterns/issues/28) | organism-footer: suunnittele ja toteuta footer | → #24 |
| [#25](https://github.com/uutisseuranta/patterns/issues/25) | Vaihe 3 — Templates | → #24 + #28 |
| [#65](https://github.com/uutisseuranta/patterns/issues/65) | feat: komponenttimigraatiosuunnitelma (#48 jatko) | → #48 päätös + #25 |

**PR-jako:**
- PR `feat/component-strategy` — issue #48 (päätös dokumenttina, ei koodia)
- PR `feat/css-structure` — issue #56 (style.css jako osioihin)
- PR `feat/css-audit` — issue #26 (CSS-luokkakartoitus + päätökset)
- PR `feat/atoms` — issue #23 (kaikki Atom-komponentit)
- PR `feat/molecules-organisms` — issuet #24 + #28 (Molecules + Organisms + footer yhteen PR:iin)
- PR `feat/templates` — issue #25 (Templates)
- PR `feat/migration-plan` — issue #65 (migraatiosuunnitelma dokumenttina)

---

## Yhteenveto: PR-järjestys

```
hardened/lint-ci
hardened/https
chore/kebab-rename

docs/readme-merge          (missä vaiheessa tahansa)
docs/user-paths-link       (missä vaiheessa tahansa)
docs/issue-cleanup         (issue-päivityksiä, ei koodia)

as2/context-id
  → as2/replies-shares-votes
      → as2/stack-alignment
      → as2/aria-refactor

a11y/local-fonts            (milloin tahansa)

feat/component-strategy
  → feat/css-structure
      → feat/css-audit
          → feat/atoms
              → feat/molecules-organisms  (sis. footer #28)
                  → feat/templates
                      → feat/migration-plan

a11y/datepicker             (→ feat/css-audit valmis)
```

---

## Puuttuvat issuet — avattava ennen toteutusta

| Aihe | Label | Mihin PR |
|---|---|---|
| Dark mode -testaus kaikille komponenteille | `enhancement` | lisätään `feat/atoms`-PR:n acceptance criteriaan |
| WCAG AA -tarkistus komponenttikirjastolle | `accessibility` | erillinen PR ennen tuotantoa |
