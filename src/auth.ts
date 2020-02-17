import * as jwt from 'jsonwebtoken'
require('dotenv').config()
export function verifyJWTToken(token:any) {
  return new Promise((resolve, reject) => {
    return jwt.verify(token, "process.env.SECRET", (err:any, decodedToken:any) => {
      if (err || !decodedToken) {
        return reject(err)
//		return false;
      }
      resolve(decodedToken)
//		return true;
    })
  })
}

export function createJWTToken(payload:any) {
  return jwt.sign({
    data: payload
  }, "process.env.SECRET", {
    expiresIn: 3600,
    algorithm: 'HS256'
  })
}
