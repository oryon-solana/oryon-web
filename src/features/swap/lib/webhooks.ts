// KEY   = merchant public key (base58)
// VALUE = webhook endpoint yang akan di-hit saat swap melibatkan merchant ini
const MERCHANT_WEBHOOKS: Record<string, string> = {
  AtuCag78dHV6iRcJFK2Ejq7JLwWRc2Y4h7mZFJJX2XAG:
    // "https://merchant-1.vercel.app/api/points/wallet/",
    "http://localhost:8000/api/points/wallet/",
  CzNJ75wU4FuECaXzxgw3E462Qkh71zdTZU83Pq2cs3HH:
    "http://localhost:8080/api/wallet/",
  // "https://merchant-2a.vercel.app/api/wallet/",
};

export function getWebhook(pubkey: string): string | undefined {
  return MERCHANT_WEBHOOKS[pubkey];
}
