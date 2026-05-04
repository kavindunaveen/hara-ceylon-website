import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export async function authorizeWithCredentials(
  email: string,
  password: string,
) {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
  if (!user || !user.hashedPassword) return null;
  if (user.isBanned) return null;

  const ok = await bcrypt.compare(password, user.hashedPassword);
  if (!ok) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name ?? null,
    role: user.role,
    image: user.image ?? null,
  };
}
