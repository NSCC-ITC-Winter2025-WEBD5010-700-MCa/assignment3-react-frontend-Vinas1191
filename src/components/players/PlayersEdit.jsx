import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { PlayersForm } from "./PlayersForm";

function PlayersEdit() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["players", _id], 
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_PLAYERS_API_URL}/${_id}`);
      return response.json();
    },
  });

  const editPlayersMutation = useMutation({
    mutationFn: async (data ) => {
        const { _id, ...updatedPlayersData } = data;

      const response = await fetch(`${import.meta.env.VITE_PLAYERS_API_URL}/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPlayersData),
      });

      return response.json();
    },
    onSuccess: () => {
      console.log(" Players updated successfully!");
      queryClient.invalidateQueries(["Players",_id]); 
      navigate("/admin/players"); 
    },
  });

  useEffect(() => {
    console.log("Fetched Players data:", data);
  }, [data]);

  const processData = (updatedPlayersData) => {
    editPlayersMutation.mutate(updatedPlayersData);
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Players - ID: {data?._id}</h2>
      <PlayersForm onDataCollected={processData} initialData={data} />
    </div>
  );
}

export default PlayersEdit;
