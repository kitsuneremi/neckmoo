

declare module 'next-auth' {
    interface DefaultSession {
        user: {
            id: number;
            name: string;
            email: string;
            accessToken: string;
            isAdmin: Boolean;
        }
    }

    interface session {
        user: {
            id: number;
            name: string;
            email: string;
            accessToken: string;
            isAdmin: Boolean;
        }
    }

    interface Session {
        user: {
            id: number;
            name: string;
            email: string;
            accessToken: string;
            isAdmin: Boolean;
        }
    }
}

// declare module 'next-auth/react' {
//     interface DefaultSession {
//         user: {
//             id: number;
//             name: string;
//             email: string;
//             accessToken: string;
//             isAdmin: Boolean;
//         }
//     }
// }