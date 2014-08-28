/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.view.MasterWindow', {

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
	id:'master-win',
	init : function() {
		this.launcher = {
			text: 'Master Management',
			iconCls:'masterClass',
		};
		this.callParent();
	},
	createWindow : function() {
		

		var flag=0;
		
		var navs = Ext.create('MyDesktop.view.mastermanagement.MasterNav');
		navs.getSelectionModel().on('select', function(selModel, record) {
			var selectedNode = navs.getSelectionModel().getSelection();
			Ext.getCmp('content-panel9').layout.setActiveItem(selectedNode[0].data.id+'tab');
		});
		
	var tab1 = Ext.create('MyDesktop.view.mastermanagement.mastermanagementTabPanel');
//var teamstab = Ext.create('MyDesktop.view.mastermanagement.Teams.TeamsTabPanel');
	var userstab = Ext.create('MyDesktop.view.mastermanagement.Users.UsersTabPanel');
	var vendors = Ext.create('MyDesktop.view.mastermanagement.Vendors.VendorsTabPanel');
	var production = Ext.create('MyDesktop.view.mastermanagement.ProductionStages.ProductionTabPanel');
	var customer = Ext.create('MyDesktop.view.mastermanagement.Customers.CustomersTabPanel');
var servicetab = Ext.create('MyDesktop.view.mastermanagement.Services.ServiceTabPanel');
	var workflow = Ext.create('MyDesktop.view.mastermanagement.Workflow.WorkflowTabPanel');
	//var setting = Ext.create('MyDesktop.view.settings.SettingTabPanel');
//var troles= Ext.create('MyDesktop.view.mastermanagement.TeamRoles.TeamRolesTabPanel');
	
	
			var contentPanel9 = {
			id: 'content-panel9',
			region: 'center', // this is what makes this panel into a region within the containing layout
			layout: 'card',
			margins: '2 5 5 0',
			activeItem: 0,
			border: false,
			items: [customer,tab1,servicetab,userstab,production,vendors,workflow]
		};

		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('master-win');
		if(!win) {
			win = desktop.createWindow({
				id: 'master-win',
				title:'Master Management',
				iconCls: 'masterClass',
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
					title: 'Masters',
					split: true,
					rootVisible: false,
					autoScroll: true,
					items: [navs]
				},contentPanel9]

			});
		}
		return win;
	},
});
