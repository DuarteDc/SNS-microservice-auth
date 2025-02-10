
export interface SessionToken {
    token: (userId: string) => string;
    verify: (token: string) => string;
}