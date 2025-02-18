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
  "1": [ // Pasta "MILITAR"
    { id: 1, name: "Arquivo1.pdf", type: "file", size: "2MB", observation: 'Arquivado para elaboração de novo documento' },
    { id: 2, name: "Arquivo2.docx", type: "file", size: "1.5MB", observation: 'Alterar arquivo' },
    { id: 3, name: "Arquivo3.pptx", type: "file", size: "3MB" },
    { id: 4, name: "Tese Militar 1", type: "folder", size: "20MB" }, // Pasta dentro da pasta MILITAR
  ],
  "1/4": [
    { id: 10, name: "Tese1.pdf", type: "file", size: "5MB" },
    { id: 11, name: "Tese2.docx", type: "file", size: "3MB" }
  ],
  "2": [ // Pasta "CIVIL"
    { id: 5, name: "Arquivo4.pdf", type: "file", size: "2MB" },
    { id: 6, name: "Arquivo5.docx", type: "file", size: "1MB" },
  ],
  "3": [ // Pasta "TRABALHISTA"
    { id: 7, name: "Arquivo6.pdf", type: "file", size: "2.5MB" },
    { id: 8, name: "Arquivo7.docx", type: "file", size: "3MB" },
  ],
  "4": [ // Pasta "SAÚDE"
    { id: 9, name: "Arquivo8.pdf", type: "file", size: "2MB" },
  ],
};

export default function SubfolderDetailsPage() {
  const { folderId, subfolderId } = useParams<{ folderId: string, subfolderId: string }>(); 
  const navigate = useNavigate();
  
  const [folderData, setFolderData] = useState<string | null>(null); 
  const [files, setFiles] = useState<File[]>([]); 
  const [search, setSearch] = useState(""); // Estado para a busca

  useEffect(() => {
    if (folderId && subfolderId) {
      const folder = filesData[`${folderId}/${subfolderId}`];
      if (folder) {
        setFiles(folder);
        setFolderData(`Caminho: MILITAR / Tese Militar 1`);
      } else {
        navigate("/"); 
      }
    }
  }, [folderId, subfolderId, navigate]);

  // Filtrando arquivos e pastas com base no nome
  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <Button onClick={() => navigate(`/folder/${folderId}`)} className="flex items-center gap-1" variant="ghost">
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
            <DropdownMenuItem>Pasta</DropdownMenuItem>
            <DropdownMenuItem>Arquivo</DropdownMenuItem>
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
                <TableRow key={file.id}>
                  <TableCell className="flex items-center gap-2">
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