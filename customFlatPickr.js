const monthAz = 5;

const startDate = new Date();
let month = startDate.getMonth();
let year = startDate.getFullYear();

const endDate = new Date(year, month + monthAz, 0);

const currentDateAsString = year + "-" + (month + 1) + "-" + startDate.getDate();
const endDateAsString = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();

let feiertageList = [];
getFeiertage(year);

if (year !== endDate.getFullYear()) {
    getFeiertage(endDate.getFullYear());
}

const saturdays = getSaturdays(month, year, monthAz);
createFlatPickr(currentDateAsString, endDateAsString, saturdays);

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
                let month = getFormattedMonth(date);
                let day = getFormattedDay(date);

                const currentDate = date.getFullYear() + "-" + month + "-" + day;

                return date.getDay() === 0 || feiertageList.includes(currentDate);
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
                let month = getFormattedMonth(newDate);
                let day = getFormattedDay(newDate);

                const dateAsString = newDate.getFullYear() + "-" + month + "-" + day;

                saturdays["table"][dateAsString] = {};
                saturdays["table"][dateAsString]["minTime"] = "10:00";
                saturdays["table"][dateAsString]["maxTime"] = "16:00";
            }
        }
    }

    return saturdays;
}

async function getFeiertage(year) {
    const url = "https://ipty.de/feiertag/api.php?do=getFeiertage&loc=NW&outformat=Y-m-d&jahr=" + year;

    let feiertage = await getJsonResponse(url);

    feiertage.forEach(feiertag => {
        feiertageList.push(feiertag.date)
    })
}

async function getJsonResponse(url) {
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

function getFormattedDay(date) {
    let day = "0";

    if (date.getDate() < 10) {
        return day + date.getDate();
    }

    return date.getDate();
}

function getFormattedMonth(date) {
    let month = "0";

    if (date.getMonth() + 1 < 10) {
        return month + (date.getMonth() + 1);
    }

    return (date.getMonth() + 1);
}