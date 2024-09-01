import React from 'react';
import { Box, Text, Button, Select, Divider, Heading } from '@chakra-ui/react';
import NavBar from '../navbar'; 

const MarketLab: React.FC = () => {
    return (
        <Box minH="100vh" color="white"> {/* Eliminamos bgGradient para permitir el fondo global */}
            <NavBar /> {/* Reutilización del NavBar en MarketLab */}
            <Box padding="6rem" mb="10rem">  {/* Ajusta el padding aquí para mover todo hacia arriba */}
                <Heading as="h2" size="xl"  mb="1rem">Set up a bond market</Heading>
                <Box mb="4">
                    <Text mb="2">Project Token</Text>
                    <Select placeholder="Select Token" bg="gray.700">
                        <option value="X Token">X token</option>
                        <option value="EKUBO">EKUBO</option>
                    </Select>
                </Box>
                <Box mb="4">
                    <Text mb="2">Blockchain</Text>
                    <Select placeholder="Select Blockchain" bg="gray.700">
                        <option value="Kakarot">Kakarot</option>
                        <option value="Starknet">Starknet</option>
                    </Select>
                </Box>
                <Divider mb="4" />
                <Box>
                    <Box display="flex" gap="4" mb="4">
                        <Box>
                            <Text mb="2">Payout Token</Text>
                            <Select placeholder="Select Payout Token" bg="gray.700">
                                <option value="scxdot">$ETH</option>
                                <option value="anotherPayout">$STRK</option>
                            </Select>
                        </Box>
                        <Box>
                            <Text mb="2">Blockchain</Text>
                            <Select placeholder="Select Blockchain" bg="gray.700">
                                <option value="Kakarot">Kakarot</option>
                                <option value="Starknet">Starknet</option>
                            </Select>
                        </Box>
                        <Box>
                            <Text mb="2">Discount</Text>
                            <Select placeholder="Select Discount" bg="gray.700">
                                <option value="8">8%</option>
                                <option value="10">10%</option>
                            </Select>
                        </Box>
                        <Box>
                            <Text mb="2">Quantity</Text>
                            <input type="number" defaultValue={100000} style={{ padding: '8px', backgroundColor: 'gray.700', color: 'white', borderRadius: '5px', border: '1px solid gray' }} />
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
