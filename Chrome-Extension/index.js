const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-id");
const ulEl = document.getElementById("unord-list");
const tabBtn = document.getElementById("tab-btn");
const usersFromLS = JSON.parse(localStorage.getItem("myUsers"));
const deleteBtn = document.getElementById("delete-btn");
let myLeads = [];

// if there are already something in the local storage then grab them and display.
if (usersFromLS) {
    myLeads = usersFromLS;
    render(myLeads);
}

// or the calling of the function can be done this way as well.
// inputBtn.addEventListener("click", function () {
//     console.log("clicked from the event listener.");
// })
inputBtn.addEventListener("click", () => {
    let data = inputEl.value;

    if (data.length != 0) {
        if (!data.startsWith("https://")) {
            data = "https://" + data;
        }
    }
    myLeads.push(data);
    inputEl.value = "";
    // since the data stored goes on refreshing the page. so store that in the localStorage.
    localStorage.setItem("myUsers", JSON.stringify(myLeads));
    render(myLeads);
});

tabBtn.addEventListener("click", () => {

    // this is the way to fetch the url of the current tab in chrome.
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // tabs[0].url holds the url of the current active tab in the current window.
        myLeads.push(tabs[0].url);
        localStorage.setItem("myUsers", JSON.stringify(myLeads));
        render(myLeads);
    });

});


deleteBtn.addEventListener("dblclick", () => {
    myLeads = [];
    localStorage.clear();
    // since the data in the myLeads is empty so rendering the myLeads will result in empty dom.
    render(myLeads);
});


function render(leads) {
    let listItems = "";
    // rendering all the data in the unordered list
    for (let i = 0; i < leads.length; i++) {
        // this is normal string.
        // listItems += "<li><a href='#', target = '_blank'>" + myLeads[i] + "</a></li>";
        // this is a template string.
        listItems +=
            `<li>
                <a href='${leads[i]}', target = '_blank'>
                    ${leads[i]}
                </a>
            </li>`;
    }
    ulEl.innerHTML = listItems;
}


