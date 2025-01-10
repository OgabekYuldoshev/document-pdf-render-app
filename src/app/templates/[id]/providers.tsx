"use client";

import type { Template } from "@prisma/client";
import React, { type PropsWithChildren } from "react";
import { EditorMachineContext } from "./machine";

type Props = PropsWithChildren<{
    template: Template;
    content: string;
}>;

export default function Providers({ children, content, template }: Props) {
    return (
        <EditorMachineContext.Provider options={{
            input: {
                content,
                template
            }
        }}>
            {children}
        </EditorMachineContext.Provider>
    );
}
