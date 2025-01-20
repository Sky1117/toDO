# Todo Blockchain Application

## Overview
This project is a Todo application that utilizes blockchain technology for task management. It allows users to create, update, complete, and delete tasks, with the task data stored on the Ethereum blockchain.

## Technology Stack
- **Frontend**: 
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - Axios
  - Web3.js

- **Backend**: 
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JSON Web Token (JWT)
  - Bcrypt.js

- **Blockchain**: 
  - Hardhat
  - Solidity

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- MongoDB (local or cloud instance)
- MetaMask (for interacting with the Ethereum blockchain)

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd todo_frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and go to [http://localhost:3000](http://localhost:3000).

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd todo_backend
   ```

2. Create a `.env` file in the root of the backend directory and add your MongoDB URI and JWT secret:
   ```plaintext
   MongoDBURI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Blockchain Setup
1. Navigate to the blockchain directory:
   ```bash
   cd todo_blockchain
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Deploy the smart contract:
   ```bash
   npx hardhat run scripts/deploy.ts --network localhost
   ```

## API Usage

### Authentication
- **Signup**: `POST /api/signup`
  - Request body: `{ "username": "string", "email": "string", "password": "string" }`
  
- **Login**: `POST /api/login`
  - Request body: `{ "email": "string", "password": "string" }`
  - Response: `{ "token": "JWT_TOKEN" }`

### Task Management
- **Create Task**: `POST /api/tasks`
  - Request body: `{ "title": "string" }`
  
- **Get Tasks**: `GET /api/tasks`
  - Response: `[{ "_id": "string", "title": "string", "isComplete": boolean }]`

- **Update Task**: `PUT /api/tasks/:id`
  - Request body: `{ "title": "string", "isComplete": boolean }`

- **Delete Task**: `DELETE /api/tasks/:id`

## Smart Contract Information

### Deployed Smart Contract Address
- `0x5FbDB2315678afecb367f032d93F642f64180aa3`

### ABI File
The ABI for the `TaskManager` contract can be found in the `src/app/utils/TaskManagerABI.json` file. Here is a snippet of the ABI:
json
[
{
"inputs": [
{
"internalType": "string",
"name": "description",
"type": "string"
}
],
"name": "addTask",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
...
]

## Conclusion
This application demonstrates the integration of blockchain technology with a traditional web application. Users can manage their tasks securely and transparently using the Ethereum blockchain.
