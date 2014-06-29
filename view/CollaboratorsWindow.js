/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.view.CollaboratorsWindow', {

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
	id:'collaborators-win',
	init : function() {
		this.launcher = {
			text: 'Collaborators',
			iconCls:'collaboratorsClass',
		};
		this.callParent();
	},
	createWindow : function() {
		

		var flag=0;
		var navs = Ext.create('MyDesktop.view.collaborators.CollaboratorsNav');
		navs.getSelectionModel().on('select', function(selModel, record) {
			var selectedNode = navs.getSelectionModel().getSelection();
			Ext.getCmp('content-panelC').layout.setActiveItem(selectedNode[0].data.id+'tab');
		});
	
		var current = Ext.create('MyDesktop.view.collaborators.CurrentCollaboratorsTabPanel');
		var earlier= Ext.create('MyDesktop.view.earliercollaborators.EarlierCollaboratorsTabPanel');
		var prospects= Ext.create('MyDesktop.view.collaboratorprospects.ProspectsTabPanel');
		
		var contentPanelA = {
			id: 'content-panelC',
			region: 'center', // this is what makes this panel into a region within the containing layout
			layout: 'card',
			margins: '2 5 5 0',
			activeItem: 0,
			border: false,
			items: [current,earlier,prospects]
		};

		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('collaborators-win');
		if(!win) {
			win = desktop.createWindow({
				id: 'collaborators-win',
				title:'Collaborators',
				iconCls: 'collaboratorsClass',
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
					title: 'Collaborators',
					split: true,
					rootVisible: false,
					autoScroll: true,
					items: [navs]
				},contentPanelA]

			});
		}
		return win;
	},
});
