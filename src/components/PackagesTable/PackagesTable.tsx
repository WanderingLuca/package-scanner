import { Box, Flex, Table, Button, Text } from '@radix-ui/themes';
import { useState, memo } from 'react';
import { useFetchPackages } from '../../hooks/useFetchPackages';

interface PackagesTableProps {
  ecosystem: string | undefined;
  setSelectedPackage: (value: string) => void;
}

const PackagesTable: React.FC<PackagesTableProps> = ({
  ecosystem,
  setSelectedPackage,
}) => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useFetchPackages(
    ecosystem,
    page,
    20
  );

  const handleAnalyze = (packageName: string) => {
    setSelectedPackage(packageName);
    setSelectedRow(packageName);
  };

  return (
    <Box pl='1' maxWidth='700px'>
      {isLoading && (
        <Flex align='center' justify='center' height='200px'>
          <Text>Loading...</Text>
        </Flex>
      )}
      {isError && <Text color='red'>{(error as Error).message}</Text>}

      {!isLoading && !isError && data && (
        <>
          <Flex pl='1' maxWidth='600px' minWidth='600px'>
            <Table.Root variant='ghost' layout='fixed'>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell width='80%'>
                    Package Name
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell width='20%'>
                    Actions
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.packages.map((pkg) => (
                  <Table.Row
                    key={pkg.id}
                    style={{
                      backgroundColor:
                        selectedRow === pkg.name
                          ? 'color(display-p3 0.21 0.21 0.25)'
                          : 'transparent',
                    }}
                  >
                    <Table.Cell
                      width='80%'
                      style={{
                        wordWrap: 'break-word',
                        wordBreak: 'break-word',
                        whiteSpace: 'normal',
                      }}
                    >
                      {pkg.name}
                    </Table.Cell>
                    <Table.Cell width='20%'>
                      <Button onClick={() => handleAnalyze(pkg.name)}>
                        Analyze
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Flex>
          <Flex justify='start' mt='4'>
            <Button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </Button>

            <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default memo(PackagesTable);
