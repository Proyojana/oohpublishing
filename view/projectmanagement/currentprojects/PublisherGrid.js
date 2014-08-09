var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
	
Ext.define('MyDesktop.view.projectmanagement.currentprojects.PublisherGrid', {
	extend:'Ext.grid.Panel',
	title: 'List Of Projects',
	alias:'widget.publishergrid',
	closeAction: 'hide',
	selModel:sm,
	//width:1040,
//	height:250,
	anchor: '76% 49%',
	requires:['MyDesktop.view.projectmanagement.currentprojects.productionreport','MyDesktop.view.projectmanagement.currentprojects.typesetterform','MyDesktop.store.Projects','MyDesktop.view.projectmanagement.currentprojects.TitleInfoGrid',
	'MyDesktop.view.projectmanagement.currentprojects.Author','MyDesktop.view.projectmanagement.currentprojects.ContribGrid', 'MyDesktop.view.projectmanagement.currentprojects.ProductionTitleInfoGrid', 'MyDesktop.view.projectmanagement.currentprojects.ProductionScheduleGrid', 
	'MyDesktop.view.projectmanagement.currentprojects.ProductionTeamGrid', 'MyDesktop.view.projectmanagement.currentprojects.ProductionBudgetGrid','MyDesktop.view.projectmanagement.currentprojects.TypesetterInfoGrid',
	'MyDesktop.view.projectmanagement.currentprojects.TypesetterAuthorGrid', 'MyDesktop.view.projectmanagement.currentproject.scheduleGrid','MyDesktop.view.projectmanagement.currentprojects.NotesGrid'],
	id:'publishergrid',
	initComponent: function() {
		
	/*	var journal = Ext.create('MyDesktop.store.Journal');
		journal.load({
			params: {
				start: 0,
				limit: 10,
				
			}
		});
		//journal.loadPage(1);*/
		
		var ci = Ext.create('MyDesktop.store.Projects');
		ci.load({
			params: {
				start: 0,
				limit: 8
			}
		});
		ci.loadPage(1);
		this.store = ci,
	//	this.store = store1,
		this.columns = [
	{
					dataIndex: 'id',
					hidden:true
				},
{
					dataIndex: 'code',
					text: 'Project Code',
					align: 'left',
					flex:1,
					//width:100,
				},
				{
					dataIndex: 'title',
					text: 'Title',
					align: 'left',
					flex:1.5,
					//width:100,
				},
				{
					dataIndex: 'author',
					text: 'Author',
					align: 'left',
					//width:100,
					flex:1,
				},
				
				
				{
					dataIndex: 'client',
					text: 'Client',
					align: 'center',
					//width:100,
					flex:1,
				},
				{
					dataIndex: 'client_team',
					text: 'Client Team',
					align: 'center',
					//width:100,
					flex:1,
					
				},
				{
					dataIndex: 'workflow',
					text: 'Workflow',
					align: 'left',
					//width:100,
					flex:1,
					
				},
				
				{
					dataIndex: 'deadline',
					text: 'Agreed Deadline',
					align: 'center',
					//width:100,
					flex:1,
					
				},
			/*
				
				{
					dataIndex: 'note',
					text: 'Notes',
					align: 'left',
					//width:100,
					flex:0.5,
					
				},*/
				{
					xtype:'actioncolumn',
					align: 'center',
					//width:100,
					flex:1,
					text:'Actions',
					items: [
					{
						iconCls: 'viewClass',
						tooltip: 'View',
					handler: function(grid, rowIndex, colIndex) {
						var rec = grid.getStore().getAt(rowIndex);
						var project_id=rec.get('id');
						var job_code=rec.get('code');

						var conn = new Ext.data.Connection();
															conn.request({
																url: 'service/projects.php',
																method: 'POST',																
																params : {action:8,project_id:project_id},																                           
										                            success:function(response){
																		obj = Ext.JSON.decode(response.responseText);
																	//	Ext.Msg.alert(obj.message);
																	var myGrid = Ext.getCmp('titleinfogrid');
																	myGrid.setSource(obj);																
																},
																});
							var conn = new Ext.data.Connection();
															conn.request({
																url: 'service/projects.php',
																method: 'POST',																
																params : {action:10,project_id:project_id},																                           
										                            success:function(response){
																		obj = Ext.JSON.decode(response.responseText);
																	//	Ext.Msg.alert(obj.message);
																	var myGrid = Ext.getCmp('teamgrid');
																	myGrid.setSource(obj);																
																},
																});
							 var gridAuthor=Ext.getCmp('author');
							 gridAuthor.getStore().load({params:{action:2,job_code:job_code}});
					
							var gridAuthor=Ext.getCmp('contribgrid');
							gridAuthor.getStore().load({params:{action:4,job_code:job_code}});
							
							var gridBudget=Ext.getCmp('budgetgrid');
							gridBudget.getStore().load({params:{action:1,job_code:job_code}});
							
							var gridBudget=Ext.getCmp('schedulegrid');
							gridBudget.getStore().load({params:{action:4,projectid:project_id}});
							
							var gridNotes=Ext.getCmp('notesgrid');
							gridNotes.getStore().load({params:{action:3,project_id:project_id}});

						
					/*    var currentForm = Ext.getCmp('usersform');
						var rec = grid.getStore().getAt(rowIndex);
						var userid1=rec.get('userid');
						currentForm.getForm().load({
   								 url: 'service/Users.php',
							     params: {
        						 	action:2,userid1:userid1
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						
						Ext.getCmp('usercode').setReadOnly(true);
						Ext.getCmp('userdescription').setReadOnly(true);
						Ext.getCmp('username').setReadOnly(true);
						
						
						Ext.getCmp('add_users').getEl().hide();
						Ext.getCmp('edit_users').getEl().hide();
						Ext.getCmp('reset_users').getEl().hide();
						
						
    					
    					
    					Ext.getCmp('usersaddform').setTitle('View User');*/
						
				}
			},
					{
				iconCls : 'control_rewindClass',
				tooltip : 'Production Report',
				handler : function(grid, rowIndex, colIndex) {

					var win = Ext.create('Ext.Window', {
						extend : 'Ext.form.Panel',
						layout : {
							type : 'absolute'
						},
						autoScroll : true,
						title : 'Production Report',
						width : 680,
						height : 600,
						items : [{
							xtype : 'productionreport',
							x : 0,
							y : 0

						}]
					});
					win.show();
					var rec = grid.getStore().getAt(rowIndex);
					var project_id = rec.get('id');
					var job_code = rec.get('code');

					var conn = new Ext.data.Connection();
					conn.request({
						url : 'service/projects.php',
						method : 'POST',
						params : {
							action : 11,
							project_id : project_id
						},
						success : function(response) {
							obj = Ext.JSON.decode(response.responseText);
							var myGrid = Ext.getCmp('ptitleinfogrid');
							myGrid.setSource(obj);
						},
					});

					var conn = new Ext.data.Connection();
					conn.request({
						url : 'service/projects.php',
						method : 'POST',
						params : {
							action : 12,
							project_id : project_id
						},
						success : function(response) {
							obj = Ext.JSON.decode(response.responseText);
							var myGrid = Ext.getCmp('pteamgrid');
							myGrid.setSource(obj);
						},
					});
					var grid1 = Ext.getCmp('pbudgetgrid');
					grid1.getStore().load({
						params : {
							action : 13,
							project_id : project_id
						}
					});

				}
			}, {
				iconCls : 'applica_goClass',
				tooltip : 'Typesetting Report',
				handler : function(grid, rowIndex, colIndex) {
					var win = Ext.create('Ext.Window', {
						extend : 'Ext.form.Panel',
						layout : {
							type : 'absolute'
						},
						autoScroll : true,
						title : 'Typesetting Report',
						width : 650,
						height : 600,
						items : [{
							xtype : 'typesetterform',
							x : 0,
							y : 0

						}]
					});
					win.show();
					var rec = grid.getStore().getAt(rowIndex);
					var project_id = rec.get('id');
					var job_code = rec.get('code');
					
						var conn = new Ext.data.Connection();
					conn.request({
						url : 'service/projects.php',
						method : 'POST',
						params : {
							action : 14,
							project_id : project_id
						},
						success : function(response) {
							obj = Ext.JSON.decode(response.responseText);
							var myGrid = Ext.getCmp('tinfogrid');
							myGrid.setSource(obj);
						},
					});
						var grid1 = Ext.getCmp('tauthorgrid');
					grid1.getStore().load({
						params : {
							action : 15,
							job_code : job_code
						}
					});

				}
			}]
		}];
		this.bbar = Ext.create('Ext.PagingToolbar', {
			store : this.store,
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display"
		}),
		
		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);
