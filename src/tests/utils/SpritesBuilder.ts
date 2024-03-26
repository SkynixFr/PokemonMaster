import Sprites from "../../classes/Sprites";

class SpritesBuilder {
    private backDefault: string;
    private backFemale: string;
    private backShiny: string;
    private backShinyFemale: string;
    private frontDefault: string;
    private frontFemale: string;
    private frontShiny: string;
    private frontShinyFemale: string;
    private showdown: {
        backDefault: string,
        backFemale: string,
        backShiny: string,
        backShinyFemale: string,
        frontDefault: string,
        frontFemale: string,
        frontShiny: string,
        frontShinyFemale: string
    };

    default(): Sprites {
        return new SpritesBuilder().build()
    }

    build(): Sprites {
        return new Sprites(
            this.backDefault,
            this.backFemale,
            this.backShiny,
            this.backShinyFemale,
            this.frontDefault,
            this.frontFemale,
            this.frontShiny,
            this.frontShinyFemale,
            this.showdown
        );
    }

    withBackDefault(backDefault: string): SpritesBuilder {
        this.backDefault = backDefault;
        return this;
    }

    withBackFemale(backFemale: string): SpritesBuilder {
        this.backFemale = backFemale;
        return this;
    }

    withBackShiny(backShiny: string): SpritesBuilder {
        this.backShiny = backShiny;
        return this;
    }

    withBackShinyFemale(backShinyFemale: string): SpritesBuilder {
        this.backShinyFemale = backShinyFemale;
        return this;
    }

    withFrontDefault(frontDefault: string): SpritesBuilder {
        this.frontDefault = frontDefault;
        return this;
    }

    withFrontFemale(frontFemale: string): SpritesBuilder {
        this.frontFemale = frontFemale;
        return this;
    }

    withFrontShiny(frontShiny: string): SpritesBuilder {
        this.frontShiny = frontShiny;
        return this;
    }

    withFrontShinyFemale(frontShiny: string): SpritesBuilder {
        this.frontShinyFemale = frontShiny;
        return this;
    }

    withShowdown(showdown: {
        backDefault: string,
        backFemale: string,
        backShiny: string,
        backShinyFemale: string,
        frontDefault: string,
        frontFemale: string,
        frontShiny: string,
        frontShinyFemale: string
    }): SpritesBuilder {
        this.showdown = showdown;
        return this;
    }
}

export default SpritesBuilder;