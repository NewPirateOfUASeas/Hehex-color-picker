<template>
	<h2>Group {{ index + 1 }}:</h2>
	Hue:
	<input step="1" type="number" v-model="hueShift" />
	Saturation:
	<input step="1" type="number" v-model="saturationShift" />
	Lightness:
	<input step="1" type="number" v-model="lightnessShift" />
	<div>
		<div
			class="colorSquare"
			v-for="(color, index) in shiftedColors"
			:key="index"
			:style="`background-color: ${color.csshsl}`"
		/>
	</div>
</template>

<script>
import colorutil from "color-util";

export default {
	name: "ColorGroup",
	props: {
		group: {
			type: Object,
			required: true
		},
		index: {
			type: Number,
			required: true
		}
	},
	emits: ["shifted-colors"],
	data() {
		return {
			hueShift: 0,
			saturationShift: 0,
			lightnessShift: 0
		};
	},
	mounted() {
		this.emitShiftedColor();
	},
	methods: {
		emitShiftedColor() {
			this.$emit("shifted-colors", this.shiftedColors);
		}
	},
	computed: {
		shiftedColors() {
			const arr = this.group.map((color) => {
				const obj = {
					hsl: {
						h: color.hsl.h + 0.01 * this.hueShift,
						s: color.hsl.s + 0.01 * this.saturationShift,
						l: color.hsl.l + 0.01 * this.lightnessShift,
						a: color.hsl.a
					},
					initialHex: color.hex
				};
				obj.csshsl = colorutil.hsl.to.csshsl(obj.hsl);
				return obj;
			});
			return arr;
		}
	},
	watch: {
		shiftedColors: function () {
			this.emitShiftedColor();
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
