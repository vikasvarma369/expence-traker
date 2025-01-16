# Expense Tracker

Expense Tracker is a full-stack application that allows users to track their expenses effortlessly. The backend is built with Node.js, Express, MongoDB, and GraphQL, while the frontend is built with React and Tailwind CSS.

## Features

- User authentication with Passport.js
- CRUD operations for transactions
- Categorized expense tracking
- Visual representation of expenses using charts
- Responsive design

## Project Structure

📂 Project Root  
├── 📄 .env  
├── 📄 .gitignore  
├── 📂 backend  
│   ├── 📄 corn.js  
│   ├── 📂 db  
│   │   └── 📄 dbConnection.js  
│   ├── 📄 index.js  
│   ├── 📂 models  
│   │   ├── 📄 transaction.model.js  
│   │   └── 📄 user.model.js  
│   ├── 📂 passport  
│   │   └── 📄 passport.config.js  
│   ├── 📂 resolvers  
│   │   ├── 📄 index.js  
│   │   ├── 📄 transaction.resolvers.js  
│   │   └── 📄 user.resolvers.js  
│   └── 📂 typeDefs  
│       ├── 📄 index.js  
│       ├── 📄 transaction.typeDef.js  
│       └── 📄 user.typeDef.js  
├── 📂 frontend  
│   ├── 📄 .env  
│   ├── 📄 .gitignore  
│   ├── 📄 eslint.config.js  
│   ├── 📄 index.html  
│   ├── 📄 package.json  
│   ├── 📄 postcss.config.js  
│   ├── 📂 public  
│   ├── 📄 README.md  
│   ├── 📂 src  
│   │   ├── 📄 App.css  
│   │   ├── 📄 App.jsx  
│   │   ├── 📂 assets  
│   │   ├── 📂 components  
│   │   └── ...  
│   ├── 📄 tailwind.config.js  
│   └── 📄 vite.config.js  
├── 📄 package.json  


## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/expense-tracker.git
    cd expense-tracker
    ```

2. Install backend dependencies:
    ```sh
    npm install
    ```

3. Install frontend dependencies:
    ```sh
    npm install --prefix frontend
    ```

4. Create a [.env](http://_vscodecontentref_/2) file in the root directory and add the following environment variables:
    ```env
    MONGO_URI=your_mongodb_uri
    SESSION_SECRET=your_session_secret
    BOY_PIC=your_boy_profile_picture_url
    GIRL_PIC=your_girl_profile_picture_url
    ```

5. Create a [.env](http://_vscodecontentref_/3) file in the [frontend](http://_vscodecontentref_/4) directory and add the following environment variables:
    ```env
    VITE_GRAPHQL_SERVER_URI=http://localhost:4000/graphql
    VITE_NODE_ENV=development
    ```

### Running the Application

1. Start the backend server:
    ```sh
    npm run dev
    ```

2. Start the frontend development server:
    ```sh
    npm run dev --prefix frontend
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Sign up or log in to your account.
- Add, update, or delete transactions.
- View categorized expense statistics.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.