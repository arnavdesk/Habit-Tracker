(function () {

    const daysList = document.getElementById("item-list");
    const url = new URL(window.location.href);
    const habbitId = url.searchParams.get("id");
    console.log(habbitId);


    const updateThisDateInDb = async function (date, value) {
        const res = await fetch(`/update-db-date?id=${habbitId}&date=${date}&value=${value}`)
        const data = await res.json();
        console.log(data);
    }



    const renderDaysList = function (count, recordTracker) {
        let i = 0;
        while (i <= count) {
            const date = moment().subtract(i, 'days').format('DD/MM/YY');
            const listElement = document.createElement("li");
            listElement.setAttribute("class", "list-item");
            listElement.setAttribute("id", date);

            const dateDiv = document.createElement("div");
            dateDiv.setAttribute("class", "date-div");
            dateDiv.innerHTML = date;

            const statusDiv = document.createElement("div");
            statusDiv.setAttribute("class", "status");

            if (date in recordTracker) {
                if (recordTracker[date] == 0) {
                    statusDiv.style.backgroundColor = "red";
                }
                else if (recordTracker[date] == 1) {
                    statusDiv.style.backgroundColor = "green";
                }
            }
            else {
                statusDiv.style.backgroundColor = "gray";
            }

            statusDiv.onclick = function () {
                let value = 0;
                console.log(this);
                if (this.style.backgroundColor == "gray") {
                    console.log("Hello")
                    this.style.backgroundColor = "green"
                    value = 1;
                }
                else if (this.style.backgroundColor == "green") {
                    console.log("Hello")
                    this.style.backgroundColor = "red"
                    value = 0;
                }
                else if (this.style.backgroundColor == "red") {
                    console.log("Hello")
                    this.style.backgroundColor = "gray"
                    value = -1;
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

    const renderOnLoad = async function () {
        const data = await fetchFromDB(habbitId);
        const recordTracker = data.record_tracker;
        console.log(recordTracker);
        renderDaysList(6, recordTracker);
    }



    renderOnLoad();

})();