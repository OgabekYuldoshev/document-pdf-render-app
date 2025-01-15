"use server";

import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { xaction } from "@/lib/xaction";
import matter from "gray-matter";
import { renderString } from "nunjucks";
import { z } from "zod";

function renderContent(content: string, data: Record<string, any>) {
	return renderString(content, data);
}

export const $fetchTemplate = xaction.schema(z.string()).action(async (id) => {
	const template = await prisma.template.findUnique({ where: { id } });
	if (!template) {
		throw new Error("Template not found");
	}

	const templatePath = path.join(process.cwd(), template.contentPath);

	if (!existsSync(templatePath)) {
		throw new Error("Template file not found");
	}
	const templateContent = await readFile(templatePath, "utf-8");

	const { content, data } = matter(templateContent);

	const renderedContent = renderContent(content, data);

	return {
		mainContent: content,
		template,
		renderedContent,
		meta: data,
	};
});

export const $updateContent = xaction
	.schema(
		z.object({
			id: z.string(),
			newContent: z.string(),
		}),
	)
	.action(async ({ id, newContent }) => {
		const template = await prisma.template.findUnique({ where: { id } });

		if (!template) {
			throw new Error("Template not found");
		}
		const templatePath = path.join(process.cwd(), template.contentPath);

		const templateContent = await readFile(templatePath, "utf-8");

		const { data } = matter(templateContent);

		const updatedContent = matter.stringify(newContent, data);

		await writeFile(templatePath, updatedContent);

		const renderedContent = renderContent(newContent, data);

		return {
			mainContent: newContent,
			renderedContent,
		};
	});

export const $updateMetaData = xaction
	.schema(
		z.object({
			id: z.string(),
			meta: z.record(z.any()),
		}),
	)
	.action(async ({ id, meta }) => {
		const template = await prisma.template.findUnique({ where: { id } });

		if (!template) {
			throw new Error("Template not found");
		}

		const templatePath = path.join(process.cwd(), template.contentPath);

		const templateContent = await readFile(templatePath, "utf-8");

		const { content } = matter(templateContent);

		const updatedContent = matter.stringify(content, meta);

		await writeFile(templatePath, updatedContent);

		const renderedContent = renderContent(content, meta);

		return {
			renderedContent,
		};
	});
