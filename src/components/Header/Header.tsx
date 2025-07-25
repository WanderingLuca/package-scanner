import { Box, Flex, Heading } from '@radix-ui/themes';
import safety from '../../assets/safety.png';

const Header: React.FC = () => {
  return (
    <Flex direction='column' align='center' gap='4'>
      <Box>
        <a href='https://www.getsafety.com/cli' target='_blank'>
          <img src={safety} className='logo' alt='safety logo' />
        </a>
      </Box>
      <Heading size='5' align='center'>
        Safety Platform Package Scanner
      </Heading>
    </Flex>
  );
};

export default Header;
