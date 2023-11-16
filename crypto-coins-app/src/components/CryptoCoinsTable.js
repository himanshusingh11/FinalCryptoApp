import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CryptoCoinsTable() {
  const [coinsData, setCoinsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage] = useState(10);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/coins');
//         setCoinsData(response.data || []);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);


useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/coins');
        setCoinsData(response.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 240000); // Call fetchData every 4 minutes (4 * 60 * 1000 milliseconds)

    return () => clearInterval(interval); // Clear the interval on component unmount

  }, []);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredCoins = coinsData.filter((coin) =>
    coin.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = filteredCoins.slice(
    indexOfFirstCoin,
    indexOfLastCoin
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <Form.Group>
            <Form.Label>Search Coin</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by coin name..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </Form.Group>
        </div>
        <div className="col-md-9">
          <h1>Crypto Coins Data</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Trade Volume (1hr USD)</th>
              </tr>
            </thead>
            <tbody>
              {currentCoins.map((coin) => (
                <tr key={coin.exchange_id}>
                  <td>{coin.name}</td>
                  <td>{coin.volume_1hrs_usd}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            />
            <Pagination.Item active>{currentPage}</Pagination.Item>
            <Pagination.Next
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={indexOfLastCoin >= filteredCoins.length}
            />
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default CryptoCoinsTable;

