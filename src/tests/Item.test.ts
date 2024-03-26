import Item from "../classes/Item";
import ItemBuilder from "./utils/ItemBuilder";

describe('Item', () => {
    let name: string;
    let description: string;
    let image: string;
    let item: Item;

    beforeEach(() => {
        name = 'Potion';
        description = 'Restores 20 HP';
        image = 'potion.png';
        item = new Item(name, description, image);
    });

    test('should use the item correctly', () => {
        item.use();
        expect(item).toStrictEqual(
            new ItemBuilder()
                .withName('Potion')
                .withDescription('Restores 20 HP')
                .withImage('potion.png')
                .withUsed(true)
                .build()
        );
    });
});