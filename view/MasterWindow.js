/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.view.MasterWindow', {

	extend: 'Ext.ux.desktop.Module',
	
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
		var tab1 = "undefined";
		var userstab = "undefined";
		var vendors = "undefined";
		var workflow = "undefined";
		var production = "undefined";
		var customer = Ext.create('MyDesktop.view.mastermanagement.Customers.CustomersTabPanel');
		var servicetab = "undefined";
		var template = "undefined";
		var myprofile = "undefined";

		var contentPanel9 = Ext.create('Ext.panel.Panel',{
			
			id: 'content-panel9',
			region: 'center', // this is what makes this panel into a region within the containing layout
			layout: 'card',
			margins: '2 5 5 0',
			activeItem: 0,
			border: false,
			items: [customer]
		});
		var navs = Ext.create('MyDesktop.view.mastermanagement.MasterNav');
		navs.getSelectionModel().on('select', function(selModel, record) {
			
			var selectedNode = navs.getSelectionModel().getSelection();
			switch(selectedNode[0].data.id){
				case 'vendors' :
					if (vendors == "undefined") {
						vendors = Ext.create('MyDesktop.view.mastermanagement.Vendors.VendorsTabPanel');
						contentPanel9.add(vendors);
						contentPanel9.doLayout(); 
					}
					break;
				case 'workflow' :
					if (workflow == "undefined") {
						workflow= Ext.create('MyDesktop.view.mastermanagement.Workflow.WorkflowTabPanel');
						contentPanel9.add(workflow);
						contentPanel9.doLayout(); 
					}
					break;
				case 'customers' :
					break;
				case 'service' :
					if (servicetab == "undefined") {
						servicetab= Ext.create('MyDesktop.view.mastermanagement.Services.ServiceTabPanel');
						contentPanel9.add(servicetab);
						contentPanel9.doLayout(); 
					}
					break;
				case 'production' :
					if (production == "undefined") {
						production = Ext.create('MyDesktop.view.mastermanagement.ProductionStages.ProductionTabPanel');
						contentPanel9.add(production);
						contentPanel9.doLayout(); 
					}
					break;
				case 'troles' :
					if (tab1 == "undefined") {
						tab1 = Ext.create('MyDesktop.view.mastermanagement.mastermanagementTabPanel');
						contentPanel9.add(tab1);
						contentPanel9.doLayout(); 
					}
					break;
				case 'users' :
					if (userstab == "undefined") {
						userstab = Ext.create('MyDesktop.view.mastermanagement.Users.UsersTabPanel');
						contentPanel9.add(userstab);
						contentPanel9.doLayout(); 
					}
					break;
				case 'template' :
					if (template == "undefined") {
						template = Ext.create('MyDesktop.view.mastermanagement.EmailTemplate.TemplateTabPanel');
						contentPanel9.add(template);
						contentPanel9.doLayout(); 
					}
					break;
				case 'myprofile' :
					if (myprofile == "undefined") {
						myprofile = Ext.create('MyDesktop.view.mastermanagement.MyProfile.MyProfileTabPanel');
						contentPanel9.add(myprofile);
						contentPanel9.doLayout(); 
					}
					break;	
					
			}
			contentPanel9.layout.setActiveItem(selectedNode[0].data.id+'tab');
			
		});
		
		

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
				closeAction:'hide',
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
	//this.callParent(arguments);
});
