// import "./forms"
import "./textPage/text-page";

import "./tovar"
import "./tabs"

import "./timeline-slider"

import { domReady, App, EventListener } from "./xpage/index";

declare global {
	interface Window {
		TweenLite: any;
		$: any;
		is: any;
	}
}