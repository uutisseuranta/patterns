# terraform/github.tf
# GitHub-repositorion hallinta: branch protection ja labelit.
#
# Komponenttikirjaston labelit eroavat frontendistä:
# - area:component  – yksittäisen komponentin kehitys
# - area:token      – design token -muutos (väri, typografia, spacing)
# - area:a11y       – saavutettavuus (WCAG)
# - type:breaking   – API-muutos joka vaatii frontendin päivityksen

# ── Branch protection ──────────────────────────────────────────────────────────
resource "github_branch_protection" "main" {
  repository_id = "patterns"
  pattern       = "main"

  required_status_checks {
    strict   = true
    contexts = var.required_ci_checks
  }

  required_pull_request_reviews {
    dismiss_stale_reviews           = true
    required_approving_review_count = 1
  }

  enforce_admins = false
}

# ── Milestone-labelit ──────────────────────────────────────────────────────────
resource "github_issue_label" "milestone_v03" {
  repository  = "patterns"
  name        = "milestone:v0.3"
  color       = "0075ca"
  description = "Komponenttikirjasto v0.3 – frontendin v0.9-releasen vaatima taso"
}

resource "github_issue_label" "milestone_v10" {
  repository  = "patterns"
  name        = "milestone:v1.0"
  color       = "006b75"
  description = "Komponenttikirjasto v1.0 – stabiili API, täysi a11y"
}

# ── Prioriteettilabelit ─────────────────────────────────────────────────────────
resource "github_issue_label" "priority_critical" {
  repository  = "patterns"
  name        = "priority:critical"
  color       = "d93f0b"
  description = "Blokkaava – pakollinen ennen seuraavaa releasea"
}

resource "github_issue_label" "priority_high" {
  repository  = "patterns"
  name        = "priority:high"
  color       = "e4e669"
  description = "Tärkeä – seuraavaan sprinttiin"
}

resource "github_issue_label" "priority_normal" {
  repository  = "patterns"
  name        = "priority:normal"
  color       = "0e8a16"
  description = "Normaali prioriteetti"
}

# ── Aluetyyppilabelit (patterns-spesifiset) ─────────────────────────────────
resource "github_issue_label" "area_component" {
  repository  = "patterns"
  name        = "area:component"
  color       = "1d76db"
  description = "Yksittäisen UI-komponentin kehitys (NewsCard, SourceBadge...)"
}

resource "github_issue_label" "area_token" {
  repository  = "patterns"
  name        = "area:token"
  color       = "5319e7"
  description = "Design token -muutos: väri, typografia, spacing, radius"
}

resource "github_issue_label" "area_a11y" {
  repository  = "patterns"
  name        = "area:a11y"
  color       = "c2e0c6"
  description = "Saavutettavuus – WCAG 2.1 AA"
}

resource "github_issue_label" "area_docs" {
  repository  = "patterns"
  name        = "area:docs"
  color       = "e4e669"
  description = "PATTERNS_CATALOG.md, esimerkit, dokumentaatio"
}

resource "github_issue_label" "area_infra" {
  repository  = "patterns"
  name        = "area:infra"
  color       = "bfd4f2"
  description = "GitHub Pages, build, Terraform"
}

# ── Tyyppi-labelit ─────────────────────────────────────────────────────────────
resource "github_issue_label" "type_bug" {
  repository  = "patterns"
  name        = "type:bug"
  color       = "ee0701"
  description = "Komponentin visuaalinen tai toiminnallinen virhe"
}

resource "github_issue_label" "type_feat" {
  repository  = "patterns"
  name        = "type:feat"
  color       = "84b6eb"
  description = "Uusi komponentti tai ominaisuus"
}

resource "github_issue_label" "type_breaking" {
  repository  = "patterns"
  name        = "type:breaking"
  color       = "b60205"
  description = "Breaking change – vaatii frontendin päivityksen (major bump)"
}

resource "github_issue_label" "type_chore" {
  repository  = "patterns"
  name        = "type:chore"
  color       = "cccccc"
  description = "Tekninen velka, refaktorointi"
}

resource "github_issue_label" "type_blocked" {
  repository  = "patterns"
  name        = "type:blocked"
  color       = "e11d48"
  description = "Odottaa toisen issuen tai repon ratkaisua"
}
