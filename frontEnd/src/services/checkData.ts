import { ApiResponseType } from "../types/apiResponse";

export async function checkDataAPI(csv: File): Promise<ApiResponseType> {
  try {
    const formData = new FormData();
    formData.append("csvFile", csv);

    const response = await fetch("http://localhost:3000/checkFile", {
      method: "POST",
      body: formData,
    });

    const json = await response.json();

    return json;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      errorMessage: "Ocorreu algum problema desconhecido",
    };
  }
}
