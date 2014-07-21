Ext.define('MyDesktop.view.projectmanagement.editproject.editprojectTabPanel',{
		extend:'Ext.tab.Panel',
		id:'editprojecttab',
		alias:'widget.editprojecttab',
		
	requires:['MyDesktop.view.projectmanagement.editproject.EditProjectAddForm'/*,'MyDesktop.view.projectmanagement.newprojectBudget.newprojectBudgetForm' ,'MyDesktop.view.projectmanagement.newproject.schedule.newprojectScheduleForm'
		,'MyDesktop.view.projectmanagement.newproject.team.newprojectTeamForm' */],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                    items: [{xtype:'editprojectaddform'}/*,{xtype:'newprojectBudgetForm'},{xtype:'newprojectScheduleform'},{xtype:'newprojectTeamform'}*/]
	});