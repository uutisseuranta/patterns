# Toteutussuunnitelma — patterns

Kukin label vastaa yhtä PR:ää. Issuet on ryhmitelty labeleittain toteutusjärjestyksessä.
Merkintä `→` tarkoittaa riippuvuutta: edellinen PR on oltava mergettynä ensin.

Huom: `patterns`-repo on **komponenttikirjasto** — se tagitaan ensimmäisenä tägiketjussa.
Muut repot määrittelevät `patterns`-version omissa riippuvuuksissaan.

---

## Label: `0-sprint` — Välitön (blokkaajat, tehdään ensin)

| Issue | Otsikko | Huomio |
|---|---|---|
| [#24](https://github.com/uutisseuranta/patterns/issues/24) | testing: kirjoita Playwright E2E-testit artikkelikortti-komponentille | CI-gate ennen kaikkea muuta |
| [#38](https://github.com/uutisseuranta/patterns/issues/38) | chore: määrittää huoltoikkuna- ja versiopoistumastrategia | Versioitumispäätökset kirjataan ennen uusia ominaisuuksia |

**PR-jako:**
- PR `0-sprint/playwright-e2e` — issue #24 (Playwright-konfiguraatio + artikkelikortti-testit)
- PR `0-sprint/version-policy` — issue #38 (DECISION_LOG.md + VERSIONING.md)

---

## Label: `mvp` — Alpha-julkaisun ydinkomponentit

| Issue | Otsikko | Riippuu |
|---|---|---|
| [#1](https://github.com/uutisseuranta/patterns/issues/1) | Artikkelikortti-komponentti (AS2 Article-objekti) | — |
| [#2](https://github.com/uutisseuranta/patterns/issues/2) | Kommenttikortti-komponentti (AS2 Note-objekti) | — |
| [#3](https://github.com/uutisseuranta/patterns/issues/3) | Tagipilvi-komponentti | → #1 valmis (tagit tulevat artikkelikorttidatasta) |
| [#9](https://github.com/uutisseuranta/patterns/issues/9) | Hakupalkki-komponentti | — |
| [#6](https://github.com/uutisseuranta/patterns/issues/6) | Kirjautumismodaali (Firebase Auth) | — |
| [#34](https://github.com/uutisseuranta/patterns/issues/34) | Loading skeleton — artikkelikortti + uutisvirta | → #1 valmis |
| [#33](https://github.com/uutisseuranta/patterns/issues/33) | Error boundary -komponentti | → #1 + #6 valmis |
| [#16](https://github.com/uutisseuranta/patterns/issues/16) | WCAG AA — fokustyyli, kontrastit, aria-labelit | Tarkastettava jokainen MVP-komponentti |

**PR-jako:**
- PR `mvp/article-card` — issue #1 (artikkelikortti)
- PR `mvp/comment-card` — issue #2 (kommenttikortti)
- PR `mvp/tag-cloud` — issue #3 (tagipilvi)
- PR `mvp/search-bar` — issue #9 (hakupalkki)
- PR `mvp/auth-modal` — issue #6 (kirjautumismodaali)
- PR `mvp/skeleton-loading` — issue #34 (skeleton loader)
- PR `mvp/error-boundary` — issue #33 (error boundary)
- PR `mvp/accessibility-audit` — issue #16 (WCAG AA läpäisy kaikille MVP-komponenteille)

---

## Label: `AS2` — ActivityStreams 2.0 -yhteensopivuus

| Issue | Otsikko | Riippuu |
|---|---|---|
| [#47](https://github.com/uutisseuranta/patterns/issues/47) | docs: siirrä patterns.md → TECHNICAL_DESIGN.md, lisää AS2-objektimalli | koordinoi frontend #27 |
| [#35](https://github.com/uutisseuranta/patterns/issues/35) | feat: AS2 JSON-LD-konteksti (context.jsonld) | → bq-activitystreams #54 contract määritelty |
| [#36](https://github.com/uutisseuranta/patterns/issues/36) | feat: TypeScript-tyypit AS2-objekteille (Article, Note, Like, Dislike) | → #35 valmis |

**PR-jako:**
- PR `as2/technical-design` — issue #47 (dokumentaatio + AS2-objektimalli)
- PR `as2/jsonld-context` — issue #35 (context.jsonld)
- PR `as2/ts-types` — issue #36 (TypeScript-tyypit)

---

## Label: `hardened` — Tietoturva- ja laatukovennukset

| Issue | Otsikko | Riippuu |
|---|---|---|
| [#45](https://github.com/uutisseuranta/patterns/issues/45) | sec: Supply chain — npm audit + Dependabot-konfiguraatio | — |
| [#37](https://github.com/uutisseuranta/patterns/issues/37) | chore: määrittää npm-järjestelmän näkyvyyskäytännöt (public/private/scoped) | — |

**PR-jako:**
- PR `hardened/supply-chain` — issuet #45 + #37 (npm audit + näkyvyyspolitiikka yhdessä)

---

## Label: `testing` — Testikattavuus

| Issue | Otsikko | Tehdään yhdessä |
|---|---|---|
| [#25](https://github.com/uutisseuranta/patterns/issues/25) | testing: kirjoita Playwright E2E-testit hakupalkille ja tagipilvelle | `mvp/search-bar` + `mvp/tag-cloud` |
| [#26](https://github.com/uutisseuranta/patterns/issues/26) | testing: Playwright-testit autentikoituneille toiminnoille | `mvp/auth-modal` |
| [#27](https://github.com/uutisseuranta/patterns/issues/27) | testing: Playwright cross-browser-testit (Chrome + Firefox + Safari) | `testing/e2e-*` kaikki valmis |

**Periaate:** testit kuuluvat samaan PR:iin kuin komponentti. Erilliset `testing`-PR:t vain cross-browser (#27).

---

## Label: `enhancement` — Jatkokehitys (post-alpha)

| Issue | Otsikko | Riippuu |
|---|---|---|
| [#4](https://github.com/uutisseuranta/patterns/issues/4) | Like/Dislike-komponentti (Agree/Disagree-näyttönimillä) | → bq-activitystreams #33 Like/Dislike-API |
| [#5](https://github.com/uutisseuranta/patterns/issues/5) | Profiilisivu-komponentti + Agree/Disagree-tilastovisualisointi | → #4 valmis |
| [#7](https://github.com/uutisseuranta/patterns/issues/7) | Wayback-linkkikomponentti | → bq-activitystreams #26 Wayback API |
| [#8](https://github.com/uutisseuranta/patterns/issues/8) | Notifikaatiopaneeli (Firebase Cloud Messaging) | → bq-activitystreams write-api toimii |
| [#10](https://github.com/uutisseuranta/patterns/issues/10) | Latausindikaattori + työjonon hallinta | → #34 skeleton valmis |

**PR-jako:**
- PR `feat/like-dislike` — issuet #4 + #5 (komponentit, riippuvat toisistaan)
- PR `feat/wayback-link` — issue #7
- PR `feat/notifications` — issue #8
- PR `feat/progress-queue` — issue #10

---

## Label: `documentation` — Dokumentaatio ja tekninen velka

| Issue | Otsikko | Huomio |
|---|---|---|
| [#39](https://github.com/uutisseuranta/patterns/issues/39) | chore: siirrä kehitysmuistiinpanot dev-notesista asianmukaisiin tiedostoihin | Tehdään `0-sprint`-työn jälkeen |
| [#40](https://github.com/uutisseuranta/patterns/issues/40) | chore: populoi LICENSES.md | `as2/technical-design` jälkeen |
| [#41](https://github.com/uutisseuranta/patterns/issues/41) | chore: dokumentoi CSS-muuttujajärjestelmä | `mvp/accessibility-audit` jälkeen |
| [#43](https://github.com/uutisseuranta/patterns/issues/43) | Meta: Jira–GitHub-integraation päätökset | Vain dokumentaatiota |

**PR-jako:**
- PR `docs/dev-notes-cleanup` — issue #39 + #40 (kehitysmuistiinpanot + lisenssit)
- PR `docs/css-variables` — issue #41 (CSS-dokumentaatio)
- PR `docs/jira-meta` — issue #43 (ei koodimuutoksia)

---

## Yhteenveto: PR-järjestys

```
0-sprint/playwright-e2e
0-sprint/version-policy

mvp/article-card
mvp/comment-card
  → mvp/tag-cloud
mvp/search-bar
mvp/auth-modal
  → mvp/skeleton-loading
  → mvp/error-boundary
mvp/accessibility-audit     (kaikkien mvp-komponenttien jälkeen)

as2/technical-design        (rinnakkain mvp-työn kanssa)
as2/jsonld-context
  → as2/ts-types

testing/*                   (rinnakkain vastaavan ominaisuuden kanssa)

hardened/supply-chain       (mvp valmis ensin)

feat/like-dislike           (alpha + bq-activitystreams #33 valmis)
feat/wayback-link           (alpha + bq-activitystreams #26 valmis)
feat/notifications          (alpha stabiili)
feat/progress-queue         (alpha stabiili)

docs/*                      (missä vaiheessa tahansa)
```

---

## Puuttuvat issuet — avattava ennen toteutusta

| Aihe | Label | Mihin PR |
|---|---|---|
| Storybook-dokumentaatio komponenteille | `documentation` | oma PR, ennen v1.0.0 |
| Dark mode -tuki komponenttikirjastolle | `mvp` tai `enhancement` | `mvp/accessibility-audit` PR:n yhteydessä |
| npm-paketin julkaisuautomaatio (GitHub Actions) | `0-sprint` | `0-sprint/playwright-e2e` yhteyteen |

---

## Release — tägijärjestys ja gate-kriteerit

Tägit luodaan kolmessa vaiheessa. Jokainen tägi odottaa edellisen CI-buildin läpimenoa.
Tägiketju: **patterns → bq-activitystreams → uutisseuranta.github.io**.
patterns tagitaan **aina ensimmäisenä** — muut repot riippuvat patterns-versiosta.

### v0.1.0 — "Komponenttikirjasto olemassa"

**Gate:** kaikki `0-sprint`-labeliset issuet kiinni, Playwright-testit läpimäissä.

```bash
git tag -a v0.1.0 -m "Release v0.1.0: 0-sprint valmis, Playwright CI käynnissä"
git push origin v0.1.0
```

### v0.3.0 — "MVP-komponentit: artikkelikortti, haku, kirjautuminen, skeleton"

**Gate:** kaikki `mvp`-labeliset issuet kiinni, WCAG AA läpimennyt.

```bash
# Avoimet mvp-issuet — nolla ennen tagausta
gh issue list --label mvp --state open --repo uutisseuranta/patterns
```

```bash
git tag -a v0.3.0 -m "Release v0.3.0: MVP-komponentit, WCAG AA, skeleton loader"
git push origin v0.3.0
```

> **Ketjugate:** bq-activitystreams `v0.5.0` voidaan tagita vasta kun patterns on tagittu `v0.3.0`.
> uutisseuranta.github.io `v0.5.0` voidaan tagita vasta kun bq-activitystreams on tagittu `v0.5.0`.

### v1.0.0 — "Tuotantovalmis komponenttikirjasto"

**Gate:** kaikki `hardened`- ja `testing`-labeliset issuet kiinni, AS2-tyypit julkaistu.

```bash
gh issue list --label hardened --state open --repo uutisseuranta/patterns

git tag -a v1.0.0 -m "Release v1.0.0: tuotantovalmis — AS2-tyypit, supply chain, cross-browser"
git push origin v1.0.0
```

### Terraform-infrastruktuuri labelien hallintaan

Repolabelit ja branch protection hallitaan Terraformilla. Katso
[`terraform/github/patterns/labels.tf`](../terraform/github/patterns/labels.tf)
joka provisioi tässä dokumentissa käytetyt labelit (`0-sprint`, `mvp`, `AS2`,
`hardened`, `testing`, `enhancement`, `documentation`) sekä `main`-haaran
suojaussäännöt.

```hcl
# Esimerkki: terraform/github/patterns/labels.tf
resource "github_issue_label" "mvp" {
  repository  = "patterns"
  name        = "mvp"
  color       = "0075ca"
  description = "MVP-komponentit — vaaditaan alpha-julkaisuun"
}

resource "github_issue_label" "as2" {
  repository  = "patterns"
  name        = "AS2"
  color       = "5319e7"
  description = "ActivityStreams 2.0 -yhteensopivuus"
}

resource "github_branch_protection" "main" {
  repository_id = github_repository.patterns.node_id
  pattern       = "main"

  required_status_checks {
    strict   = true
    contexts = ["ci / playwright"]
  }

  required_pull_request_reviews {
    required_approving_review_count = 1
  }
}
```

Aja muutokset:

```bash
export GITHUB_TOKEN="ghp_..."
cd terraform/github
terraform init && terraform plan && terraform apply
```

### AS2-skeemaversio per release

| Release | AS2-skeemaversio | Muutokset |
|---|---|---|
| `v0.3.0` | schema-v1 | Article, Note, Collection, Hashtag TypeScript-tyypit |
| `v1.0.0` | schema-v2 | Like, Dislike, JSON-LD context.jsonld, `_uutisseuranta:*`-laajennukset |
