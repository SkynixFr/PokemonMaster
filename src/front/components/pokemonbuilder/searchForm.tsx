const searchForm = () => {
	return (
		<div className={'search-pokemons'}>
			<form action="">
				<input
					type="text"
					name="search"
					id="search"
					placeholder="Search pokemons"
				/>
				<button type="submit">Search</button>
				<select name="type" id="type" defaultValue="">
					<option value="">Type</option>
					<option value="fire">Fire</option>
					<option value="water">Water</option>
					<option value="grass">Grass</option>
					<option value="electric">Electric</option>
					<option value="rock">Rock</option>
					<option value="ground">Ground</option>
					<option value="flying">Flying</option>
					<option value="psychic">Psychic</option>
					<option value="ghost">Ghost</option>
					<option value="dark">Dark</option>
					<option value="steel">Steel</option>
					<option value="ice">Ice</option>
					<option value="dragon">Dragon</option>
					<option value="fairy">Fairy</option>
					<option value="fighting">Fighting</option>
					<option value="normal">Normal</option>
					<option value="bug">Bug</option>
					<option value="poison">Poison</option>
				</select>
				<select name="generation" id="generation" defaultValue="generation">
					<option value="generation">Generation</option>
					<option value="kanto">Kanto</option>
					<option value="johto">Johto</option>
					<option value="hoenn">Hoenn</option>
					<option value="sinnoh">Sinnoh</option>
					<option value="unova">Unova</option>
					<option value="kalos">Kalos</option>
					<option value="alola">Alola</option>
					<option value="galar">Galar</option>
				</select>
			</form>
		</div>
	);
};

export default searchForm;
