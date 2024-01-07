/*
 Schema should be an array like this: 

 const schema = {
    name: "users",
    columns: [
      { id: "t.increments('id')" },
      { username: "t.varchar('username').unique()" },
      { name: "t.varchar('name')" },
      { email: "t.varchar('email').unique()" },
      { time_joined: "t.timestamp('time_joined')" },
    ],
  },

 To create columns use knex functions and query builders. e.g. t.varchar('email').unique()
*/
const createDatabaseSchema = (database, schema) => {
    if(!database) throw new Error("Provide database connection!")
    if(!schema) throw new Error("Provide schema!")
      schema.map((table) => {
        database.schema.hasTable(table.name).then((tableExists) => {
          if (!tableExists) {
            return database.schema.createTable(table.name, function (t) {
              console.log("* TABLE CREATION : " + table.name + " was created");
              table.columns.map((column) => {
                eval(column[Object.keys(column)]);
                console.log(
                  "- COLUMN CREATION : " +
                    Object.keys(column)[0] +
                    " added to " +
                    table.name +
                    " table"
                );
              });
            });
          } else {
            table.columns.map((column) => {
              createColumns(
                database,
                table.name,
                Object.keys(column)[0],
                column[Object.keys(column)]
              );
            });
          }
        });
      });
    };
    
    const createColumns = (database, tableName, columnName, column) => {
      database.schema.hasColumn(tableName, columnName).then((columnExists) => {
        if (columnExists) {
        } else {
          return database.schema.alterTable(tableName, function (t) {
            eval(column);
            console.log(
              "- COLUMN CREATION : " + columnName + " added to " + tableName
            );
          });
        }
      });
    };
    
    module.exports = createDatabaseSchema;
    