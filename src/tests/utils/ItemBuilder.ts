import Item from "../../classes/Item";

class ItemBuilder {
    private name: string;
    private description: string;
    private image: string;
    private used?: boolean;

    default(): Item {
        return new ItemBuilder().build()
    }

    build(): Item {
        return new Item(this.name, this.description, this.image, this.used);
    }

    withName(name: string): ItemBuilder {
        this.name = name;
        return this;
    }

    withDescription(description: string): ItemBuilder {
        this.description = description;
        return this;
    }

    withImage(image: string): ItemBuilder {
        this.image = image;
        return this;
    }

    withUsed(used: boolean): ItemBuilder {
        this.used = used;
        return this;
    }
}

export default ItemBuilder;