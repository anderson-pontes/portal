import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Plus } from "lucide-react";

// Definindo os tipos dos arquivos
interface File {
  id: number;
  name: string;
  type: "file";
  size: string;
  observation?: string;
}

// Dados dos arquivos simulados por pasta
const filesData: Record<string, File[]> = {
  "1": [
    { id: 1, name: "Arquivo1.pdf", type: "file", size: "2MB", observation:'Arquivado para elaboração de novo documento' },
    { id: 2, name: "Arquivo2.docx", type: "file", size: "1.5MB", observation:'Alterar arquivo' },
    { id: 3, name: "Arquivo3.pptx", type: "file", size: "3MB" },
  ],
  "2": [
    { id: 4, name: "Arquivo4.pdf", type: "file", size: "2MB" },
    { id: 5, name: "Arquivo5.docx", type: "file", size: "1MB" },
  ],
  "3": [
    { id: 6, name: "Arquivo6.pdf", type: "file", size: "2.5MB" },
    { id: 7, name: "Arquivo7.docx", type: "file", size: "3MB" },
  ],
  "4": [
    { id: 8, name: "Arquivo8.pdf", type: "file", size: "2MB" },
  ],
};

export default function FolderDetailsPage() {
  const { folderId } = useParams<{ folderId: string }>(); 
  const navigate = useNavigate();
  
  const [folderData, setFolderData] = useState<string | null>(null); 
  const [files, setFiles] = useState<File[]>([]); 

  useEffect(() => {
    if (folderId) {
      const folder = filesData[folderId];
      if (folder) {
        setFiles(folder);
        setFolderData(`Assunto: ${folderId === "1" ? "MILITAR" : folderId === "2" ? "CIVIL" : folderId === "3" ? "TRABALHISTA" : "SAÚDE"}`);
      } else {
        navigate("/"); 
      }
    }
  }, [folderId, navigate]);

  return (
    <div className="p-6 space-y-6">
        <div className="flex justify-between">
        <Button onClick={() => navigate("/pcta")} className="flex items-center gap-2">
          Voltar
        </Button>
        <Button className="flex items-center gap-2">
          <Plus size={16} /> Adicionar Arquivo
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{folderData}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Arquivo</TableHead>
                <TableHead>Observação</TableHead>
                <TableHead>Tamanho</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="flex items-center gap-2 cursor-pointer">
                    <FileText size={18} /> {file.name}
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
