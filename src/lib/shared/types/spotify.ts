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

export interface SpotifyCommonResponse {
    success: boolean;
    error?: string;
    message?: string;
}

export interface SpotifySavedAlbum {
    added_at: string
    album: {
        id: string
        name: string
        artists: { name: string }[]
        images: { url: string; width: number; height: number }[]
        release_date: string
        total_tracks: number
        external_urls: {
            spotify: string
        },
        popularity: number
    }
}

export interface SpotifySavedAlbumsResponse {
    items: SpotifySavedAlbum[]
    total: number
    limit: number
    offset: number
    next: string | null
    previous: string | null
}