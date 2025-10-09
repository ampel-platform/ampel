// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getServerEnv() {
  return {
    // eslint-disable-next-line no-undef
    BASE_API_URL: process.env.BASE_API_URL ?? 'http://localhost:8080',
  };
}
export type PublicEnv = ReturnType<typeof getServerEnv>;
