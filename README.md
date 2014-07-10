grocery
====

##### A simple grocery list in React.js backed by a Node.js REST API

This is a learning exercise for me in Node and React, and also delving in to Sequelize.
The app is a simple grocery list.
I used Express to expose a REST API for CRUD operations on list items,
and in React created a simple interface for interacting with the list.
Items are stored in MySQL via Sequelize.

#### Installation

1. Clone this repository and checkout the `grocery` branch.
2. In the root, do `npm install`.
3. Create a MySQL database called `grocery` (Sequelize will create the table).
4. Edit the first few lines of `routes/items.js` with the credentials for a user with read/write permission for the `grocery` database.
5. Do `node server.js` in the root.
6. The app will be at `localhost:8000`.
