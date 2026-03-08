import { pipeline, env } from "@xenova/transformers";
env.allowLocalModels = true;
env.localModelPath = "/";
// Загружаем классификатор (путь к папке с моделью)
const classifier = await pipeline("text-classification");

export const checkFraud = async (text) => {
  try {
    return classifier(text);
  } catch (err) {
    console.error(err);
  }
};
