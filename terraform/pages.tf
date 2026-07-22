# terraform/pages.tf
# GitHub Pages -konfiguraatio patterns-komponenttikirjastolle.
# Julkaisee patterns.uutisseuranta.net -osoitteeseen.

resource "github_repository_pages" "site" {
  repository = "patterns"

  source {
    branch = var.default_branch
    path   = "/"
  }
}
