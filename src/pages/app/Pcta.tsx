import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Folder, FileText, Plus } from "lucide-react";

const data = [
  { id: 1, name: "MILITAR", type: "folder", date: "06/03/2024", status: "✔️ Concluído" },
  { id: 2, name: "CIVIL", type: "folder", date: "17/02/2025", status: "Em andamento" },
  { id: 3, name: "TRABALHISTA", type: "folder", date: "03/02/2025", status: "✔️ Concluído", questions: 276 },
  { id: 4, name: "SAÚDE", type: "folder", date: "22/01/2025", status: "Pendente" },
];

export default function FileManagerPage() {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Busque pelo nome"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
        />
        <Button className="flex items-center gap-2">
          <Plus size={16} /> Criar
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Arquivos e Pastas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Criação</TableHead>
                <TableHead>Arquivos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="flex items-center gap-2">
                    {item.type === "folder" ? <Folder size={18} /> : <FileText size={18} />}
                    {item.name}
                  </TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.questions ?? "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
