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

  register: z.object({
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
  }),
};
