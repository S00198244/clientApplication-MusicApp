export interface Song {
    _id: string,
    title: string,
    artists: string[],
    album: string,
    date_released: Date,
    genres : string[],
    date_downloaded: Date,
    favourited: boolean,
    tags: string[];
}
