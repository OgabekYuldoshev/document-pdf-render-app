"use client";

import type { Template } from "@prisma/client";
import { proxy } from "valtio";

type TemplateState = {
	template: Template;
	mainContent: string;
	renderedContent: string;
	meta: Record<string, any>;

	setContents(
		value: Pick<
			TemplateState,
			"mainContent" | "renderedContent" | "template" | "meta"
		>,
	): void;
};

export const state = proxy<TemplateState>({
	template: {} as Template,
	mainContent: "",
	renderedContent: "",
	meta: {},

	setContents({ template, mainContent, renderedContent, meta }: TemplateState) {
		this.template = template;
		this.mainContent = mainContent;
		this.renderedContent = renderedContent;
		this.meta = meta;
	},
});
