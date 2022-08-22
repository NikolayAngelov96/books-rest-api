## Books Server

### 🛠 Libraries and tools used

- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/) with [SQLite](https://www.sqlite.org)
- [Nodemon](https://github.com/remy/nodemon)

*This service does NOT use authentication - everything is fully accessible*.


### Endpoints
The available endpoints are **`/books`**, **`/authors`**

#### Books endpoint
#### Read

Send a **`GET`** request to the endpoint will return the first 10 books ordered by **`year: "asc"`**.
The response will be JSON format. Array of **Book** objects: 
```
{
  id: string,
  title: string,
  description: string,
  year: number,
  author: {
    id: string,
    firstName: string,
    lastName: string,
    nationality: string
  }
}
```

The endpoint supports pagination queries so you just need to provide **`skip={number}&take={number}`** and it will give you the number of books you specified(w/ take),
and it'll start after the number you specified in skip.

Example
  - **`GET`** request to **`/books?skip=2&take=2`** it will give 3rd and 4th book
 

  
