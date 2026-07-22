# terraform/outputs.tf

output "pages_url" {
  description = "Patterns-kirjaston GitHub Pages -URL"
  value       = "https://patterns.uutisseuranta.net"
}

output "repo_url" {
  description = "GitHub-repositorion URL"
  value       = "https://github.com/uutisseuranta/patterns"
}

output "component_lib_version" {
  description = "Komponenttikirjaston nykyinen semanttinen versio"
  value       = var.component_lib_version
}
