import { z } from "zod";

class BaseDto {
  static schema: z.ZodTypeAny = z.object({});

  static validate<T extends typeof BaseDto>(
    this: T,
    data: unknown
  ):
    | { success: true; data: z.infer<T["schema"]>; }
    | { success: false; error: z.ZodError; } {

    const res = (this.schema as z.ZodTypeAny).safeParse(data);

    if (!res.success) {
      console.log(res.error);
      return { success: false, error: res.error };
    }

    return { success: true, data: res.data as z.infer<T["schema"]> };
  }
}

export default BaseDto;