import { v4 as uuidv4 } from 'uuid';

class Item {
    private _id: string;
    private _name: string;
    private _price: number;
    private _description: string;

    constructor(name: string, price: number, description: string) {
        this._id = uuidv4();
        this._name = name;
        this._price = price;
        this._description = description;
    }

    // Getters
    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    get description(): string {
        return this._description;
    }
}

class User {
    private _id: string;
    private _name: string;
    private _age: number;
    private _cart: Item[];

    constructor(name: string, age: number) {
        this._id = uuidv4();
        this._name = name;
        this._age = age;
        this._cart = [];
    }

    // Getters
    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get age(): number {
        return this._age;
    }

    get cart(): Item[] {
        return this._cart;
    }

    addToCart(item: Item): void {
        this._cart.push(item);
    }

    removeFromCart(item: Item): void {
        this._cart = this._cart.filter(cartItem => cartItem.id !== item.id);
    }

    removeQuantityFromCart(item: Item, quantity: number): void {
        let remainingQuantity = quantity;
        this._cart = this._cart.filter(cartItem => {
            if (cartItem.id === item.id && remainingQuantity > 0) {
                remainingQuantity--;
                return false;
            }
            return true;
        });
    }

    cartTotal(): number {
        return this._cart.reduce((total, item) => total + item.price, 0);
    }

    printCart(): void {
        console.log(`+-------------------------------------------------+`);
        console.log(`|                     Receipt                     |`);
        console.log(`+----------------------+--------------------------+`);
        console.log(`| Item                 | Price per Unit           |`);
        console.log(`+----------------------+--------------------------+`);
        this._cart.forEach(item => {
            console.log(`| ${item.name.padEnd(20)} | $${item.price.toFixed(2).padStart(10)} |`);
            console.log(`| Quantity: ${1} x Price: $${item.price.toFixed(2).padStart(10)} = Total: $${(1 * item.price).toFixed(2).padStart(10)} |`);
            console.log(`+----------------------+--------------------------+`);
        });
        console.log(`+=================================================+`);
        console.log(`| Total                | $${this.cartTotal().toFixed(2).padStart(20)} |`);
        console.log(`+-------------------------------------------------+`);
    }

    
}

class Shop {
    private _items: Item[];

    constructor() {
        this._items = [];

        const lembas_bread = new Item(
            `Lembas Bread`,
            10,
            `A few bites of this elven waybread sustain a traveler for days. It’s lightweight, nutritious, and perfect for long journeys.`
        );
        const the_one_ring = new Item(
            `The One Ring`,
            100,
            `Grants the wearer invisibility and has absolutely no foreseen ill effects whatsoever.`
        );
        const hobbits_pipe = new Item(
            `Hobbit’s Pipe of Calm`,
            15,
            `Relaxing pipe`
        );

        this._items.push(lembas_bread, the_one_ring, hobbits_pipe);
    }

    get items(): Item[] {
        return this._items;
    }

    addItem(item: Item): void {
        this._items.push(item);
    }

    removeItem(item: Item): void {
        this._items = this._items.filter(shopItem => shopItem.id !== item.id);
    }

    printItems(): void {
        console.log(`+#############################################+`);
        console.log(`|                    Shop                     |`);
        console.log(`+---------------------------------------------+`);
        console.log(`| Item                  | Price               |`);
        console.log(`+---------------------------------------------+`);
        this._items.forEach(item => {
            console.log(`| ${item.name.padEnd(22)} | $${item.price.toFixed(2).padStart(10)} |`);
        });
        console.log(`+#############################################+`);
    }
}




console.log(`#`.repeat(77));
console.log(`Hello There! ~General Kenobi~`);
console.log(`#`.repeat(77));
console.log(`#`.repeat(77));

const eriador = new Shop();
const bilbo = new User(`Bilbo Baggins`, 77);

console.table(eriador.items);
console.table(bilbo.cart);

bilbo.addToCart(eriador.items[0]);
bilbo.addToCart(eriador.items[1]);
bilbo.addToCart(eriador.items[2]);

console.log(`#`.repeat(77));

// console.table(bilbo.cart);
bilbo.printCart();




