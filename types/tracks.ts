export type Track = {
    album_id: string
    album_image: string 
    album_name: string
    artist_id: string
    artist_idstr: string
    artist_name: string
    audio: string
    audiodownload: string
    audiodownload_allowed: boolean
    duration: number
    id: string
    image: string
    license_ccurl: string
    name: string
    position: number
    prourl: string
    releasedate: string
    shareurl: string
    shorturl: string
    waveform : string
    docId?:string
}

export type Artist = {
    id: string
    name: string
    website: string
    joindate: string
    image: string
    shorturl: string
    shareurl: string;
    tracks?: Track[];
    albums?: Album[]
}

export type Album ={
    id: string
    name: string
    website: string
    releasedate: string
    image: string
    shorturl: string
    shareurl: string
    artist_id: string
    artist_name: string
    zip: string
    zip_allowed: boolean,
    tracks?:Track[]
}

export type ResponseHeader = {
    status: string
    code: number
    error_message: string
    warnings: string
    results_counts: number
    next: string
}

export type FetchResponse<T> = {
    headers: ResponseHeader
    results: T[]
}

export type Genre = {
    name: string
    image: string
}
