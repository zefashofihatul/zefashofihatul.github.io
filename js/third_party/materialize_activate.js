// Membuka navbar
const sideNav = document.querySelector('.sidenav');
M.Sidenav.init(sideNav);

// Mengaktifkan Slider animation
const slider = document.querySelector('.slider');
M.Slider.init(slider, {
	indicator: true,
	height: 550,
	transition: 300,
	interval: 4000
});

const scroll = document.querySelectorAll('.scrollspy');
M.ScrollSpy.init(scroll, {
	scrollOffset:90
});

document.querySelectorAll('.sidenav a').forEach(elm => {
	elm.addEventListener('click', () => {
		M.Sidenav.init(sideNav).close();
	})
});


