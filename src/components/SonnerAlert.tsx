import { toast } from "sonner";

type AlertProps = {
  message: string;
  type: "success" | "error" | "warning" | "info";
};

const SonnerAlert = ({ message, type }: AlertProps) => {
  const showToast = () => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      case "info":
        toast.info(message);
        break;
      default:
        toast(message);
    }
  };

  return (
    <button
      onClick={showToast}
      className="px-4 py-2 rounded-lg text-white"
      style={{
        backgroundColor:
          type === "success"
            ? "#16a34a"
            : type === "error"
              ? "#dc2626"
              : type === "warning"
                ? "#facc15"
                : "#3b82f6",
      }}
    >
      Show {type} Alert
    </button>
  );
};

export default SonnerAlert;
