export default function runApp() {
    /** your code goes here */
    function getMorePics() {
        const loadingMsg = document.createTextNode("loading...");
        loadingMsg.id = "loading";
        const output = document.getElementById("output");
        const url = "https://picsum.photos/200/300/?random";
        for(let i = 0; i < 5; i++) {
            output.appendChild(loadingMsg);
            fetch(url)
                .then(response => {
                    if (response.status == 200) {
                        const image = document.getElementById(`img-${i + 1}`);
                        if (image) {
                            image.src = response.url;
                        } else {
                            const image = document.createElement("IMG");
                            const imgDiv = document.createElement("DIV");
    
                            image.id = `img-${i + 1}`;
                            imgDiv.id = `img-div-${i}`;
                            imgDiv.className = "img-post";
                            image.src = response.url;
                            imgDiv.append(image);
                            output.append(imgDiv);
                        }
                        output.removeChild(loadingMsg);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
    
    const button = document.getElementById("more");
    button.addEventListener("click", getMorePics);
}