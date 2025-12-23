import {
  X,
  Check,
  Info,
  AlertTriangle,
  XCircle,
} from "lucide-react";

const toastVariants = {
  success: {
    border: "border-green-400",
    bg: "bg-green-50",
    iconBg: "bg-green-500",
    icon: <Check size={18} className="text-white" />,
    title: "Congratulations!",
  },
  info: {
    border: "border-blue-400",
    bg: "bg-blue-50",
    iconBg: "bg-blue-500",
    icon: <Info size={18} className="text-white" />,
    title: "Did you know?",
  },
  warning: {
    border: "border-yellow-400",
    bg: "bg-yellow-50",
    iconBg: "bg-yellow-500",
    icon: <AlertTriangle size={18} className="text-white" />,
    title: "Warning!",
  },
  error: {
    border: "border-red-400",
    bg: "bg-red-50",
    iconBg: "bg-red-500",
    icon: <XCircle size={18} className="text-white" />,
    title: "Something went wrong!",
  },
};

export default function ToastContent({
  type = "info",
  message,
  description,
  closeToast,
  action,
}) {
  const variant = toastVariants[type];

  return (
    <div
      className={`
        flex items-start gap-4 p-4 rounded-xl border
        ${variant.border} ${variant.bg}
        shadow-sm w-full max-w-md
      `}
    >
      <div
        className={`flex items-center justify-center w-9 h-9 rounded-full ${variant.iconBg}`}
      >
        {variant.icon}
      </div>

      <div className="flex-1">
        <p className="text-sm text-gray-600">
          {message}
          {action && (
            <button className="ml-1 text-blue-600 hover:underline">
              {action}
            </button>
          )}
        </p>
      </div>

      <button
        onClick={closeToast}
        className="text-gray-400 hover:text-gray-700 transition"
      >
        <X size={18} />
      </button>
    </div>
  );
}
