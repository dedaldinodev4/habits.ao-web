
export const isUserLogged = (pathname: string): boolean => {
    return pathname === "/auth/signin" || pathname === '/auth/signup'
}