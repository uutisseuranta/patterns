# terraform/variables.tf

variable "default_branch" {
  description = "Repon oletushaara"
  type        = string
  default     = "main"
}

variable "required_ci_checks" {
  description = "CI-tarkistukset jotka vaaditaan ennen mergeä"
  type        = list(string)
  # patterns-repossa ei vielä ole CI:tä – lista voidaan täydentää myöhemmin
  default     = []
}

variable "component_lib_version" {
  description = "Komponenttikirjaston semanttinen versio (erillinen frontendin versiosta)"
  type        = string
  default     = "v0.3.0"
}
