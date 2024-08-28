/**
 * Filters an object by removing properties with falsy values.
 *
 * This function iterates over each property of the provided object. If a property's value is falsy (e.g., `false`, `0`, `""`, `null`, `undefined`, or `NaN`),
 * that property is omitted from the returned object. Properties with truthy values are retained.
 *
 * @param obj - The object to filter. It must be an object that extends `Record<string, any>`, meaning its keys are strings and its values can be of any type.
 * @returns A new object of type `Partial<T>`. This object includes only the properties of the input object that have truthy values.
 *          The returned object is a partial representation of the input object, potentially containing fewer properties.
 *
 * @template T - A generic type extending `Record<string, any>`, representing the shape of the input object.
 */
export function filterObject<T extends Record<string, any>>(
	obj: T,
): NonNullable<T> {
	const filter = (currentObj: any): any => {
		const filteredObj: Record<string, any> = {};

		Object.entries(currentObj).forEach(([key, value]) => {
			if (value && typeof value === 'object' && !Array.isArray(value)) {
				const deepFilteredObj = filter(value);
				if (Object.keys(deepFilteredObj).length > 0) {
					filteredObj[key] = deepFilteredObj;
				}
			} else if (value) {
				filteredObj[key] = value;
			}
		});

		return filteredObj;
	};

	return filter(obj);
}
