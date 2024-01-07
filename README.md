
  

# db-scaffolder

 Effortlessly create database tables and columns in your Node.js projects.



## Why db-scaffolder?

-   **Save time and effort:** Skip the tedious SQL writing and manage your database schema with ease.
-   **Automatic schema creation and updates:** Let db-scaffolder handle the heavy lifting of creating and maintaining your database structure.
-   **Work seamlessly on servers without GUIs:** Streamline database setup even on servers with limited interfaces.

## Features

-   Define tables and columns in a simple, intuitive way.
-   Generates SQL statements automatically.
-   Intelligently handles new tables and columns, ensuring a consistent schema.
-   Supports multiple databases (MySQL, PostgreSQL, SQLite, etc.).
-   Integrates with Knex.js for database interaction.

## Getting Started

2.  **Install:**
    
        
    ```bash
    npm install db-scaffolder
    
    ```
    
    
4.  **Import and Define Schema:**
    
   
    
    ```js
    const createDatabaseSchema = require("db-scaffolder");
    
    const databaseSchema = [
      {
        name: "users",
        columns: [
          { id: "t.increments('id')" },
          { username: "t.varchar('username').unique()" },
          // ... more columns
        ],
      },
      // ... more tables
    ];
    
    ```

    
6.  **Connect to Database:**
    
    **Create a `database.js` file with the following configuration:**
    
   
    
    ```js
    const knex = require('knex')({
      client: 'your_database_client', // e.g., 'mysql', 'pg', 'sqlite3'
      connection: {
        host: 'your_database_host',
        port: 'your_database_port',
        user: 'your_database_user',
        password: 'your_database_password',
        database: 'your_database_name',
      },
      pool: { min: 2, max: 10 }, // Connection pool configuration
      acquireConnectionTimeout: 60000, // Timeout for acquiring connections
    });
    
    module.exports = knex;
    
    ```
    
    
8.  **Create Schema:**
    
  
    
    ```js
    const database = require("./database");
    
    createDatabaseSchema(database, databaseSchema)
      .then(() => console.log("Database structure created successfully!"))
      .catch((error) => console.error("Error:", error));
    
    ```

    

## Usage

**No more manual SQL queries or managing if-conditions!**

With db-scaffolder, you can define your database schema once and let it handle the rest:

2.  Specify your desired tables and columns in a clear, JavaScript-like format.
4.  db-scaffolder automatically creates new tables and columns if they don't exist.
6.  Any changes to your schema are seamlessly applied to the database.

This is especially useful when working with servers that lack user-friendly GUIs for database management. Build and maintain your database structure effortlessly, even in those environments!

(Provide more detailed usage examples and explanations here)

## Compatibility

-   Currently compatible with Knex.js only.

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## License

MIT License

Copyright (c) 2023 Armin Khosroabadi

## Author

Armin Khosroabadi