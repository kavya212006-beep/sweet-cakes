import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const encoder = new TextEncoder();
const fallbackSecret = "sweet-delights-demo-secret";

export const SESSION_COOKIE_NAME = "sweet-delights-session";

function getSecret() {
  return encoder.encode(process.env.JWT_SECRET ?? fallbackSecret);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export async function createSessionToken(payload: { userId: number; role: "customer" | "admin"; email: string }) {
  return new SignJWT({ role: payload.role, email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(payload.userId))
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifySessionToken(token: string) {
  try {
    const result = await jwtVerify(token, getSecret());
    const userId = Number(result.payload.sub);
    const role = result.payload.role;
    const email = result.payload.email;

    if (!userId || (role !== "customer" && role !== "admin") || typeof email !== "string") {
      return null;
    }

    return { userId, role, email } as const;
  } catch {
    return null;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}
