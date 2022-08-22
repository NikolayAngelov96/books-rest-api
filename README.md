## Books Server

### 🛠 Libraries and tools used

- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/) with [SQLite](https://www.sqlite.org)
- [Nodemon](https://github.com/remy/nodemon)

*This service does NOT use authentication - everything is fully accessible*.


### Endpoints
The available endpoints are **`/books`**, **`/authors`**

### **`/books`** endpoint
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
 
#### Write
If you want to create new Book to the database you need to send **`POST`** request to **`/books`**,
containing body:
```
{
  title: string,
  year: number,
  authorId: string,
  description?: string
}
```
**Description** field it's optional and if not provided it'll be null in the db.

**AuthorId** field must be actual already existing author id from the Authors table.

The response will contain status **`201`** created and the newly created book in JSON format.

### **`/books/{bookId}`** endpoint
#### Read

**`GET`** request will return a book with the provided **id**
```
{
  id: string,
  title: string,
  description: string,
  year: number,
  authorId: string,
  author: {
    id: string,
    firstName: string,
    lastName: string,
    nationality: string
  }
}
```
If the provided **id** doesn't exist it will return a response with status **`404`** and JSON
```
{
  message: "Book with the provided id does not exist in database"
}
```

#### Update

Sending **`PUT`** request with **body**(w/ the field/s you want to update) will **update** the record and the fields that are not present in the body will remain the same.

#### Delete

**`DELETE`** request will detele the book with the provided id from the database.

### **`/authors`** endpoint
#### Read

Send a **`GET`** request to the endpoint will return all authors ordered by **`firstName: "asc"`**.
The response will be JSON format. Array of **Author** objects: 
```
{
   id: string,
   firstName: string,
   lastName: string,
   nationality: string
}
```

#### Write
If you want to create new Author to the database you need to send **`POST`** request to **`/authors`**,
containing body:
```
{
   firstName: string,
   lastName: string,
   nationality: string
}
```
The response will contain status **`201`** created and the newly created author in JSON format.

### **`/authors/{authorId}`** endpoint
**`GET`** request will return an author with the provided **id** and books field with all books belonging to this author
```
{
   id: string,
   firstName: string,
   lastName: string,
   nationality: string
   books: [
      {
        id: string,
        title: string,
        year: number,
        description: string,
        authorId: string
      },
      ...
   ]
}
```
If the provided **id** doesn't exist it will return a response with status **`404`** and JSON
```
{
  message: "Author with that Id does not exist in the database"
}
```

#### Update

Sending **`PUT`** request with **body**(w/ the field/s you want to update) it will **update** the record and the fields that are not present in the body will remain the same.

#### Delete

**`DELETE`** request will detele the author with the provided id and **all his books** from the database.
