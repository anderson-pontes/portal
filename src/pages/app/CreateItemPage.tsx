import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function CreateItemPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const navigate = useNavigate();
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState<"file" | "folder">("folder");

  const handleCreate = () => {
    // Lógica para criar o item (pasta ou arquivo)
    console.log(`Criando ${itemType} com nome ${itemName} na pasta ${folderId}`);
    // Após criar, navegar de volta para a pasta atual
    navigate(`/folder/${folderId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Criar Novo Item</h1>
      <div className="space-y-4">
        <div>
          <Label>Tipo do Item</Label>
          <select
            value={itemType}
            onChange={(e) => setItemType(e.target.value as "file" | "folder")}
            className="w-full p-2 border rounded"
          >
            <option value="folder">Pasta</option>
            <option value="file">Arquivo</option>
          </select>
        </div>
        <div>
          <Label>Nome do Item</Label>
          <Input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Digite o nome do item"
          />
        </div>
        <Button onClick={handleCreate}>Criar</Button>
      </div>
    </div>
  );
}