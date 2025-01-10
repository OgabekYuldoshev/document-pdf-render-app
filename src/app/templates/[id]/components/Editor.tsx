"use client";
import { BaseEditor } from "@/components/editor";
import { langs } from "@uiw/codemirror-extensions-langs";
import { debounce } from "radash";
import React from "react";
import { EditorMachineContext } from "../machine";

export default function Editor() {
	const { send } = EditorMachineContext.useActorRef();
	const state = EditorMachineContext.useSelector((state) => state.context);

	const updateContent = debounce({ delay: 1000 }, send);

	return (
		<BaseEditor
			className="border-lg"
			extensions={[langs.html()]}
			value={state.content}
			onChange={(content) =>
				updateContent({
					type: "UPDATE_CONTENT",
					content,
				})
			}
		/>
	);
}
