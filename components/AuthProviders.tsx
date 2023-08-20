"use client";

import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";

import React from "react";

interface AuthProvidersType {}

interface ProviderT {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | undefined;
}

type ProvidersT = Record<string, ProviderT>;

const AuthProviders: React.FC<AuthProvidersType> = (props) => {
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
          <button key={provider.id} onClick={() => signIn(provider?.id)}>
            Sign In With {provider.name}
          </button>
        ))}
      </div>
    );

  return <div>AuthProviders</div>;
};

export default AuthProviders;
