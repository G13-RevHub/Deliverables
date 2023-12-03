export function getAntdFieldRequiredRule(message: string) {
    return [
        {
            required: true,
            message,
        }
    ]
}