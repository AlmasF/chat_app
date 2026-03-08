import { useEffect } from "react";
import { checkFraud } from "../interceptors/checkFraud";
import { toast } from "react-toastify";

export const useCheckMessage = (incomingMessage) => {
  useEffect(() => {
    if (!incomingMessage) return;

    // 1. Анализ (логика вынесена)
    const fraudResult = checkFraud(incomingMessage);

    // 2. Побочный эффект (тостер)
    if (fraudResult.isFraud) {
      toast.error(fraudResult.toast);
    }
  }, [incomingMessage]);
};
