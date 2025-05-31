class Tix {
    constructor() {
        this.hoursTensElement = document.querySelector('#hoursTens');
        this.hoursUnitElement = document.querySelector('#hoursUnits');
        this.minutesTensElement = document.querySelector('#minutesTens');
        this.minutesUnitElement = document.querySelector('#minutesUnits');
        this.timePrompt = document.querySelector('#current-time');

        setInterval(() => this.updatePromptTime(), 1000);
        setInterval(() => this.showTime(), 5000);
        this.showTime();
        this.updatePromptTime();
    }

    updatePromptTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        this.timePrompt.textContent = `${hours}:${minutes}`;
    }

    flashDigit(element, digit) {
        const segmentsCount = getComputedStyle(element).getPropertyValue("--segments");
        const segments = this.randomSegments(segmentsCount, digit);
        this.flashElement(element, segments);
    }

    flashElement(element, segments) {
        const segmentElements = element.children;
        for (let i = 0, j = 1; i < segmentElements.length; i++, j *= 2) {
            segmentElements[i].style.backgroundColor = (segments & j) > 0 ? element.dataset.color : 'inherit';
        }
    }

    showTime() {
        const time = new Date();
        const minutesUnits = time.getMinutes() % 10;
        const minutesTens = (time.getMinutes() - minutesUnits) / 10;
        const hoursUnits = time.getHours() % 10;
        const hoursTens = (time.getHours() - hoursUnits) / 10;
        this.flashDigit(this.hoursTensElement, hoursTens);
        this.flashDigit(this.hoursUnitElement, hoursUnits);
        this.flashDigit(this.minutesTensElement, minutesTens);
        this.flashDigit(this.minutesUnitElement, minutesUnits);
    }

    static twoPower = [1, 2, 4, 8, 16, 32, 64, 128, 256];

    randomSegments(capacity, digit) {
        let result = 0;
        let segments = Tix.twoPower.slice(0, capacity);
        for (let i = 0; i < digit; i++) {
            const index = Math.floor(Math.random() * segments.length);
            result += segments.splice(index, 1)[0];
        }
        return result;
    }
}

new Tix();

