import ColorGroup from "@/components/ColorGroup.vue";
import { mount } from "@vue/test-utils";

const group = [
	{
		hex: "#6f2f6a",
		hsl: { h: 0.8463541666666666, s: 0.4050632911392405, l: 0.30980392156862746, a: 1 },
		csshsl: "hsl(305,41%,31%)"
	},
	{ hex: "#dd22dd", hsl: { h: 0.8333333333333334, s: 0.7333333333333334, l: 0.5, a: 1 }, csshsl: "hsl(300,73%,50%)" },
	{ hex: "#ff00ff33", hsl: { h: 0.8333333333333334, s: 1, l: 0.5, a: 0.2 }, csshsl: "hsl(300,100%,50%)" },
	{
		hex: "#d22fd5",
		hsl: { h: 0.8303212851405622, s: 0.6639999999999999, l: 0.5098039215686274, a: 1 },
		csshsl: "hsl(299,66%,51%)"
	},
	{
		hex: "#824c8f",
		hsl: { h: 0.8009950248756219, s: 0.3059360730593607, l: 0.4294117647058824, a: 1 },
		csshsl: "hsl(288,31%,43%)"
	},
	{ hex: "#9000cc", hsl: { h: 0.7843137254901961, s: 1, l: 0.4, a: 1 }, csshsl: "hsl(282,100%,40%)" },
	{
		hex: "#9744be",
		hsl: { h: 0.7800546448087431, s: 0.48412698412698413, l: 0.5058823529411764, a: 1 },
		csshsl: "hsl(281,48%,51%)"
	},
	{ hex: "#9800e6", hsl: { h: 0.7768115942028985, s: 1, l: 0.45098039215686275, a: 1 }, csshsl: "hsl(280,100%,45%)" }
];
const index = 8;

const string = `<h2>Group 9:</h2> Hue: <input step="1" type="number"> Saturation: <input step="1" type="number"> Lightness: <input step="1" type="number">
<div>
  <div class="colorSquare" style="background-color: rgb(47, 47, 47);"></div>
  <div class="colorSquare" style="background-color: rgb(34, 34, 34);"></div>
  <div class="colorSquare" style="background-color: rgb(0, 0, 0);"></div>
  <div class="colorSquare" style="background-color: rgb(48, 48, 48);"></div>
  <div class="colorSquare" style="background-color: rgb(76, 76, 76);"></div>
  <div class="colorSquare" style="background-color: rgb(0, 0, 0);"></div>
  <div class="colorSquare" style="background-color: rgb(70, 70, 70);"></div>
  <div class="colorSquare" style="background-color: rgb(0, 0, 0);"></div>
</div>`;

describe("color group", () => {
	it("renders color elements", () => {
		const wrapper = mount(ColorGroup, {
			props: {
				group,
				index
			}
		});
		const trimmedHtml = wrapper.html().trim();
		expect(trimmedHtml).toBe(string);
	});
});
