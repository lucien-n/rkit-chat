import { SqlDatabase, repo, type ClassType } from 'remult';

export const dbNames = <entityType>(
	entityType: ClassType<entityType>,
	withPrefix = false
): { [Properties in keyof Required<entityType>]: string } => {
	const wrap = SqlDatabase.getDb().wrapIdentifier;
	const r = repo(entityType);
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	return new Proxy(
		{},
		{
			get: (target, prop) => {
				if (prop === Symbol.toPrimitive) {
					return () => r.metadata.dbName;
				}
				return (
					(withPrefix ? wrap(r.metadata.dbName) + '.' : '') +
					wrap(r.metadata.fields.find(prop as string).dbName)
				);
			}
		}
	);
};
