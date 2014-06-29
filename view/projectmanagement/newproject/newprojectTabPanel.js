Ext.define('MyDesktop.view.projectmanagement.newproject.newprojectTabPanel',{
		extend:'Ext.tab.Panel',
		id:'newprojecttab',
		alias:'widget.newprojecttab',
		
	requires:['MyDesktop.view.projectmanagement.newproject.NewProjectAddForm','MyDesktop.view.projectmanagement.newproject.budget.newprojectBudgetForm' ,'MyDesktop.view.projectmanagement.newproject.schedule.newprojectScheduleForm'
		,'MyDesktop.view.projectmanagement.newproject.team.newprojectTeamForm' ],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                    items: [{xtype:'newprojectaddform'},{xtype:'newprojectBudgetform'},{xtype:'newprojectScheduleform'},{xtype:'newprojectTeamform'}]
	});