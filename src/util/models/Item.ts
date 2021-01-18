export class Item {

    id: number;
    name: string;
    description: string;
    done: boolean;
    qtd: number;
    value: number;

    constructor(name: string, description: string, value: number) {
        this.id = Date.now();
        this.name = name;
        this.description = description
        this.done = false;
        this.qtd = 1;
        this.value = value;
    }
}