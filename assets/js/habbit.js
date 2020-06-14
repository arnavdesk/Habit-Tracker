(function () {

    const daysList = document.getElementById("item-list");
    const url = new URL(window.location.href);
    const habbitId = url.searchParams.get("id");
    const startDate = document.getElementById("start-date");
    const endDate = document.getElementById("end-date");
    const filterBtn = document.getElementById("filter")
    let currentDate;
    let sixtyDaysBefore;
    // console.log(habbitId);


    function SetMinMaxDateOnDatePicker() {
        currentDate = moment().format('YYYY-MM-DD');
        sixtyDaysBefore = moment(currentDate).subtract(60, 'days').format('YYYY-MM-DD');
        // console.log(sixtyDaysBefore);
        startDate.setAttribute("max", currentDate)
        endDate.setAttribute("max", currentDate);
        startDate.setAttribute("min", sixtyDaysBefore)
        endDate.setAttribute("min", sixtyDaysBefore);
        startDate.value = moment(currentDate).subtract(6, 'days').format('YYYY-MM-DD');
        endDate.value = currentDate;
    }

    SetMinMaxDateOnDatePicker();


    const updateThisDateInDb = async function (date, value) {
        const res = await fetch(`/update-db-date?id=${habbitId}&date=${date}&value=${value}`)
        const data = await res.json();
        // console.log(data);
    }



    const renderDaysList = function (count, recordTracker, endDate) {
        let i = 0;
        // const currentDate = moment().format('YYYY-MM-DD');
        while (i <= count) {
            const fromattedDate = moment(endDate).subtract(i, 'days').format('LL');
            const date = moment(endDate).subtract(i, 'days').valueOf() + "";
            const listElement = document.createElement("li");
            listElement.setAttribute("class", "list-item");
            listElement.setAttribute("id", date);

            const dateDiv = document.createElement("div");
            dateDiv.setAttribute("class", "date-div");
            dateDiv.innerHTML = fromattedDate;

            const statusDiv = document.createElement("div");
            statusDiv.setAttribute("class", "status");

            if (date in recordTracker) {
                // console.log(date + "  " + recordTracker[date])
                if (recordTracker[date] == '0') {
                    statusDiv.style.backgroundColor = "red";
                }
                else if (recordTracker[date] == '1') {
                    statusDiv.style.backgroundColor = "green";
                }
                else if (recordTracker[date] == '-1') {
                    statusDiv.style.backgroundColor = "gray";
                }
            }
            else {
                statusDiv.style.backgroundColor = "gray";
            }



            listElement.onclick = function () {
                let value = 0;
                if (statusDiv.style.backgroundColor == "gray") {
                    statusDiv.style.backgroundColor = "green"
                    value = '1';
                }
                else if (statusDiv.style.backgroundColor == "green") {
                    statusDiv.style.backgroundColor = "red"
                    value = '0';
                }
                else if (statusDiv.style.backgroundColor == "red") {
                    statusDiv.style.backgroundColor = "gray"
                    value = '-1';
                }
                updateThisDateInDb(date, value);
            }

            listElement.appendChild(dateDiv);
            listElement.appendChild(statusDiv);

            daysList.appendChild(listElement);
            i++;
        }
    }

    const fetchFromDB = async function (id) {
        const res = await fetch("/find-habbit?id=" + id);
        const data = await res.json();
        return data;
    }

    const renderOnLoad = async function (days, endDate) {
        const data = await fetchFromDB(habbitId);
        const recordTracker = data.record_tracker;
        // console.log(recordTracker);
        renderDaysList(days, recordTracker, endDate);
    }


    filterBtn.onclick = function () {
        let startDateMoment = moment(startDate.value);
        let endDateMoment = moment(endDate.value);
        let days = endDateMoment.diff(startDateMoment, 'days');
        if (days < 0) {
            alert("Start date cannot be greater than end date");
            return;
        }
        daysList.innerHTML = "";
        renderOnLoad(days, endDateMoment);
    }


    renderOnLoad(6, currentDate);

})();