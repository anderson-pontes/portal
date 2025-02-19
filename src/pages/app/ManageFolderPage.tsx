import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ManageFolderPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const navigate = useNavigate();
  
  const [newFolderName, setNewFolderName] = useState("");
  const [newFileName, setNewFileName] = useState("");
  
  const handleCreateFolder = () => {
    // Lógica para criar nova pasta
    console.log(`Criando pasta: ${newFolderName}`);
  };
  
  const handleCreateFile = () => {
    // Lógica para criar novo arquivo
    console.log(`Criando arquivo: ${newFileName}`);
  };

  return (
    <div className="p-6 space-y-6">
      <Button onClick={() => navigate(`/folder/${folderId}`)} variant="ghost">Voltar</Button>
      
      <div className="space-y-4">
        <Input
          placeholder="Nome da nova pasta"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          className="w-full"
        />
        <Button onClick={handleCreateFolder}>Criar Pasta</Button>
        
        <Input
          placeholder="Nome do novo arquivo"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          className="w-full"
        />
        <Button onClick={handleCreateFile}>Criar Arquivo</Button>
      </div>
    </div>
  );
}
