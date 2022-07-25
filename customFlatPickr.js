const monthAz = 7;

const startDate = new Date();
let month = startDate.getMonth();
let year = startDate.getFullYear();

const endDate = new Date(year, month + monthAz, 0);

const currentDateAsString = year + "-" + (month + 1) + "-" + startDate.getDate();
const endDateAsString = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();

console.log("Start Date: " + currentDateAsString)
console.log("End Date: " + endDateAsString)

const saturdays = getSaturdays(month, year, monthAz);
createFlatPickr(currentDateAsString, endDateAsString, saturdays);

console.log(saturdays)

function createFlatPickr(currentDateAsString, endDateAsString, saturdays) {
    const config = {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        altInput: true,
        altFormat: "d.m.Y H:i",
        defaultDate: currentDateAsString + "T10:00",
        minDate: currentDateAsString,
        maxDate: endDateAsString,
        time_24hr: true,
        minuteIncrement: 30,
        "disable": [
            function (date) {
                return date.getDay() === 0;
            }
        ],
        "locale": {
            "firstDayOfWeek": 1
        },
        plugins: [
            new minMaxTimePlugin(saturdays)
        ],
        minTime: "10:00",
        maxTime: "18:00",
    }

    flatpickr("input[type=datetime-local]", config);
}

function getSaturdays(month, year, monthAz) {
    let saturdays = {table: {}};

    for (var a = 0; a < monthAz; a++) {
        if (month > 10) {
            month = 0;
            year += 1;
        } else if (a !== 0) {
            month += 1;
        }

        let daysInMonth = new Date(year, month, 0).getDate() + 1; //+1 fixed bug in december 31, i dont know why

        for (var i = 1; i <= daysInMonth; i++) {
            var newDate = new Date(year, month, i)
            if (newDate.getDay() === 6) {
                let month = "0";
                let day = "0";

                if (newDate.getMonth() + 1 < 10) {
                    month += (newDate.getMonth() + 1);
                } else {
                    month = (newDate.getMonth() + 1);
                }

                if (newDate.getDate() < 10) {
                    day += newDate.getDate();
                } else {
                    day = newDate.getDate();
                }

                const dateAsString = newDate.getFullYear() + "-" + month + "-" + day;

                saturdays["table"][dateAsString] = {};
                saturdays["table"][dateAsString]["minTime"] = "10:00";
                saturdays["table"][dateAsString]["maxTime"] = "16:00";
            }
        }
    }

    return saturdays;
}