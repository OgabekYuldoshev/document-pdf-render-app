import { cookies } from "next/headers";
import { omit } from 'radash'

import jwt from "./jwt";
import { prisma } from "./prisma";
import { xaction } from "./xaction";

export const $session = xaction.action(async () => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")

    if (!accessToken) {
        throw new Error("Invalid token!")
    }
    const decodedAccessToken = jwt.verify(accessToken.value) as { id: string }

    if (!decodedAccessToken.id) {
        throw new Error("Invalid token!")
    }

    const user = await prisma.user.findUnique({
        where: {
            id: decodedAccessToken.id
        }
    })

    if (!user) {
        throw new Error("Invalid token!")
    }

    return omit(user, ["password"])
})