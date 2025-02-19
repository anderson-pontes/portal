import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Folder, FileText, Plus, CornerDownLeft } from "lucide-react";


const data = [
  { id: 1, name: "COORDENAÇÃO", type: "folder", date: "06/03/2024", status: "✔️ Concluído", questions: 45 },
  { id: 2, name: "SUBNÚCLEO SERVIDOR CIVIL", type: "folder", date: "17/02/2025", status: "Em andamento", questions: 106 },
  
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
        <Button className="flex items-center gap-2">
          <Plus size={16} /> 
            Criar Pasta
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>PASTAS - PCTA1 - CONTEÚDO</CardTitle>
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
