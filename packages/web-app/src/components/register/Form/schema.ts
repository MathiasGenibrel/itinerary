import { z } from "zod";

const MIN_PASSWORD_LENGTH = 1;

export interface RegisterInputs {
  email: string;
  username: string;
  password: string;
  confirm: string;
}

export const schema = z
  .object({
    email: z.string().email(),
    username: z.string().max(64),
    password: z.string().min(MIN_PASSWORD_LENGTH).max(64),
    confirm: z.string().min(MIN_PASSWORD_LENGTH).max(64),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
