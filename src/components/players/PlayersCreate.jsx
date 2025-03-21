import { PlayersForm } from "./PlayersForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function PlayersCreate() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const processData = (data) => {
    console.log("Formatted Data:", data); // Debugging line
  
    createPlayerMutation.mutate(data, {
      onSuccess: () => {
        console.log("Player Created Successfully! 🎉");
        navigate("/admin/players"); // Redirect after successful creation
      },
    });
  };
  

  const createPlayerMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`${import.meta.env.VITE_PLAYERS_API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["playersData"]);
      navigate("/admin/players");
    },
  });

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Players</h2>
      <PlayersForm onDataCollected={processData} />
    </div>
  );
}

export default PlayersCreate;
