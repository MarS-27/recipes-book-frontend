import NextAuth, {
  type DefaultSession,
  type User,
  type AuthOptions,
} from 'next-auth';
import { type TLogin } from './auth';
import { type JWT, type DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: TLogin;
  }

  interface User extends TLogin {}
}

declare module 'next-auth/jwt' {
  interface JWT extends TLogin {}
}
