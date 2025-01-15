"use client";
import { BaseEditor } from "@/components/editor";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { linter } from "@codemirror/lint";
import { useMutation } from "@tanstack/react-query";
import { debounce } from "radash";
import React from "react";
import { useSnapshot } from "valtio";
import { $updateMetaData } from "../action";
import { state } from "../state";

export default function JsonData() {
	const snap = useSnapshot(state);

	const { mutate } = useMutation({
		mutationKey: ["meta", state.template.id],
		async mutationFn(meta: Record<string, any>) {
			const result = await $updateMetaData({ id: state.template.id, meta });
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
				extensions={[json(), linter(jsonParseLinter())]}
				value={JSON.stringify(snap.meta, null, 2)}
				onChange={(content) => {
					try {
						updateContent(JSON.parse(content));
					} catch (error) {
						return;
					}
				}}
			/>
			<span className="absolute bottom-1 right-6 text-xs text-foreground/50">
				JSON
			</span>
		</>
	);
}
