/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 *
 * Updated 2019.
 */

// import your own scripts here.

// your app must take an apiUrl as an argument --
// this will allow us to verify your apps behaviour with 
// different datasets.
function initApp(apiUrl) {
    // your app initialisation goes here
    /**
     * Code written by Maowen Zhou, z5166834, I understand the code below is some what hard to follow, but I just
     * wrote the code as my thoughts leaping.... it is kind of hard to make great changes to the structure, maybe with
     * more time, I can refine some parts of my code and come up with a more concise structure, I may need to plan better
     * in the future
     */
    // minor modification is needed
    function prepareLogIn() {
        const username = document.getElementById("log-in-username");
        const password = document.getElementById("log-in-password");
        
        
        // submit button is clicked
        const usrName = username.value;
        const psw = password.value;
        const url = 'http://127.0.0.1:5000/auth/login';
        const payload = {
            username: usrName,
            password: psw
        };
        const optional = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(payload)
        };
        
        
        if(! usrName) {
            alert("Please enter your username!");
        } else if(! psw) {
            alert("Please enter your password!");
        } else {
            fetch(url, optional)
                .then((response) => {
                    if(response.status === 403) {
                        throw "Invalid Username/Password";
                    } else if(response.status === 400) {
                        throw "Missing Username/Password";
                    } else if(response.status === 200) {
                        return response.json()
                    }
                })
                .then(data => {
                    // log in if ok is pressed, not otherwise
                    if(confirm("Successfully logged in!")) {
                        sessionStorage.setItem("logInFlag", "logged-in");
                        sessionStorage.setItem("logInUser", usrName);
                        // store token in response body in sessionStorage
                        sessionStorage.setItem("token", data.token);
                    }
                    // refresh web page to get private feed and posts
                    location.reload();
                })
                .catch(error => {
                    alert(`${error}`);
                    location.reload();
                })
        }
    }
    
    
    // create log in modal
    function createLogInModal() {
        // create a form to collect log in info
        let root = document.getElementById("root");
        let loginModal = document.createElement("DIV");
        let loginForm = document.createElement("DIV");
        let username = document.createElement("INPUT");
        let password = document.createElement("INPUT");
        let submitButton = document.createElement("BUTTON");
        let closeButton = document.createElement("SPAN");
        
    
        // username
        username.id = "log-in-username";
        username.type = "text";
        username.placeholder = "username";
        username.className = "modal-element";
        username.style.marginBottom = "10px";
        // password
        password.id = "log-in-password";
        password.type = "password";
        password.placeholder = "Password";
        password.className = "modal-element";
        password.style.marginBottom = "10px";
        // submit button
        submitButton.id = "log-in-submit";
        submitButton.innerText = "submit";
        // submitButton.style.display = "block";
        submitButton.className = "button-secondary modal-element";
        submitButton.style.marginBottom = "10px";
        
        // submit log in request
        submitButton.addEventListener("click", prepareLogIn);
        // cancel button
        // closeButton.id = "log-in-cancel";
        closeButton.innerText = "x";
        closeButton.className = "modal-close";
    
        closeButton.addEventListener("click", () => root.removeChild(loginModal));
    
    
        // log-in form
        loginForm.id = "log-in-form";
        loginForm.className = "modal-content";
        loginModal.style.display = "block";
        loginForm.appendChild(closeButton);
        loginForm.appendChild(username);
        loginForm.appendChild(password);
        loginForm.appendChild(submitButton);
        
        
        // log-in modal
        loginModal.id = "log-in-modal";
        loginModal.className = "modal";
        loginModal.appendChild(loginForm);
        root.appendChild(loginModal);
    }
    
    
    //
    function prepareSignUp() {
        const usrName = document.getElementById("sign-up-username").value;
        const realName = document.getElementById("sign-up-name").value;
        const email = document.getElementById("sign-up-email").value;
        const psw1 = document.getElementById("password-1").value;
        const psw2 = document.getElementById("password-2").value;
        const url = "http://127.0.0.1:5000/auth/signup";
        
        
        if(! usrName) {
            alert("Please enter a username!")
        }else if(! realName) {
            alert("Please enter your name!");
        }else if(! email) {
            alert("Please enter your email address!");
        }else if(! psw1) {
            alert("Please enter a password!");
        }else if(! psw2) {
            alert("Please enter your password again!");
        }else if(psw1 !== psw2) {
            alert("passwords do not match!");
        } else if(psw1 === psw2) {
            const payload = {
                username: usrName,
                email: email,
                password: psw1,
                name: realName
            };
            const optional = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify(payload)
            };
            
            
            fetch(url, optional)
                .then((response) => {
                    if(response.status === 200) {
                        return response.json()
                    } else if(response.status === 409) {
                        throw "Username Taken";
                    } else if(response.status === 400) {
                        throw "Malformed Request";
                    }
                })
                .then((data) => {
                    const token = data.token;
                    sessionStorage.setItem("token", token);
                    location.reload();
                })
                .catch(error => {
                    alert(`${error}`);
                    location.reload();
                })
        }
    }
    
    
    // create sign up modal
    function createSignUpModal() {
        
        
        // create a form to collect sign up info
        let root = document.getElementById("root");
        let signUpModal = document.createElement("DIV");
        let signUpForm = document.createElement("DIV");
        let username = document.createElement("INPUT");
        let name = document.createElement("INPUT");
        let emailAddr = document.createElement("INPUT");
        let password = document.createElement("INPUT");
        let verifyPassword = document.createElement("INPUT");
        let submitButton = document.createElement("BUTTON");
        let closeButton = document.createElement("SPAN");
        const br = document.createElement("BR");
    
    
        // username
        username.id = "sign-up-username";
        username.type = "text";
        username.placeholder = "username";
        username.className = "modal-element";
        username.style.marginBottom = "10px";
        username.style.marginTop = "10px";
    
        // name
        name.id = "sign-up-name";
        name.type = "text";
        name.placeholder = "name";
        name.className = "modal-element";
        name.style.marginBottom = "10px";
    
        // password
        emailAddr.id = "sign-up-email";
        emailAddr.type = "email";
        emailAddr.placeholder = "Email Address";
        emailAddr.className = "modal-element";
        emailAddr.style.marginBottom = "10px";
    
        // password
        password.id = "password-1";
        password.type = "password";
        password.placeholder = "Enter password";
        password.className = "modal-element";
        password.style.marginBottom = "10px";
    
        // verify password
        verifyPassword.id = "password-2";
        verifyPassword.type = "password";
        verifyPassword.placeholder = "Please verify password";
        verifyPassword.className = "modal-element";
        verifyPassword.style.marginBottom = "10px";
    
        // submit button
        submitButton.id = "sign-up-submit";
        submitButton.innerText = "submit";
        submitButton.className = "button-secondary modal-element";
        submitButton.addEventListener("click", prepareSignUp);
        submitButton.style.marginBottom = "10px";
    
        // cancel button
        closeButton.id = "sign-up-cancel";
        closeButton.innerText = "x";
        closeButton.className = "modal-close";
        closeButton.addEventListener("click", () => root.removeChild(signUpModal));
        closeButton.style.marginBottom = "10px";
    
        signUpForm.className = "modal-content";
        signUpModal.style.display = "block";
        signUpForm.appendChild(closeButton);
        signUpForm.appendChild(username);
        signUpForm.appendChild(name);
        signUpForm.appendChild(emailAddr);
        signUpForm.appendChild(password);
        signUpForm.append(verifyPassword);
        signUpForm.appendChild(br);
        signUpForm.appendChild(submitButton);
        
        
        
        signUpModal.id = "sign-up-modal";
        signUpModal.className = "modal";
        signUpModal.appendChild(signUpForm);
        root.appendChild(signUpModal);
    }
    
    
    // unix timestamp converter
    function unixTime2DateTime(unixTimeStamp) {
        
        // Months array
        const monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        // Convert timestamp to milliseconds
        const date = new Date(unixTimeStamp * 1000);
        // Year
        const year = date.getFullYear();
        // Month
        const month = monthArray[date.getMonth()];
        // Day
        const day = date.getDate();
        // Hours
        const hours = '0' + date.getHours();
        // Minutes
        const minutes = '0' + date.getMinutes();
        // Seconds
        const seconds = '0' + date.getSeconds();
        // formatted date
        return month + '-' + day + '-' + year + ' ' + hours.substr(-2)+ ':' + minutes.substr(-2) + ':' +
               seconds.substr(-2);
    }
    
    
    // was not able to implement
    function prepareSearch() {
        // console.log("search");
    }
    
    
    // create a modal containing up voters
    async function upVotersModal(postObject, mode) {
        let root = document.getElementById("root");
        // there has been a modal
        if(document.getElementById(`voters-${postObject.id}-modal`)) {
            // no change to voters list, just display it
            if(mode === "show") {
                return document.getElementById(`voters-${postObject.id}-modal`).style.display = "block";
            // vote was made, need to delete the old list and create a new one
            }else if(mode === "new") {
                root.removeChild(document.getElementById(`voters-${postObject.id}-modal`));
            }
        }

        
        let upVotersModal = document.createElement("DIV");
        let modalContent = document.createElement("DIV");
        let closeButton = document.createElement("SPAN");
        let votersList = document.createElement("UL");
        let description = document.createElement("P");
        
        const token = sessionStorage.getItem("token");
        const baseUrl = "http://127.0.0.1:5000/user/";
        const optional = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        };
        
        
        // configure up-voters-modal
        upVotersModal.className = "modal";
        if(mode === "show") {
            upVotersModal.style.display = "block";
        }
        upVotersModal.id = `voters-${postObject.id}-modal`;
        // configure modal content
        modalContent.className = "modal-content";
        // add a description message at the beginning of this modal
        description.innerText = "These people up vote this post:";
        // close button
        closeButton.className = "modal-close";
        closeButton.innerText = "x";
        
        votersList.style.listStyleType = "disc";

        closeButton.addEventListener("click", () => upVotersModal.style.display = "none");
        
        // append child elements into parent elements
        modalContent.appendChild(description);
        modalContent.appendChild(closeButton);
        
        const upVotersIdArray = postObject.meta.upvotes;
        // fetch username of each up-voters
        for(let i = 0; i< upVotersIdArray.length; i++) {
            await fetch(baseUrl + `?id=${upVotersIdArray[i]}`, optional)
                .then(response => {
                    if(response.status === 403) {
                        throw "Invalid Auth Token";
                    }else if(response.status === 400) {
                        throw "Malformed Request";
                    }else if(response.status === 200) {
                        return response.json();
                    }
                })
                .then(data => {
                    let voter = document.createElement("LI");
                    // add username
                    voter.innerText = data.username;
                    // voter.style.
                    votersList.appendChild(voter);
                })
                .catch(error => {
                    alert(error);
                })
        }
        
        
        modalContent.appendChild(votersList);
        upVotersModal.appendChild(modalContent);
        root.appendChild(upVotersModal);
    }
    
    
    // create a modal containing comments list
    function commentsModal(postObject, mode) {
        let root = document.getElementById("root");
        if(document.getElementById(`comments-${postObject.id}-modal`)) {
            if(mode === "show") {
                return document.getElementById(`comments-${postObject.id}-modal`).style.display = "block";
            }else if(mode === "new") {
                root.removeChild(document.getElementById(`comments-${postObject.id}-modal`));
            }
        }
        
        
        let modal = document.createElement("DIV");
        let closeButton = document.createElement("SPAN");
        let modalContent = document.createElement("DIV");
        let commentsList = document.createElement("OL");
        let description = document.createElement("P");


        // configure comments modal
        modal.className = "modal";
        if(mode === "show") {
            modal.style.display = "block";
        }
        modal.id = `comments-${postObject.id}-modal`;
        // configure modal content
        modalContent.className = "modal-content";
        // add a description message at the beginning of this modal
        description.innerText = "Comments:";
        closeButton.className = "modal-close";
        closeButton.innerText = "x";
        // close button to close up voters modal
        closeButton.addEventListener("click", () => modal.style.display = "none");

        // append child elements into parent elements
        
        modalContent.appendChild(description);
        modalContent.appendChild(closeButton);
        // fetch username of each up-voters
        let commentsArray = postObject.comments;
        commentsArray.sort((a, b) => {return b.published - a.published});
        for(let i = 0; i< commentsArray.length; i++) {
            let comment = document.createElement("LI");
            let authorElement = document.createElement("DIV");
            let dateElement = document.createElement("DIV");
            let text = document.createElement("DIV");
    
            comment.style.paddingBottom = "10px";
            authorElement.innerText = "Posted by " + commentsArray[i].author;
            text.innerText = `Post Text: ${commentsArray[i].comment}`;
            dateElement.innerText = "Posted at " + unixTime2DateTime(commentsArray[i].published);
    
    
            comment.appendChild(authorElement);
            comment.appendChild(text);
            comment.appendChild(dateElement);
            commentsList.appendChild(comment);
        }
        
        
        modalContent.appendChild(commentsList);
        modal.appendChild(modalContent);
        root.appendChild(modal);
    }
    
    
    // fetch post object corresponding to the provided postId
    async function fetchPost(postId) {
        const url = `http://127.0.0.1:5000/post?id=${postId}`;
        const token = sessionStorage.getItem("token");
        const optional = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        };
        // return a promise consist of post data
        return fetch(url, optional)
            .then(response => {
                if(response.status === 403) {
                    throw "Invalid Auth Token";
                }else if(response.status === 400) {
                    throw "Missing Username/Password";
                }else if(response.status === 200) {
                    return response.json();
                }
            })
            .catch(error => alert(error));
    }
    
    // vote
    async function upVote(postObject) {
        const token = sessionStorage.getItem("token");
        const putUrl = `http://127.0.0.1:5000/post/vote?id=${postObject.id}`;
        const optional = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        };
        
        // wait for the result of promise
        await fetch(putUrl, optional)
            .then(response => {
                if(response.status === 403) {
                    throw "Invalid Auth Token";
                }else if(response.status === 400) {
                    throw "Malformed Request";
                }
            })
            .catch(error => alert(error));
        
        
        await fetchPost(postObject.id)
            .then(data => {
                const numberOfVotes = data.meta.upvotes.length;
                let votesCount = document.getElementById(`post-${postObject.id}-vote-count`);
                votesCount.innerText = `click to show voters: ${numberOfVotes}`;
                upVotersModal(data, "new");
            });
    }
    
    // delete vote
    async function deleteVote(postObject) {
        const url = `http://127.0.0.1:5000/post/vote?id=${postObject.id}`;
        const token = sessionStorage.getItem("token");
        const del = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        };

        await fetch(url, del)
            .then(response => {
                if(response.status === 403) {
                    throw "Invalid Auth Token";
                }else if(response.status === 400) {
                    throw "Malformed Request";
                }
            })
            .catch(error => alert(error));
    
        
        fetchPost(postObject.id)
            .then(data => {
                const numberOfVotes = data.meta.upvotes.length;
                let votesCount = document.getElementById(`post-${postObject.id}-vote-count`);
                votesCount.innerText = `click to show voters: ${numberOfVotes}`;
                upVotersModal(data, "new");
            });
    }
    
    
    // convert image blob to base64 encoded data
    function convertImage(imgFile) {
        let imgReader = new FileReader();
        
        imgReader.addEventListener("load", () => {
            // the blob's result has Data-URL declaration preceding the Base64-encoded data, To retrieve only the
            // Base64 encoded string, first remove data:*/*;base64, from the result.
            sessionStorage.setItem("base64Img", imgReader.result.split(',')[1]);
        });
        
        if(imgFile) {
            imgReader.readAsDataURL(imgFile);
        }
        
    }
    
    
    // post new content
    function createPost() {
        let root = document.getElementById("root");
        let modal = document.createElement("DIV");
        let postForm = document.createElement("DIV");
        let titleNode = document.createElement("INPUT");
        let textNode = document.createElement("TEXTAREA");
        let subSedditNode = document.createElement("INPUT");
        let imageNode = document.createElement("INPUT");
        let submitButton = document.createElement("BUTTON");
        let closeButton = document.createElement("SPAN");
        
        
        modal.className = "modal";
        modal.style.display = "block";
        postForm.className = "modal-content";
        
        titleNode.type = "text";
        titleNode.placeholder = "title of post";
        titleNode.style.display = "block";
        titleNode.style.marginTop = "10px";
        titleNode.style.marginBottom = "10px";
        titleNode.className = "modal-element";
        
        textNode.placeholder = "Enter your post content here";
        textNode.className = "modal-element";
        textNode.style.marginBottom = "10px";
        
        subSedditNode.type = "text";
        subSedditNode.placeholder = "sub seddit";
        subSedditNode.style.display = "block";
        subSedditNode.className = "modal-element";
        subSedditNode.style.marginBottom = "10px";
        
        imageNode.type = "file";
        imageNode.style.display = "block";
        imageNode.className = "modal-element";
        imageNode.style.marginBottom = "10px";
        
        
        submitButton.innerText = "submit post";
        submitButton.className = "button-secondary modal-element";
        submitButton.addEventListener("click", () => {
            if(! titleNode.value) {
                alert("Title cannot be empty!");
            }else if(! textNode.value) {
                alert("Post body cannot be empty!");
            }else if(! subSedditNode.value) {
                alert("Sub seddit cannot be empty!");
            }else {
                const url = "http://127.0.0.1:5000/post/";
                const token = sessionStorage.getItem("token");
                // convert image blob to base64 and save to sessionStorage
                convertImage(imageNode.files[0]);
    
                const payload = {
                    "title": titleNode.value,
                    "text": textNode.value,
                    "subseddit": subSedditNode.value,
                    "image": sessionStorage.getItem("base64Img")
                };
                const optional = {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Token ${token}`
                    }
                };

                fetch(url, optional)
                    .then(response => {
                        if(response.status === 403) {
                            throw "Invalid Auth Token / Unauthorized to edit Post";
                        }else if(response.status === 400) {
                            throw "Malformed Request";
                        }else if(response.status === 200) {
                            root.removeChild(modal);
                            confirm("success");
                            return response.json();
                        }
                    })
                    .catch(error => console.log(error))
            }
        });
        
        closeButton.innerText = "x";
        closeButton.className = "modal-close";
        closeButton.addEventListener("click", () => root.removeChild(modal));
    
        postForm.appendChild(closeButton);
        postForm.appendChild(titleNode);
        postForm.appendChild(textNode);
        postForm.appendChild(subSedditNode);
        postForm.appendChild(imageNode);
        postForm.appendChild(submitButton);
        modal.appendChild(postForm);
        root.appendChild(modal);
    }
    
    
    // delete post
    function deletePost() {
        let root = document.getElementById("root");
        
        let modal = document.createElement("DIV");
        let content = document.createElement("DIV");
        let input = document.createElement("INPUT");
        let deleteButton = document.createElement("BUTTON");
        let closeButton = document.createElement("SPAN");
        
        
        modal.className = "modal";
        modal.style.display = "block";
        
        content.className = "modal-content";
        
        input.type = "text";
        input.placeholder = "id of post to delete";
        input.style.display = "block";
        input.className = "modal-element";
        input.style.marginBottom = "10px";
        input.style.marginTop = "10px";
        
        deleteButton.innerText = "delete";
        deleteButton.className = "button-primary modal-element";
        deleteButton.style.marginBottom = "10px";
        deleteButton.addEventListener("click", () => {
            const url = `http://127.0.0.1:5000/post?id=${input.value}`;
            const token = sessionStorage.getItem("token");
            const optional = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                }
            };
            if(confirm(`Confirm to delete post ${input.value}`)) {
                fetch(url, optional)
                    .then(response => {
                        if(response.status === 403) {
                            throw "Invalid Auth Token";
                        }else if(response.status === 400) {
                            throw "Missing Username/Password";
                        }
                    })
                    .catch(error => alert(error))
            }
        });
        
        
        closeButton.innerText = "x";
        closeButton.className = "modal-close";
        closeButton.addEventListener("click", () => root.removeChild(modal));
    
        content.appendChild(closeButton);
        content.appendChild(input);
        content.appendChild(deleteButton);
        modal.appendChild(content);
        root.appendChild(modal);
    }
    
    
    // update post
    function updatePost() {
        let root = document.getElementById("root");
        let modal = document.createElement("DIV");
        let content = document.createElement("DIV");
        let postIdNode = document.createElement("INPUT");
        let titleNode = document.createElement("INPUT");
        let textNode = document.createElement("INPUT");
        let imageNode = document.createElement("INPUT");
        let submitButton = document.createElement("BUTTON");
        let closeButton = document.createElement("SPAN");
        
        
        modal.className = "modal";
        modal.style.display = "block";
        content.className = "modal-content";
        
        postIdNode.type = "text";
        postIdNode.placeholder = "id of post to upate";
        postIdNode.className = "modal-element";
        postIdNode.style.marginBottom = "10px";
        postIdNode.style.marginTop = "10px";
        
        titleNode.type = "text";
        titleNode.placeholder = "title";
        titleNode.className = "modal-element";
        titleNode.style.marginBottom = "10px";
    
        textNode.type = "text";
        textNode.placeholder = "text";
        textNode.className = "modal-element";
        textNode.style.marginBottom = "10px";
    
        imageNode.type = "file";
        imageNode.className = "modal-element";
        imageNode.style.marginBottom = "10px";
    
    
        submitButton.innerText = "update post";
        submitButton.className = "modal-element button-secondary";
        submitButton.style.marginBottom = "10px";
    
        submitButton.addEventListener("click", () => {
            const url = `http://127.0.0.1:5000/post?id=${postIdNode.value}`;
            const token = sessionStorage.getItem("token");
            convertImage(imageNode.files[0]);
    
            const payload = {
                "title": titleNode.value,
                "text": textNode.value,
                "image": sessionStorage.getItem("base64Img")
            };
            const optional = {
                method: "PUT",
                body: JSON.stringify(payload),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                }
            };
    
            fetch(url, optional)
                .then(response => {
                    if(response.status === 403) {
                        throw "Invalid Auth Token / Unauthorized to edit Post";
                    }else if(response.status === 400) {
                        throw "Malformed Request";
                    }else if(response.status === 200) {
                        root.removeChild(modal);
                        confirm("success");
                        return response.json();
                    }
                })
                .catch(error => console.log(error))
        
        });
        
        closeButton.innerText = "x";
        closeButton.className = "modal-close";
        closeButton.addEventListener("click", () => root.removeChild(modal));
    
        content.appendChild(closeButton);
        content.appendChild(postIdNode);
        content.appendChild(titleNode);
        content.appendChild(textNode);
        content.appendChild(imageNode);
        content.appendChild(submitButton);
        modal.appendChild(content);
        root.appendChild(modal);
    }
    
    
    // make comment on posts
    function makeComment(postObject) {
        let root = document.getElementById("root");
        let commentModal = document.createElement("DIV");
        let commentContent = document.createElement("DIV");
        let commentText = document.createElement("TEXTAREA");
        let submitButton = document.createElement("BUTTON");
        let closeButton = document.createElement("SPAN");
        
        
        commentModal.className = "modal";
        commentModal.style.display = "block";
        commentModal.id = `comment-${postObject.id}-modal`;
        commentContent.className = "modal-content";
        
        commentText.style.display = "block";
        commentText.className = "modal-element";
        commentText.style.marginTop = "10px";
        commentText.style.marginBottom = "10px";
        commentText.placeholder = "enter your comment here";
        
        submitButton.innerText = "submit comment";
        submitButton.className = "modal-element button-secondary";
        submitButton.addEventListener("click", () => {
            const payload = {
                "comment": commentText.value
            };
            const token = sessionStorage.getItem("token");
            const baseUrl = "http://127.0.0.1:5000/post/comment";
            const optional = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
                body: JSON.stringify(payload)
            };
            
            fetch(baseUrl + `?id=${postObject.id}`, optional)
                .then(response => {
                    if(response.status === 403) {
                        throw "Invalid Auth Token";
                    }else if(response.status === 400) {
                        throw "Malformed Request";
                    }
                })
                .then(() => {
                    fetchPost(postObject.id)
                        .then(post => {
                            // update comments list
                            commentsModal(post, "new");
                            // update the number of comments
                            let showCommentsButton = document.getElementById(`post-${post.id}-show-comments`);
                            showCommentsButton.innerText = `click to show comments: ${post.comments.length}`;
                        })
                })
                .catch(error => alert(error))
        });
        closeButton.innerText = "x";
        closeButton.className = "modal-close";
        closeButton.addEventListener("click", () => root.removeChild(commentModal));
        
        commentContent.appendChild(closeButton);
        commentContent.appendChild(commentText);
        commentContent.appendChild(submitButton);
        commentModal.appendChild(commentContent);
        root.appendChild(commentModal);
    }
    
    
    // flag is either follow or unFollow, authorObject is the user to follow
    async function followOrUnFollow(userObject, flag) {
        const token = sessionStorage.getItem("token");
        const baseUrl = "http://127.0.0.1:5000/user/";
        const optional = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        };
        
        
        if(flag === "follow") {
            await fetch(baseUrl + `follow/?username=${userObject.username}`, optional)
                .then(response => {
                    if(response.status === 403) {
                        throw "Invalid Auth Token";
                    }else if(response.status === 400) {
                        throw "Malformed Request";
                    }else if(response.status === 200) {
                        // get the follow button of a specific user
                        const btn = document.getElementById(`${userObject.username}-follow`);
                        if(btn) {
                            btn.innerText = "following";
                        }
                        
                    }
                })
                .catch(error => console.log(error))
        }else if(flag === "unFollow") {
            await fetch(baseUrl + `unfollow/?username=${userObject.username}`, optional)
                .then(response => {
                    if(response.status === 403) {
                        throw "Invalid Auth Token";
                    }else if(response.status === 400) {
                        throw "Malformed Request";
                    }else if(response.status === 200) {
                        // get the follow button of a specific user
                        const btn = document.getElementById(`${userObject.username}-follow`);
                        if(btn) {
                            btn.innerText = "following";
                        }
                    }
                })
                .catch(error => console.log(error))
        }
        
        // clear feed and create a new one
        document.getElementById("root").innerText = "";
        seddit();
    }
    
    
    // need to finish
    function postAuthorModal(authorObject, mode) {
        const logInFlag = sessionStorage.getItem("logInFlag");
        let root = document.getElementById("root");
    
        // this part is buggy, might need to be modified
        // if(document.getElementById(`author-${authorObject.username}`)) {
        //     if(mode === "show") {
        //         return document.getElementById(`author-${authorObject.username}`).style.display = "block";
        //     }else if(mode === "new") {
        //         root.removeChild(document.getElementById(`author-${authorObject.username}`));
        //     }
        // }
        
        
        let modal = document.createElement("DIV");
        // content inside the modal
        let content = document.createElement("DIV");
        let authorUsername = document.createElement("DIV");
        let authorEmail = document.createElement("DIV");
        let postsButton = document.createElement("BUTTON");
        // count of people this author is following
        let followingCount = document.createElement("BUTTON");
        // count of followers of this author
        let followersCount = document.createElement("BUTTON");
        // button to unfollow this author
        let followButton = document.createElement("BUTTON");
        // button to close the info modal of this author
        let closeButton = document.createElement("SPAN");
        // list of people this author is following
        let listNode = document.createElement("UL");
        
    
        modal.className = "modal";
        if(mode === "show") {
            modal.style.display = "block";
        }
        modal.id = `author-${authorObject.username}-modal`;
        
        content.className = "modal-content";
        
        authorUsername.innerText = `Username: ${authorObject.username}`;
        authorUsername.className = "modal-element";
        
        authorEmail.innerText = `Email: ${authorObject.email}`;
        authorEmail.className = "modal-element";
        
        postsButton.innerText = "His/Her posts";
        postsButton.style.marginLeft = "40px";
        postsButton.style.marginRight = "10px";
        postsButton.className = "button-secondary";
        postsButton.addEventListener("click", () => {
            userProfileModal(authorObject, "not-owner");
        });
        
        listNode.style.display = "none";
        
        
        if(logInFlag === "logged-in") {
            followingCount.innerText = `This user is following: ${authorObject.following.length}`;
            followingCount.className = "button-secondary";
            followingCount.style.marginRight = "10px";
            
            // ids of the people this user is following
            const idList = authorObject.following;
            const url = "http://127.0.0.1:5000/user/";
            const token = sessionStorage.getItem("token");
            const optional = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                }
            };
            const logInUser = sessionStorage.getItem("logInUser");
            followingCount.addEventListener("click", () => {
                // for each people this user is following, create a list node
                for(let i = 0; i < idList.length; i++) {
                    fetch(url + `?id=${idList[i]}`, optional)
                        .then(response => {
                            if(response.status === 403) {
                                throw response.statusText;
                            }else if(response.statusText === 400) {
                                throw response.statusText;
                            }else if(response.status === 200) {
                                return response.json();
                            }
                        })
                        .then(userObject => {
                
                            let followingNode = document.getElementById(`${logInUser}-follows-${userObject.username}`);
                            if(! followingNode) {
                                followingNode = document.createElement("LI");
                                let usernameNode = document.createElement("DIV");
                                let userEmailNode = document.createElement("DIV");
                                let followButton = document.createElement("BUTTON");
                    
                                followingNode.style.marginBottom = "15px";
                                followingNode.id = `${logInUser}-follows-${userObject.username}`;
                                followButton.innerText = "follow";
                                followButton.id = `${userObject.username}-follow-button`;
                                followButton.className = "button-secondary";
                    
                                followButton.addEventListener("click", () => {
                                    if(followButton.innerText === "follow") {
                                        followOrUnFollow(userObject, "follow");
                                        // this might be removed after updating the user feed, could be solved by local
                                        // or session storage.
                                        followButton.innerText = "following";
                                    }else if(followButton.innerText === "following") {
                                        followOrUnFollow(userObject, "unFollow");
                                        followButton.innerText = "follow";
                                    }
                                });
                    
                                usernameNode.innerText = userObject.username;
                                userEmailNode.innerText = userObject.email;
                                followingNode.appendChild(usernameNode);
                                followingNode.appendChild(userEmailNode);
                                followingNode.appendChild(followButton);
                            }
                
                            listNode.appendChild(followingNode);
                
                        })
                        .catch(error => alert(error))
                }
                
                if(listNode.style.display === "none") {
                    listNode.style.display = "block";
                }else {
                    listNode.style.display = "none";
                }
            });
            
            
            followersCount.innerText = `Followers of this user: ${authorObject.followed_num}`;
            followersCount.className = "button-secondary";
            followersCount.style.marginRight = "10px";
            
        }else {
            followingCount.innerText = `This user is following: ${authorObject.following.length}`;
    
            followersCount.innerText = `Followers of this user: ${authorObject.followed_num}`;
        }
        
        
        followButton.innerText = "following";
        followButton.id = `${authorObject.username}-follow`;
        followButton.className = "button-primary";
        // follow or unFollow when follow button is clicked
        followButton.addEventListener("click", () => {
            if(followButton.innerText === "follow") {
                followOrUnFollow(authorObject, "follow");
            }else if(followButton.innerText === "following") {
                followOrUnFollow(authorObject, "unFollow");
            }
        });
        
        
        closeButton.innerText = "x";
        closeButton.className = "modal-close";
        closeButton.addEventListener("click", () => root.removeChild(modal));
        
        content.appendChild(authorUsername);
        content.appendChild(authorEmail);
        content.appendChild(postsButton);
        content.appendChild(followingCount);
        content.appendChild(followersCount);
        content.appendChild(followButton);
        content.appendChild(closeButton);
        content.appendChild(listNode);
        modal.appendChild(content);
        root.appendChild(modal);
    }
    
    
    // fetch author object from backend
    function showPostAuthor(username) {
        const token = sessionStorage.getItem("token");
        const baseUrl = "http://127.0.0.1:5000/user/";
        
        const optional = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        };
        
        fetch(baseUrl + `?username=${username}`, optional)
            .then(response => {
                if(response.status === 403) {
                    throw "Invalid Auth Token";
                }else if(response.status === 400) {
                    throw "Malformed Request";
                }else if(response.status === 200) {
                    return response.json();
                }
            })
            .then(authorObject => postAuthorModal(authorObject, "show"))
            .catch(error => alert(error))
    }
    
    
    // fetch new posts from backend to achieve
    function updateFeed() {
        // get the current number of posts
        const p = document.getElementsByClassName("post").length;
        
        // fetch 2 new posts each time
        const n = 2;
        const url = `http://127.0.0.1:5000/user/feed?p=${p}&n=${n}`;
        const token = sessionStorage.getItem("token");
        const optional = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        };
        
        // interact with backend
        fetch(url, optional)
            .then(response => {
                if(response.status === 403) {
                    throw response.statusText;
                }else if(response.status === 400) {
                    throw response.statusText;
                }else if(response.status === 200) {
                    return response.json();
                }
            })
            .then(newPosts => {
                // call createFeedNPosts to append new posts to feed node
                createFeedNPosts(newPosts.posts);
            })
            .catch(error => console.log(error))
    }
    
    
    // infinite scroll
    function infiniteScroll() {
        const logInFlag = sessionStorage.getItem("logInFlag");
        // call updateFeed function to fetch new posts from backend when scroll event occurs
        window.addEventListener("scroll", () => {
            if(window.innerHeight + window.pageYOffset >= document.body.scrollHeight && logInFlag === "logged-in") {
                // console.log("body has changed");
                updateFeed();
            }
        })
    }
    
    
    // create a list of posts to be shown on web page
    function createFeedNPosts(postsArray) {
        // get feed element
        let userFeed = document.getElementById("feed");
        const logInFlag = sessionStorage.getItem("logInFlag");
        
        
        // generate posts for each in the postsArray
        for(let i = 0; i < postsArray.length; i++) {
            // create necessary dom elements
            let post = document.createElement("DIV");
            let upVotesCount = document.createElement("BUTTON");
            let postContent = document.createElement("DIV");
            let postTitle = document.createElement("H4");
            let postAuthor = document.createElement("P");
            let postdate = document.createElement("DIV");
            let img = document.createElement("IMG");
            let postText = document.createElement("DIV");
            let commentsCount = document.createElement("BUTTON");
            let subSeddit = document.createElement("DIV");
            
    
            // unix timestamp
            const unixTimeStamp = postsArray[i].meta.published;
            const legitTime = unixTime2DateTime(unixTimeStamp);
            
            
            // configure post
            post.className = "post";
            
            post.setAttribute("data-id-post", "");
            // configure votes
            // upVotesCount.className = "vote";
            upVotesCount.id = `post-${postsArray[i].id}-vote-count`;
            upVotesCount.setAttribute("data-id-upvotes", "");
            upVotesCount.innerText = `click to show voters: ${postsArray[i].meta.upvotes.length}`;
            upVotesCount.className = "button-secondary";
            upVotesCount.style.marginRight = "20px";
            // configure post content
            postContent.className = "content";
            // configure post title
            postTitle.setAttribute("data-id-title", "");
            postTitle.className = "post-title alt-text";
            postTitle.innerText = `Title: ${postsArray[i].title}`;
            // configure post author
            postAuthor.className = "post-author";
            postAuthor.setAttribute("data-id-author", "");
            postAuthor.innerText = `Posted by @${postsArray[i].meta.author}`;
            
            // all we know is the username of this post, we need to retrieve detailed info
            postAuthor.addEventListener("click", () => showPostAuthor(postsArray[i].meta.author));
            // configure post date
            postdate.innerText = `posted at: ${legitTime}`;
            // configure image
            if(postsArray[i].image) {
                img.src = `data:image/jpeg;base64, ${postsArray[i].image}`;
                img.style.width = "80%";
                img.style.height = "80%";
                img.style.display = "block";
                img.addEventListener("click", () => showPostAuthor(postsArray[i].meta.author));
            }
            // configure post text
            postText.innerText = postsArray[i].text;
            // configure post comments count
            commentsCount.innerText = `click to show comments: ${postsArray[i].comments.length}`;
            commentsCount.className = "button-secondary";
            commentsCount.id = `post-${postsArray[i].id}-show-comments`;
            // configure post sub seddit
            subSeddit.innerText = `subseddit: ${postsArray[i].meta.subseddit}`;
            

            postContent.appendChild(postTitle);
            postContent.appendChild(postText);
            if(postsArray[i].image) {
                postContent.appendChild(img);
            }
            postContent.appendChild(upVotesCount);
            postContent.appendChild(commentsCount);
            postContent.appendChild(postdate);
            postContent.appendChild(postAuthor);
            postContent.appendChild(subSeddit);
    
            
            // show the list of comments made to this post
            commentsCount.addEventListener("click", () => commentsModal(postsArray[i], "show"));
            
            if(logInFlag === "logged-in") {
                let voteButton = document.createElement("BUTTON");
                let delVoteButton = document.createElement("BUTTON");
                let commentButton = document.createElement("BUTTON");
                
                
                voteButton.id = `vote-${i}-button`;
                voteButton.innerText = "Up Vote";
                voteButton.className = "button-secondary";
                voteButton.style.marginRight = "20px";
                
                delVoteButton.id = `delete-vote-${i}-button`;
                delVoteButton.className = "button-secondary";
                delVoteButton.style.marginRight = "20px";
                delVoteButton.innerText = "Delete Vote";
                
                commentButton.innerText = "comment";
                commentButton.className = "button-secondary";
                
                postContent.appendChild(voteButton);
                postContent.appendChild(delVoteButton);
                postContent.appendChild(commentButton);
                
    
                // show the list of people who up vote this post
                upVotesCount.addEventListener("click", () => upVotersModal(postsArray[i], "show"));
                // vote post
                voteButton.addEventListener("click", () => upVote(postsArray[i]));
                // delete vote of post
                delVoteButton.addEventListener("click", () => deleteVote(postsArray[i], "show"));
                // make comment
                commentButton.addEventListener("click", () => makeComment(postsArray[i]));
            }
    
            post.appendChild(postContent);
            userFeed.appendChild(post);
        }
    }
    
    
    // fetch public posts for non-logged in user
    function fetchPublicPosts() {
        const url = "http://127.0.0.1:5000/post/public";
        const optional = {
            method: "GET",
        };
        
        
        fetch(url, optional)
            .then(response => {
                if(response.status !== 200) {
                    throw response.status;
                }
                return response.json()
            })
            .then(data => {
                // Sort posts and show most recent posts first
                data.posts.sort((a, b) => {return b.meta.published - a.meta.published});
                // create public feed for non-logged in user
                createFeedNPosts(data.posts);
            })
            .catch(error => alert(error));
    }
    
    
    // fetch private posts for logged in user
    function fetchPrivatePosts() {
        const url = "http://127.0.0.1:5000/user/feed";
        const token = sessionStorage.getItem("token");
        const optional = {
            method: "GET",
            headers: {
                "Content-Type": "application/json;",
                "Authorization": `Token ${token}`
            }
        };
        fetch(url, optional)
            .then(response => {
                if(response.status === 403) {
                    throw "Invalid Auth Token";
                } else if (response.status === 200) {
                    return response.json();
                }
            })
            .then(data => {
                data.posts.sort((a, b) => {return b.meta.published - a.meta.published});
                // create private feed for logged in user
                createFeedNPosts(data.posts);
            })
            .catch(error => {
                alert(error);
                location.reload();
            })
    }
    
    
    // fetch the updated user profile
    function fetchNewProfile(url, userId) {
        // update the user profile form shown under account
        const token = sessionStorage.getItem("token");
        const optional = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        };
        
        
        fetch(url + `?id=${userId}`, optional)
            .then(response => {
                if(response.status === 403) {
                    throw "Invalid Auth Token";
                }else if(response.status === 400) {
                    throw "Malformed Request";
                }else if(response.status === 200) {
                    return response.json();
                }
            })
            .then(data => {
                userProfileModal(data, "new");
            })
            .catch(error => alert(error))
    }
    
    
    // create a user profile modal
    function userProfileModal(userProfile, mode) {
        let root = document.getElementById("root");
    
        // this part is buggy, might need to be modified
        // if(document.getElementById("profile-modal")) {
        //     if(mode === "show") {
        //         return document.getElementById("profile-modal").style.display = "block";
        //     }else if(mode === "new") {
        //         root.removeChild(document.getElementById("profile-modal"));
        //     }
        // }
        
        let profileModal = document.createElement("DIV");
        let profileForm = document.createElement("DIV");
        let username = document.createElement("DIV");
        let name = document.createElement("DIV");
        let email = document.createElement("DIV");
        let postsList = document.createElement("OL");
        let followingList = document.createElement("OL");
        let followersCount = document.createElement("DIV");
        let followingCount = document.createElement("BUTTON");
        let showPostsButton = document.createElement("BUTTON");
        let editProfileButton = document.createElement("BUTTON");
        let closeButton = document.createElement("SPAN");
        
        
        // user profile modal
        profileModal.className = "modal";
        profileModal.style.display = "block";
        profileModal.id = "profile-modal";
        profileForm.className = "account-modal-content";
        
        // username, name, email address and followers
        username.innerText = `username: ${userProfile.username}`;
        username.className = "modal-element";
        name.innerText = `name: ${userProfile.name}`;
        name.className = "modal-element";
        email.innerText = `email address: ${userProfile.email}`;
        email.className = "modal-element";
        
        
        // edit user profile button if is owner,
        if(mode !== "not-owner") {
            editProfileButton.innerText = "update your profile";
            editProfileButton.className = "button-secondary";
            editProfileButton.style.marginLeft = "280px";
            editProfileButton.style.marginRight = "20px";
            editProfileButton.addEventListener("click", () => {
                // create a new list for updating user profile if there is not one
                if(! document.getElementById("new-profile-list")) {
                    let newProfileForm = document.createElement("DIV");
                    let newName = document.createElement("INPUT");
                    let newPassword = document.createElement("INPUT");
                    let newEmail = document.createElement("INPUT");
                    let submitButton = document.createElement("BUTTON");
                    let closeButton = document.createElement("SPAN");
            
            
                    // configure interface
                    newProfileForm.innerText = "update profile here";
                    newProfileForm.id = "new-profile-list";
                    newProfileForm.className = "modal-element";
                    newProfileForm.style.marginTop = "20px";
                    
                    newName.type = "text";
                    newName.placeholder = "enter your new name";
                    newName.style.display = "block";
                    newName.style.marginBottom = "10px";
                    
                    newPassword.type = "text";
                    newPassword.placeholder = "enter your new password";
                    newPassword.style.display = "block";
                    newPassword.style.marginBottom = "10px";
    
                    newEmail.type = "text";
                    newEmail.placeholder = "enter your new email address";
                    newEmail.style.display = "block";
                    newEmail.style.marginBottom = "10px";
    
                    submitButton.innerText = "submit update";
                    submitButton.className = "button-secondary";
    
                    // update user profile when submit button is clicked
                    submitButton.addEventListener("click", () => {
                        // get authenticate token
                        const token = sessionStorage.getItem("token");
                        const url = "http://127.0.0.1:5000/user/";
                        // configure payload
                        if(! newPassword.value) {
                            alert("Password cannot be empty!");
                        }else {
                            const payload = {
                                "password": newPassword.value
                            };
                            if(newName.value) {
                                payload["name"] = newName.value;
                            }
                            if(newEmail.value) {
                                payload["email"] =newEmail.value;
                            }
                            // optional parameters
                            const optionalPut = {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Token ${token}`
                                },
                                body: JSON.stringify(payload)
                            };
                            // put updated profile in backend
                            fetch(url, optionalPut)
                                .then(response => {
                                    if(response.status === 403) {
                                        throw "Invalid Auth Token";
                                    }else if(response.status === 400) {
                                        throw "Malformed user object";
                                    }else if(response.status === 200) {
                                        alert("User profile successfully updated");
                                        profileForm.removeChild(newProfileForm);
                                        // update the user profile form shown under account
                                        fetchNewProfile(url, userProfile.id);
                                    }
                                })
                                .catch(error => alert(error))
                        }
                    });
                    closeButton.innerText = "x";
                    closeButton.className = "modal-close";
                    closeButton.addEventListener("click", () => profileForm.removeChild(newProfileForm));
    
                    newProfileForm.appendChild(closeButton);
                    newProfileForm.appendChild(newName);
                    newProfileForm.appendChild(newPassword);
                    newProfileForm.appendChild(newEmail);
                    newProfileForm.appendChild(submitButton);
                    // profileForm.insertBefore(newProfileList, followingList);
                    profileForm.appendChild(newProfileForm);
                }
            });
        }
        
        
        // count of followers
        followersCount.innerText = `followers: ${userProfile.followed_num}`;
        followersCount.className = "modal-element";
        
        // following list
        followingList.style.display = "none";
        followingCount.innerText = `Following: ${userProfile.following.length}`;
        followingCount.className = "button-secondary";
        // adjust style
        followingCount.style.marginLeft = "20px";
        followingCount.style.marginRight = "20px";
        // user is following at least one person
        const followingIdArray = userProfile.following;
        
        if(followingIdArray.length !== 0) {
            for(let i = 0; i < followingIdArray.length; i++) {
                let following = document.createElement("LI");
                const baseUrl = "http://127.0.0.1:5000/user/";
                const token = sessionStorage.getItem("token");
                const optional = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${token}`
                    }
                };
                fetch(baseUrl + `?id=${followingIdArray[i]}`, optional)
                    .then(response => {
                        if(response.status === 403) {
                            throw "Invalid Auth Token";
                        }else if(response.status === 400) {
                            throw "Malformed Request";
                        }else if(response.status === 200) {
                            return response.json();
                        }
                    })
                    .then(data => {
                        // following.innerTe
                        following.innerText = data.username;
                        followingList.appendChild(following);
                    })
                    .catch(error => alert(error));
            }
        } else {
            let description = document.createElement("LI");
            description.innerText = "You currently are not following anyone!";
            followingList.appendChild(description);
        }

        
        // default to hidden
        postsList.style.display = "none";
        // user has at least one post
        if(userProfile.posts.length !== 0) {
            for(let i = 0; i < userProfile.posts.length; i++) {
                let userPost = document.createElement("LI");
                let postId = document.createElement("DIV");
                let titleNode = document.createElement("DIV");
                let textNode = document.createElement("DIV");
                let dateNode = document.createElement("DIV");
                let imageNode = document.createElement("IMG");
                let subSedditNode = document.createElement("DIV");
                
                
                fetchPost(userProfile.posts[i])
                    .then(postObject => {
                        userPost.style.paddingBottom = "20px";
                        postId.innerText = `Post id: ${postObject.id}`;
                        titleNode.innerText = `Title: ${postObject.title}`;
                        textNode.innerText = `Post text: ${postObject.text}`;
                        dateNode.innerText = `Posted at ${unixTime2DateTime(postObject.meta.published)}`;
                        subSedditNode.innerText = `subseddit: ${postObject.meta.subseddit}`;

                        if(postObject.image) {
                            imageNode.src = `data:image/png;base64, ${postObject.image}`;
                        }
                    })
                    .catch(error => alert(error));
                
                userPost.appendChild(postId);
                userPost.appendChild(titleNode);
                userPost.appendChild(textNode);
                userPost.appendChild(imageNode);
                userPost.appendChild(subSedditNode);
                userPost.appendChild(dateNode);
                postsList.appendChild(userPost);
            }
        } else {
            let description = document.createElement("LI");
            description.innerText = "You have not made any posts yet!";
            postsList.appendChild(description);
        }

        // click to show list of following
        followingCount.addEventListener("click", () => {
            if(followingList.style.display === "none") {
                followingList.style.display = "block";
            }else if(followingList.style.display !== "none") {
                followingList.style.display = "none";
            }
        });

        
        showPostsButton.innerText = `posts ${userProfile.posts.length}`;
        showPostsButton.className = "button-secondary";
        showPostsButton.style.marginLeft = "20px";
        // click posts button to show or hide user posts
        showPostsButton.addEventListener("click", () => {
            if(postsList.style.display === "none") {
                postsList.style.display = "block"
            }else if(postsList.style.display !== "none") {
                postsList.style.display = "none";
            }
        });
    
        closeButton.innerText = "x";
        closeButton.className = "modal-close";
        closeButton.addEventListener("click", () => root.removeChild(profileModal));
    
        profileForm.appendChild(closeButton);
        if(mode !== "not-owner") {
            profileForm.appendChild(username);
            profileForm.appendChild(name);
            profileForm.appendChild(email);
            profileForm.appendChild(editProfileButton);
            profileForm.appendChild(followingCount);
            profileForm.insertBefore(followersCount, editProfileButton);
        }
        
        profileForm.appendChild(showPostsButton);
        profileForm.appendChild(postsList);
        profileForm.appendChild(followingList);
        profileModal.appendChild(profileForm);
        root.appendChild(profileModal);
    }
    
    
    // fetch user profile from backend
    function showUserProfile() {
        const url = "http://127.0.0.1:5000/user/";
        const token = sessionStorage.getItem("token");
        const optional = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        };

        
        fetch(url, optional)
            .then(response => {
                if(response.status === 403) {
                    throw "Invalid Auth Token";
                } else if(response.status === 400) {
                    throw "Malformed Request";
                } else if (response.status === 200) {
                    return response.json();
                }
            })
            .then(data => userProfileModal(data, "show"))
            .catch(error => {
                alert(error);
                location.reload();
            })
    }
    
    
    function seddit() {
        // get root element inside body
        const logInFlag = sessionStorage.getItem("logInFlag");
        let root = document.getElementById("root");
        // create a header at the top of the whole web page
        let webHeader = document.createElement("HEADER");
        let logo = document.createElement("H1");
        let logoText = document.createTextNode("Seddit");
        let uL = document.createElement("UL");
        let node1 = document.createElement("LI");
        let searchBox = document.createElement("INPUT");
        
        
        // header of web page
        webHeader.className = "banner";
        webHeader.id = "nav";
        // create a circle logo on the top left corner
        
        logo.className = "flex-center";
        logo.setAttribute("id", "logo");
        
        // create an unordered list to store search box , log-in and sign-up button
        uL.className = "nav";
        // create a node to store search box
        node1.className = "nav-item";
        // create a search box and set data-id-search
        searchBox.setAttribute("data-id-search", "");
        searchBox.id = "search";
        searchBox.placeholder = "Search Seddit";
        searchBox.type = "search";
        // search
        searchBox.addEventListener("click", prepareSearch);
        logo.appendChild(logoText);
        webHeader.appendChild(logo);
        node1.appendChild(searchBox);
        
        uL.appendChild(node1);
        uL.appendChild(searchBox);
        
        
        // logged in user
        if(logInFlag === "logged-in") {
            let node4 = document.createElement("LI");
            let logOutButton = document.createElement("BUTTON");
            let node5 = document.createElement("LI");
            let accountButton = document.createElement("BUTTON");
            
            // create a button element
            logOutButton.id = "log-out-button";
            logOutButton.innerText = "Log Out";
            logOutButton.className = "button button-primary";
            // set data attribute to data-id-login
            logOutButton.setAttribute("data-id-search", "");
            // logging out
            logOutButton.addEventListener("click", () => {
                sessionStorage.clear();
                location.reload();
            });
            
            
            node4.className = "nav-item";
            node4.appendChild(logOutButton);
            // account info
            accountButton.id = "account";
            accountButton.innerText = "account";
            accountButton.className = "button button-secondary";
            // fetching user profile
            accountButton.addEventListener("click", showUserProfile);
            
            
            node5.className = "nav-item";
            node5.appendChild(accountButton);
            uL.appendChild(node4);
            uL.appendChild(node5);
        }else {
            // non-logged in user
            let node2 = document.createElement("LI");
            let logInButton = document.createElement("BUTTON");
            
            
            // create a button element
            logInButton.id = "log-in-button";
            logInButton.innerText = "Log In";
            logInButton.className = "button button-primary";
            // set data attribute to data-id-login
            logInButton.setAttribute("data-id-login", "");
            // Display log in form when log-in button is clicked
            logInButton.addEventListener("click", createLogInModal);
    
            
            node2.className = "nav-item";
            node2.appendChild(logInButton);
            // create a node to store sign-up button
            uL.appendChild(node2);
        }
        
        let node3 = document.createElement("LI");
        let signUpButton = document.createElement("BUTTON");
    
        
        signUpButton.id = "sign-up-button";
        signUpButton.className = "button button-secondary";
        signUpButton.innerText = "Sign Up";
        // set data-id-signup
        signUpButton.setAttribute("data-id-signup", "");
        // Display sign up form when sign-up button is clicked
        signUpButton.addEventListener("click", createSignUpModal);
        
        node3.className = "nav-item";
        node3.appendChild(signUpButton);
        
        uL.appendChild(node3);
        webHeader.appendChild(uL);
        root.appendChild(webHeader);
        // Display feed header
        let main = document.createElement("MAIN");
        let userFeed = document.createElement("UL");
        let feedHeader = document.createElement("DIV");
        let feedTitle = document.createElement("H3");
        let postButton = document.createElement("BUTTON");
        let deletePostButton = document.createElement("BUTTON");
        let updatePostButton = document.createElement("BUTTON");
        
        
        main.role = "main";
        userFeed.id = "feed";
        userFeed.setAttribute("data-id-feed", "");
        
        feedHeader.className = "feed-header";
        
        feedTitle.className = "feed-title alt-text";
        feedTitle.innerText = "Popular posts";
        
        postButton.className = "button button-secondary";
        postButton.innerText = "Post";
        
        deletePostButton.className = "button button-secondary";
        deletePostButton.innerText = "delete post";
        
        updatePostButton.className = "button button-secondary";
        updatePostButton.innerText = "update post";
        
        
        let buttonsList = document.createElement("UL");
        let nodePost = document.createElement("LI");
        let nodeDeletePost = document.createElement("LI");
        let nodeUpdatePost = document.createElement("LI");
        
        // set button style
        buttonsList.style.listStyleType = "none";
        nodePost.className = "nav-item";
        nodeDeletePost.className = "nav-item";
        nodeUpdatePost.className = "nav-item";
        
        
        feedHeader.appendChild(feedTitle);
        nodePost.appendChild(postButton);
        nodeDeletePost.appendChild(deletePostButton);
        nodeUpdatePost.appendChild(updatePostButton);
        buttonsList.appendChild(nodePost);
        buttonsList.appendChild(nodeDeletePost);
        buttonsList.appendChild(nodeUpdatePost);
        feedHeader.appendChild(buttonsList);
        userFeed.appendChild(feedHeader);
        main.appendChild(userFeed);
        root.appendChild(main);
        
        
        // Fetch public posts for non-logged in user
        if(logInFlag === "logged-in") {
            fetchPrivatePosts();
            postButton.addEventListener("click", createPost);
            deletePostButton.addEventListener("click", deletePost);
            updatePostButton.addEventListener("click", updatePost);
        }else {
            fetchPublicPosts();
            postButton.addEventListener("click", () => alert("Please log in before posting!"));
            deletePostButton.addEventListener("click", () => alert("Please log in before deleting posts!"));
            updatePostButton.addEventListener("click", () => alert("Please log in before updating posts!"));
        }
    }
    
    
    // load main web page
    seddit();
    
    // enable infinite scroll
    infiniteScroll();
    
}

export default initApp;
