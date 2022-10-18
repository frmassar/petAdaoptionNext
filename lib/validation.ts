
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

export const animalValidation = z.object({
  name: z.string().min(1).max(20),
  race: z.string().min(3).max(20),
  description: z.string().max(5000).min(200),
  type: z.enum(["chat", "chien"]),
  gender: z.enum(["female", "male"]),
  // user: z.string().min(1).max(20),
});
