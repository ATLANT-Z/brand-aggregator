import {TreeItemData} from "@/store/models/treeItemData";
import {uid} from "@/store/models/tools";
import {errorService} from "@/store/models/errorService";

//Элемент дерева экспорта
export class ExportTreeItem extends TreeItemData {
	constructor(data: any, parent?: TreeItemData) {
		//Передаю тип самого себя вниз
		super(data, +data?.exportId, parent, ExportTreeItem);
	}

	valid(exports: ExportItem[]) {
		this.active = !!exports.find(el => el.exportId === this.id);
		this.children.forEach(el => el.valid(exports));
	}
}

export class CategoryTreeItem extends TreeItemData {
	constructor(data: any, parent?: TreeItemData) {
		//Передаю тип самого себя вниз
		super(data, +data?.id, parent, CategoryTreeItem);
	}

	valid(categories: CategoryMarginItem[]) {
		this.active = !!categories.find(el => el.id === this.id);
		this.children.forEach(el => el.valid(categories));
	}
}


export class HasExports {
	exportList: ExportTreeItem[];
	exports: ExportItem[]

	valid() {
		this.exportList.forEach(el => el.valid(this.exports));
		this.exports.forEach(el => el.valid(this.exports));
	}

	constructor(exports: any[], exportList: any[]) {
		this.exportList = exportList.map(el => new ExportTreeItem(el));
		this.exports = exports.map(el => ExportItem.initFromJson(el, this.exportList));

		this.valid();
	}

	addExportMargin(val: ExportTreeItem) {
		if (this.exports.find(el => el.exportId === val.id))
			return errorService.addError(`Экспорт с таким айди уже есть в спике! [exportId: ${val.id}]`);

		val.setActive(true);
		this.exports.push(ExportItem.initFromTreeItem(val));
	}

	removeExportMarginById(id: number) {
		ExportTreeItem.findById(id, this.exportList)?.setActive(false);
		const index = this.exports.findIndex(el => el.exportId === id);
		if (index < 0) return errorService.addError(`Данного экспорта нет в списке наценок! [exportId: ${id}]`)

		this.exports.splice(index, 1);
	}
}

export class HasMargin {
	active: boolean;
	margin: MarginItem[];

	constructor(data: { margin: [], active?: boolean }) {
		this.active = data.active ?? true;

		this.margin = data.margin.map(el => new MarginItem(el, this))
		if (!this.margin.length) this.addEmpty();
	}

	//Может ли добавлять пользователь и показывать ли кнопку добавить
	get isCanAdd() {
		return this.margin.length < 3 && this.active;
	}

	private addEmpty() {
		this.margin.push(new MarginItem({
			value: 0,
			type: MarginType.грн
		}, this))
	}

	addMargin(): void {
		if (this.isCanAdd) this.addEmpty();
	}
}

// Строки с наценкой
export class ExportItem extends HasMargin {
	exportMarginId: number;
	exportId: number;
	title: string;

	valid(list: ExportItem[]) {
		let count = 0;
		list.forEach(el => {
			if (el.exportId === this.exportId) count++;
		});
		if (count > 1) errorService.addError(`Более одного объекта [exportId: ${this.exportId}] наценки на экспорт!`);
	}

	private constructor({exportMarginId, exportId, active, margin, title}) {
		super({margin, active});
		this.exportMarginId = exportMarginId;
		this.exportId = exportId;
		this.title = title;
	}

	static initFromJson({exportMarginId, exportId, active, margin}, exportList: ExportTreeItem[]): ExportItem {
		return new ExportItem({
			exportId,
			exportMarginId,
			active,
			title: ExportTreeItem.findById(exportId, exportList)?.getFullTitle() || 'Ошибка: Экспорт не найден',
			margin,
		});
	}

	static initFromTreeItem(val: ExportTreeItem, exportMarginId = 0): ExportItem {
		return new ExportItem({
			exportId: val.id,
			title: val.getFullTitle(),
			exportMarginId,
			active: true,
			margin: [{value: 0, type: MarginType.грн}],
		});
	}

	setActive(val) {
		this.active = val;
	}

	toJSON() {
		return {
			exportMarginId: this.exportMarginId,
			exportId: this.exportId,
			active: this.active,
			margin: this.margin
		}
	}
}


export class BrandData {
	suppID: number;
	exportTab: ExportTab;
	brandTab: BrandTab;
	categoryTab: CategoryTab;

	constructor(data) {
		if (!data) return;
		this.suppID = data.supplierID;
		this.exportTab = new ExportTab(data.exportTab, data.exportList);
		this.brandTab = new BrandTab(data.brandTab, data.exportList);
		this.categoryTab = new CategoryTab(data.categoryTab, data.exportList);

		if (data.errorText) {
			errorService.addError(data.errorText);
		}
	}
}

export class BrandTab {
	postUrl: string;
	brandList: Brand[]
	brands: BrandMarginItem[];

	constructor(data: any, public exportList: any[]) {
		this.postUrl = data.postUrl;
		this.brandList = data.brandList.map(el => new Brand(el));

		// margin и children приходят из json, а в бренд записываем умный объект с именем и айди из списка
		this.brands = data.brands.map(brandJson =>
			new BrandMarginItem({
				...brandJson,
				brand: this.brandList.find(brand => brand.name === brandJson.name) || new Brand('Ошибка, бренда с таким именем нет в списке брендов'),
			}, exportList)
		);
	}

	addBrand(brand: Brand) {
		const existItem = this.brands.find(el => el.brandId === brand.id);
		if (existItem) {
			existItem.blink();
			return errorService.addError(`Бренд ${brand.name} уже есть в списке наценок!`);
		}

		this.brands.push(new BrandMarginItem({brand, margin: [], exports: []}, this.exportList));
	}

	removeBrand(brand: BrandMarginItem) {
		const index = this.brands.findIndex(el => el.brandId === brand.brandId);
		this.brands.splice(index, 1);
	}
}

export class Brand {
	id: string = uid();
	name: string;

	constructor(name) {
		this.name = name;
	}
}


export class ExportTab extends HasExports {
	postUrl: string;
	exportAll: ExportAll;

	constructor(data: any, exportList: any) {
		super(data.exports, exportList);

		this.postUrl = data.postUrl;
		this.exportAll = new ExportAll(data.exportAll);

		this.valid();
	}
}

export class ExportAll extends HasMargin {
	constructor(data) {
		super(data);
	}
}


export class CategoryTab {
	postUrl: string;
	categoryList: CategoryTreeItem[]
	categories: CategoryMarginItem[];

	valid() {
		this.categoryList.forEach(el => el.valid(this.categories));
	}

	constructor(data: any, public exportList: any[]) {
		this.postUrl = data.postUrl;
		this.categoryList = data.categoryList.map(el => new CategoryTreeItem(el));

		// margin и children приходят из json, а в бренд записываем умный объект с именем и айди из списка
		this.categories = data.categories.map(categoryJson =>
			new CategoryMarginItem({
				...categoryJson,
				category: TreeItemData.findById(categoryJson.categoryId, this.categoryList),
			}, exportList)
		);

		this.valid();
	}

	addCategory(category: CategoryTreeItem) {
		const existItem = this.categories.find(el => el.id === category.id);
		if (existItem) {
			existItem.blink();
			return errorService.addError(`Бренд ${category.title} уже есть в списке наценок!`);
		}

		category.setActive(true);
		this.categories.push(new CategoryMarginItem({category, margin: [], exports: []}, this.exportList));
	}

	removeCategoryById(id: number) {
		const index = this.categories.findIndex(el => el.id === id);
		this.categories.splice(index, 1);
		CategoryTreeItem.findById(id, this.categoryList)?.setActive(false);
	}
}


export class BrandMarginItem extends HasExports {
	private brand: Brand;
	hasMargin: HasMargin;

	private timeoutID: number;
	isBlink: boolean = false;

	get brandId() {
		return this.brand.id;
	}

	get name() {
		return this.brand.name;
	}

	blink() {
		clearTimeout(this.timeoutID);
		this.isBlink = false;
		document.querySelector('#id-' + this.brandId)?.scrollIntoView({block: "center"});
		setTimeout(() => {
			this.isBlink = true;
			this.timeoutID = setTimeout(() => {
				this.isBlink = false;
			}, 2000);
		}, 100);
	}

	constructor({brand, margin, exports}, exportList: ExportTreeItem[]) {
		super(exports, exportList);

		this.brand = brand;
		this.hasMargin = new HasMargin({margin})
	}

	toJSON() {
		return {
			name: this.name,
			margin: this.hasMargin.margin,
			exports: this.exports
		}
	}
}

export class CategoryMarginItem extends HasExports {
	private category: CategoryTreeItem;
	hasMargin: HasMargin;

	private timeoutID: number;
	isBlink: boolean = false;

	get title() {
		return this.category.getFullTitle();
	}

	get id() {
		return this.category.id;
	}

	blink() {
		clearTimeout(this.timeoutID);
		this.isBlink = false;
		document.querySelector('#id-' + this.id)?.scrollIntoView({block: "center"});
		setTimeout(() => {
			this.isBlink = true;
			this.timeoutID = setTimeout(() => {
				this.isBlink = false;
			}, 2000);
		}, 100);
	}

	constructor({category, margin, exports}, exportList: ExportTreeItem[]) {
		super(exports, exportList);
		this.category = category;
		this.hasMargin = new HasMargin({margin})
	}

	toJSON() {
		return {
			categoryId: this.category.id,
			margin: this.hasMargin.margin,
			exports: this.exports
		}
	}
}


//Наценка
export class MarginItem {
	parent: HasMargin;
	id: string = uid();
	value: number;
	type: any;

	constructor({value, type}, parent: HasMargin) {
		this.value = value;
		this.type = type;
		this.parent = parent;
	}

	get isCanRemove() {
		return this.parent.margin.length > 1;
	}

	remove() {
		if (!this.isCanRemove) return;

		const index = this.parent.margin.findIndex(el => this.id === el.id);
		this.parent.margin.splice(index, 1);
	}

	toJSON() {
		return {
			value: +this.value,
			type: +this.type
		}
	}
}

export enum MarginType {
	'грн' = 1,
	'%',
	'-грн',
	'-%'
}
