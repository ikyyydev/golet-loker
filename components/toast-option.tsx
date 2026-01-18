"use client";

import { CheckCircle2, MessageSquareWarningIcon } from "lucide-react";
import { BsExclamationCircle } from "react-icons/bs";

export const ToastSuccessOption = {
  icon: <CheckCircle2 size={24} className="text-green-600" />,
  style: { backgroundColor: "#dcfce7", color: "#166534" },
  duration: 3000,
};
export const ToastErrorOption = {
  style: { backgroundColor: "#fee2e2", color: "#7f1d1d" },
  icon: <BsExclamationCircle size={24} className="text-red-600" />,
  duration: 3000,
};
export const ToastWarningOption = {
  style: { backgroundColor: "#F79A19", color: "#fff" },
  icon: <MessageSquareWarningIcon size={24} className="text-white" />,
  duration: 3000,
};
