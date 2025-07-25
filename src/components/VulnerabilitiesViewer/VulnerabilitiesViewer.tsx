import React from 'react';
import { Box, Flex, Text, Code } from '@radix-ui/themes';
import { JSONTree } from 'react-json-tree';

import type {
  FetchVulnerabilitiesResponse,
  FetchError,
  Vulnerability,
} from '../../hooks/useFetchVulnerabilities';

interface VulnerabilitiesViewerProps {
  data: FetchVulnerabilitiesResponse | undefined;
  isLoading: boolean;
  error: FetchError | null;
}

const VulnerabilitiesViewer: React.FC<VulnerabilitiesViewerProps> = ({
  data,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <Flex align='center' justify='center' height='310px'>
        <Text>Loading...</Text>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex align='center' justify='center' height='310px'>
        <Text>Error: {error.message || 'Something went wrong'}</Text>
      </Flex>
    );
  }

  if (!data) {
    return (
      <Flex align='center' justify='center' height='310px'>
        <Text>Select a package to view vulnerabilities.</Text>
      </Flex>
    );
  }

  // Render vulnerabilities data — customize this part as needed
  return (
    <Box overflowY='auto'>
      {data?.detail ? <Text>{data.detail}</Text> : null}
      {data.vulnerabilities?.map((vuln: Vulnerability, idx: number) => (
        <Box key={idx} mb='3' p='2'>
          <Text>
            Safety Id: {vuln.safety_id || 'No Id for this vulnerability'}
          </Text>{' '}
          <br />
          <Code>{vuln.summary || 'No description'}</Code>
        </Box>
      ))}
      {data.vulnerabilities.length > 0 ? (
        <Box height='400px'>
          Response:
          <JSONTree data={data} />
        </Box>
      ) : null}
    </Box>
  );
};

export default VulnerabilitiesViewer;
