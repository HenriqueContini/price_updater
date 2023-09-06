import { Response } from "express";

export default function errorResponse(
  response: Response,
  status: number,
  message?: string,
  error?: unknown
): Response {
  const errorMessage = getErrorMessage(error);

  return response.status(status).json({
    error: true,
    errorMessage: errorMessage ? errorMessage : message,
  });
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return String(error.message);
  }

  return "";
}
