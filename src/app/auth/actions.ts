'use server';

import hash from "@/lib/hash";
import jwt from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { xaction } from "@/lib/xaction";
import { cookies } from "next/headers";
import { z } from "zod";


export const $login = xaction
    .schema(z.object({
        username: z.string().min(4),
        password: z.string().min(6)
    })).action(async ({ password, username }) => {
        const cookieStore = await cookies()
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if (!user) {
            throw new Error("username or password is incorrect!")
        }

        const isValidPass = await hash.passwordVerify(password, user.password)

        if (!isValidPass) {
            throw new Error("username or password is incorrect!")
        }

        const accessToken = jwt.generate({ id: user.id })

        cookieStore.set(
            "accessToken",
            accessToken,
            {
                httpOnly: true,
                path: '/'
            })

        return { id: user.id }
    })