export default function runApp() {
    /** your code goes here */
    function appentElement(parent, child) {
        return parent.appendChild(child);
    }
    const url = "https://jsonplaceholder.typicode.com/users";
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const output = document.getElementById("output");
            return data.map((user) => {
                const name = user.name;
                const companyCatchPhrase = user.company.catchPhrase;
                const divEle = document.createElement("DIV");
                const h2Header = document.createElement("H2");
                const sentence = document.createElement("P");

                divEle.className = "user";
                h2Header.innerText = name;
                sentence.innerText = companyCatchPhrase;
                appentElement(divEle, h2Header);
                appentElement(divEle, sentence);
                appentElement(output, divEle);
            });
        })
        .catch((error) => {
            console.log(error);
        })
        
}