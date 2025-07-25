import React from 'react';
import { Select, Grid } from '@radix-ui/themes';
import { Ecosystem, ecosystemOptions } from '../../constants/ecosystem';

interface EcosystemSelectProps {
  onEcosystemChange: (value: Ecosystem) => void;
}

const EcosystemSelect: React.FC<EcosystemSelectProps> = ({
  onEcosystemChange,
}) => {
  return (
    <Grid columns='2' gap='4' align='start' pl='2'>
      <Select.Root size='3' onValueChange={onEcosystemChange}>
        <Select.Trigger placeholder='Choose ecosystem' />
        <Select.Content>
          {ecosystemOptions.map((option) => (
            <Select.Item key={option.value} value={option.value}>
              {option.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Grid>
  );
};

export default EcosystemSelect;
