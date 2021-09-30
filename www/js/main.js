const Tix = function () {
    function Tix() {
        const _this = this;
        this.hoursTensElement = document.querySelector('#hoursTens');
        this.hoursUnitElement = document.querySelector('#hoursUnits');
        this.minutesTensElement = document.querySelector('#minutesTens');
        this.minutesUnitElement = document.querySelector('#minutesUnits');

        setInterval(function () {
            return _this.showTime();
        }, 5000);

        this.showTime();
    }

    Tix.prototype.flashDigit = function (element, digit) {
        const segmentsCount = getComputedStyle(element).getPropertyValue("--segments");
        const segments = this.randomSegments(segmentsCount, digit);
        this.flashElement(element, segments);
    };

    Tix.prototype.flashElement = function (element, segments) {
        const segmentElements = element.children;
        for (let i = 0, j = 1; i < segmentElements.length; i++, j *= 2) {
            segmentElements[i].style.backgroundColor = (segments & j) > 0 ? element.dataset.color : 'inherit';
        }
    };

    Tix.prototype.showTime = function () {
        const time = new Date();
        const minutesUnits = time.getMinutes() % 10;
        const minutesTens = (time.getMinutes() - minutesUnits) / 10;
        const hoursUnits = time.getHours() % 10;
        const hoursTens = (time.getHours() - hoursUnits) / 10;
        this.flashDigit(this.hoursTensElement, hoursTens);
        this.flashDigit(this.hoursUnitElement, hoursUnits);
        this.flashDigit(this.minutesTensElement, minutesTens);
        this.flashDigit(this.minutesUnitElement, minutesUnits);
    };

    Tix.twoPower = [1, 2, 4, 8, 16, 32, 64, 128, 256];

    Tix.prototype.randomSegments = function (capacity, digit) {
        let result = 0;
        let segments = Tix.twoPower.slice(0, capacity);
        for (let i = 0; i < digit; i++) {
            const index = Math.floor(Math.random() * segments.length);
            result += segments.splice(index, 1)[0];
        }

        return result;
    };

    return Tix;
}();

new Tix();