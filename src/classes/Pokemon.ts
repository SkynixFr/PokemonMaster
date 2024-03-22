import Type from './Type';
import Move from './Move';
import Stats from './Stats';
import Ability from './Ability';
import Item from './Item';
import Sprites from './Sprites';

class Pokemon {
    private readonly name: string;
    private readonly id: number;
    private readonly types: Type[];
    private readonly stats: Stats;
    private readonly nature?: string;
    private readonly level?: number;
    private readonly gender?: string;
    private readonly isShiny?: boolean;
    private readonly moves?: Move[];
    private readonly ability?: Ability;
    private readonly item?: Item;
    private readonly sprites?: Sprites;

    constructor(name: string, id: number, types: Type[], stats: Stats, nature?: string, level?: number, gender?: string, isShiny?: boolean, moves?: Move[], ability?: Ability, item?: Item, sprites?: Sprites) {
        this.name = name;
        this.nature = nature;
        this.level = level;
        this.id = id;
        this.gender = gender;
        this.isShiny = isShiny;
        this.types = types;
        this.moves = moves;
        this.stats = stats;
        this.ability = ability;
        this.item = item;
        this.sprites = sprites;        
    }
}

export default Pokemon;