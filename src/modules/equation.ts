import { random} from "lodash";

export class Equation {
    private a: number;
    private b: number;
    private operator: string;

    constructor() {
        this.generate();
    }

    generate() {
        this.operator = "+-*/"[random(0, 3)];

        if ("+*".includes(this.operator)) {
            this.a = random(0, 9);
            this.b = random(0, 9);
        } else if (this.operator === "-") {
            this.a = random(0, 9);
            this.b = random(0, this.a);
        } else if (this.operator === "/") {
            this.b = random(1, 9);
            this.a = random(0, 9) * this.b;
        }
    }

    getCorrectAnswer() {
        return eval(`${this.a}${this.operator}${this.b}`);
    }

    getLateX(): string {
        switch(this.operator) {
            case "+":
            case "-":
                return `$${this.a} ${this.operator} ${this.b} = ?$`;

            case "*":
                return `$${this.a} \\times ${this.b} = ?$`;

            case "/":
                return `$\\frac{${this.a}}{${this.b}} = ?$`;

            default: return "?";
        }
    }
}