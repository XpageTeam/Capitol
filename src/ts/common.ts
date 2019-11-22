// import "./forms"
import "./textPage/text-page";

import "./head"

import "./catalog-sort"
import "./tovar"
import "./tabs"

import "./timeline-slider"

declare global {
	interface Window {
		TweenLite: any;
		$: any;
		is: any;
	}
}