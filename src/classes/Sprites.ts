class Sprites
 {
    private readonly backDefault: string;
    private readonly backFemale: string;
    private readonly backShiny: string;
    private readonly backShinyFemale: string;
    private readonly frontDefault: string;
    private readonly frontFemale: string;
    private readonly frontShiny: string;
    private readonly frontShinyFemale: string;
    private readonly showdown: {
        backDefault: string
        backFemale: string
        backShiny: string;
		backShinyFemale: string;
		frontDefault: string;
		frontFemale: string;
		frontShiny: string;
		frontShinyFemale: string;
    };

    constructor(
        backDefault: string,
        backFemale: string,
        backShiny: string,
        backShinyFemale: string,
        frontDefault: string,
        frontFemale: string,
        frontShiny: string,
        frontShinyFemale: string,
        showdown: {
            backDefault: string,
            backFemale: string,
            backShiny: string,
            backShinyFemale: string,
            frontDefault: string,
            frontFemale: string,
            frontShiny: string,
            frontShinyFemale: string
        }
    ){
        this.backDefault = backDefault;
        this.backFemale = backFemale;
        this.backShiny = backShiny;
        this.backShinyFemale = backShinyFemale;
        this.frontDefault = frontDefault;
        this.frontFemale = frontFemale;
        this.frontShiny = frontShiny;
        this.frontShinyFemale = frontShinyFemale;
        this.showdown = showdown;
    }
}

 export default Sprites;