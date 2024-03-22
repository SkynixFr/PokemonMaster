class Item {
    private readonly name: string;
    private readonly description: string;
    private readonly image: string;

    constructor(name: string, description: string, image: string) {
        this.name = name;
        this.description = description;
        this.image = image;
    }
}

export default Item;