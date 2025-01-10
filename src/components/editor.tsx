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
				basicSetup={{
					autocompletion: true,
				}}
				ref={ref}
				{...rest}
				theme={githubDark}
				extensions={[color, ...extensions]}
			/>
		);
	},
);
