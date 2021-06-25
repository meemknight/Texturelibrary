button = document.getElementById('sun');
body = document.body;

const theme = localStorage.getItem("theme");


if(theme){
    body.classList.remove("darkTheme");
    body.classList.add(theme);
}

button.onclick = () => {
    if(body.classList.contains("lightTheme"))
    {
        body.classList.replace("lightTheme", "darkTheme");
        localStorage.setItem("theme", "darkTheme");

    }else if(body.classList.contains("darkTheme"))
    {
        body.classList.replace("darkTheme", "lightTheme");
        localStorage.setItem("theme", "lightTheme");

    }else
    {
        body.classList.add("darkTheme");
        localStorage.setItem("theme", "darkTheme");

    }
     
}