import {
    PipeTransform,
    ArgumentMetadata,
    BadRequestException,
  } from '@nestjs/common'
  import { ZodError, ZodSchema } from 'zod'
  
  export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) {}
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transform(value: unknown, metadata: ArgumentMetadata) {
      try {
        const parsedValue = this.schema.parse(value)
        return parsedValue
      } catch (error) {
        if (error instanceof ZodError) {
          throw new BadRequestException({
            error,
            message: 'Validation failed',
            statusCode: 400,
          })
        }
        throw new BadRequestException('Validation failed')
      }
    }
  }