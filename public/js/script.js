document.addEventListener('DOMContentLoaded', function() {
    const allTheButtons = document.querySelectorAll('.searchBtn');
    const searchBar = document.querySelector('.searchBar'); // Use querySelector here to select a single element
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');

    for (var i = 0; i < allTheButtons.length; i++) {
        allTheButtons[i].addEventListener('click', function() {
            searchBar.style.visibility = 'visible';
            searchBar.classList.add('open');
            this.setAttribute('aria-expanded', 'true');
            searchInput.focus();
        });
    }

    searchClose.addEventListener('click', function() {
        searchBar.style.visibility = 'hidden';
        searchBar.classList.remove('open');
        this.setAttribute('aria-expanded', 'false'); // There's a typo here; it should be 'aria-expanded'
    });
});
