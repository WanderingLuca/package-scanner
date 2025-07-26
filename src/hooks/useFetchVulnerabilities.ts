import { useQuery } from '@tanstack/react-query';

export interface Vulnerability {
  safety_id: string;
  summary: string;
  risk_type: string;
  legacy_safety_id: string | null;
  first_patched_versions: string[];
  vulnerable_version_ranges: string[];
  cvss_score: number | null;
}

export interface FetchVulnerabilitiesResponse {
  detail?: string;
  vulnerabilities: Vulnerability[];
}

export interface FetchError extends Error {
  status: number;
  response?: Response;
}

const API_URL = '/api/public/ecosystems';

/**
 * Fetches vulnerabilities for a specific package in an ecosystem.
 *
 * @param ecosystem - The ecosystem (e.g., 'npm', 'pypi')
 * @param packageName - The name of the package
 * @returns A promise resolving to vulnerability data
 */
const fetchVulnerabilities = async (
  ecosystem: string,
  packageName: string
): Promise<FetchVulnerabilitiesResponse> => {
  const encodedPackage = encodeURIComponent(packageName);
  const response = await fetch(
    `${API_URL}/${ecosystem}/packages/${encodedPackage}/vulnerabilities`
  );

  if (response.status === 404) {
    return {
      detail: `No vulnerabilities found for the specified package. ${packageName} in ${ecosystem}.`,
      vulnerabilities: [],
    };
  }

  if (!response.ok) {
    throw new Error(
      `Failed to fetch vulnerabilities for ${packageName} from ${ecosystem}`
    );
  }

  return response.json();
};

export const useFetchVulnerabilities = (
  ecosystem: string | undefined,
  packageName: string | undefined
) => {
  return useQuery({
    queryKey: ['vulnerabilities', ecosystem, packageName],
    queryFn: () => fetchVulnerabilities(ecosystem!, packageName!),
    enabled: !!ecosystem && !!packageName,
    staleTime: 1000 * 60 * 5, // cache for 5 mins

    retry: (_, error: FetchError) => {
      if (!error?.response && !error?.status) return false;
      return !(error.status === 404 || error.status >= 500);
    },
  });
};
