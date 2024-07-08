// components/ui/loader.tsx
// I did change the below line from 'use client';
'use client'

import { BeatLoader } from "react-spinners";

export const Loader = () => {
  return (
      <BeatLoader size={20} />
  )
};