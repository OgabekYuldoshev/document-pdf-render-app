'use server';

import { xaction } from "@/lib/xaction";
import { z } from "zod";


export const $test = xaction.schema(z.object({
    name: z.string()
})).action(async () => {

    return { settings: true }
})