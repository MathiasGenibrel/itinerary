import { z } from "zod";

const MIN_PASSWORD_LENGTH = 12;
/**
 * Password Regex with minimal requirement:
 * - 1 Upper letter
 * - 1 Lower letter
 * - 1 Number
 * - 1 Special character
 */
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.-_])[A-Za-z\d@$!%*?&.-_]+$/;

export interface LoginInputs {
  email: string;
  password: string;
}

export interface RegisterInputs {
  email: string;
  username: string;
  password: string;
  confirm: string;
}

export const schema = {
  login: z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(MIN_PASSWORD_LENGTH)
      .max(64)
      .refine((password) => PASSWORD_REGEX.test(password), {
        message:
          "The password must contain at least one upper case letter, one lower case letter, one number and one special character (@$!%*?&.-_).",
      }),
  }),

  register: z
    .object({
      email: z.string().email(),
      username: z.string().max(64),
      password: z
        .string()
        .min(MIN_PASSWORD_LENGTH)
        .max(64)
        .refine((password) => PASSWORD_REGEX.test(password), {
          message:
            "The password must contain at least one upper case letter, one lower case letter, one number and one special character (@$!%*?&.-_).",
        }),
      confirm: z.string().trim().min(MIN_PASSWORD_LENGTH).max(64),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ["confirm"],
    }),
};
