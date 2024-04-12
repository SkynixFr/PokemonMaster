const fs = require('fs');

// Chemin du fichier où vous souhaitez ajouter les lignes
const filePath = 'pokemonImgByPokemonId.ts';

// Fonction pour générer le code des lignes jusqu'au numéro spécifié
function generatePokemonImgLines(start, end) {
	let lines = '';
	for (let i = start; i <= end; i++) {
		lines += `'${i}': '/images/pokemons/${i.toString().padStart(3, '0')}.png',\n`;
	}
	return lines;
}

// Numéro de départ et numéro final
const startNumber = 1; // Le prochain numéro après le dernier dans votre fichier actuel
const endNumber = 905;

// Génération des lignes
const linesToAdd = generatePokemonImgLines(startNumber, endNumber);

// Lecture du contenu actuel du fichier
fs.readFile(filePath, 'utf8', (err, data) => {
	if (err) {
		console.error('Erreur lors de la lecture du fichier :', err);
		return;
	}

	// Trouver l'emplacement où ajouter les lignes
	const insertIndex = data.indexOf('};') - 1;

	// Insérer les lignes générées dans le contenu du fichier
	const newData = `${data.slice(0, insertIndex)}\n${linesToAdd}${data.slice(insertIndex)}`;

	// Écrire le nouveau contenu dans le fichier
	fs.writeFile(filePath, newData, 'utf8', err => {
		if (err) {
			console.error("Erreur lors de l'écriture dans le fichier :", err);
			return;
		}
		console.log(`Lignes ajoutées avec succès jusqu'au numéro ${endNumber}.`);
	});
});
