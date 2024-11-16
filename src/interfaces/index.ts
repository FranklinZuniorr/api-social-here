export interface OpenApiVisionChoice {
    message: {
        content: string;
    };
}

export interface OpenApiVisionResponse {
	id: string;
	choices: OpenApiVisionChoice[];
	usage: {
		prompt_tokens: number;
		completion_tokens: number;
		total_tokens: number;
	};
}