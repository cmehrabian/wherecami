import App from './components/App.svelte';

const app = new App({
    target: document.querySelector('main'),
    props: {
        ready: false
    }
});

window.initMap = function ready() {
	app.$set({ ready: true });
}

export default app;