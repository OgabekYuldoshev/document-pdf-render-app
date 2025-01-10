import type { Template } from "@prisma/client";
import { createActorContext } from "@xstate/react";
import { assign, fromPromise, setup } from "xstate";
import { $updateTemplateContent } from "./action";

export const editorMachine = setup({
	types: {
		context: {} as {
			content: string;
			template: Template;
		},
		input: {} as {
			content: string;
			template: Template;
		},
		events: {} as {
			type: "UPDATE_CONTENT";
			content: string;
		},
	},
	actors: {
		updateContent: fromPromise<string, { id: string; content: string }>(
			async ({ input }) => {
				const result = await $updateTemplateContent({
					id: input.id,
					content: input.content,
				});

				if (!result.success) {
					throw result.error;
				}

				return result.data;
			},
		),
	},
}).createMachine({
	id: "editorMachine",
	context: ({ input }) => ({
		content: input.content,
		template: input.template,
	}),
	initial: "idle",
	states: {
		idle: {
			on: {
				UPDATE_CONTENT: {
					target: "updating",
					actions: assign({
						content: ({ event }) => event.content,
					}),
				},
			},
		},
		updating: {
			invoke: {
				src: "updateContent",
				input: ({ context }) => ({
					id: context.template.id,
					content: context.content,
				}),
				onDone: {
					target: "idle",
				},
			},
		},
	},
});

export const EditorMachineContext = createActorContext(editorMachine);
