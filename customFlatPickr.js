const date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

const currentDateAsString =  year + "-" + (month + 1) + "-" + date.getDate();
console.log(currentDateAsString)

let saturdays = {table: {}};

for (var a = 0; a < 4; a++) {
    if (month + a === 12) {
        month = 0;
        year += 1;
    } else {
        month += a;
    }

    daysInMonth = new Date(year, month, 0).getDate() + 1; //+1 fixed bug in december 31, i dont know why

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

            const dateAsString =  newDate.getFullYear() + "-" + month + "-" + day;
            console.log(dateAsString)

            saturdays["table"][dateAsString] = {};
            saturdays["table"][dateAsString]["minTime"] = "10:00";
            saturdays["table"][dateAsString]["maxTime"] = "16:00";
        }
    }
}

console.log(saturdays)

const config = {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    altInput: true,
    altFormat: "d.m.Y H:i",
    minDate: currentDateAsString,
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