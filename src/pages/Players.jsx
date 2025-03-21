import { useQuery } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";
import PlayersTable from "../components/players/PlayersTable";

const Players = () => {
  const location = useLocation(); 

  const { isPending, error, data } = useQuery({
    queryKey: ["playersData"],
    queryFn: async () => {
      const response = await fetch(import.meta.env.VITE_PLAYERS_API_URL);
      return response.json();
    },
    staleTime: Infinity, 
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>{`An error occurred: ${error.message}`}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Players List</h1>

      {location.pathname === "/admin/players" ? (
        isPending ? <div>Loading...</div> : <PlayersTable players={data} />
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Players;
