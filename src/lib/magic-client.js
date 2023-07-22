import { Magic } from "magic-sdk";

// Magic client for the browser side 
export const createMagic = () => {
  return (
    typeof window !== "undefined" &&
    new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY, {
      network: "mainnet",
    })
  );
};

export const magic = createMagic();
