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
			setLng(map?.current?.getCenter().lng.toFixed(4));
			setLat(map?.current?.getCenter().lat.toFixed(4));
			setZoom(map?.current?.getZoom().toFixed(2));
		});

		map.current.on('load', () => {
			map?.current?.addLayer({
				id: 'historical-places',
				type: 'circle',
				source: {
					type: 'vector',
					url: 'mapbox://ljkelsall.74ym3hvl'
				},
				'source-layer': 'TreeData1-197v8y',
			});
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
