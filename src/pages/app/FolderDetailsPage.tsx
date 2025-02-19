import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, CornerDownLeft, FileText, Folder, Plus } from "lucide-react";
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Definindo os tipos dos arquivos e pastas
interface File {
  id: number;
  name: string;
  type: "file" | "folder";
  size: string;
  observation?: string;
}

// Dados simulados das pastas e arquivos
const filesData: Record<string, File[]> = {
  "1": [ // Pasta COORDENAÇÃO"
    { id: 1, name: "PLANILHAS", type: "folder", size: "2MB", observation: 'Arquivado para elaboração de novo documento' },
    { id: 2, name: "MODELOS DE DESPACHOS E PROCESSOS PARADIGMAS", type: "folder", size: "1.5MB", observation: 'Alterar arquivo' },
    { id: 3, name: "ORDENS DE SERVIÇO", type: "folder", size: "3MB" },
    { id: 4, name: "MANUAIS PCTA", type: "folder", size: "20MB" }, // Pasta dentro da pasta MILITAR
  ],  
  
  "2": [ // PASTA SUBNÚCLEO SERVIDOR CIVIL
    { id: 1, name: "INFORMAÇÕES GERAIS", type: "folder", size: "2MB" },
    { id: 2, name: "ASSUNTOS / MATÉRIAS", type: "folder", size: "1MB" },
  ],
  
};

export default function FolderDetailsPage() {
  const { folderId } = useParams<{ folderId: string }>(); 
  const navigate = useNavigate();
  
  const [folderData, setFolderData] = useState<string | null>(null); 
  const [files, setFiles] = useState<File[]>([]); 
  const [search, setSearch] = useState(""); // Estado para a busca

  useEffect(() => {
    if (folderId) {
      const folder = filesData[folderId];
      if (folder) {
        setFiles(folder);
        setFolderData(`PASTAS - PCTA1 - CONTEÚDO - ${folderId === "1" ? "COORDENAÇÃO" : folderId === "2" ? "SUBNÚCLEO SERVIDOR CIVIL" : folderId === "3" ? "TRABALHISTA" : "SAÚDE"}`);
      } else {
        navigate("/folder"); 
      }
    }
  }, [folderId, navigate]);

  // Filtrando arquivos e pastas com base no nome
  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <Button onClick={() => navigate("/pcta")} className="flex items-center gap-1" variant="ghost">
        <CornerDownLeft size={16} />
        Voltar
      </Button>
      <div className="flex justify-between">
        <Input
          placeholder="Buscar por nome do arquivo"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
        />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} /> 
              Criar 
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">            
            <DropdownMenuItem>Criar Pasta</DropdownMenuItem>
            <DropdownMenuItem>Criar Arquivo</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      

      <Card>
        <CardHeader>
          <CardTitle>{folderData}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Observação</TableHead>
                <TableHead>Tamanho</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFiles.map((file) => (
                <TableRow 
                key={file.id}
                onClick={() => file.type === "folder" && navigate(`/folder/${folderId}/${file.id}`)}
                className="cursor-pointer"

                >
                  <TableCell className="flex items-center gap-2 cursor-pointer">
                    {file.type === "folder" ? (
                      <Folder size={18} />
                    ) : (
                      <FileText size={18} />
                    )}
                    {file.name}
                  </TableCell>
                  <TableCell>{file.observation}</TableCell>
                  <TableCell>{file.size}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
