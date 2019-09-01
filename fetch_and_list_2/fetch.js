export default function runApp() {
    /** your code goes here */
    function appendElement(parent, child) {
        return parent.appendChild(child);
    }
    const urlUsers = "https://jsonplaceholder.typicode.com/users";
    const urlPosts = "https://jsonplaceholder.typicode.com/posts";
    fetch(urlUsers)
        .then(response => response.json())
        .then((users) => {
            const output = document.getElementById("output");
            return users.map((user) => {
                const name = user.name;
                const companyCatchPhrase = user.company.catchPhrase;
                const divEle = document.createElement("DIV");
                const h2Header = document.createElement("H2");
                const sentence = document.createElement("P");
                const postsList = document.createElement("UL");

                divEle.className = "user";
                postsList.id = `user${user.id}`;
                postsList.className = "posts";
                h2Header.innerText = name;
                sentence.innerText = companyCatchPhrase;
                appendElement(divEle, h2Header);
                appendElement(divEle, sentence);
                appendElement(divEle, postsList);
                appendElement(output, divEle);
            });
        })
        .catch((error) => {
            console.log(error);
        })
    fetch(urlPosts)
        .then(response => response.json())
        .then((posts) => {
            return posts.map((post) => {
                const userId = post.userId;
                const postId = post.id;
                const userPosts = document.getElementById(`user${userId}`);
                const postTitle = post.title;
                const postElement = document.createElement("LI");

                postElement.className = "post";
                postElement.innerText = postTitle;
                userPosts.appendChild(postElement);
            });
        })
        .catch((error) => {
            console.log(error);
        })
}