import {
  X,
  CheckCircle2,
  Info,
  AlertCircle,
  XCircle,
} from "lucide-react";

const toastVariants = {
  success: {
    bg: "bg-[#00AA5B]",
    icon: <CheckCircle2 size={24} className="text-white shrink-0" />,
  },
  info: {
    bg: "bg-[#0081c4]",
    icon: <Info size={24} className="text-white shrink-0" />,
  },
  warning: {
    bg: "bg-[#FF8B00]",
    icon: <AlertCircle size={24} className="text-white shrink-0" />,
  },
  error: {
    bg: "bg-[#E32221]",
    icon: <XCircle size={24} className="text-white shrink-0" />,
  },
};

export default function ToastContent({
  type = "info",
  message,
  description,
  closeToast,
  action,
}) {
  const variant = toastVariants[type] || toastVariants.info;

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl 
        ${variant.bg} text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]
        w-full max-w-sm md:max-w-md pointer-events-auto transition-all
      `}
    >
      {variant.icon}

      <div className="flex-1 flex flex-col justify-center min-w-0">
        <p className="text-[14px] font-semibold leading-snug break-words">
          {message}
        </p>
        {description && (
          <p className="text-[12px] text-white/90 leading-tight mt-0.5 break-words">
            {description}
          </p>
        )}
      </div>

      {action && (
        <button 
          className="shrink-0 text-[13px] font-bold tracking-wide uppercase px-2 py-1 bg-white/20 hover:bg-white/30 rounded-md transition-colors"
          onClick={action.onClick}
        >
          {action.label || action}
        </button>
      )}

      {!action && (
        <button
          onClick={closeToast}
          className="shrink-0 text-white/70 hover:text-white transition-colors p-1"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
