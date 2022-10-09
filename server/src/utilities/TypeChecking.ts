
export function isString(value: unknown): value is string {
    return typeof value == "string"
}

export function isNumeric(value: unknown): value is number {
    return typeof value == "number"
}