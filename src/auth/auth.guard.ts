import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    return this.validateRequest(request)
  }

  private validateRequest(request): boolean {
    const uuid = request.cookies.uuid

    if (!uuid) return false

    try {
      const decodedToken = this.jwt.verify(uuid)
      request.user = decodedToken
      return true
    } catch (err) {
      return false
    }
  }
}
