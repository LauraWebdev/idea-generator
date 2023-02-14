import {TTestElement} from './elements';
import DefaultElements from './elements';

export interface TTest {
    rooms: TTestRoom[];
}

export interface TTestRoom {
    elements: TTestElement[];
}

export class Test {
    elementsToUse: TTestElement[];
    optionRooms: number;
    optionElementsPerRoom: number;
    rooms: TTestRoom[];
    
    constructor() {
        this.elementsToUse = [...DefaultElements];
        this.optionRooms = 1;
        this.optionElementsPerRoom = 3;
        this.rooms = [];
    }
    
    generate(_elementsToUse: TTestElement[], _optionRooms: number, _optionElementsPerRoom: number) : TTest {
        this.elementsToUse = _elementsToUse;
        this.optionRooms = _optionRooms;
        this.optionElementsPerRoom = _optionElementsPerRoom;
        this.rooms = [];

        for(let roomIndex = 0; roomIndex < this.optionRooms; roomIndex++) {
            const room = new Room();
            this.rooms.push(room.generate(this.elementsToUse, this.optionElementsPerRoom));
        }

        return {
            rooms: this.rooms,
        } as TTest;
    }
}

export class Room {
    elementsToUse: TTestElement[];
    optionElementsPerRoom: number;
    elements: TTestElement[];

    constructor() {
        this.elementsToUse = [...DefaultElements];
        this.optionElementsPerRoom = 3;
        this.elements = [];
    }

    generate(_elementsToUse: TTestElement[], _optionElementsPerRoom: number): TTestRoom {
        this.elementsToUse = _elementsToUse;
        this.optionElementsPerRoom = _optionElementsPerRoom;
        this.elements = [];

        for(let elementIndex = 0; elementIndex < this.optionElementsPerRoom; elementIndex++) {
            const element = this.elementsToUse[Math.floor(Math.random() * this.elementsToUse.length)];

            if(!this.elements.some(r => element.dependsOn.includes(r.key))) {
                const randomElementDependencyKey = element.dependsOn[Math.floor(Math.random() * element.dependsOn.length)];
                const randomElementDependency = this.elementsToUse.find(x => x.key === randomElementDependencyKey);

                if(randomElementDependency)
                    this.elements.push(randomElementDependency);
            }

            this.elements.push(element);
        }

        return {
            elements: this.elements,
        } as TTestRoom;
    }
}