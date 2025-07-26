import { useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

interface Package {
  name: string;
  display_name: string;
}

interface FetchPackagesResponse {
  packages: Package[];
  total: number;
}

interface FetchError extends Error {
  status: number;
  response?: Response;
}

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/ecosystems`;

/**
 * Fetches packages from a specified ecosystem with pagination support.
 *
 * @param ecosystem - The package ecosystem to fetch from (e.g., 'npm', 'pip')
 * @param offset - The offset for pagination
 * @param limit - The number of items per page (defaults to 20)
 * @returns Promise containing the fetched packages response
 * @throws {Error} When the network request fails or returns a non-200 response
 */
const fetchPackages = async (
  ecosystem: string,
  offset: number,
  limit: number = 20 // Limit is by default 20 but API is ignoring this and returning 100
): Promise<FetchPackagesResponse> => {
  const response = await fetch(
    `${API_URL}/${ecosystem}/packages?offset=${offset}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch packages');
  }
  return response.json();
};

export const useFetchPackages = (
  ecosystem: string | undefined,
  page: number,
  limit: number = 20
) => {
  const offset = (page - 1) * limit;

  return useQuery({
    queryKey: ['packages', ecosystem, offset, limit],
    queryFn: () => fetchPackages(ecosystem!, offset, limit),
    enabled: !!ecosystem,
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5, // 5 minutes cache time

    retry: (_, error: FetchError) => {
      if (!error?.response && !error?.status) return false;
      return !(error.status === 404 || error.status >= 500);
    },

    // Transform the data to include unique IDs for each package
    select: (data) => {
      const packagesWithIds = data.packages.map((pkg) => ({
        ...pkg,
        id: uuidv4(),
      }));

      return {
        ...data,
        packages: packagesWithIds,
      };
    },
  });
};
