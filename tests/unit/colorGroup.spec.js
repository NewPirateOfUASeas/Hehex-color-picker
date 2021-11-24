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

const expectedHtml = `<h2>Group 9:</h2> Hue: <input step="1" type="number"> Saturation: <input step="1" type="number"> Lightness: <input step="1" type="number">
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

const expectedEmit = {
	"shifted-colors": [
		[
			[
				{
					csshsl: "hsl(305,41%,31%)",
					hsl: { a: 1, h: 0.8463541666666666, l: 0.30980392156862746, s: 0.4050632911392405 },
					initialHex: "#6f2f6a"
				},
				{
					csshsl: "hsl(300,73%,50%)",
					hsl: { a: 1, h: 0.8333333333333334, l: 0.5, s: 0.7333333333333334 },
					initialHex: "#dd22dd"
				},
				{
					csshsl: "hsl(300,100%,50%)",
					hsl: { a: 0.2, h: 0.8333333333333334, l: 0.5, s: 1 },
					initialHex: "#ff00ff33"
				},
				{
					csshsl: "hsl(299,66%,51%)",
					hsl: { a: 1, h: 0.8303212851405622, l: 0.5098039215686274, s: 0.6639999999999999 },
					initialHex: "#d22fd5"
				},
				{
					csshsl: "hsl(288,31%,43%)",
					hsl: { a: 1, h: 0.8009950248756219, l: 0.4294117647058824, s: 0.3059360730593607 },
					initialHex: "#824c8f"
				},
				{
					csshsl: "hsl(282,100%,40%)",
					hsl: { a: 1, h: 0.7843137254901961, l: 0.4, s: 1 },
					initialHex: "#9000cc"
				},
				{
					csshsl: "hsl(281,48%,51%)",
					hsl: { a: 1, h: 0.7800546448087431, l: 0.5058823529411764, s: 0.48412698412698413 },
					initialHex: "#9744be"
				},
				{
					csshsl: "hsl(280,100%,45%)",
					hsl: { a: 1, h: 0.7768115942028985, l: 0.45098039215686275, s: 1 },
					initialHex: "#9800e6"
				}
			]
		],
		[
			[
				{
					csshsl: "hsl(305,41%,31%)",
					hsl: { a: 1, h: 0.8477541666666666, l: 0.30980392156862746, s: 0.4050632911392405 },
					initialHex: "#6f2f6a"
				},
				{
					csshsl: "hsl(301,73%,50%)",
					hsl: { a: 1, h: 0.8347333333333333, l: 0.5, s: 0.7333333333333334 },
					initialHex: "#dd22dd"
				},
				{
					csshsl: "hsl(301,100%,50%)",
					hsl: { a: 0.2, h: 0.8347333333333333, l: 0.5, s: 1 },
					initialHex: "#ff00ff33"
				},
				{
					csshsl: "hsl(299,66%,51%)",
					hsl: { a: 1, h: 0.8317212851405622, l: 0.5098039215686274, s: 0.6639999999999999 },
					initialHex: "#d22fd5"
				},
				{
					csshsl: "hsl(289,31%,43%)",
					hsl: { a: 1, h: 0.8023950248756219, l: 0.4294117647058824, s: 0.3059360730593607 },
					initialHex: "#824c8f"
				},
				{
					csshsl: "hsl(283,100%,40%)",
					hsl: { a: 1, h: 0.785713725490196, l: 0.4, s: 1 },
					initialHex: "#9000cc"
				},
				{
					csshsl: "hsl(281,48%,51%)",
					hsl: { a: 1, h: 0.781454644808743, l: 0.5058823529411764, s: 0.48412698412698413 },
					initialHex: "#9744be"
				},
				{
					csshsl: "hsl(280,100%,45%)",
					hsl: { a: 1, h: 0.7782115942028984, l: 0.45098039215686275, s: 1 },
					initialHex: "#9800e6"
				}
			]
		]
	]
};

describe("color group", () => {
	const wrapper = mount(ColorGroup, {
		props: {
			group,
			index
		}
	});
	const trimmedHtml = wrapper.html().trim();
	it("renders color elements", () => {
		expect(trimmedHtml).toBe(expectedHtml);
	});
	it("shifts colors", async () => {
		await wrapper.setData({ hueShift: 0.14 });
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted()).toStrictEqual(expectedEmit);
	});
});
