import { z } from "zod";
import type BaseDto from "../Dto/base.dto.js";
import APIError from "../utils/APIError.js";
import type { Request, Response, NextFunction } from 'express';

type DtoClass<T extends typeof BaseDto> = T & {
  schema: z.ZodType;
};

function validate<T extends typeof BaseDto>(Dtoclass: DtoClass<T>) {
  return (req: Request, _: Response, next: NextFunction) => {
    const validationRes = Dtoclass.validate(req.body);

    if (!validationRes.success) {
      console.log(validationRes.error);
      throw APIError.badRequest();
    }

    req.body = validationRes.data;
    next();
  };
};


export default validate;