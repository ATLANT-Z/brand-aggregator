import {createStore} from 'vuex'
import exportMargin from "@/store/modules/exportMargin.ts";
import {BrandData, BrandTab, CategoryTab, ExportTab, MarginItem} from "@/store/models/export";
import axios from "axios";

export default createStore({
	state: {
		brandData: new BrandData(null)
	},
	getters: {
		suppID(state) {
			return state.brandData.suppID;
		},
		getMutableMarginItem: () => (item): MarginItem => item,

		getExportTab: (state): ExportTab => {
			return state.brandData.exportTab;
		},

		getBrandTab: (state): BrandTab => {
			return state.brandData.brandTab;
		},

		getCategoryTab: (state): CategoryTab => {
			return state.brandData.categoryTab;
		},
	},
	mutations: {
		initBrandData(state, data) {
			state.brandData = new BrandData(data);
		},
	},
	actions: {
		saveExportData({getters}) {
			const tab = getters.getExportTab;
			axios.post(tab.postUrl, {
				supplierID: getters.suppID,
				exports: tab.exports,
				exportAll: tab.exportAll
			}).then(data => {
				console.log(data);
			});
		},
		saveBrandData({getters}) {
			const tab = getters.getBrandTab;
			axios.post(tab.postUrl, {
				supplierID: getters.suppID,
				brands: tab.brands,
			}).then(data => {
				console.log(data);
			});
		},

		saveCategoryData({getters}) {
			const tab = getters.getCategoryTab;
			axios.post(tab.postUrl, {
				supplierID: getters.suppID,
				categories: tab.categories,
			}).then(data => {
				console.log(data);
			});
		},
	},
	modules: {
		exportMargin,
	}
})

