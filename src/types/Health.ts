export interface Health {
  envoy: EnvoyHealth;
  deploymentStatuses: DeploymentStatus[];
  requests: RequestHealth;
}

export const healthNotAvailable = (): Health => {
  return {
    envoy: {
      inbound: { healthy: 0, total: 0 },
      outbound: { healthy: 0, total: 0 }
    },
    deploymentStatuses: [],
    requests: { requestCount: 0, requestErrorCount: 0 }
  };
};

export type NamespaceHealth = { [service: string]: Health };

export interface EnvoyHealth {
  inbound: EnvoyRatio;
  outbound: EnvoyRatio;
}

export interface EnvoyRatio {
  healthy: number;
  total: number;
}

export interface DeploymentStatus {
  name: string;
  replicas: number;
  available: number;
}

export interface RequestHealth {
  requestCount: number;
  requestErrorCount: number;
}
