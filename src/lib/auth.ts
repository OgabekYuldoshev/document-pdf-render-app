"use server";

import { cookies } from "next/headers";
import { omit } from "radash";

import jwt from "./jwt";
import { prisma } from "./prisma";
import { xaction } from "./xaction";

export const $session = xaction.action(async () => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken");

	if (!accessToken) {
		throw new Error("Invalid token!");
	}
	const decodedAccessToken = await jwt.verify(accessToken.value);

	if (!decodedAccessToken.success) {
		throw new Error(decodedAccessToken.error);
	}

	const user = await prisma.user.findUnique({
		where: {
			id: decodedAccessToken.data.payload.id,
		},
	});

	if (!user) {
		throw new Error("Invalid token!");
	}

	return omit(user, ["password"]);
});

export const $revokeSession = xaction.action(async () => {
	const cookieStore = await cookies();

	cookieStore.delete("accessToken");

	return "ok";
});
