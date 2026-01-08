import { InferenceClient } from "@huggingface/inference";

export type sentimentList = sentiment[];
export type sentiment = {
  label: string;
  score: number;
};

export const HGclient = new InferenceClient(process.env.HF_TOKEN);
