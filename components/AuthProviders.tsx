"use client";

import React, { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";

import Button from "@/components/Button";

interface ProviderT {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | undefined;
}

type ProvidersT = Record<string, ProviderT>;

const AuthProviders: React.FC = () => {
  const [providers, setProviders] = useState<null | ProvidersT>(null);

  useEffect(() => {
    (async () => {
      const allProviders = await getProviders();
      setProviders(allProviders);
    })();
  }, []);

  if (providers)
    return (
      <div>
        {Object.values(providers).map((provider: ProviderT) => (
          <Button
            type="button"
            key={provider.id}
            handleClick={() => signIn(provider?.id)}
            title="Sign In"
          />
        ))}
      </div>
    );

  return <></>;
};

export default AuthProviders;
