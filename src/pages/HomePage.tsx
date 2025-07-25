import { useState } from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';

import { Ecosystem } from '../constants/ecosystem';
import { useFetchVulnerabilities } from '../hooks/useFetchVulnerabilities';

import EcosystemSelect from '../components/EcosystemSelect/EcosystemSelect';
import PaginatedTable from '../components/PackagesTable/PackagesTable';
import VulnerabilitiesViewer from '../components/VulnerabilitiesViewer/VulnerabilitiesViewer';

import './HomePage.css';

const HomePage: React.FC = () => {
  const [ecosystem, setEcosystem] = useState<Ecosystem>();
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(
    undefined
  );

  const {
    data: vulnerabilitiesData,
    isLoading: isLoadingVulnerabilities,
    error: vulnerabilitiesError,
  } = useFetchVulnerabilities(ecosystem, selectedPackage);

  const handleEcosystemChange = (value: Ecosystem) => {
    setEcosystem(value);
  };

  return (
    <Box width='100%' px='0' py='4' pt='9'>
      <Flex direction='row' gap='2' width='100%'>
        <Box className='content-box'>
          <Flex direction='row' align='center' gap='3' mb='4' pl='4'>
            <Text>Select Ecosystem</Text>
            <EcosystemSelect onEcosystemChange={handleEcosystemChange} />
          </Flex>

          {ecosystem ? (
            <PaginatedTable
              ecosystem={ecosystem}
              setSelectedPackage={setSelectedPackage}
            />
          ) : (
            <Flex align='center' justify='center' height='200px'>
              <Text>Select an ecosystem to view packages.</Text>
            </Flex>
          )}
        </Box>

        <Box className='content-box'>
          <VulnerabilitiesViewer
            data={vulnerabilitiesData}
            isLoading={isLoadingVulnerabilities}
            error={vulnerabilitiesError}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default HomePage;
