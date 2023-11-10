'use client'

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibGprZWxzYWxsIiwiYSI6ImNsb3NqOHRteTAweHAyanFlMmdwcHZnYmMifQ.bv7DEQoEvbx1gfUDS-dkWw';

export default function Map() {
	const mapContainer = useRef<any>(null); // shouldn't be any really
	const map = useRef<any>(null); // shouldn't be any really
	const [lng, setLng] = useState(0.06789);
	const [lat, setLat] = useState(51.48644);
	const [zoom, setZoom] = useState(12);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [lng, lat],
			zoom: zoom
		});

		map.current.on('move', () => {
			setLng(map.current.getCenter().lng.toFixed(4));
			setLat(map.current.getCenter().lat.toFixed(4));
			setZoom(map.current.getZoom().toFixed(2));
		});

		map.current.on('load', () => {
			map.current.addLayer({
				'id': 'london-trees-data',
				'type': 'circle',
				'source': {
					'type': 'vector',
					'url': 'mapbox://ljkelsall.74ym3hvl'
				},
				'source-layer': 'TreeData1-197v8y',
				'paint': {
					'circle-radius': [
						'interpolate',
						['linear'],
						['zoom'],
						12, // at zoom level 12,
						5, // circle radius is 5
						15, // at zoom level 15,
						10 // circle radius is 10
					],
					'circle-opacity': 0.4,
					'circle-color': 'rgb(0, 128, 0)'
				}
			});
		});

		// When a click event occurs on a feature in the london-trees-data layer, open a popup at the
		// location of the feature, with description HTML from its properties.
		map.current.on('click', 'london-trees-data', (e) => {
			// Copy coordinates array.
			const coordinates = e.features[0].geometry.coordinates.slice();
			const taxon_name = e.features[0].properties.taxon_name;

			// Ensure that if the map is zoomed out such that multiple
			// copies of the feature are visible, the popup appears
			// over the copy being pointed to.
			while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
				coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
			}

			new mapboxgl.Popup()
				.setLngLat(coordinates)
				.setHTML(taxon_name)
				.addTo(map.current);
		});

		// Change the cursor to a pointer when the mouse is over the london-trees-data layer.
		map.current.on('mouseenter', 'london-trees-data', () => {
			map.current.getCanvas().style.cursor = 'pointer';
		});

		// Change it back to a pointer when it leaves.
		map.current.on('mouseleave', 'london-trees-data', () => {
			map.current.getCanvas().style.cursor = '';
		});
	});

	return (
		<div>
			<div className="sidebar">
				Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
			</div>
			<div ref={mapContainer} className="map-container" />
		</div>
	);
}
