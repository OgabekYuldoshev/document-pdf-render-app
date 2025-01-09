import bcrypt from "bcrypt";

const saltRounds = 10;

async function passwordHash(password: string) {
	return await bcrypt.hash(password, saltRounds);
}

async function passwordVerify(password: string, hash: string) {
	return await bcrypt.compare(password, hash);
}

export default { passwordHash, passwordVerify };
