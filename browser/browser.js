export default class Browser {
	constructor() {
		this.userAgent = navigator.userAgent.toLowerCase();
		this.targetBrowsers = [
			{name: 'chrome', level: 2}, 
			{name: 'firefox'},
			{name: 'safari'}, 
			{name: 'edge', level: 3}, 
			{name: 'opera', level: 3, prefix: 'opr'},
			{name: 'ie', prefix:'trident', version: this.useIERuler}
		];
		this.agents = {};
		this.browser = {};
	}
	addTargetBrowser(config) {
		if (config.name) {
			this.targetBrowsers.push(config);
		} else {
			throw new Error('新增浏览器名称不可为空');
		}	
	}
	getVersion(prefix, division) {
		let regExp = new RegExp(prefix + division + '([\\d\.]+)', 'gi'),
			result = regExp.exec(this.userAgent);
		if (result) {
			return result[1];
		} else {
			return null;
		}		
	}
	useCommonRuler(prefix) {
		return this.getVersion(prefix, '\/');
	}
	useIERuler() {
		return this.getVersion('msie', ' ') || '11.0';
	}
	setAgent() {
		for (let item of this.targetBrowsers) {
			if (item.name) {
				item.prefix = item.prefix || item.name;
				item.level = item.level || 1;
				item.version = item.version || this.useCommonRuler;
				if (this.userAgent.indexOf(item.prefix) !== -1) {
					this.agents[item.name] = item.version.bind(this)(item.prefix);
				}
			} else {
				throw new Error('无此浏览器名称');
			}
		}
	}
	getAgent() {
		if (Object.keys(this.agents)) {
			this.setAgent();
		}
		return this.agents;
	}
	testAgent(config) {
		if (Object.keys(this.agents)) {
			this.setAgent();
		}
		for (let item of Object.keys(config)) {
			if (this.agents[item] && parseFloat(this.agents[item]) >= parseFloat(config[item])) {
				return true;
			}
		}
		return false;
	}
	getBrowser() {
		let level = Object.keys(this.agents).length;
		if (level) {
			this.setAgent();
		}
		for (let item of this.targetBrowsers) {
			if (this.agents[item.name] && item.level === level ) {
				this.browser[item.name] = this.agents[item.name];
				return {name: item.name, version: this.agents[item.name]};
			}
		}
		return null;
	}
	testBrowser(config) {
		if (Object.keys(this.browser)) {
			this.getBrowser();
		}
		if (config[browser.name] && parseFloat(browser.version) >= parseFloat(config[browser.name])) {
			return true;
		}
		return false;
	}
}