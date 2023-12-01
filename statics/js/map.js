mapboxgl.accessToken =
    'pk.eyJ1Ijoic21haWxib3VuZGFvdWkiLCJhIjoiY2wzYWlodDVqMDV3djNjcnFyOXo5MTJpNSJ9.Cl3g1eJx0Jj3QWPmElKTQw'
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [4.8011771, 36.0495696],
    zoom: 12,
    attributionControl: false,
})
map.addControl(new mapboxgl.FullscreenControl({ container: document.querySelector('html') }))
const nav = new mapboxgl.NavigationControl({
    visualizePitch: true,
})
map.addControl(nav, 'bottom-right')
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
    })
)
const scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial',
})
map.addControl(scale)
scale.setUnit('metric')
document.querySelector('#map a.mapboxgl-ctrl-logo').parentElement.classList.add('hidden')
