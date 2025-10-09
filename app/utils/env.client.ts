export interface PublicEnv {
  BASE_API_URL: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getBaseUrl() {
  // @ts-ignore injected in root.tsx
  // eslint-disable-next-line no-undef
  const winEnv = typeof window !== 'undefined' ? (window.ENV as PublicEnv | undefined) : undefined;
  return winEnv?.BASE_API_URL ?? import.meta.env.VITE_BASE_API_URL ?? 'http://localhost:8080';
}
