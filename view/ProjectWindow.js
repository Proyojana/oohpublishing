/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.view.ProjectWindow', {

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
	id:'project-win',
	
	init : function() {
		//
		this.launcher = {
			text: 'Project Management',
			iconCls:'smallProjects',
		};
		this.callParent();
		
	},
	
	createWindow : function() {
		
  
		var flag=0;
		
		var navs = Ext.create('MyDesktop.view.projectmanagement.MasterNav');
		navs.getSelectionModel().on('select', function(selModel, record) {
			var selectedNode = navs.getSelectionModel().getSelection();
			Ext.getCmp('content-panel8').layout.setActiveItem(selectedNode[0].data.id+'tab');
		});
		var dashboard = Ext.create('MyDesktop.view.projectmanagement.DashboardTabPanel');
	var tab1 = Ext.create('MyDesktop.view.projectmanagement.currentprojects.projectmanagementTabPanel');
	var newproject = Ext.create('MyDesktop.view.projectmanagement.newproject.newprojectTabPanel');
	var editproject = Ext.create('MyDesktop.view.projectmanagement.editproject.editprojectTabPanel');
	var report = Ext.create('MyDesktop.view.projectmanagement.Reports.ProjectReportTabPanel');
	//var course = Ext.create('MyDesktop.view.courses.CourseTabPanel');
	//var setting = Ext.create('MyDesktop.view.settings.SettingTabPanel');
var completedproject = Ext.create('MyDesktop.view.projectmanagement.completedprojects.projectmanagementTabPanel');
	
	
			var contentPanel8 = {
			id: 'content-panel8',
			region: 'center', // this is what makes this panel into a region within the containing layout
			layout: 'card',
			margins: '2 5 5 0',
			activeItem: 0,
			border: false,
			items: [dashboard,tab1,newproject,editproject,completedproject,report]
		};
 
		var desktop = this.app.getDesktop();
	
		var win = desktop.getWindow('master-win');
		
		//	Ext.getBody().unmask();
		if(!win) {
			win = desktop.createWindow({
				id: 'project-win',
				title:'Project Management',
				iconCls: 'smallProjects',
				maximized: true,
				animCollapse:false,
				//loadMask:true,
				constrainHeader:true,
				//setLoading:true,
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
					title: 'Dashboard',
					split: true,
					rootVisible: false,
					autoScroll: true,
					items: [navs]
				},contentPanel8]

			});
		}
		return win;
	
	},
});
