import { z } from "zod";

const FormSchema = z.object({
   email: z.string().min(1, "Email field cannot be empty"),
   password: z.string().min(1, "Password field cannot be empty"), 
})