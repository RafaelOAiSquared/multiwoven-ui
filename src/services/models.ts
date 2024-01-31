import {
	CreateModelPayload,
	CreateModelResponse,
	GetModelByIdResponse,
} from "@/views/Models/types";
import { apiRequest, multiwovenFetch } from "./common";

export type APIData = {
	data?: Array<{
		id: string;
		type: string;
		icon: string;
		name: string;
		attributes: {
			[key: string]: string | null;
		};
	}>;
	links?: Record<string, string>;
};

type ModelAPIResponse = {
	success: boolean;
	data?: APIData;
};

export const getAllModels = async (): Promise<ModelAPIResponse> => {
	return apiRequest("/models", null);
};

export const getModelPreview = async (
	query: string,
	connector_id: string
): Promise<any> => {
	const url = "/connectors/" + connector_id + "/query_source";
	return apiRequest(url, { query: query });
};

export const createNewModel = async (
	payload: CreateModelPayload
): Promise<CreateModelResponse> =>
	multiwovenFetch<CreateModelPayload, CreateModelResponse>({
		method: "post",
		url: "/models",
		data: payload,
	});

export const getModelById = async (
	id: string
): Promise<ModelAPIResponse<GetModelByIdResponse>> =>
	multiwovenFetch<string, ModelAPIResponse<GetModelByIdResponse>>({
		method: "get",
		url: "/models/" + id,
	});

export const putModelById = async (
	id: string,
	payload: UpdateModelPayload
): Promise<ModelAPIResponse<GetModelByIdResponse>> =>
	multiwovenFetch<UpdateModelPayload, ModelAPIResponse<GetModelByIdResponse>>({
		method: "put",
		url: "/models/" + id,
		data: payload,
	});


export const deleteModelById = async (id:string): Promise<ModelAPIResponse<GetModelByIdResponse>> =>
	multiwovenFetch<string, ModelAPIResponse<GetModelByIdResponse>>({
		method: "delete",
		url: "/models/" + id,
	});