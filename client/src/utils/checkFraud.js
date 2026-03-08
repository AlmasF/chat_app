import { pipeline, env } from "@xenova/transformers";

env.localModelPath = "/src";
env.allowRemoteModels = false;

const FRAUD_THRESHOLD_STRICT = 0.85;
const FRAUD_THRESHOLD_SOFT = 0.55;
// Загружаем классификатор (путь к папке с моделью)

let instance = null;

export const checkFraud = async (text) => {
  try {
    if (!instance) {
      instance = await pipeline("text-classification", "onnx_quantized", {
        quantized: true,
      });
    }
    const result = await instance(text);

    const label = result?.length ? result[0].label : "";
    const score = result?.length ? result[0].score : NaN;

    const fraudProbability = label === "LABEL_1" ? score : 1 - score;

    return {
      isHighRisk: fraudProbability > FRAUD_THRESHOLD_STRICT,
      isSuspicious: fraudProbability > FRAUD_THRESHOLD_SOFT,
      probability: fraudProbability,
    };
  } catch (err) {
    console.error(err);
  }
};
