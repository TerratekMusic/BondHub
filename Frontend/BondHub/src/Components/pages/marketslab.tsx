// src/components/pages/Marketplace.tsx
import React from 'react';
import NavBar from '../navbar'; // Asegúrate de que la ruta de importación es correcta

const Marketplace: React.FC = () => {
    return (
        <div>
            <NavBar /> {/* Reutilización del NavBar en Marketplace */}
            <div style={{ padding: '20px' }}>
                <h2>Set up a bond market</h2>
                <div>
                    <label>
                        Project Token
                        <select>
                            <option value="swell">SWELL</option>
                            <option value="anotherToken">Another Token</option>
                        </select>
                    </label>
                    <label>
                        Blockchain
                        <select>
                            <option value="moonbeam">Moonbeam</option>
                            <option value="anotherBlockchain">Another Blockchain</option>
                        </select>
                    </label>
                </div>
                <hr />
                <div>
                    <h3>Payout Token | Blockchain | Discount | Quantity</h3>
                    <div>
                        <label>
                            Payout Token
                            <select>
                                <option value="scxdot">$xcDOT</option>
                                <option value="anotherPayout">Another Payout</option>
                            </select>
                        </label>
                        <label>
                            Blockchain
                            <select>
                                <option value="moonbeam">Moonbeam</option>
                                <option value="astar">Astar</option>
                            </select>
                        </label>
                        <label>
                            Discount
                            <select>
                                <option value="8">8%</option>
                                <option value="10">10%</option>
                            </select>
                        </label>
                        <label>
                            Quantity
                            <input type="number" defaultValue={100000} />
                        </label>
                        <button>Issue market</button>
                    </div>
                    <button>Add new market</button>
                </div>
            </div>
        </div>
    );
};

export default Marketplace;
