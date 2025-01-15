import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { zValidator } from "@hono/zod-validator";
import matter from "gray-matter";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import nunjucks from "nunjucks";
import { z } from "zod";
import { generator } from "../lib/generator";
import { prisma } from "../lib/prisma";

const app = new Hono().basePath("/api");

app.get(
	"/template/:id",
	zValidator("param", z.object({ id: z.string() })),
	async (c) => {
		const param = c.req.valid("param");

		const template = await prisma.template.findUnique({
			where: {
				id: param.id,
			},
		});

		if (!template) {
			throw new HTTPException(404, { message: "Template not found" });
		}

		const templatePath = path.join(process.cwd(), template.contentPath);

		if (!existsSync(templatePath)) {
			throw new HTTPException(404, { message: "Template file not found" });
		}

		const templateContent = await readFile(templatePath, "utf-8");

		const { content, data } = matter(templateContent);

		const renderedContent = nunjucks.renderString(content, data);

		await generator.setOptions({
			displayHeaderFooter: false,
			scale: 1,
			format: "A4",
			printBackground: true,
			args: [
				"--no-sandbox",
				"--disable-setuid-sandbox",
				"--disable-dev-shm-usage",
				"--disable-accelerated-2d-canvas",
				"--no-first-run",
				"--no-zygote",
				"--disable-gpu",
				"--disable-web-security",
			],
			headless: true,
		});
		const pdfBuffer = await generator.generate(renderedContent);

		return c.body(pdfBuffer.buffer, 200, {
			"Content-Type": "application/pdf",
		});
	},
);

app.onError((err, c) => {
	if (err instanceof HTTPException) {
		return c.json({ error: err.message, status: err.status }, err.status);
	}

	return c.json({ error: "Internal Server Error" }, 500);
});

export { app };
