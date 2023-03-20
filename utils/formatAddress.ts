export default function formatAddress(key: string | null) {
  if (!key) return;
  return key?.substring(0, 6) + "..." + key?.substring(key.length - 6);
}
