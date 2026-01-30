'use client';

import { LoginButton } from "../components/LoginButton";

export const GatedContent = () => { 
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
        <LoginButton />
        <p className="mt-4">You have access to the Gated Content.</p>
    </div>
    )
};
