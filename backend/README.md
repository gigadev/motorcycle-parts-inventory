# Motorcycle Parts Backend

## Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Initialize the SQLite database with tables and sample data:
   ```bash
   npm run init-db
   ```

3. Start the backend server:
   ```bash
   npm start
   ```

The backend will run on http://localhost:3000

## API Endpoints

- `GET    /api/parts`         - List all parts
- `GET    /api/parts/:id`     - Get part by ID
- `POST   /api/parts`         - Add a new part
- `PUT    /api/parts/:id`     - Update a part
- `DELETE /api/parts/:id`     - Delete a part

The SQLite database file is located at `../database/motorcycle_parts.db`.
