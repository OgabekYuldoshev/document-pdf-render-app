import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || ""

function generate(data: object) {
    return jwt.sign(data, secretKey, { expiresIn: '1h', algorithm: "HS256" });
}

function verify(token: string) {
    return jwt.verify(token, secretKey)
}


export default { generate, verify }