/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.view.ProjectWindow', {

	extend: 'Ext.ux.desktop.Module',

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

		//var 
		var dashboard = "undefined";
		if(dashboard == "undefined")
			dashboard = Ext.create('MyDesktop.view.projectmanagement.DashboardTabPanel');
		var tab1 = "undefined";
		var newproject = "undefined";
		var editproject = "undefined";
		var report = "undefined";
		var completedproject = "undefined";
		var archives = "undefined";
		var win = "undefined";

		var contentPanel8 = Ext.create('Ext.panel.Panel', {
			id: 'content-panel8',
			region: 'center', // this is what makes this panel into a region within the containing layout
			layout: 'card',
			margins: '2 5 5 0',
			activeItem: 0,
			border: false,
			items: [dashboard]
		});
		var navs = Ext.create('MyDesktop.view.projectmanagement.MasterNav');

		/*navs.getSelectionModel().on('select', function(selModel, record) {
			var selectedNode = navs.getSelectionModel().getSelection();
			console.log(selectedNode[0].data.id)
			switch(selectedNode[0].data.id) {
				case 'newproject':
					if(newproject == "undefined") {
						newproject = Ext.create('MyDesktop.view.projectmanagement.newproject.newprojectTabPanel');
						contentPanel8.add(newproject);
						contentPanel8.doLayout();
					}
					break;
				case 'editproject':
					if(editproject == "undefined") {
						editproject = Ext.create('MyDesktop.view.projectmanagement.editproject.editprojectTabPanel');
						contentPanel8.add(editproject);
						contentPanel8.doLayout();
					}
					break;
				case 'projectmanagement':
					if(tab1 == "undefined") {
						tab1 = Ext.create('MyDesktop.view.projectmanagement.currentprojects.projectmanagementTabPanel');
						contentPanel8.add(tab1);
						contentPanel8.doLayout();
					}
					break;
				case 'projectmanagementCP':
					if(completedproject == "undefined") {
						completedproject = Ext.create('MyDesktop.view.projectmanagement.completedprojects.projectmanagementTabPanel');
						contentPanel8.add(completedproject);
						contentPanel8.doLayout();
					}
					break;
				case 'projectreport':
					if(report == "undefined") {
						report = Ext.create('MyDesktop.view.projectmanagement.Reports.ProjectReportTabPanel');
						contentPanel8.add(report);
						contentPanel8.doLayout();
					}
					break;
				case 'archives':
					if(archives == "undefined") {
						archives = Ext.create('MyDesktop.view.projectmanagement.Archives.ArchivesTabPanel');
						contentPanel8.add(archives);
						contentPanel8.doLayout();
					}
					break;
			}
			Ext.getCmp('content-panel8').layout.setActiveItem(selectedNode[0].data.id+'tab');
		});*/
		var desktop = this.app.getDesktop();

		
		if(win=="undefined")
		{
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
				closeAction: 'hide',
				width: 600,
				minWidth: 600,
				height: 600,
				layout: {
					type: 'border',
					padding: 5
				}/*,
				items: [{
					region: 'west',
					title: 'Dashboard',
					split: true,
					rootVisible: false,
					autoScroll: true,
					items: [navs]
				},contentPanel8]*/

			});
		}
		else
		{
			win = desktop.getWindow('project-win');
		}
		console.log(win);
		return win;

	},
});