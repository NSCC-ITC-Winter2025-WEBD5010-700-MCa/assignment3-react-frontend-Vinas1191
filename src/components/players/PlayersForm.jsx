import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const PlayersForm = ({ onDataCollected, initialData }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()

  useEffect( () => {
    if(initialData) {
        setValue('name' , initialData.name)
        setValue('age' , initialData.age)
        setValue('batting', initialData.batting)
        setValue('bowling' , initialData.bowling)
        setValue('role' , initialData.role)
        setValue('runs' , initialData.runs)
        setValue('wickets' , initialData.wickets)
    }
}, [initialData , setValue])

  return (
    <form onSubmit={handleSubmit(onDataCollected)} className="space-y-6 bg-white shadow-md rounded-lg p-6">
      {/* Name */}
      <div>
        <label className="block text-gray-600 font-medium">Player Name</label>
        <input
          {...register("name", { required: "Player name is required!" })}
          type="text"
          placeholder="Enter Player Name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      {/* Age */}
      <div>
        <label className="block text-gray-600 font-medium">Age</label>
        <input
            {...register("age", {
                required: "Age is required!",
                valueAsNumber: true, // Ensures it's stored as a number
                min: { value: 18, message: "Minimum age is 18" },
                max: { value: 50, message: "Maximum age is 50" },
            })}
            type="number"
            placeholder="Enter Age"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
      </div>

      {/* Batting */}
      <div>
        <label className="block text-gray-600 font-medium">Batting</label>
        <input
          {...register("batting", { required: "Batting style is required!" })}
          type="text"
          placeholder="Enter Batting Style"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.batting && <p className="text-red-500 text-sm mt-1">{errors.batting.message}</p>}
      </div>

      {/* Bowling */}
      <div>
        <label className="block text-gray-600 font-medium">Bowling</label>
        <input
          {...register("bowling", { required: "Bowling style is required!" })}
          type="text"
          placeholder="Enter Bowling Style"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.bowling && <p className="text-red-500 text-sm mt-1">{errors.bowling.message}</p>}
      </div>

      {/* Role */}
      <div>
        <label className="block text-gray-600 font-medium">Role</label>
        <select
          {...register("role", { required: "Role is required!" })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Role</option>
          <option value="batsman">Batsman</option>
          <option value="bowler">Bowler</option>
          <option value="all-rounder">All-rounder</option>
          <option value="wicket-keeper">Wicket-keeper</option>
        </select>
        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
      </div>

      {/* Runs */}
      <div>
        <label className="block text-gray-600 font-medium">Runs</label>
        <input
          {...register("runs", {
            valueAsNumber: true,
            min: { value: 0, message: "Runs cannot be negative" },
          })}
          type="number"
          placeholder="Enter Runs Scored"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.runs && <p className="text-red-500 text-sm mt-1">{errors.runs.message}</p>}
      </div>

      {/* Wickets */}
      <div>
        <label className="block text-gray-600 font-medium">Wickets</label>
        <input
          {...register("wickets", {
            valueAsNumber: true,
            min: { value: 0, message: "Wickets cannot be negative" },
          })}
          type="number"
          placeholder="Enter Wickets Taken"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.wickets && <p className="text-red-500 text-sm mt-1">{errors.wickets.message}</p>}
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
        >
            Submit Player
        </button>
    </form>
  );
};
