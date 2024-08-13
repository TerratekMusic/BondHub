// src/components/pages/Marketplace.tsx
import React from 'react';

const Marketplace: React.FC = () => {
  const markets = [
    { id: 1, name: "X Token", price: "SXXX", ecosystem: "Kakarot", discount: "X%", vesting: "7 days" },
    { id: 2, name: "Ekubo", price: "SXXX", ecosystem: "Starknet", discount: "X%", vesting: "15 days" }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Live markets</h2>
      <table style={{ width: '100%', backgroundColor: 'black', color: 'white', textAlign: 'center', borderRadius: '10px' }}>
        <thead>
          <tr>
            <th>Bond</th>
            <th>Bond Price</th>
            <th>Ecosystem</th>
            <th>Discount</th>
            <th>Vesting</th>
            <th></th> {/* For the view more button */}
          </tr>
        </thead>
        <tbody>
          {markets.map(market => (
            <tr key={market.id}>
              <td>{market.name}</td>
              <td>{market.price}</td>
              <td>{market.ecosystem}</td>
              <td>{market.discount}</td>
              <td>{market.vesting}</td>
              <td><button style={{ padding: '5px 10px', borderRadius: '5px', color: 'black' }}>View more</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Marketplace;
