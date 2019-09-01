let URLs = ["test.com/1", "test.com/2", "test.com/3"];
URLs = URLs.map((url) => fetch(url));
Promise
    .all(URLs)
    .then((response) => {
        const string = response.map(r => r.text()).join(" ");
        console.log(string);
    })