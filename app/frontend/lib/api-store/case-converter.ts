export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}

export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`);
}

function transformKeys(
  obj: unknown,
  transformFn: (key: string) => string,
): unknown {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== "object") return obj;
  if (obj instanceof Date) return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => transformKeys(item, transformFn));
  }

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[transformFn(key)] = transformKeys(value, transformFn);
  }
  return result;
}

export function camelizeKeys(obj: unknown): unknown {
  return transformKeys(obj, snakeToCamel);
}

export function decamelizeKeys(obj: unknown): unknown {
  return transformKeys(obj, camelToSnake);
}
