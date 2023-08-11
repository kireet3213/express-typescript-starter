import { validateOrReject } from "class-validator";

export async function validateOrRejectSchema(input: any): Promise<void> {
    await validateOrReject(input, { whitelist: true });
}