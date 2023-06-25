import { Magic } from "magic-sdk";

export const createMagic = () => {
  return (
    typeof window !== "undefined" &&
    new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY, {
      network: "mainnet",
    })
  );
};

export const magic = createMagic();
