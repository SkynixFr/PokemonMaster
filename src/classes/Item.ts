class Item {
    private readonly name: string;
    private readonly description: string;
    private readonly image: string;
    private used?: boolean;

    constructor(name: string, description: string, image: string, used?: boolean) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.used = used;
    }

    use(): void{
        this.used = true;
    }
}

export default Item;