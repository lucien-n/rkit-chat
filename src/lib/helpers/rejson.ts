export const rejson = (obj: object | undefined | null) =>
	obj ? JSON.parse(JSON.stringify(obj)) : undefined;
