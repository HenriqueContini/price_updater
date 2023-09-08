import { ApiResponseType } from "../types/apiResponse";

export async function updatePriceAPI(csv: File): Promise<ApiResponseType> {
  try {
    const formData = new FormData();
    formData.append("csvFile", csv);

    const response = await fetch("http://localhost:3000/updatePrice", {
      method: "POST",
      body: formData,
    });

    const json = await response.json();

    if (response.status === 201) {
      return {
        error: false,
      };
    }

    return {
      error: true,
      errorMessage: json.errorMessage,
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      errorMessage: "Ocorreu algum problema desconhecido",
    };
  }
}
