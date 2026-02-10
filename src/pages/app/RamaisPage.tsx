import { useMemo, useState, FormEvent } from "react"
import { Helmet } from "react-helmet-async"
import { Phone, Search, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { filterRamais, Ramal, RamalFilters } from "@/lib/ramais"
import ramaisJson from "@/assets/ramais.json"

const ramais: Ramal[] = ramaisJson as Ramal[]

export default function RamaisPage() {
  const [filters, setFilters] = useState<RamalFilters>({
    local: "",
    lotacao: "",
    servidor: "",
    telefone: "",
  })

  const [appliedFilters, setAppliedFilters] = useState<RamalFilters>({})

  const handleSearch = (event: FormEvent) => {
    event.preventDefault()
    setAppliedFilters(filters)
  }

  const handleClear = () => {
    const emptyFilters: RamalFilters = {
      local: "",
      lotacao: "",
      servidor: "",
      telefone: "",
    }
    setFilters(emptyFilters)
    setAppliedFilters({})
  }

  const filteredRamais = useMemo(
    () => filterRamais(ramais, appliedFilters),
    [appliedFilters],
  )

  const hasActiveFilters = useMemo(
    () =>
      Boolean(
        appliedFilters.local ||
          appliedFilters.lotacao ||
          appliedFilters.servidor ||
          appliedFilters.telefone,
      ),
    [appliedFilters],
  )

  return (
    <>
      <Helmet title="Ramais" />

      <div className="p-6 space-y-6">
        {/* Cabeçalho da página */}
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-3 rounded-2xl bg-white/60 px-4 py-2 shadow-sm backdrop-blur">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 text-white shadow-md">
              <Phone className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
                Ramais PGE-PA
              </h1>
              <p className="text-sm text-slate-600">
                Consulte rapidamente os ramais por local, lotação, servidor ou
                telefone.
              </p>
            </div>
          </div>
        </div>

        {/* Filtros de busca */}
        <Card className="glass-card border-white/40 bg-white/70 shadow-lg backdrop-blur-md">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Search className="h-5 w-5 text-blue-500" />
              Buscar ramais
            </CardTitle>
            <CardDescription>
              Refine a lista utilizando um ou mais campos abaixo. A busca não
              diferencia maiúsculas/minúsculas e considera acentos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={handleSearch}
              autoComplete="off"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">
                    Local
                  </label>
                  <Input
                    placeholder="Ex.: SEDE, ANEXO"
                    value={filters.local ?? ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        local: e.target.value,
                      }))
                    }
                    className="w-full"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">
                    Lotação
                  </label>
                  <Input
                    placeholder="Ex.: Diretoria de TI"
                    value={filters.lotacao ?? ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        lotacao: e.target.value,
                      }))
                    }
                    className="w-full"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">
                    Servidor
                  </label>
                  <Input
                    placeholder="Nome do servidor"
                    value={filters.servidor ?? ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        servidor: e.target.value,
                      }))
                    }
                    className="w-full"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">
                    Telefone / Ramal
                  </label>
                  <Input
                    placeholder="Ex.: 3212-3000"
                    value={filters.telefone ?? ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        telefone: e.target.value,
                      }))
                    }
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <Button
                  type="submit"
                  size="default"
                  className="btn-gradient btn-glow flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:shadow-lg hover:shadow-indigo-500/40"
                >
                  <Search className="h-4 w-4" />
                  Pesquisar
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="default"
                  onClick={handleClear}
                  className="flex items-center gap-2 rounded-2xl border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <X className="h-4 w-4" />
                  Limpar filtros
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Resultados */}
        <Card className="glass-card border-white/40 bg-white/80 shadow-lg backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
            <div>
              <CardTitle className="text-lg">Resultados</CardTitle>
              <CardDescription>
                {filteredRamais.length === 0
                  ? "Nenhum ramal encontrado para os filtros informados."
                  : `Mostrando ${filteredRamais.length} contato${
                      filteredRamais.length > 1 ? "s" : ""
                    }${hasActiveFilters ? " filtrado(s)" : ""}.`}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {filteredRamais.length === 0 ? (
              <div className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-6 text-center text-sm text-slate-600">
                <p className="font-medium">Nenhum ramal encontrado.</p>
                <p className="max-w-md text-xs text-slate-500">
                  Verifique se os termos estão corretos ou tente remover alguns
                  filtros para ampliar a busca.
                </p>
              </div>
            ) : (
              <div className="w-full max-h-[480px] overflow-x-auto overflow-y-auto rounded-2xl border border-slate-100 bg-white/80 shadow-inner">
                <div className="min-w-[520px] md:min-w-full">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50/80">
                        <TableHead className="w-[18%] text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                          Local
                        </TableHead>
                        <TableHead className="w-[37%] text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                          Lotação
                        </TableHead>
                        <TableHead className="w-[30%] text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                          Servidor
                        </TableHead>
                        <TableHead className="w-[15%] whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                          Telefone
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRamais.map((ramal, index) => (
                        <TableRow
                          key={`${ramal.local}-${ramal.lotacao}-${ramal.servidor}-${ramal.telefone}-${index}`}
                          className="hover:bg-slate-50"
                        >
                          <TableCell className="align-middle text-xs md:text-sm font-medium text-slate-800">
                            {ramal.local}
                          </TableCell>
                          <TableCell
                            className="max-w-xs align-middle text-xs md:text-sm text-slate-700"
                            title={ramal.lotacao}
                          >
                            <span className="line-clamp-2">{ramal.lotacao}</span>
                          </TableCell>
                          <TableCell
                            className="max-w-xs align-middle text-xs md:text-sm text-slate-800"
                            title={ramal.servidor}
                          >
                            <span className="line-clamp-2">{ramal.servidor}</span>
                          </TableCell>
                          <TableCell className="whitespace-nowrap align-middle text-xs md:text-sm font-semibold text-slate-900">
                            {ramal.telefone}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

