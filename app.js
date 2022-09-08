class DateMetodeElement extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.day = 0;
        this.month = 0;
        this.year = 0;
        this.monthName = 0;
        this.firstHashmap = new Map();
        this.secondHasmap = new Map([
            [1, "Januar"],
            [2, "Febuar"],
            [3, "Marts"],
            [4, "April"],
            [5, "Maj"],
            [6, "Juni"],
            [7, "Juli"],
            [8, "Agust"],
            [9, "September"],
            [10, "Oktober"],
            [11, "November"],
            [12, "December"]
        ]);
    }

    connectedCallback() {
        console.log("connected - DateMetode");

        this.day = parseInt(this.root.host.dataset.day);
        this.month = parseInt(this.root.host.dataset.month);
        this.year = parseInt(this.root.host.dataset.year);

        var dateForHuman = this.getDateForHuman();
        this.setToNextDate();
        var nextDateForHuman = this.getDateForHuman();

        this.root.appendChild(this.template());

        const dateNow = this.root.querySelector("[data-now]");
        dateNow.innerText = dateForHuman;

        const dateNext = this.root.querySelector("[data-next]");
        dateNext.innerText = nextDateForHuman;
    }

    template() {
        if (!DateMetodeElement.cachedTemplate) {
            const templateElement = document.createElement("template");
            templateElement.innerHTML = `
            <article>
                <div name="text1">Dagen efter ...</div>
                <div name="now" data-now>t</div>
                <div name="text2">... er ...</div>
                <div name="next" data-next>c</div>
            </article>
            `;
            DateMetodeElement.cachedTemplate = templateElement.content;
        }
        return DateMetodeElement.cachedTemplate.cloneNode(true);
    }

    // Funktion til tælle datoen en dag op
    setToNextDate() {
        this.day = this.day + 1;
        this.checkDayOverflow();
    }

    // Funktion returnere datoen
    getDateForHuman() {
        return this.day + "-" + this.secondHasmap.get(this.month) + "-" + this.year;
    }

    checkDayOverflow() {
        if (this.day > this.daysInMonth()) {
            this.day = 1;
            this.month = this.month + 1;
            this.monthName = this.monthName + 1;
            this.checkMonthOverflow();
        }
    }

    checkMonthOverflow() {
        if (this.month > 12) {
            this.month = 1;
            this.year = this.year + 1;
        }
    }

    daysInMonth() {
        var daysInMonth =
            [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var result = daysInMonth[this.month - 1];
        if (this.month == 2 && this.isLeapYear()) {
            result = result + 1;
        }
        return result;
    }

    isLeapYear() {
        return (this.divides(4, this.year) && !this.divides(100, this.year))
            || this.divides(400, this.year);
    }

    divides(a, b) {
        return b % a == 0;
    }

}

customElements.define("jarry-data-metode", DateMetodeElement);