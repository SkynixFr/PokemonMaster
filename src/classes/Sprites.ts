class Sprites
 {
    private readonly back_default: string;
    private readonly back_female: string;
    private readonly back_shiny: string;
    private readonly back_shiny_female: string;
    private readonly front_default: string;
    private readonly front_female: string;
    private readonly front_shiny: string;
    private readonly front_shiny_female: string;
    private readonly showdown: {
        back_default: string
        back_female: string
        back_shiny: string;
		back_shiny_female: string;
		front_default: string;
		front_female: string;
		front_shiny: string;
		front_shiny_female: string;
    };

    constructor(
        back_default: string,
        back_female: string,
        back_shiny: string,
        back_shiny_female: string,
        front_default: string,
        front_female: string,
        front_shiny: string,
        front_shiny_female: string,
        showdown: {
            back_default: string
            back_female: string
            back_shiny: string;
            back_shiny_female: string;
            front_default: string;
            front_female: string;
            front_shiny: string;
            front_shiny_female: string;
        }
    ) {
        this.back_default = back_default;
        this.back_female = back_female;
        this.back_shiny = back_shiny;
        this.back_shiny_female = back_shiny_female;
        this.front_default = front_default;
        this.front_female = front_female;
        this.front_shiny = front_shiny;
        this.front_shiny_female = front_shiny_female;
        this.showdown = showdown;
    }
 }

 export default Sprites;