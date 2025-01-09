import "server-only";

import { type JWTPayload, SignJWT, jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET_KEY || "";
const encodedKey = new TextEncoder().encode(secretKey);

function generate(payload: JWTPayload) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("1h")
		.sign(encodedKey);
}

async function verify(
	token: string,
): Promise<{ success: true; data: any } | { success: false; error: string }> {
	try {
		const decoded = await jwtVerify(token, encodedKey, {
			algorithms: ["HS256"],
		});
		return {
			success: true,
			data: decoded,
		};
	} catch (error) {
		return {
			success: false,
			error: (error as Error).message,
		};
	}
}

export default { generate, verify };
