import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Folder, FileText, Plus, ChevronDown, CornerDownLeft } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const data = [
  { id: 1, name: "MILITAR", type: "folder", date: "06/03/2024", status: "✔️ Concluído", questions: 45 },
  { id: 2, name: "CIVIL", type: "folder", date: "17/02/2025", status: "Em andamento", questions: 106 },
  { id: 3, name: "TRABALHISTA", type: "folder", date: "03/02/2025", status: "✔️ Concluído", questions: 76 },
  { id: 4, name: "SAÚDE", type: "folder", date: "22/01/2025", status: "Pendente", questions: 26 },
];

export default function FileManagerPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
        <Button onClick={() => navigate("/")} className="flex items-center gap-1" variant="ghost">
            <CornerDownLeft size={16} />
            Voltar
        </Button>
      <div className="flex justify-between items-center">
        <Input
          placeholder="Busque pelo nome"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} /> Criar <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">            
            <DropdownMenuItem>Assunto</DropdownMenuItem>
            <DropdownMenuItem>Arquivo</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
                  <TableCell className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(`/folder/${item.id}`)}>
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
