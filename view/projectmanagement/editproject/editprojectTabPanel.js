Ext.define('MyDesktop.view.projectmanagement.editproject.editprojectTabPanel',{
		extend:'Ext.tab.Panel',
		id:'editprojecttab',
		alias:'widget.editprojecttab',
		
	requires:['MyDesktop.view.projectmanagement.editproject.ProjectList' ],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                    items: [{xtype:'projectlist'}/*,{xtype:'newprojectBudgetForm'},{xtype:'newprojectScheduleform'},{xtype:'newprojectTeamform'}*/]
	});