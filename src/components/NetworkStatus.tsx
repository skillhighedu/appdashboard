import useNetworkStatus from "@hooks/useNetworkStatus";

export default function NetworkWarning() {
  const isOnline = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-red-600 text-white p-3 text-center text-sm font-semibold">
      ⚠️ No Internet Connection. Some features may not work.
    </div>
  );
}
