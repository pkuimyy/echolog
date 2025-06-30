export interface SpotifyUser {
    display_name: string;
    email: string;
    images?: { url: string }[];
}

export interface SpotifyLoginResponse {
    authorizeUrl: string;
}

export interface SpotifyLogoutResponse {
    success: boolean;
    error?: string;
}
