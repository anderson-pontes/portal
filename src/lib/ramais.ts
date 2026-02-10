export interface Ramal {
  local: string
  lotacao: string
  servidor: string
  telefone: string
}

export type RamalFilters = {
  local?: string
  lotacao?: string
  servidor?: string
  telefone?: string
}

function normalizeText(value: string): string {
  return value
    ? value
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .trim()
    : ""
}

function matchesFilter(fieldValue: string, filterValue?: string): boolean {
  if (!filterValue) return true
  const normalizedField = normalizeText(fieldValue)
  const normalizedFilter = normalizeText(filterValue)
  return normalizedField.includes(normalizedFilter)
}

export function filterRamais(ramais: Ramal[], filters: RamalFilters): Ramal[] {
  const { local, lotacao, servidor, telefone } = filters

  return ramais.filter((ramal) => {
    return (
      matchesFilter(ramal.local, local) &&
      matchesFilter(ramal.lotacao, lotacao) &&
      matchesFilter(ramal.servidor, servidor) &&
      matchesFilter(ramal.telefone, telefone)
    )
  })
}

