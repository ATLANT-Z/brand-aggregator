import {ExportAll, ExportItem} from "@/store/models/export";

export default {
	state: {},
	getters: {
		getExportMarginList: (state, getters, rootState, rootGetters): ExportItem[] => {
			return rootGetters.getExportTab.exports;
		},
		getExportAll: (state, getters, rootState, rootGetters): ExportAll => {
			return rootGetters.getExportTab.exportAll;
		},
	},
};
