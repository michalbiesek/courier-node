import { AxiosRequestConfig } from "axios";
import { ICourierClientConfiguration } from "../types";
import {
  ICourierBulkConfig,
  ICourierBulkCreateJobParams,
  ICourierBulkCreateJobResponse,
  ICourierBulkGetJobParams,
  ICourierBulkGetJobResponse,
  ICourierBulkGetJobUsersParams,
  ICourierBulkGetJobUsersResponse,
  ICourierBulkIngestUsersParams,
  ICourierBulkIngestUsersResponse,
  ICourierBulkRunJobParams,
  ICourierClientBulk
} from "./types";

const createJob = (options: ICourierClientConfiguration) => {
  return async (
    params: ICourierBulkCreateJobParams,
    config?: ICourierBulkConfig
  ): Promise<ICourierBulkCreateJobResponse> => {
    const axiosConfig: AxiosRequestConfig = {
      headers: {}
    };

    if (config && config.idempotencyKey) {
      axiosConfig.headers["Idempotency-Key"] = config.idempotencyKey;
    }

    if (config && config.idempotencyExpiry) {
      axiosConfig.headers["x-idempotency-expiration"] =
        config.idempotencyExpiry;
    }

    const res = await options.httpClient.post<ICourierBulkCreateJobResponse>(
      "/bulk",
      {
        message: params.message
      },
      axiosConfig
    );

    return res.data;
  };
};

const ingestUsers = (options: ICourierClientConfiguration) => {
  return async (
    params: ICourierBulkIngestUsersParams,
    config?: ICourierBulkConfig
  ): Promise<ICourierBulkIngestUsersResponse> => {
    const axiosConfig: AxiosRequestConfig = {
      headers: {}
    };

    if (config && config.idempotencyKey) {
      axiosConfig.headers["Idempotency-Key"] = config.idempotencyKey;
    }

    if (config && config.idempotencyExpiry) {
      axiosConfig.headers["x-idempotency-expiration"] =
        config.idempotencyExpiry;
    }

    const res = await options.httpClient.post<ICourierBulkIngestUsersResponse>(
      `/bulk/${params.jobId}`,
      {
        users: params.users
      },
      axiosConfig
    );

    return res.data;
  };
};

const runJob = (options: ICourierClientConfiguration) => {
  return async (
    params: ICourierBulkRunJobParams,
    config?: ICourierBulkConfig
  ): Promise<void> => {
    const axiosConfig: AxiosRequestConfig = {
      headers: {}
    };

    if (config && config.idempotencyKey) {
      axiosConfig.headers["Idempotency-Key"] = config.idempotencyKey;
    }

    if (config && config.idempotencyExpiry) {
      axiosConfig.headers["x-idempotency-expiration"] =
        config.idempotencyExpiry;
    }

    await options.httpClient.post<void>(
      `/bulk/${params.jobId}/run`,
      {},
      axiosConfig
    );
  };
};

const getJob = (options: ICourierClientConfiguration) => {
  return async (
    params: ICourierBulkGetJobParams
  ): Promise<ICourierBulkGetJobResponse> => {
    const res = await options.httpClient.get<ICourierBulkGetJobResponse>(
      `/bulk/${params.jobId}`
    );
    return res.data;
  };
};

const getJobUsers = (options: ICourierClientConfiguration) => {
  return async (
    params: ICourierBulkGetJobUsersParams
  ): Promise<ICourierBulkGetJobUsersResponse> => {
    const res = await options.httpClient.get<ICourierBulkGetJobUsersResponse>(
      `/bulk/${params.jobId}/users`,
      {
        params: {
          cursor: params.cursor
        }
      }
    );
    return res.data;
  };
};

export const bulk = (
  options: ICourierClientConfiguration
): ICourierClientBulk => {
  return {
    createJob: createJob(options),
    getJob: getJob(options),
    getJobUsers: getJobUsers(options),
    ingestUsers: ingestUsers(options),
    runJob: runJob(options)
  };
};