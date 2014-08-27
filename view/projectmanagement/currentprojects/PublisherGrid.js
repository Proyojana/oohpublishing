var sm = Ext.create('Ext.selection.CheckboxModel', {
	checkOnly:true
});
var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';


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
		var customers = Ext.create('MyDesktop.store.Reports');
		customers.load({
			params: {
				action: 2
			}
		});
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
		this.columns = [{
			dataIndex: 'id',
			hidden:true
		},{
			dataIndex: 'code',
			text: 'Project Code',
			align: 'left',
			flex:1,
			//width:100,
		},{
			dataIndex: 'title',
			text: 'Title',
			align: 'left',
			flex:1.5,
			//width:100,
		},{
			dataIndex: 'author',
			text: 'Author',
			align: 'left',
			//width:100,
			flex:1,
		},{
			dataIndex: 'client',
			text: 'Client',
			align: 'center',
			//width:100,
			flex:1,
		},{
			dataIndex: 'client_team',
			text: 'Client Team',
			align: 'center',
			//width:100,
			flex:1,

		},{
			dataIndex: 'workflow',
			text: 'Workflow',
			align: 'left',
			//width:100,
			flex:1,

		},{
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
			items: [{
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
						params : {
							action:8,
							project_id:project_id
						},
						success: function(response) {
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
						params : {
							action:10,
							project_id:project_id
						},
						success: function(response) {
							obj = Ext.JSON.decode(response.responseText);
							//	Ext.Msg.alert(obj.message);
							var myGrid = Ext.getCmp('teamgrid');
							myGrid.setSource(obj);
						},
					});
					var gridAuthor=Ext.getCmp('author');
					gridAuthor.getStore().load({
						params: {
							action:2,
							job_code:job_code
						}
					});

					var gridAuthor=Ext.getCmp('contribgrid');
					gridAuthor.getStore().load({
						params: {
							action:4,
							job_code:job_code
						}
					});

					var gridBudget=Ext.getCmp('budgetgrid');
					gridBudget.getStore().load({
						params: {
							action:1,
							job_code:job_code
						}
					});

					var gridBudget=Ext.getCmp('schedulegrid');
					gridBudget.getStore().load({
						params: {
							action:4,
							projectid:project_id
						}
					});

					var gridNotes=Ext.getCmp('notesgrid');
					gridNotes.getStore().load({
						params: {
							action:3,
							project_id:project_id
						}
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
			},{
				iconCls : 'control_rewindClass',
				tooltip : 'Production Report',
				handler : function(grid, rowIndex, colIndex) {
					/**
				//calculate and set value for total in budget 
					var actual_amt_USD=0;
					var myStore = Ext.getCmp('pbudgetgrid').getStore();
					myStore.each(function(rec) {
					actual_amt_USD=actual_amt_USD+parseInt(rec.get('actual_amount_USD'));	
				      alert(actual_amt_USD); 					
				});
				Ext.getCmp('productionreport_BudgetTotal').setValue(actual_amt_USD);		
					**/
					//report window
					var win = Ext.create('Ext.Window', {
						extend : 'Ext.form.Panel',
						modal:true,
						layout: 'anchor',
						autoScroll : true,
						title : 'Production Report',
						
						width : 800,
						height : 630,
						items : [{
							xtype : 'productionreport',
							x : 0,
							y : 0

						}],
						buttons:[{
							text:'Send Email',

							handler: function() {

								Ext.Msg.show({
									title:'Send Email',
									id:'selectMailOption',
									msg: 'Do you like to send as Html or PDF?',
									buttons: Ext.Msg.YESNOCANCEL,
									buttonText: {
										yes: "Html",
										no: "PDF"
									},
									fn: function(btn) {
										if(btn=='yes') {
																						
											//create send message window
					var messagewin = Ext.create('Ext.Window', {
						extend : 'Ext.form.Panel',
						id:'message_sendHtml',
						modal:true,
						layout : {
							type : 'absolute'
						},
						autoScroll : true,
						title : 'Message',
						width : 400,
						height :400,
						items : [{
							xtype : 'textfield',
							x : 10,
							y : 10,
							fieldLabel:'From',
							id:'html_from',
							width:320
						},{
							xtype:'combo',
							fieldLabel:'To',
							multiSelect:true,
							id:'html_to',
							x:10,
							y:40,
							store:customers,
							//typeAhead:true,
							triggerAction:'all',
							displayField:'mail',
							width:320,
							allowBlank: false,
							queryMode: 'local',
						    afterLabelTextTpl: required,
						},
						{
							xtype:'combo',
							fieldLabel:'Cc',
							multiSelect:true,
							id:'html_cc',
							x:10,
							y:70,
							store:customers,
							ddReorder: true,
							//typeAhead:true,
							triggerAction:'all',
							displayField:'mail',
							width:320
						},
						{
							xtype:'textarea',
							fieldLabel:'Message',
							id:'html_message',
							x:10,
							y:100,
							width:320,
							height:200
						}
						],
						buttons:[{
							text:'Send Email',
							handler: function() {
								var html=win.body.dom.innerHTML;
								var from=Ext.getCmp('html_from').getValue();
								var html_to=Ext.getCmp('html_to').getValue().toString();
								var html_cc=Ext.getCmp('html_cc').getValue().toString();
								var message=Ext.getCmp('html_message').getValue()+html;
										//send data to php
								var conn = new Ext.data.Connection();
								conn.request({
									url : 'service/Reports.php',
									method : 'POST',
									params : {
										action : 3,
										html : message,
										from:from,
										to:html_to,
										cc:html_cc
									},
									success : function(response) {
										obj = Ext.JSON.decode(response.responseText);
										
									},
								});
										
									
																
							}						
							}]
					});
				Ext.getCmp('html_from').setValue(mail);
											messagewin.show();
											
											
										} 
										else if(btn=='no'){
											//create send message window
					var messagewin1 = Ext.create('Ext.Window', {
						extend : 'Ext.form.Panel',
						id:'message_sendPdf',
						modal:true,
						layout : {
							type : 'absolute'
						},
						autoScroll : true,
						title : 'Message',
						width : 400,
						height : 400,
						items : [{
							xtype : 'textfield',
							x : 10,
							y : 10,
							fieldLabel:'From',
							id:'pdf_from',
							width:320
						},{
							xtype:'combo',
							fieldLabel:'To',
							id:'pdf_to',
							x:10,
							y:40,
							store:customers,
							typeAhead:true,
							triggerAction:'all',
							displayField:'mail',
							width:320
						},
						{
							xtype:'combo',
							fieldLabel:'Cc',
							multiSelect:true,
							id:'pdf_cc',
							x:10,
							y:70,
							store:customers,
							//typeAhead:true,
							triggerAction:'all',
							displayField:'mail',
							width:320
						},{
							xtype:'textarea',
							fieldLabel:'Message',
							id:'pdf_message',
							x:10,
							y:100,
							width:320,
							height:200,
						}
						],
						buttons:[{
							text:'Send Email',
							handler: function() {
								var html=win.body.dom.innerHTML;
								var from=Ext.getCmp('pdf_from').getValue();
								var pdf_to=Ext.getCmp('pdf_to').getValue().toString();
								var pdf_cc=Ext.getCmp('pdf_cc').getValue().toString();
								var message=Ext.getCmp('pdf_message').getValue();
								
								var conn = new Ext.data.Connection();
								conn.request({
									url : 'service/Reports.php',
									method : 'POST',
									params : {
										action : 4,
										html : html,
										from:from,
										to:pdf_to,
										cc:pdf_cc,
										message:message
									},
									success : function(response) {
										obj = Ext.JSON.decode(response.responseText);
										
									},
								});
									
														
							}
						}]
					});
				Ext.getCmp('pdf_from').setValue(mail);
											messagewin1.show();
										}

										
									}
								});
							},
						},{
							text:'Print',
							handler: function()
							{
							//	Ext.ux.grid.Printer.printAutomatically = false;
                             //   Ext.ux.grid.Printer.print(Ext.getCmp('pschedulegrid'));
                            var targetElement = Ext.getCmp('productionreport');
		                    var myWindow = window.open('', '', 'width=400,height=500');
		                    myWindow.document.write('<html><head>');
		                    myWindow.document.write('<title>' + 'Title' + '</title>');
		                    myWindow.document.write('<link rel="Stylesheet" type="text/css" href="http://dev.sencha.com/deploy/ext-4.0.1/resources/css/ext-all.css" />');
		                    myWindow.document.write('<script type="text/javascript" src="http://dev.sencha.com/deploy/ext-4.0.1/bootstrap.js"></script>');
		                    myWindow.document.write('</head><body>');
		                    myWindow.document.write(targetElement.body.dom.innerHTML);
		                    myWindow.document.write('</body></html>');
		                    myWindow.print();
							},
						}]
					});
					
					
					win.show();
					
					//  end of report window
					
					
					
					//load form and grids of report window
					var rec = grid.getStore().getAt(rowIndex);
					var project_id = rec.get('id');
					var job_code = rec.get('code');
					
					var gridBudget=Ext.getCmp('pschedulegrid');
					gridBudget.getStore().load({
						params: {
							action:4,
							projectid:project_id
						}
					});
					
					var gridBudget=Ext.getCmp('pbudgetgrid');
					gridBudget.getStore().load({
						params: {
							action:1,
							job_code:job_code
						}
					});
					/*
					  //calculate and set value for total in budget 
					var actual_amt_USD=0;
					var myStore = Ext.getCmp('pbudgetgrid').getStore();
					myStore.each(function(rec) {
					actual_amt_USD=actual_amt_USD+parseInt(rec.get('actual_amount_USD'));	
				      alert(actual_amt_USD); 					
				});
				Ext.getCmp('productionreport_BudgetTotal').setValue(actual_amt_USD);*/
					
					var currentForm = Ext.getCmp('productionreport');
					currentForm.getForm().load({
						url : 'service/Reports.php',
						params : {
							action : 1,
							project_id:project_id,
						},
						failure : function(form, action) {
							Ext.Msg.alert("Load failed", action.result.errorMessage);
						}
					});
					
					
					
					

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
						
								
					
					//end of data loading

				}
			},{
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