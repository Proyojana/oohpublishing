var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
var store1 = Ext.create('Ext.data.JsonStore', {
    fields: ['code','title', 'author','hbisbn','pbisbn', 'format','deadline','word', 'note'],
    data: [
    { "code":"PR005","title": "Tom Jones","author": "Henry Fielding","hbisbn":"23345345", "pbisbn": "23345345456","format": "HTML","deadline":"25/08/2014","word": "300","note": "Yes"},
    {"code":"PR006", "title": "Pride and Prejudice","author": "Jane Austen","hbisbn":"87984656", "pbisbn": "87984656","format": "HTML","deadline":"23/09/2014","word": "700","note": "Yes"},
    {"code":"PR007","title": "Le Rouge et le Noir","author": "Stendhal","hbisbn":"87984656", "pbisbn": "87984656","format": "HTML","deadline":"23/10/2014","word": "700","note": "Yes"},
    {"code":"PR008","title": "The Brothers Karamazov","author": " Dostoevsky","hbisbn":"87984656", "pbisbn": "87984656","format": "HTML","deadline":"23/10/2014","word": "700","note": "Yes"}
    
     ]
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
	requires:['MyDesktop.view.projectmanagement.currentprojects.productionreport','MyDesktop.view.projectmanagement.currentprojects.typesetterform','MyDesktop.store.Projects','MyDesktop.view.projectmanagement.currentprojects.TitleInfoGrid'  ],
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
						iconCls: 'control_rewindClass',
						//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
						tooltip: 'Production Report',
					handler: function(grid, rowIndex, colIndex) {
					   
					   var win = Ext.create('Ext.Window', {
					extend : 'Ext.form.Panel',
					layout : {
						type : 'absolute'
					},
					 autoScroll:true,
				     //   maximizable : true,
					//title : 'Resubmission Reason',
					//frame : true,
					title:'Production Report',
					width : 650,
					height : 690,
					//modal:true,
					
					items : [
				
				     {
				    xtype:'productionreport',
				      x:0,
				    y:0
				   
					}
					
					]
					});
					win.show();
					

						
				}
			},{
				iconCls: 'applica_goClass',
				//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
				tooltip: 'Typesetting Report',
				handler: function(grid, rowIndex, colIndex) {
					var win = Ext.create('Ext.Window', {
					extend : 'Ext.form.Panel',
					layout : {
						type : 'absolute'
					},
					 autoScroll:true,
				     //   maximizable : true,
					//title : 'Resubmission Reason',
					//frame : true,
					title:'Typesetting Report',
					width : 650,
					height : 690,
					//modal:true,
					
					items : [
				
				     {
				    xtype:'typesetterform',
				      x:0,
				    y:0
				   
					}
					
					]
					});
					win.show();
					

					   
						
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
