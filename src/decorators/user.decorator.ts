import { createParamDecorator } from '@nestjs/common/decorators';
import { ExecutionContext } from '@nestjs/common/interfaces';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
