# ShoppyGlobe

### This is an e-commerce application. It is built using 
- Node.js, Express.js, and MongoDB, and provides APIs for product management, shopping cart operations, and user authentication using JWT. (for backend)
- React.js, Vite (for frontend)

### Project Objectives
- Build a REST API backend for ShoppyGlobe using Node.js and Express.js.
- Store product and cart data in MongoDB.
- Implement secure user authentication using JWT.
- Test all routes using ThunderClient.

### Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Token)
- ThunderClient (for testing)
- React.js
- Vite

### Features
- Product APIs (CRUD)
- Cart APIs (CRUD)
- User Login
- JWT Authentication & Authorization
- Error Handling & Input Validation
- Tested with ThunderClient
- UI

### API Endpoints
| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| GET    | `/products`     | Fetch all products  |
| GET    | `/products/:id` | Fetch product by ID |

| Method | Endpoint    | Description                       |
| ------ | ----------- | -------------------------------   |
| GET    | `/cart`     | Fetch all products from cart      |
| POST   | `/cart`     | Add a product to cart             |
| PUT    | `/cart/:id` | Update a product quantity in cart |
| DELETE | `/cart/:id` | Remove a product from cart        |
| DELETE | `/cart/clear` | Remove all products from cart   |

| Method | Endpoint    | Description                |
| ------ | ----------- | -------------------------- |
| POST   | `/login`    | Login user & get JWT token |

### Authentication
- User must login to get a JWT token.
- Include the token in the Authorization header as:
``` Authorization: Bearer <your_token> ```

### Setup & Installation
1. Clone the Repository
   ```bash
   git clone https://github.com/nishandutta/shoppyglobe-fullstack.git
   cd shoppyglobe-fullstack
   
2. Install Dependencies
    - for backend
      ```bash
       cd backend
       npm install
    - for frontend
      ```bash
       cd frontend
       npm install

3. Setup Environment Variables (.env) - [in backend folder]
   ```bash
   PORT=5555
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   
4. Run the Server
   - for backend
      ```bash
       cd backend
       node server.js
    - for frontend
      ```bash
       cd frontend
       npm run dev

### Testing with ThunderClient
All API routes were tested using ThunderClient.
[See API Route Screenshots](https://github.com/nishandutta/shoppyglobe-fullstack/blob/main/api%20routes%20screenshots.pdf)
      
## MongoDB Databases
1. Products
2. Cart
3. Users
