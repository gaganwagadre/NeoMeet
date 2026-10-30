// Use environment variable for API URL, fallback to deployed backend
// const server = process.env.REACT_APP_API_URL || "https://neomeet.onrender.com";


const server =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://neomeet.onrender.com");

export default server;