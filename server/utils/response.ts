import { H3Event, createError } from "h3";

export interface StandardResponse<T = any> {
  message: string;
  data?: T;
  metadata?: any;
}

/**
 * Send a standardized success response (Status 200, 201, etc.)
 */
export const sendSuccess = <T = any>(
  event: H3Event,
  message: string,
  data?: T,
  metadata?: any,
  statusCode = 200
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
  data?: any
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
