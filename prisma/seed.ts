import hash from "@/lib/hash"
import { prisma } from "@/lib/prisma"
import { loadEnvConfig } from "@next/env"

const projectDir = process.cwd()

loadEnvConfig(projectDir);

(async () => {
    try {
        const defaultUser = await prisma.user.create({
            data: {
                name: "John Doe",
                username: process.env.DEFAULT_USERNAME || 'admin',
                password: await hash.passwordHash(process.env.DEFAULT_PASSWORD || "admin1234"),
            }
        })

        console.log(defaultUser)
    } catch (error) {
        console.error(error)
        process.exit(-1)
    }
})()