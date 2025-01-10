"use server";

import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { xaction } from "@/lib/xaction";
import { z } from "zod";

export const $singleTemplate = xaction.schema(z.string()).action(async (id) => {
	const template = await prisma.template.findUnique({ where: { id } });
	if (!template) {
		throw new Error("Template not found");
	}

	const templatePath = path.join(process.cwd(), template.contentPath);

	if (!existsSync(templatePath)) {
		throw new Error("Template file not found");
	}
	const content = await readFile(templatePath, "utf-8");
	return {
		content,
		template,
	};
});

export const $updateTemplateContent = xaction
	.schema(
		z.object({
			id: z.string(),
			content: z.string(),
		}),
	)
	.action(async ({ id, content }) => {
		const template = await prisma.template.findUnique({ where: { id } });

		if (!template) {
			throw new Error("Template not found");
		}
		const templatePath = path.join(process.cwd(), template.contentPath);
		if (existsSync(templatePath)) {
			console.log(content);
			await writeFile(templatePath, content);
		}

		return "ok";
	});
