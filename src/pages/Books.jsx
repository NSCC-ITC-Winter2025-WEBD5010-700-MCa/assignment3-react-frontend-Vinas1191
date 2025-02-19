import { useQuery } from "@tanstack/react-query";

const Books = () => {

    const { isPending, error, data: books} = useQuery({
      queryKey: ['booksData'],
      queryFn: async () => {
        console.log('Fetching data');
        const response = await fetch('http://localhost:3000/books')
        return response.json()
      }
    })

    if (isPending) return <div>Laoding...</div>
    
    if(error) return <div>{`An error has occured: + ${error.message}`}</div>

    return (
      <div>
        <h1 className="text-2xl font-bold">Books</h1>
        {
        isPending ? 
          <div>Loading...</div>
          :
          <>
          <ul>
              {
                books.map(book => {
                  return <li key={book.id}>{ book.title }</li>
                })
              }
          </ul>
          </>
        }
      </div>
    );
  };
export default Books;