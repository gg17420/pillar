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
	// 新增浏览器配置
	addTargetBrowser(config) {
		if (config.name) {
			this.targetBrowsers.push(config);
		} else {
			throw new Error('新增浏览器名称不可为空');
		}	
	}
	// 获取代理版本号
	getVersion(prefix, division) {
		const regExp = new RegExp(`${prefix + division}([\\d\.]+)`, 'gi');
		const result = regExp.exec(this.userAgent);
		if (result) {
			return result[1];
		} else {
			return null;
		}		
	}
	// 常规代理版本号
	useCommonRuler(prefix) {
		return this.getVersion(prefix, '/');
	}
	// IE代理版本号
	useIERuler() {
		return this.getVersion('msie', ' ') || '11.0';
	}
	// 设置代理
	setAgent() {
		for (const item of this.targetBrowsers) {
			if (item.name) {
				item.prefix = item.prefix || item.name;
				item.level = item.level || 1;
				item.version = item.version || this.useCommonRuler;
				if (this.userAgent.incloudes(item.prefix)) {
					this.agents[item.name] = item.version.bind(this)(item.prefix);
				}
			} else {
				throw new Error('无此浏览器名称');
			}
		}
	}
	// 获取代理
	getAgent() {
		if (Object.keys(this.agents)) {
			this.setAgent();
		}
		return this.agents;
	}
	// 验证代理
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
	// 获取具体浏览器
	getBrowser() {
		let level = Object.keys(this.agents).length;
		if (level) {
			this.setAgent();
		}
		for (const item of this.targetBrowsers) {
			if (this.agents[item.name] && item.level === level ) {
				this.browser[item.name] = this.agents[item.name];
				return {name: item.name, version: this.agents[item.name]};
			}
		}
		return null;
	}
	// 验证具体浏览器
	testBrowser(config) {
		let name = '';
		if (Object.keys(this.browser)) {
			this.getBrowser();
		} else {
			name = config[this.browser.name];
		}
		if (name && parseFloat(browser.version) >= parseFloat(config[browser.name])) {
			return true;
		}
		return false;
	}
}
