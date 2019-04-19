export interface IngestionPostInterface {
    params: {
        names: string[];
        ids: string[];
    }
    options:{
        providers: string[];
        headers: string[];
    }
}

export interface InternalPostInterface {
    body: {
        _id?: string;
        text?: string
    }
}