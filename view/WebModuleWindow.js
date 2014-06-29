/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.view.WebModuleWindow', {

	extend: 'Ext.ux.desktop.Module',

	requires: [
	'Ext.tab.*',
	'Ext.window.*',
	'Ext.tip.*',
	'Ext.layout.container.Border',
	'Ext.data.ArrayStore',
	'Ext.util.Format',
	'Ext.grid.*',
	'Ext.grid.Panel',
	'Ext.grid.RowNumberer',
	'MyDesktop.store.MasterNavTree',
	'Ext.tree.Panel'
	
	],
	id:'webmodule-win',
	
	init : function() {
		this.launcher = {
			text: 'Web Module',
			iconCls:'',
		};
		this.callParent();
	},
	createWindow : function() {
		

		var flag=0;
		//var navs = Ext.create('MyDesktop.view.author_articles.ArticlesNav');
		//navs.getSelectionModel().on('select', function(selModel, record) {
		//	var selectedNode = navs.getSelectionModel().getSelection();
			//Ext.getCmp('content-panelA').layout.setActiveItem(selectedNode[0].data.id+'tab');
		//});
	
		var webmoduletab = Ext.create('MyDesktop.view.webmodule.WebModuleTabPanel');
		//var archive= Ext.create('MyDesktop.view.article_archives.ArchivesTabPanel');
		var contentPanelA = {
			id: 'content-panelA',
			region: 'center', // this is what makes this panel into a region within the containing layout
			layout: 'card',
			margins: '2 5 5 0',
			activeItem: 0,
			border: false,
			items: [webmoduletab]
		};

		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('webmodule-win');
		if(!win) {
			win = desktop.createWindow({
				id: 'webmodule-win',
				title:'',
				iconCls: 'articleClass',
				maximized: true,
				animCollapse:false,
				constrainHeader:true,
				closable: true,
				width: 600,
				minWidth: 600,
				height: 600,
				layout: {
					type: 'border',
					padding: 5
				},
				items: [{
					region: 'west',
					title: 'Articles',
					split: true,
					rootVisible: false,
					autoScroll: true,
					//items: [navs]
				},contentPanelA]

			});
		}
		return win;
	},
});
