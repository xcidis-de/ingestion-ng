export interface IngestionPostInterface {
    params: {
        name: string[];
        id: string[];
    }
    options:{
        providers: string[];
        headers: string[];
    }
}