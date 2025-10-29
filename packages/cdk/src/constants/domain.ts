import type { DomainConfiguration, StageConfiguration } from "../types"

export const API_DOMAIN_PREFIX = "api";

const ROOT_DOMAIN_NAME = "example.com";

export const DOMAINS: StageConfiguration<DomainConfiguration> = {
    BETA: { domainName: `beta.${ROOT_DOMAIN_NAME}`, hasRoute53HostedZoneBeenDelegatedTo: true},
    PROD: { domainName: ROOT_DOMAIN_NAME, hasRoute53HostedZoneBeenDelegatedTo: true}
}