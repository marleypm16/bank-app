import { apiResponse } from "../_types/apiResponse";

export const cepApi = async (cep: string) : Promise<apiResponse> => {
    const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
    const data = await response.json();
    return data;
}