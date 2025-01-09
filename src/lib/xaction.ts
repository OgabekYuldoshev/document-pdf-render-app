import { ZodError, type z } from "zod";

type ActionHandler = () => Promise<any>;

type ActionReturn<Result> =
	| {
			success: true;
			data: Result;
	  }
	| {
			success: false;
			error: string;
	  };

function action<Handler extends ActionHandler>(handler: Handler) {
	return async (): Promise<ActionReturn<Awaited<ReturnType<Handler>>>> => {
		try {
			const result = await handler();
			return {
				success: true,
				data: result,
			};
		} catch (error) {
			let errorMessage = "An error occurred";

			if (error instanceof Error) {
				errorMessage = error.message;
			}

			return {
				success: false,
				error: errorMessage,
			};
		}
	};
}

type ActionHandlerWithArgs<Value> = (values: Value) => Promise<any>;

function schema<Schema extends z.ZodSchema>(schema: Schema) {
	return {
		action<Handler extends ActionHandlerWithArgs<z.infer<typeof schema>>>(
			handler: Handler,
		) {
			return async (
				values: z.infer<typeof schema>,
			): Promise<ActionReturn<Awaited<ReturnType<Handler>>>> => {
				try {
					const parsedValues = await schema.parseAsync(values);
					const result = await handler(parsedValues);
					return {
						success: true,
						data: result,
					};
				} catch (error) {
					let errorMessage = "An error occurred";

					if (error instanceof Error) {
						errorMessage = error.message;
					}

					if (error instanceof ZodError) {
						let validationError = "";
						const fieldErrors = error.flatten().fieldErrors;
						for (const key of Object.keys(fieldErrors)) {
							const errors = fieldErrors[key]?.reduce((acc, value) => {
								if (acc) {
									return `${acc}, ${value}`;
								}

								return value;
							}, "");

							if (validationError) {
								validationError = `${validationError} \n ${key}: ${errors}`;
							} else {
								validationError = `${key}: ${errors}`;
							}
							console.log(fieldErrors[key]);
						}
						errorMessage = validationError;
					}

					return {
						success: false,
						error: errorMessage,
					};
				}
			};
		},
	};
}

export const xaction = {
	schema,
	action,
};
