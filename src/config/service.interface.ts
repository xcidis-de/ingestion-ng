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