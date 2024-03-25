import Item from "../../classes/Item";

class ItemBuilder {
    private name: string;
    private description: string;
    private image: string;

    default(): Item {
        return new ItemBuilder().build()
    }

    build(): Item {
        return new Item(this.name, this.description, this.image);
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
}