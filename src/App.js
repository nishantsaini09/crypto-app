import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";

function App() {

// Setting up the initial states using
// react hook 'useState'
const [search, setSearch] = useState("");
const [crypto, setCrypto] = useState([]);

// Fetching crypto data from the API only
// once when the component is mounted
useEffect(() => {
	Axios.get(
`https://api.coinstats.app/public/v1/coins?skip=0&limit=100&currency=INR`

	).then((res) => {
	setCrypto(res.data.coins);
	});
}, []);

return (
	<div className="App">
	<h1>All Cryptocurrencies</h1>
	<input
		type="text"
		placeholder="Search..."
		onChange={(e) => {
		setSearch(e.target.value);
		}}
	/>
	<table>
		<thead>
		<tr>
			<td>Rank</td>
			<td>Name</td>
			<td>Symbol</td>
			<td>Market Cap</td>
			<td>Price</td>
			<td>Available Supply</td>
			<td>Volume(24hrs)</td>
		</tr>
		</thead>
		{/* Mapping all the cryptos */}
		<tbody>
		{/* Filtering to check for the searched crypto */}
		{crypto
			.filter((val) => {
			return val.name.toLowerCase().includes(search.toLowerCase());
			})
			.map((val, id) => {
				console.log(val);
				const {rank,websiteUrl,icon,name,symbol,marketCap,price
				,availableSupply,volume} =val;
			return (
				<>
				<tr id={id}>
					<td className="rank">{rank}</td>
					<td className="logo">
					<a href={websiteUrl}>
						<img src={icon} alt="logo" width="30px" />
					</a>
					
					<p>{name}</p>

					</td>
					<td className="symbol">{symbol}</td>
					<td>₹{marketCap}</td>
					<td>₹{price.toFixed(2)}</td>
					<td>{availableSupply}</td>
					<td>{volume === null ? volume : volume.toFixed()}</td>
				</tr>
				</>
			);
			})}
		</tbody>
	</table>
	</div>
);
}

export default App;
