import { EditorView } from "@codemirror/view";
import { color } from "@uiw/codemirror-extensions-color";
import { githubDark } from "@uiw/codemirror-theme-github";
import CodeMirror, {
	type ReactCodeMirrorRef,
	type ReactCodeMirrorProps,
} from "@uiw/react-codemirror";
import React from "react";

type BaseEditorProps = Omit<ReactCodeMirrorProps, "theme">;

export const BaseEditor = React.forwardRef<ReactCodeMirrorRef, BaseEditorProps>(
	({ extensions = [], ...rest }, ref) => {
		return (
			<CodeMirror
				ref={ref}
				{...rest}
				basicSetup={{
					autocompletion: true,
				}}
				theme={githubDark}
				extensions={[EditorView.lineWrapping, color, ...extensions]}
			/>
		);
	},
);
