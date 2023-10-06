declare module '@babel/plugin-syntax-jsx' {
	import type { PluginObj } from '@babel/core';

	declare const plugin: PluginObj & { default?: PluginObj };
	export default plugin;
}
