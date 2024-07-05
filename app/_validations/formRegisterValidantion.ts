import { z } from 'zod';

export const formRegisterValidation = z.object({
    email: z.string().email(),
    password: z.string({
        required_error: "Password is required",
    }).min(8, "Password must be at least 8 characters"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    address: z.string().min(1, "Address is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "Zip code is required"),
    dateOfBirth: z.coerce.date({
        required_error: "Date of birth is required",
    }),
});

export type FormRegisterValidationType = z.infer<typeof formRegisterValidation>;
