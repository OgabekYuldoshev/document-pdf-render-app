"use server";

import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { STARTER_KIT_HTML } from "@/constants";
import { $session } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { xaction } from "@/lib/xaction";
import matter from "gray-matter";
import { renderString } from "nunjucks";
import { z } from "zod";

export const $createTemplate = xaction
	.schema(
		z.object({
			title: z.string(),
		}),
	)
	.action(async ({ title }) => {
		const result = await $session();
		if (!result.success) {
			throw result.error;
		}

		const rootPath = process.cwd();

		const templatesDir = path.join(rootPath, ".templates");

		if (!existsSync(templatesDir)) {
			await mkdir(templatesDir);
		}
		const contentFile = `${randomUUID()}.html`;

		const contentPath = path.join(templatesDir, contentFile);

		let rendredContent = renderString(STARTER_KIT_HTML, { title });

		rendredContent = matter.stringify(rendredContent, { title });

		await writeFile(contentPath, rendredContent);

		const template = await prisma.template.create({
			data: {
				title,
				contentPath: path.join(".templates", contentFile),
				authorId: result.data.id,
			},
		});

		return template;
	});

export const $listTemplates = xaction.action(async () => {
	const templates = await prisma.template.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});

	return templates;
});
