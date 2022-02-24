import {errorService} from "@/store/models/errorService";

export class TreeItemData {
	parent: TreeItemData | null = null;

	id: number;
	active: boolean;
	title: string;
	children: TreeItemData[] = [];

	constructor(data, id, parent, TYPE) {
		this.id = id;
		this.active = !!data.active;
		this.title = data.title;

		this.parent = parent ?? null;

		if (data.children) {
			this.children = data.children.map(el => new TYPE(el, this));
		}
	}

	static findById(id: number | string, tree: TreeItemData[]): TreeItemData | undefined {
		if (id === undefined || id === null || !tree) {
			errorService.addError(`Лажа с данными в дереве`);
			debugger
			return undefined;
		}
		let treeItem = tree.find(el => el.id === id);
		if (treeItem) return treeItem;

		for (let i = 0; i < tree.length; i++) {
			treeItem = TreeItemData.findById(id, tree[i].children)
			if (treeItem) return treeItem;
		}

		return treeItem;
	}

	getFullTitle(): string {
		if (this.parent)
			return this.parent.getFullTitle() + ' / ' + this.title;
		else
			return this.title
	}

	setActive(val) {
		this.active = val;
	}

	valid(...args: any[]) {
	}
}

