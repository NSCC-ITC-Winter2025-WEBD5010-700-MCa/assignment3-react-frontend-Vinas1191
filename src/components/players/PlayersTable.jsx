import { useMutation , useQueryClient} from "@tanstack/react-query";
import { Link , useNavigate } from "react-router-dom";
  
  function PlayersTable({players}) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const deletePlayerMutation = useMutation({
    mutationFn: async (playerId) => {
      const response = await fetch(`${import.meta.env.VITE_PLAYERS_API_URL}/${playerId}`, {
        method: 'DELETE'
      })
      return response.json()
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["players"]);
    },
    onError: (error) => {
      alert('Unable to delete')
  
    }
  })

  const handleDelete = (playerId) => {
    // send a delete request to the api to delete the chosen or seleted record 

    if(window.confirm(`Are you sure you wish to delete record ${playerId}`)){
      deletePlayerMutation.mutate(playerId)
    }
    
  }
    return (
      <>
      <p> <Link to= "/admin/players/create"> Add New Player </Link>  </p>
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Age</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Batting</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Bowling</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Runs</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Wickets</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{player._id}</td>
                <td className="border border-gray-300 px-4 py-2">{player.name}</td>
                <td className="border border-gray-300 px-4 py-2">{player.age}</td>
                <td className="border border-gray-300 px-4 py-2">{player.batting}</td>
                <td className="border border-gray-300 px-4 py-2">{player.bowling}</td>
                <td className="border border-gray-300 px-4 py-2">{player.role}</td>
                <td className="border border-gray-300 px-4 py-2">{player.runs}</td>
                <td className="border border-gray-300 px-4 py-2">{player.wickets}</td>
                <td className="border border-gray-300 px-4 py-2 text-center space-x-1">
                  <button className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600">Details</button>
                  <button onClick={ () => navigate(`/admin/players/${player._id}/edit`)}  className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600">Edit</button>
                  <button onClick={ () => {handleDelete (player._id)}} className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
        
      );
    }          
export default PlayersTable;     