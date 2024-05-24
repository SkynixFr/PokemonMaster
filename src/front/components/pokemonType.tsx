// Components
import CustomImage from './customImage';

// Interfaces
import { TypeEntity } from '../../interfaces/pokemon/type/typeEntity';
interface PokemonTypeProps {
	types: TypeEntity[];
}

const PokemonType = ({ types }: PokemonTypeProps) => {
	return types.map(type => (
		<div key={type.name} className={`type ${type.name}`}>
			{/*<CustomImage*/}
			{/*	src={`/images/types/${type.name}.png`}*/}
			{/*	alt={`pokemon type ${type.name}`}*/}
			{/*	width={20}*/}
			{/*	height={20}*/}
			{/*	sizes={'(max-width: 768px) 25px, 25px'}*/}
			{/*/>*/}
			{type.name.toUpperCase()}
		</div>
	));
};

export default PokemonType;
