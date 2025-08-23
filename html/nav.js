const nav = `
<a href="/index.html" class="nav-link">
    <h3 class="nav-title">67 Games</h3>
</a>
<a href="/index.html" class="nav-link">
    <i class="fa-solid fa-house-chimney nav-icon"></i>
    Home
</a>
<a href="/index.html#popular" class="nav-link">
    <i class="fa-solid fa-fire nav-icon"></i>
    Popular
</a>
<a href="/index.html#new" class="nav-link">
    <i class="fa-solid fa-gamepad nav-icon"></i>
    New
</a>
<a href="/random.html" class="nav-link">
    <i class="fa-solid fa-random nav-icon"></i>
    Random
</a>
<input id="searchbar" placeholder="Search..." class="searchbar nav-link">
<button id="searchbutton" class="search-button">
    <i class="fa-solid fa-magnifying-glass"></i>
</button>
`;

function createNav() {
    const navs = document.getElementsByClassName("nav");
    for (let navPlaceholder of navs) {
        navPlaceholder.innerHTML = nav;
    }

    // Attach events AFTER HTML is inserted
    const searchbar = document.getElementById("searchbar");
    const searchbutton = document.getElementById("searchbutton");

    function goSearch() {
        const query = encodeURIComponent(searchbar.value.trim());
        if (query) {
            window.location.href = `/search/${query}`;
        }
    }

    searchbar.addEventListener("keyup", function (e) {
        if (e.key === "Enter") {
            goSearch();
        }
    });

    searchbutton.addEventListener("click", goSearch);
}
