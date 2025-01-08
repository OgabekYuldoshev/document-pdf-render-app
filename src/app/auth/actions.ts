'use server';

import { xaction } from "@/lib/xaction";
import { z } from "zod";


export const $login = xaction
    .schema(z.object({
        username: z.string().min(4),
        password: z.string().min(6)
    })).action(async ({ password, username }) => {
        console.log(password, username)

        return { settings: true }
    })