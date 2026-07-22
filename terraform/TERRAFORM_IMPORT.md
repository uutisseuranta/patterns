# Terraform Import – patterns

Tämä tiedosto dokumentoi `terraform import` -komennot kaikille resursseille
jotka ovat olemassa GitHub:ssa ennen `terraform apply`:n ensimmäistä ajoa.

Patterns-repossa on vain GitHub-puolen resursseja (ei GCP:tä).

## Edellytykset

```bash
cd terraform/
export GITHUB_TOKEN="ghp_..."
terraform init
```

---

## 1. GitHub Pages

Patterns-kirjasto on julkaistu GitHub Pages:iin.

```bash
terraform import github_repository_pages.site patterns
```

---

## 2. Branch Protection (main)

```bash
terraform import github_branch_protection.main "patterns:main"
```

> **Huom:** `required_ci_checks = []` on oletusarvo koska patterns-repossa ei
> ole vielä CI-putkeaa. Jos CI lisätään myöhemmin, päivitä `variables.tf`
> ja aja `terraform apply` uudelleen.

---

## 3. Labelit – Shell-skripti

Patterns-repossa labelit ovat komponenttikirjastospesifisiä.
Jira-sync-labelit ovat todennäköisesti olemassa — uudet labelit
(`area:component`, `area:token`, `type:breaking` jne.) luodaan uusina.

```bash
#!/usr/bin/env bash
# Tallenna: terraform/import_labels.sh
# Käyttö: bash import_labels.sh

set -e
REPO="patterns"

# Nämä labelit saattavat olla olemassa (Jira-sync)
declare -A EXISTING_LABELS
EXISTING_LABELS["priority_highest"]="priority:highest"
EXISTING_LABELS["priority_high_jira"]="priority:high"
EXISTING_LABELS["priority_medium"]="priority:medium"
EXISTING_LABELS["priority_low"]="priority:low"
EXISTING_LABELS["priority_lowest"]="priority:lowest"
EXISTING_LABELS["sprint_1"]="sprint:1"
EXISTING_LABELS["sprint_2"]="sprint:2"
EXISTING_LABELS["sprint_3"]="sprint:3"
EXISTING_LABELS["sprint_4"]="sprint:4"
EXISTING_LABELS["sprint_5"]="sprint:5"
EXISTING_LABELS["status_todo"]="status:to-do"
EXISTING_LABELS["status_in_progress"]="status:in-progress"
EXISTING_LABELS["status_in_review"]="status:in-review"
EXISTING_LABELS["status_done"]="status:done"

# Nämä ovat patterns-spesifisiä — todennäköisesti EIVAT ole olemassa
# (Terraform luo ne apply:ssä, import ei tarpeen)
# milestone_v03, milestone_v10
# priority_critical, priority_high, priority_normal
# area_component, area_token, area_a11y, area_docs, area_infra
# type_bug, type_feat, type_breaking, type_chore, type_blocked

for resource_name in "${!EXISTING_LABELS[@]}"; do
  label_name="${EXISTING_LABELS[$resource_name]}"
  echo "Importing github_issue_label.${resource_name} <- ${label_name}"
  terraform import "github_issue_label.${resource_name}" "${REPO}:${label_name}" || \
    echo "  SKIP: ${label_name} ei löydy reposta (luodaan apply:ssä)"
done

echo ""
echo "Jira-sync-labelit importoitu. Uudet patterns-labelit luodaan terraform apply:ssä."
```

---

## 4. Yksittäiset import-komennot

Jos labelit pitää tuoda yksitellen:

```bash
# Mahdollisesti olemassa olevat Jira-sync-labelit
terraform import github_issue_label.priority_highest   "patterns:priority:highest"
terraform import github_issue_label.priority_high_jira "patterns:priority:high"
terraform import github_issue_label.priority_medium    "patterns:priority:medium"
terraform import github_issue_label.priority_low       "patterns:priority:low"
terraform import github_issue_label.priority_lowest    "patterns:priority:lowest"

terraform import github_issue_label.sprint_1           "patterns:sprint:1"
terraform import github_issue_label.sprint_2           "patterns:sprint:2"
terraform import github_issue_label.sprint_3           "patterns:sprint:3"
terraform import github_issue_label.sprint_4           "patterns:sprint:4"
terraform import github_issue_label.sprint_5           "patterns:sprint:5"

terraform import github_issue_label.status_todo        "patterns:status:to-do"
terraform import github_issue_label.status_in_progress "patterns:status:in-progress"
terraform import github_issue_label.status_in_review   "patterns:status:in-review"
terraform import github_issue_label.status_done        "patterns:status:done"

# Nämä ovat uusia — EI importoida, Terraform luo ne
# github_issue_label.milestone_v03
# github_issue_label.area_component
# github_issue_label.area_token
# github_issue_label.area_a11y
# github_issue_label.type_breaking
# ... jne
```

---

## 5. Täydellinen workflow ennen ensimmäistä apply:tä

```bash
cd terraform/

# 1. Alusta
terraform init

# 2. Pages ja branch protection
terraform import github_repository_pages.site patterns
terraform import github_branch_protection.main "patterns:main"

# 3. Olemassa olevat labelit
bash import_labels.sh

# 4. Tarkista – tässä pitäisi näkyä vain uudet labelit luotavina
terraform plan

# 5. Aja
terraform apply
```

---

## 6. Versiointi: component_lib_version

Kun komponenttikirjastosta tehdään uusi release, päivitä `terraform.tfvars`:

```hcl
# terraform/terraform.tfvars
component_lib_version = "v0.4.0"
```

Tämä päivittää `outputs.component_lib_version` -arvon, joka näkyy
`terraform output` -komennolla. Versiota ei käytetä suoraan mihinkään
GitHub-resurssiin — se on dokumentaatiota Terraform state:ssa.

---

## 7. Virhetilanteet

### `Error: label already exists`
Label on repossa mutta ei state:ssa. Aja kyseinen import-komento.

### `Error: Resource already managed by Terraform`
Label on jo state:ssa. Ei tarvitse tehdä mitään.

### `Error: Not Found (404)`
Label ei ole vielä repossa. Terraform luo sen `apply`:ssä.

### `Pages source not found`
Jos Pages ei ole vielä aktiivinen, aktivoi se ensin GitHub-asetuksissa
(Settings → Pages → Source: Deploy from branch, main, /).
Ten jälkeen aja import uudelleen.

### Branch protection 403
GITHUB_TOKEN tarvitsee `repo`-scopen ja admin-oikeudet repositoriolle.
