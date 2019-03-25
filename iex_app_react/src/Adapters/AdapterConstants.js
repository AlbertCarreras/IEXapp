const prod = {
  
};

const dev = {
  url: {
    API_SHORT_ROOT: 'http://localhost:3000',
    API_ROOT: 'http://localhost:3000/api/v1',
    API_WS_ROOT: 'ws://localhost:3000/api/v1/cable',
    GITHUB_URL_ROOT: ''
  },
  route: {
    URL_ROOT: '/',
    URL_HOME: '/home',
    URL_LOGIN: '/login',
    URL_SIGNUP: '/signup',
  }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;

//HEADERS
