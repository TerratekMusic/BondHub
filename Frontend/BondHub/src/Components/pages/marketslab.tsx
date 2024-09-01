import React from 'react';
import { Box, Text, Button, Select, Divider, Heading } from '@chakra-ui/react';
import NavBar from '../navbar';

const MarketLab: React.FC = () => {
    return (
        <Box minH="100vh" color="white"> {/* Eliminamos bgGradient para permitir el fondo global */}
            <NavBar /> {/* Reutilización del NavBar en MarketLab */}
            <Box padding="6rem" mb="10rem">  {/* Ajusta el padding aquí para mover todo hacia arriba */}
                <Heading as="h2" size="xl" mt="1rem" mb="1rem">Set up a bond market</Heading>
                <Box mb="4">
                    <Text as="h6" mb="2">Project Token</Text>
                    <Select
                        placeholder="Select Token"
                        bg="transparent" 
                        color="white"
                        border="1px solid white"
                        _hover={{ borderColor: 'gray.500' }}
                        _focus={{ borderColor: 'white', boxShadow: '0 0 0 1px white' }}
                    >
                        <option style={{ color: 'black' }} value="X Token">X token</option>
                        <option style={{ color: 'black' }} value="EKUBO">EKUBO</option>
                    </Select>
                </Box>
                <Box mb="4">
                    <Text as="h6" mb="2">Blockchain</Text>
                    <Select
                        placeholder="Select"
                        bg="transparent"
                        color="white"
                        border="1px solid white"
                        _hover={{ borderColor: 'gray.500' }}
                        _focus={{ borderColor: 'white', boxShadow: '0 0 0 1px white' }}
                    >
                        <option style={{ color: 'black' }} value="Kakarot">Kakarot</option>
                        <option style={{ color: 'black' }} value="Starknet">Starknet</option>
                    </Select>
                </Box>
                <Divider mb="4" />
                <Box>
                    <Box display="flex" gap="4" mb="4">
                        <Box>
                            <Text as="h6" mb="2">Payout Token</Text>
                            <Select
                                placeholder="Select"
                                bg="transparent"
                                color="white"
                                border="1px solid white"
                                _hover={{ borderColor: 'gray.500' }}
                                _focus={{ borderColor: 'white', boxShadow: '0 0 0 1px white' }}
                            >
                                <option style={{ color: 'black' }} value="scxdot">$ETH</option>
                                <option style={{ color: 'black' }} value="anotherPayout">$STRK</option>
                            </Select>
                        </Box>
                        <Box>
                            <Text as="h6" mb="2">Blockchain</Text>
                            <Select
                                placeholder="Select"
                                bg="transparent"
                                color="white"
                                border="1px solid white"
                                _hover={{ borderColor: 'gray.500' }}
                                _focus={{ borderColor: 'white', boxShadow: '0 0 0 1px white' }}
                            >
                                <option style={{ color: 'black' }} value="Kakarot">Kakarot</option>
                                <option style={{ color: 'black' }} value="Starknet">Starknet</option>
                            </Select>
                        </Box>
                        <Box>
                            <Text as="h6" mb="2">Discount</Text>
                            <Select
                                placeholder="Select"
                                bg="transparent"
                                color="white"
                                border="1px solid white"
                                _hover={{ borderColor: 'gray.500' }}
                                _focus={{ borderColor: 'white', boxShadow: '0 0 0 1px white' }}
                            >
                                <option style={{ color: 'black' }} value="8">8%</option>
                                <option style={{ color: 'black' }} value="10">10%</option>
                            </Select>
                        </Box>
                        <Box>
                            <Text as="h6" mb="2">Quantity</Text>
                            <input
                                type="number"
                                defaultValue={1}
                                style={{
                                    padding: '8px',
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                    borderRadius: '5px',
                                    border: '1px solid white',
                                    outline: 'none'
                                }}
                            />
                        </Box>
                        <Button colorScheme="yellow" alignSelf="flex-end">Launch market</Button>
                    </Box>
                    <Button colorScheme="gray" mt="4">Add new market</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default MarketLab;
