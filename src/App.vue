<template>
	Hue:
	<input type="number" v-model="hueValue" />
	Saturation:
	<input type="number" v-model="saturationValue" />
	Lightness:
	<input type="number" v-model="lightnessValue" />

	<div>
		<h1>Before:</h1>
		<div class="colorSquare" v-for="color in themeColors" :key="color" :style="`background-color: ${color}`"></div>
	</div>
	<div>
		<h1>After:</h1>
		<div
			class="colorSquare"
			v-for="(color, index) in turnedColor"
			:key="index"
			:style="`background-color: ${color}`"
		></div>
	</div>
</template>

<script>
import colorutil from "color-util";
import theme from "./theme";

/*
coloR
*/

export default {
	name: "App",
	data() {
		return {
			themeColors: [],
			hueValue: 100,
			saturationValue: 100,
			lightnessValue: 100
		};
	},
	mounted() {
		const regexToGrabColors = /"#......"/gm;
		const themeColorsSet = new Set([]);
		theme.match(regexToGrabColors).forEach((matchingColor) => {
			themeColorsSet.add(matchingColor.slice(1, matchingColor.length - 1));
		});
		this.themeColors = Array.from(themeColorsSet);
	},
	methods: {
		shiftColor(val) {
			const rgb = colorutil.hex.to.rgb(val);
			const hsl = colorutil.rgb.to.hsl(rgb);
			hsl.h *= this.hueValue / 100;
			hsl.s *= this.saturationValue / 100;
			hsl.l *= this.lightnessValue / 100;
			const rgba = colorutil.hsl.to.csshsl(hsl);
			return rgba;
		}
	},
	computed: {
		turnedColor() {
			return this.themeColors.map((color) => {
				return this.shiftColor(color);
			});
		}
	}
};
</script>

<style scoped>
.colorSquare {
	width: 25px;
	height: 25px;
	display: inline-flex;
}
</style>
