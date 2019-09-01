export default function runApp() {
    /** your code goes here */
    // this part is borrowed from the web
    function loadJsonFile(callback) {
        const xObj = new XMLHttpRequest();
        xObj.overrideMimeType("application/json");
        xObj.open("GET", "planets.json", true);
        xObj.onreadystatechange = function() {
            if (xObj.readyState == 4 && xObj.status == "200") {
                callback(xObj.responseText);
            }
        };
        xObj.send(null);
    }

    loadJsonFile(function (response) {
        const fileContent = JSON.parse(response);
        // get all the tabs
        const tabs = document.getElementsByClassName("nav-link");
        for(let i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener("click", () => {
                const infoField = document.getElementById("information");
                let lastActive = document.getElementsByClassName("active");
                lastActive[0].className = "nav-link";
                tabs[i].className = "nav-link active";
                // console.log(fileContent[i]);
                let children = infoField.children;
                for(let j = 0; j < children.length; j++) {
                    // console.log(children[i]);
                    if(j === 0) {
                        children[j].innerText = fileContent[i].name;
                    } else if(j === 1) {
                        continue;
                    } else if (j === 2) {
                        children[j].innerText = fileContent[i].details;
                    } else {
                        children[j].innerText = "";
                        if(fileContent[i].summary.Discovery) {
                            // console.log(fileContent[i].summary.Discovery);
                            const li = document.createElement("LI");
                            li.innerHTML = "Discovery: ".bold() + fileContent[i].summary.Discovery;
                            children[j].appendChild(li);
                        }
                        // ['key'] when key contains space
                        if(fileContent[i].summary['Named for']) {
                            const li = document.createElement("LI");
                            li.innerHTML = "Named for: ".bold() + fileContent[i].summary['Named for'];
                            children[j].appendChild(li);
                        }
                        if(fileContent[i].summary.Diameter) {
                            const li = document.createElement("LI");
                            li.innerHTML = "Diameter: ".bold() + fileContent[i].summary.Diameter;
                            children[j].appendChild(li);
                        }

                        if(fileContent[i].summary.Orbit) {
                            const li = document.createElement("LI");
                            li.innerHTML = "Orbit: ".bold() + fileContent[i].summary.Orbit;
                            children[j].appendChild(li);
                        }
                        if(fileContent[i].summary.Day) {
                            const li = document.createElement("LI");
                            li.innerHTML = "Day: ".bold() + fileContent[i].summary.Day;
                            children[j].appendChild(li);
                        }
                    }
                }
            });
        }
    });
}