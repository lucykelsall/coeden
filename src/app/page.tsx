import 'mapbox-gl/dist/mapbox-gl.css'; // stylesheet makes map display correctly
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'; // stylesheet makes search box display correctly
import Image from 'next/image';
import Map from '../components/Map';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<header>A lovely map of trees</header>
			<div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
				<div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
					<a
						className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
						href="about"
					>
						Coeden
						<Image
							src="/treeImage.png"
							alt="A lovely tree"
							className="dark:invert"
							width={100}
							height={24}
							priority
						/>
					</a>
				</div>
			</div>

			<div>
				<nav id="filter-group" className="filter-group"></nav>
				<Map />
			</div>

		</main>
	)
}
