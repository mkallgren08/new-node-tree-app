require('dotenv').config();

// console.log(process.env)




 const AUTH_CONFIG = {
  domain: `${process.env.REACT_APP_AUTH0_DOMAIN}`,
  clientId: `${process.env.REACT_APP_AUTH0_CLIENT_ID}`,
  // callbackUrl: callbackURL
}

if(process.env.NODE_ENV === 'development'){
  AUTH_CONFIG.callbackUrl = 'http://localhost:3000/callback'
  AUTH_CONFIG.domain = 'mkallgren.auth0.com'
  AUTH_CONFIG.clientId = 'xpoUbMBhs1c0kMja8CNxOILOIVs6ASZV'
} else {
  AUTH_CONFIG.callbackUrl = `${process.env.REACT_APP_AUTH0_CALLBACK_URL}`
  AUTH_CONFIG.domain = `${process.env.REACT_APP_AUTH0_DOMAIN}`
  AUTH_CONFIG.clientId = `${process.env.REACT_APP_AUTH0_CLIENT_ID}`
}

export default AUTH_CONFIG