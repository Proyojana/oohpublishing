var sm = Ext.create('Ext.selection.CheckboxModel', {
	checkOnly : true
});

Ext.define('MyDesktop.view.projectmanagement.editproject.ProjectList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.projectlist',
	closeAction : 'hide',
	selModel : sm,
	height : 250,
	title : 'Projects',
	requires : ['MyDesktop.store.EditProjects', 'MyDesktop.view.projectmanagement.editproject.EditProjectAddForm', 'MyDesktop.view.projectmanagement.editproject.author.AuthorGrid', 'MyDesktop.view.projectmanagement.editproject.author.ContribGrid', 
	'MyDesktop.view.projectmanagement.editproject.budget.accountPayableGrid', 'MyDesktop.view.projectmanagement.editprojectBudget.accountsReceivableForm','MyDesktop.view.projectmanagement.editproject.team.TeamGrid',
	'MyDesktop.view.projectmanagement.editproject.budget.accountsReceivableForm','MyDesktop.view.projectmanagement.editproject.schedule.editprojectScheduleGrid','MyDesktop.view.projectmanagement.editproject.team.TeamAddForm',
	'MyDesktop.view.projectmanagement.editproject.author.AuthorHeaderForm','MyDesktop.view.projectmanagement.editproject.budget.BudgetHeaderForm','MyDesktop.view.projectmanagement.editproject.team.TeamHeaderForm',
	'MyDesktop.view.projectmanagement.editproject.schedule.editprojectScheduleGrid','MyDesktop.view.projectmanagement.editproject.schedule.editprojectScheduleHeaderForm',
	'MyDesktop.view.projectmanagement.editproject.notes.CreateNotesGrid','MyDesktop.view.projectmanagement.editproject.notes.NotesHeaderForm'],

	id : 'projectlist',
	initComponent : function() {

		var ci = Ext.create('MyDesktop.store.EditProjects');
		ci.load({
			params : {
				start : 0,
				limit : 8
			}
		});
		ci.loadPage(1);
		this.store = ci, this.columns = [{
			dataIndex : 'pro_id',
			hidden : true
		}, {
			dataIndex : 'pro_code',
			text : 'Job code',
			align : 'center',
			width : 270,
			flex : 1
		}, {
			dataIndex : 'pro_title',
			text : 'Project Title',
			align : 'center',
			width : 270,
			flex : 1
		}, {
			dataIndex : 'pro_hb',
			text : 'HB ISBN',
			align : 'center',
			width : 270,
			flex : 1
		}, {
			dataIndex : 'pro_pb',
			text : 'PB ISBN',
			align : 'center',
			width : 270,
			flex : 1
		}, {
			dataIndex : 'workflow',
			hidden : true
		},{
			xtype : 'actioncolumn',
			align : 'center',
			width : 250,
			text : 'Actions',
			items : [{
				iconCls : 'projectEditClass',
				tooltip : 'Edit Project Details',
				handler : function(grid, rowIndex, colIndex) {
					var win = Ext.create('Ext.Window', {
						extend : 'Ext.form.Panel',
						layout : {
							type : 'absolute'
						},
						autoScroll : true,
						title : 'Edit Project Details',
						width : 1100,
						height : 500,
						items : [{
							xtype : 'editprojectaddform',
							x : 0,
							y : 0

						}]
					});
					win.show();

					var rec = grid.getStore().getAt(rowIndex);
					var project_id = rec.get('pro_id');
					var job_code = rec.get('pro_code');
					var currentForm = Ext.getCmp('editprojectaddform');
					currentForm.getForm().load({
						url : 'service/EditProjects.php',
						params : {
							action : 2,
							project_code : job_code
						},
						
					});

				}
			}, {
				iconCls : 'authorEditClass',
				tooltip : 'Edit Author Info',
				handler : function(grid, rowIndex, colIndex) {
					var win = Ext.create('Ext.Window', {
						extend : 'Ext.form.Panel',
						layout : {
							type : 'absolute'
						},
						autoScroll : true,
						title : 'Edit Author/Contributor Info',
						width : 1125,
						height : 550,
						items : [
						{
							xtype : 'AuthorHeaderForm',
							x : 0,
							y : 0,
							margin:'5 5 5 5'
						},{
							xtype : 'edit_author_grid',
							width:1100,
							x : 0,
							y : 80,
							margin:'5 5 5 5'

						}, {
							xtype : 'edit_contrib_grid',
							width:1100,
							x : 0,
							y : 330,
							margin:'5 5 5 5'

						}]
					});
					win.show();

					var rec = grid.getStore().getAt(rowIndex);
					var project_id = rec.get('pro_id');
					var job_code = rec.get('pro_code');
					var grid1 = Ext.getCmp('edit_author_grid');
					grid1.getStore().load({
						params : {
							action : 2,
							job_code : job_code
						}
					});
					var grid2 = Ext.getCmp('edit_contrib_grid');
					grid2.getStore().load({
						params : {
							action : 4,
							job_code : job_code
						}
					});
					var currentForm = Ext.getCmp('AuthorHeaderForm');
					currentForm.getForm().load({
						url : 'service/Author.php',
						params : {
							action : 9,
							job_code:job_code,
							},
						
					});

				}
			}, {
				iconCls : 'budgetEditClass',
				tooltip : 'Edit Budget',
				handler : function(grid, rowIndex, colIndex) {
					var win = Ext.create('Ext.Window', {
						extend : 'Ext.form.Panel',
						layout : {
							type : 'absolute'
						},
						autoScroll : true,
						title : 'Edit Budget',
						width : 1125,
						height : 500,
						items : [
						{
							xtype:'BudgetHeaderForm',
							x:0,
							y:0,
							margin:'5 5 5 5'
						},{
							xtype : 'tabpanel',
							id : 'editprojectBudgetAccountForm',
							plain : true,
							x : 5,
							y : 80,
							width:1100,
							margin:'5 5 5 5',
							activeTab : 0,
							height : 360,

							items : [{

								xtype : 'edit_accountPayableGrid'
							}, {

								xtype : 'edit_accountsReceivableForm'
							}]
						}]
					});
					win.show();

					var rec = grid.getStore().getAt(rowIndex);
					var project_id = rec.get('pro_id');
					var job_code = rec.get('pro_code');
					var workflow=rec.get('workflow');
					
					var currentForm = Ext.getCmp('BudgetHeaderForm');
					currentForm.getForm().load({
						url : 'service/budget.php',
						params : {
							action : 9,
							job_code:job_code,
							},
						
					});
					var grid1 = Ext.getCmp('edit_accountPayableGrid');
					grid1.getStore().load({
						params : {
							action : 1,
							job_code : job_code,
							
						}
					});
					var currentForm = Ext.getCmp('edit_accountsReceivableForm');
					currentForm.getForm().load({
						url : 'service/EditProjects.php',
						params : {
							action : 4,
							projectid:project_id,
							},
						
					});
					
				}
			}, {
				iconCls : 'scheduleEditClass',
				tooltip : 'Edit Schedule',
				handler : function(grid, rowIndex, colIndex) {
	     var win = Ext.create('Ext.Window', {
						extend : 'Ext.form.Panel',
						layout : {
							type : 'absolute'
						},
						autoScroll : true,
						title : 'Edit Schedule',
						width : 1125,
						height : 500,
						items : [
						{
							xtype:'editprojectScheduleHeaderForm',
							x:0,
							y:0,
							margin:'5 5 5 5'
						},
						{
							xtype:'editprojectSchedulegrid',
							x : 5,
							y : 80,
							width:1100,
							margin:'5 5 5 5',
						}]
					});
					win.show();
					var rec = grid.getStore().getAt(rowIndex);
					var project_id = rec.get('pro_id');
					var job_code = rec.get('pro_code');
					var workflow=rec.get('workflow');
					var grid1 = Ext.getCmp('editprojectSchedulegrid');
					grid1.getStore().load({
						params : {
							action : 4,
							projectid : project_id,
							
						}
					});
					var currentForm = Ext.getCmp('editprojectScheduleHeaderForm');
					currentForm.getForm().load({
						url : 'service/schedule.php',
						params : {
							action : 5,
							job_code:job_code,
							},
						
					});
				}
			}, {
				iconCls : 'teamEditClass',
				tooltip : 'Edit Team',
				handler : function(grid, rowIndex, colIndex) {
					var win = Ext.create('Ext.Window', {
						extend : 'Ext.form.Panel',
						layout : {
							type : 'absolute'
						},
						autoScroll : true,
						title : 'Edit Team',
						width : 1125,
						height : 400,
						items : [
						{
							xtype:'TeamHeaderForm',
							x:0,
							y:0,
							margin:'5 5 5 5'
						},{
							xtype : 'edit_teamaddform',
							x : 0,
							y :80,
							margin:'5 5 5 5'
							
						}]
					});
					win.show();
					
					var rec = grid.getStore().getAt(rowIndex);
					var project_id = rec.get('pro_id');
					var job_code = rec.get('pro_code');
					var currentForm = Ext.getCmp('edit_teamaddform');
					currentForm.getForm().load({
						url : 'service/projects.php',
						params : {
							action : 15,
							project_id:project_id,
							},
						failure : function(form, action) {
							
						}
					});
					var currentForm = Ext.getCmp('TeamHeaderForm');
					currentForm.getForm().load({
						url : 'service/Users.php',
						params : {
							action : 10,
							job_code:job_code,
							},
						
					});
					
								

				}
			},
			{
				iconCls : 'notesIcon',
				tooltip : 'Add Notes',
				handler : function(grid, rowIndex, colIndex) {
					var win = Ext.create('Ext.Window', {
						extend : 'Ext.form.Panel',
						layout : {
							type : 'absolute'
						},
						autoScroll : true,
						title : 'Add Notes & Remainders',
						width : 1125,
						height : 400,
						items : [
						{
							xtype:'NotesHeaderForm',
							x:0,
							y:0,
							margin:'5 5 5 5'
						},{
							xtype : 'editnotesgrid',
							x : 0,
							y :80,
							margin:'5 5 5 5'
							
						}]
					});
					win.show();
					
					var rec = grid.getStore().getAt(rowIndex);
					var project_id = rec.get('pro_id');
					var job_code = rec.get('pro_code');
					
					var currentForm = Ext.getCmp('NotesHeaderForm');
					currentForm.getForm().load({
						url : 'service/notes.php',
						params : {
							action : 1,
							job_code:job_code,
							},
						
					});
					
					var grid3=Ext.getCmp('editnotesgrid');
							grid3.getStore().load({
								params: {
									action:3,
									project_id:project_id
								}
							});			

				}
			}]
		}];
		this.bbar = Ext.create('Ext.PagingToolbar', {

			store : this.store,
			displayInfo : true,
			displayMsg : 'Displaying topics {0} - {1} of {2}',
			emptyMsg : "No topics to display",

		}), this.callParent(arguments);

	}
});
