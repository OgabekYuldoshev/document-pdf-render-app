"use client";
import { BaseEditor } from "@/components/editor";
import { useMutation } from "@tanstack/react-query";
import { langs } from "@uiw/codemirror-extensions-langs";
import { debounce } from "radash";
import React from "react";
import { useSnapshot } from "valtio";
import { $updateContent } from "../action";
import { state } from "../state";

export default function Editor() {
	const snap = useSnapshot(state);

	const { mutate } = useMutation({
		mutationKey: ["content", state.template.id],
		async mutationFn(newContent: string) {
			const result = await $updateContent({
				id: state.template.id,
				newContent,
			});
			if (!result.success) {
				throw result.error;
			}

			return result.data;
		},
		onSuccess({ renderedContent }) {
			state.renderedContent = renderedContent;
		},
	});

	const updateContent = debounce({ delay: 1000 }, mutate);

	return (
		<>
			<BaseEditor
				style={{
					height: "100%",
				}}
				height="100%"
				extensions={[langs.html()]}
				value={snap.mainContent}
				onChange={(content) => updateContent(content)}
			/>
			<span className="absolute bottom-1 right-6 text-xs text-foreground/50">
				HTML
			</span>
		</>
	);
}
