import type { H3Event } from "h3";
import { createError } from "h3";

export interface StandardResponse<T = unknown> {
  message: string;
  data?: T;
  metadata?: Record<string, unknown> | null;
}

/**
 * Send a standardized success response (Status 200, 201, etc.)
 */
export const sendSuccess = <T = unknown>(
  event: H3Event,
  message: string,
  data?: T,
  metadata?: Record<string, unknown> | null,
  statusCode = 200,
): StandardResponse<T> => {
  setResponseStatus(event, statusCode);
  return {
    message,
    data,
    metadata: metadata || null,
  };
};

/**
 * Create a standardized H3 error response (Status 400, 401, 403, 404, 500, etc.)
 */
export const sendErrorResponse = (
  statusCode: number,
  message: string,
  data?: unknown,
) => {
  return createError({
    statusCode,
    statusMessage: message,
    data: {
      message,
      data: data || null,
      metadata: null,
    },
  });
};
