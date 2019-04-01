const prod = {
  
};

const dev = {
  url: {
    API_SHORT_ROOT: 'http://localhost:3000',
    API_ROOT: 'http://localhost:3000/api/v1',
  },
  route: {
    URL_ROOT: '/',
    URL_HOME: '/home',
    URL_LOGIN: '/login',
    URL_SIGNUP: '/signup',
    URL_PORTFOLIO: '/portfolio', 
    URL_TRANSACTIONS: '/transactions', 
  }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;

//HEADERS
export const AUTH_HEADERS_JSON_JWT =  {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`
};

export const INIT_HEADERS =  {
    "Accept": "application/json",
    "Content-Type": "application/json",
};
