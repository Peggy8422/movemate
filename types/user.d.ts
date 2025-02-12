import { JwtPayload } from "jwt-decode";

// user auth info
export interface UserAuth extends JwtPayload {
  id: string;
  email: string;
  name: string;
  googleId: string;
  facebookId: string;
  lineId: string;
  coverPhoto: string;
  isFilledOutDoc: boolean;
  iat: number;
  exp: number;
}
