document.querySelectorAll('a[rel="keep-params"]').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();

        window.location = e.target.href + window.location.search;
    })
})