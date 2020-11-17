import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * This param is used to get the ip from user's request
 */
export const IpAddress = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  },
);
