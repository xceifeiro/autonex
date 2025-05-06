// Simulação de autenticação simples
// Em produção, você deve usar uma solução robusta como NextAuth.js ou Auth.js

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Usuário administrador (em produção, use um banco de dados)
const ADMIN_USER = {
  email: "admin@autonex.com",
  // Em produção, armazene apenas hashes de senha, nunca senhas em texto puro
  password: "admin123",
  name: "Administrador",
  role: "admin",
}

export type User = {
  email: string
  name: string
  role: string
}

export async function login(email: string, password: string): Promise<User | null> {
  // Simula um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Verifica as credenciais
  if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
    // Cria um token de sessão (em produção, use JWT ou similar)
    const sessionToken = Buffer.from(
      JSON.stringify({
        email: ADMIN_USER.email,
        name: ADMIN_USER.name,
        role: ADMIN_USER.role,
        exp: Date.now() + 24 * 60 * 60 * 1000, // Expira em 24 horas
      }),
    ).toString("base64")

    // Armazena o token em um cookie
    cookies().set("auth_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 dia
      path: "/",
    })

    return {
      email: ADMIN_USER.email,
      name: ADMIN_USER.name,
      role: ADMIN_USER.role,
    }
  }

  return null
}

export async function logout() {
  cookies().delete("auth_token")
}

export async function getUser(): Promise<User | null> {
  const token = cookies().get("auth_token")?.value

  if (!token) return null

  try {
    const userData = JSON.parse(Buffer.from(token, "base64").toString())

    // Verifica se o token expirou
    if (userData.exp < Date.now()) {
      cookies().delete("auth_token")
      return null
    }

    return {
      email: userData.email,
      name: userData.name,
      role: userData.role,
    }
  } catch (error) {
    cookies().delete("auth_token")
    return null
  }
}

export async function requireAuth() {
  const user = await getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return user
}
