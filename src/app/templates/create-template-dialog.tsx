"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { type PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { $createTemplate } from "./actions";
const TemplateSchema = z.object({
	title: z.string(),
});

type FormValues = z.infer<typeof TemplateSchema>;
export default function CreateTemplateDialog({ children }: PropsWithChildren) {
	const router = useRouter();
	const [isOpen, setOpen] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(TemplateSchema),
		defaultValues: {
			title: "",
		},
	});

	async function onSubmit(values: FormValues) {
		const result = await $createTemplate(values);
		if (!result.success) {
			toast.error(result.error);
			return;
		}
		toast.success("Template created successfully!");
		router.push(`/templates/${result.data.id}`);
	}

	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New template</DialogTitle>
					<DialogDescription>Create a new template</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid gap-2">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input placeholder="ex: Invoice" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex justify-end items-center gap-2 mt-4">
							<Button
								type="button"
								variant="outline"
								onClick={() => setOpen(false)}
							>
								Cancel
							</Button>
							<Button type="submit">Submit</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
