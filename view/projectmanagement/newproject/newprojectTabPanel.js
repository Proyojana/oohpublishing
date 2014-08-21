Ext.define('MyDesktop.view.projectmanagement.newproject.newprojectTabPanel',{
		extend:'Ext.tab.Panel',
		id:'newprojecttab',
		alias:'widget.newprojecttab',
		
	requires:['MyDesktop.view.projectmanagement.newproject.NewProjectAddForm','MyDesktop.view.projectmanagement.newprojectBudget.newprojectBudgetForm' ,'MyDesktop.view.projectmanagement.newproject.schedule.newprojectScheduleForm'
		,'MyDesktop.view.projectmanagement.newproject.team.newprojectTeamForm','MyDesktop.view.projectmanagement.newproject.author.newprojectAuthorForm','MyDesktop.view.projectmanagement.newproject.notes.newprojectNotesForm','MyDesktop.view.projectmanagement.newproject.artwork.newprojectArtworkForm' ],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
				/*	listeners: {
						afterrender:function(){
							
							Ext.getCmp('newprojectauthorformTab').setDisabled(true);
							Ext.getCmp('newprojectbudgetformTab').setDisabled(true);
							Ext.getCmp('newprojectscheduleformTab').setDisabled(true);
							Ext.getCmp('newprojectteamformTab').setDisabled(true);
						}
					},*/
					
                    items: [{xtype:'newprojectaddform'},
                    {
                    	id:'newprojectauthorformTab',
                    	xtype:'newprojectauthorform'
                    },
                    {
                    	id:'newprojectbudgetformTab',
                    	xtype:'newprojectBudgetForm'
                    },
                    
                    {
                    	id:'newprojectscheduleformTab',
                    	xtype:'newprojectScheduleform'
                    },
                    {
                    	id:'newprojectteamformTab',
                    	xtype:'newprojectTeamform'
                    },
                    {
                       id:'newprojectnotesformTab',
                       xtype:'newprojectNotesform'
                    },
                    {
                    	  id:'newprojectartworkformTab',
                          xtype:'newprojectArtworkform'
                    }]
	});