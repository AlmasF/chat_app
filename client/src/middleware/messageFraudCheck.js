import { checkFraud } from "../utils/checkFraud";
import { toast } from "react-toastify";

export const messageFraudCheck = async (incomingMessage) => {
  if (!incomingMessage) return;

  // 1. Анализ (логика вынесена)
  try {
    const { isHighRisk, isSuspicious, probability } =
      await checkFraud(incomingMessage);

    console.log("Check result: ", {
      isHighRisk,
      isSuspicious,
      probability,
    });

    if (!isHighRisk && isSuspicious) {
      return {
        warning: true,
      };
    }

    if (isHighRisk && isSuspicious) {
      toast.error("Подозрительное сообщение!");
      return {
        warning: true,
      };
    }

    return {
      warning: false,
    };
  } catch (err) {
    console.err("Error checking message: ", err);
  }
};
