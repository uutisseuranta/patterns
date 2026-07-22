# terraform/main.tf
# Terraform-konfiguraatio uutisseuranta/patterns -komponenttikirjastolle.
#
# Patterns on jaettu CSS/JS-komponenttikirjasto joita frontend käyttää.
# Se julkaistaan GitHub Pages:iin osoitteessa patterns.uutisseuranta.net
# (CNAME-tiedosto pysyy repossa).
#
# Versiointi: patterns noudattaa omaa semanttista versiointiään (v0.3.0)
# erillään frontendin versiosta – komponenttikirjaston API voi murtua
# frontendin minor-versiosta riippumatta.
#
# Tiedosto korvaa:
#   .github/labels.yml  (jos olemassa)  → github_issue_label -resurssit
#
# Issue-viittaukset:
#   #28  Security Hardening – branch protection

terraform {
  required_version = ">= 1.7.0"
  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 6.0"
    }
  }

  # backend "gcs" {
  #   bucket = "uutisseuranta-activitystreams-tfstate"
  #   prefix = "terraform/patterns/state"
  # }
}

provider "github" {
  owner = "uutisseuranta"
  # token luetaan GITHUB_TOKEN-ympäristömuuttujasta
}
