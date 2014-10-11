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
	'MyDesktop.view.projectmanagement.editproject.notes.CreateNotesGrid','MyDesktop.view.projectmanagement.editproject.notes.NotesHeaderForm','MyDesktop.view.projectmanagement.editproject.artwork.editprojectArtworkHeaderForm',
	'MyDesktop.view.projectmanagement.editproject.artwork.editprojectArtworkgrid','MyDesktop.view.projectmanagement.editproject.budget.accountReceivableGrid','MyDesktop.view.projectmanagement.editproject.budget.accountReceivableGrid_a',
	'MyDesktop.view.projectmanagement.editproject.schedule.emailVendor','MyDesktop.view.projectmanagement.editproject.schedule.emailAuthor','MyDesktop.view.projectmanagement.editproject.budget.newprojectBudgetForm'],

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
						height : 520,
						items : [{
							xtype : 'editprojectaddform',
							x : 0,
							y : 0

						},
						 {
							xtype:'button',
							text:'Cancel',
							iconCls : 'cancelClass',
							width:100,
							x:600,
							y:445,
							handler:function(){
							win.close();
							}
							}
							]
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
							y : 290,
							margin:'5 5 5 5'

						},
						{
                      xtype:'button',
                       text:'Update',
                       iconCls : 'updateClass',
                      width:100,
						x:450,
						y:460,
						handler:function(){
							/** For Author Grid Save**/
				    var job_code=Ext.getCmp('editauthHeader_Job').getValue(); 
					var c='';var d='';
					var e=''; var f='';
					var g=''; var h='';
					var i=''; var b='';
					var grid=Ext.getCmp('new_author_grid');
							
					var myStore = Ext.getCmp('edit_author_grid').getStore();
					myStore.each(function(rec) {
					b=b+rec.get('id')+',';
					c=c+rec.get('author')+',';
				    d=d+rec.get('name')+',';
				    e=e+rec.get('address')+'_';
				    f=f+rec.get('email')+',';
				    g=g+rec.get('phone')+',';
				    h=h+rec.get('see_proof')+',';
				    i=i+rec.get('no_proof')+',';
				    });
				if(d.length>1||f.lenght>1)
                 {
					var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/Author.php',
						method: 'POST',
						params : {action:1,id:b,job_code:job_code,author:c,name:d,address:e,email:f,phone:g,see_proof:h,no_proof:i},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
						}
					});
					}
					else{
						Ext.Msg.alert("Please fill authour name and email"); 
					}
					/** For Contrib Grid Save**/
				    var job_code=Ext.getCmp('editauthHeader_Job').getValue(); 
					var c='';var d='';
					var e=''; var f='';
					var g=''; var h='';
					var i=''; var b='';
					var grid=Ext.getCmp('new_author_grid');
							
					var myStore = Ext.getCmp('edit_contrib_grid').getStore();
					myStore.each(function(rec) {
					b=b+rec.get('id')+',';
					c=c+rec.get('chap_num')+',';
				    d=d+rec.get('contrib_name')+',';
				    e=e+rec.get('email')+',';
				    f=f+rec.get('see_proof')+',';
				    g=g+rec.get('proof_sent')+',';
				    h=h+rec.get('proof_back')+',';
				  
				});
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/Author.php',
						method: 'POST',
						params : {action:3,id:b,job_code:job_code,chap_num:c,contrib_name:d,email:e,see_proof:f,proof_sent:g,proof_back:h},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
						}
					});
					
					
				}
				},
				{
					 xtype:'button',
                       text:'Cancel',
                       iconCls : 'cancelClass',
                      width:100,
						x:600,
						y:460,
						handler:function(){
							win.close();
						}
				}
						]
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
			},  {
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
						width : 1145,
						
						height : 600,
						items : [
						{
							xtype:'BudgetHeaderForm',
							x:0,
							y:0,
							margin:'5 5 5 5'
						},
						{
							xtype:'editBudgetForm',
							x:0,
							y:120,
							margin:'5 5 5 5'
						},
					
						{
				xtype:'button',
				text:'Update',
				pressed:true,
				width:100,
			     x:400,
				 y:730,
				handler:function(){
				 var val = Ext.getCmp('receive2').getValue();
	        	
	        	 if(val==1)
	        	 {
	        	var job_code=Ext.getCmp('edit_Job_code').getValue();
				var projectID=Ext.getCmp('editbudgetHeader_projectID').getValue();
					 
					 var no_of_unit = '';  
				     var rate_USD = '';
				     var rate_GBP= '';
				     var budgeted_amount_USD= '';
				     var budgeted_amount_GBP = '';
				     var actual_amount_USD = '';
				     var actual_amount_GBP = '';
				     var grid=Ext.getCmp('editaccountReceiveGrid');
				     var total_USD=0;  
				     var total_GBP=0;  
				     var myStore = Ext.getCmp('editaccountReceiveGrid').getStore();
					myStore.each(function(rec) {
						no_of_unit=no_of_unit+rec.get('no_of_unit')+',';
						rate_USD=rate_USD+rec.get('rate_USD')+',';
						rate_GBP=rate_GBP+rec.get('rate_GBP')+',';
						budgeted_amount_USD=budgeted_amount_USD+rec.get('budgeted_amount_USD')+',';
						budgeted_amount_GBP=budgeted_amount_USD+rec.get('budgeted_amount_GBP')+',';
						actual_amount_USD=actual_amount_USD+rec.get('actual_amount_USD')+',';
						actual_amount_GBP=actual_amount_USD+rec.get('actual_amount_GBP')+',';
					});
					
					 var conn = new Ext.data.Connection();
					 conn.request({
						url: 'service/budget.php',
						method: 'POST',
						params : {action:6,job_code:job_code,projectID:projectID,rate_USD:rate_USD,rate_GBP:rate_GBP,no_of_unit:no_of_unit,budgeted_USD:budgeted_amount_USD,budgeted_GBP:budgeted_amount_GBP,actual_amount_USD:actual_amount_USD,actual_amount_GBP:actual_amount_GBP,total_USD:total_USD,total_GBP:total_GBP},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
						}
					});
					}else
					{
						
					 var job_code=Ext.getCmp('edit_Job_code').getValue();
					 var projectID=Ext.getCmp('editbudgetHeader_projectID').getValue();  
					 var activity_name = '';
					 var no_of_unit = '';
				     var rate_USD = '';
				     var rate_GBP= '';
				     var budgeted_amount_USD= '';
				     var budgeted_amount_GBP = '';
				     var actual_amount_USD = '';
				      var actual_amount_GBP = '';
				     var grid=Ext.getCmp('editaccountReceiveGrid_a');
				    
					
					
				     var myStore = Ext.getCmp('editaccountReceiveGrid_a').getStore();
					 myStore.each(function(rec) {
						
						type=1;
						activity_name=activity_name+rec.get('activity_name')+',';
						no_of_unit=no_of_unit+rec.get('no_of_unit')+',';
						rate_USD=rate_USD+rec.get('rate_USD')+',';
						rate_GBP=rate_GBP+rec.get('rate_GBP')+',';
						budgeted_USD=budgeted_amount_USD+rec.get('budgeted_amount_USD')+',';
						budgeted_GBP=budgeted_amount_USD+rec.get('budgeted_amount_GBP')+',';
						actual_amount_USD=actual_amount_USD+rec.get('actual_amount_USD')+',';
						actual_amount_GBP=actual_amount_GBP+rec.get('actual_amount_GBP')+',';
					});
					
					 var conn = new Ext.data.Connection();
					 conn.request({
						url: 'service/budget.php',
						method: 'POST',
						params : {action:11,job_code:job_code,projectID:projectID,activity_name:activity_name,no_of_unit:no_of_unit,rate_USD:rate_USD,rate_GBP:rate_GBP,budgeted_USD:budgeted_USD,budgeted_GBP:budgeted_GBP,actual_amount_USD:actual_amount_USD,actual_amount_GBP:actual_amount_GBP},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
						}
					});
					
												
						
					}
					
					//Payable
					
					var type=2;
					var job_code=Ext.getCmp('edit_Job_code').getValue(); 
					var projectID=Ext.getCmp('editbudgetHeader_projectID').getValue(); 
					
						var activity='';
							
							var vendor='';
							var no_of_unit='';
							var rate_USD='';
							var rate_GBP='';
							var budgeted_amount_USD='';
							var budgeted_amount_GBP='';
							var actual_amount_USD='';
							var actual_amount_GBP='';
							var budget_id='';
							var grid=Ext.getCmp('editaccountPayableGrid');
							
					var myStore = Ext.getCmp('editaccountPayableGrid').getStore();
					myStore.each(function(rec) {
					activity=activity+rec.get('activityid')+',';
				    vendor=vendor+rec.get('vendor')+',';
				    no_of_unit=no_of_unit+rec.get('no_of_unit')+',';
				    rate_USD=rate_USD+rec.get('rate_USD')+',';
				    rate_GBP=rate_GBP+rec.get('rate_GBP')+',';
				    budgeted_amount_USD=budgeted_amount_USD+rec.get('budgeted_amount_USD')+',';
				    budgeted_amount_GBP=budgeted_amount_GBP+rec.get('budgeted_amount_GBP')+',';
				    actual_amount_USD=actual_amount_USD+rec.get('actual_amount_USD')+',';
				    actual_amount_GBP=actual_amount_GBP+rec.get('actual_amount_GBP')+',';
				    budget_id=budget_id+rec.get('budgetExpense_id')+',';
				   					
				});
							
					var conn = new Ext.data.Connection();
					 conn.request({
						url: 'service/budget.php',
						method: 'POST',
						params : {action:4,job_code:job_code,budget_id:budget_id,activity:activity,vendor:vendor,no_of_unit:no_of_unit,rate_USD:rate_USD,rate_GBP:rate_GBP,
							budgeted_amount_USD:budgeted_amount_USD,budgeted_amount_GBP:budgeted_amount_GBP,actual_amount_USD:actual_amount_USD,actual_amount_GBP:actual_amount_GBP},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
								
                	 /****load data in header form of schedule tab*****/
                		currentHeaderForm.getForm().load({
   								 url: 'service/schedule.php',
							     params: {
        						 	action:1,job_code:job_code
							    },
							      failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
							   
							   
						});
							Ext.getCmp('newprojectscheduleformTab').setDisabled(false);

							//refresh grid
							var grid3=Ext.getCmp('editaccountPayableGrid');
							grid3.getStore().load({params:{action:1,job_code:job_code}});
							
						}
					});
					
				}
			},]
					});
					win.show();

					var rec = grid.getStore().getAt(rowIndex);
					var project_id = rec.get('pro_id');
					var job_code = rec.get('pro_code');
					var workflow=rec.get('workflow');
					
					 /****load data in header form of budget tab*****/					
					var currentForm = Ext.getCmp('BudgetHeaderForm');
					currentForm.getForm().load({
						url : 'service/budget.php',
						params : {
							action : 9,
							job_code:job_code,
							},
						failure : function(form, action) {
							Ext.Msg.alert("Load failed", action.result.errorMessage);
						}
					});
				   	/****load data in budget form*****/	
				  var currentForm = Ext.getCmp('editBudgetForm');
					currentForm.getForm().load({
						url : 'service/budget.php',
						params : {
							action : 16,
							project_id:project_id,
							},
						failure : function(form, action) {
							Ext.Msg.alert("Load failed", action.result.errorMessage);
						}
					});
					var grid1 = Ext.getCmp('editaccountPayableGrid');
					grid1.getStore().load({	params : {action : 1,job_code : job_code,}});
					var grid4=Ext.getCmp('editaccountReceiveGrid_a');
					grid4.getStore().load({params:{action:13,job_code:job_code}});
					var grid4=Ext.getCmp('editaccountReceiveGrid');
					grid4.getStore().load({params:{action:12,job_code:job_code}});
					
				
					
				}
			}, 
			{
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
						height : 600,
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
						},
						{
				xtype:'button',
				text:'Update',
				iconCls : 'updateClass',
				pressed:true,
				width:100,
				x:450,
				y:460,
				//	margin:'0 0 0 100',
				handler: function() {

					var projectid=Ext.getCmp('edit_scheduleHeader_projectID').getValue();
					var workflow=Ext.getCmp('edit_scheduleHeader_workflow').getValue();
					var job_code=Ext.getCmp('edit_scheduleHeader_Job').getValue();
					var stage='';
					var stageorder='';
					var estimated_daysperstage='';
					var actual_daysperstage='';
					var estimated_start_date='';
					var actual_start_date='';
					var estimated_end_date='';
					var actual_end_date='';
					var bufferday='';
					var activity='';
					var schedule_id='';
					var grid=Ext.getCmp('editprojectSchedulegrid');

					var myStore = Ext.getCmp('editprojectSchedulegrid').getStore();
					//items = [];

					myStore.each( function(rec) {
						stage=stage+rec.get('stage')+',';
						estimated_daysperstage=estimated_daysperstage+rec.get('estimated_daysperstage')+',';
						actual_daysperstage=actual_daysperstage+rec.get('actual_daysperstage')+',';
						estimated_start_date=estimated_start_date+rec.get('estimated_start_date')+',';
						actual_start_date=actual_start_date+rec.get('actual_start_date')+',';
						estimated_end_date=estimated_end_date+rec.get('estimated_end_date')+',';
						actual_end_date=actual_end_date+rec.get('actual_end_date')+',';
						bufferday=bufferday+rec.get('bufferday')+',';
						activity=activity+rec.get('activityid')+',';
						stageorder=stageorder+rec.get('stageorder')+',';
						schedule_id=schedule_id+rec.get('schedule_id')+',';

					});
					var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/schedule.php',
						method: 'POST',
						params : {
							action:3,
							projectid:projectid,
							stageorder:stageorder,
							scheduleid:schedule_id,
							workflow:workflow,
							activity:activity,
							stage:stage,
							estimated_daysperstage:estimated_daysperstage,
							actual_daysperstage:actual_daysperstage,
							estimated_start_date:estimated_start_date,
							actual_start_date:actual_start_date,
							estimated_end_date:estimated_end_date,
							actual_end_date:actual_end_date,
							bufferday:bufferday

						},
						success: function(response) {
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message);


							//refresh grid
							var grid3=Ext.getCmp('editprojectSchedulegrid');
							grid3.getStore().load({
								params: {
									action:4,
									projectid:projectid
								}
							});

						}
					});
				
				}
			},
			{
				xtype:'button',
				text:'Cancel',
				iconCls : 'cancelClass',
				pressed:true,
				width:100,
				x:600,
				y:460,
				//	margin:'0 0 0 100',
				handler: function() {
					win.close();
					}
					},
					{
				xtype:'button',
				text:'Email to Vendor',
				iconCls : 'emailClass',
				pressed:true,
				x:250,
				y:500,
				handler: function() {
						var email_vendor = Ext.create('Ext.Window', {
						extend : 'Ext.form.Panel',
						layout : {
							type : 'absolute'
						},
						autoScroll : true,
						title : 'Message',
						width : 800,
						height : 400,
						items : [
						{
							xtype : 'emailVendor',
						}
						],
						buttons:[{
							text:'Send Email',
							handler: function() {
								
							/*	var from=Ext.getCmp('typesetting_pdf_from').getValue();
								var pdf_to=Ext.getCmp('typesetting_pdf_to').getValue().toString();
								var pdf_cc=Ext.getCmp('typesetting_pdf_cc').getValue().toString();
								var message=Ext.getCmp('typesetting_pdf_message').getValue();
								
								var conn = new Ext.data.Connection();
								conn.request({
									url : 'service/Reports.php',
									method : 'POST',
									params : {
										action : 6,
										//html : html,
										from:from,
										to:pdf_to,
										cc:pdf_cc,
										message:message,
										job_code:job_code
									},
									success : function(response) {
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Message', obj.message);
										messagewin1.close(); 
									},
								});
									*/
														
							}
						}]
					});
					email_vendor.show();
					var job_code=Ext.getCmp('edit_scheduleHeader_Job').getValue();
					var currentForm = Ext.getCmp('emailVendor');
					currentForm.getForm().load({
					url : 'service/emailTemplate.php',
					params : {
					action : 1,
					job_code:job_code
					}
					});
					}
					},
						{
				xtype:'button',
				text:'Email to Author',
				iconCls : 'emailClass',
				pressed:true,
				x:400,
				y:500,
				handler: function() {
						var email_author = Ext.create('Ext.Window', {
						extend : 'Ext.form.Panel',
						layout : {
							type : 'absolute'
						},
						autoScroll : true,
						title : 'Message',
						width : 800,
						height : 400,
						items : [
						{
							xtype : 'emailAuthor',
						}
						],
						buttons:[{
							text:'Send Email',
							handler: function() {
								
							/*	var from=Ext.getCmp('typesetting_pdf_from').getValue();
								var pdf_to=Ext.getCmp('typesetting_pdf_to').getValue().toString();
								var pdf_cc=Ext.getCmp('typesetting_pdf_cc').getValue().toString();
								var message=Ext.getCmp('typesetting_pdf_message').getValue();
								
								var conn = new Ext.data.Connection();
								conn.request({
									url : 'service/Reports.php',
									method : 'POST',
									params : {
										action : 6,
										//html : html,
										from:from,
										to:pdf_to,
										cc:pdf_cc,
										message:message,
										job_code:job_code
									},
									success : function(response) {
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Message', obj.message);
										messagewin1.close(); 
									},
								});
									*/
														
							}
						}]
					});
					email_author.show();
					var job_code=Ext.getCmp('edit_scheduleHeader_Job').getValue();
					var currentForm = Ext.getCmp('emailAuthor');
					currentForm.getForm().load({
					url : 'service/emailTemplate.php',
					params : {
					action : 2,
					job_code:job_code
					}
					});
					}
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
						height : 450,
						items : [
						{
							xtype:'TeamHeaderForm',
							x:0,
							y:0,
							margin:'5 5 5 5'
						},{
							xtype : 'editteamgrid',
							x : 0,
							y :80,
							margin:'5 5 5 5'
							
						},
						{
				xtype:'button',
				text:'Update',
				iconCls : 'updateClass',
				pressed:true,
				x:450,
				y:350,
				width:100,
				handler:function(){
					var project_id=Ext.getCmp('editteamHeader_projectID').getValue(); 
					var role='';
					var name='';
					var email='';
					var myStore = Ext.getCmp('editteamgrid').getStore();
					myStore.each(function(rec) {
						role=role+rec.get('role')+',';
						name=name+rec.get('name')+',';
						email=email+rec.get('email')+',';
						});
					var conn = new Ext.data.Connection();
					 conn.request({
						url: 'service/Users.php',
						method: 'POST',
						params : {action:11,project_id:project_id,role:role,name:name,email:email},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
						}
					});
					
				}
			},
			{
				xtype:'button',
				text:'Cancel',
				iconCls : 'cancelClass',
				pressed:true,
				x:600,
				y:350,
				width:100,
				handler:function(){
					win.close();
				}
			}
			
			]
					});
					win.show();
					
					var rec = grid.getStore().getAt(rowIndex);
					var project_id = rec.get('pro_id');
					var job_code = rec.get('pro_code');
				    var grid1 = Ext.getCmp('editteamgrid');
					grid1.getStore().load({
						params : {
							action : 12,
							project_id : project_id,
							
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
						height : 450,
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
							margin:'5 5 5 5',
							height:250,
							
						},
						{
				xtype:'button',
				text:'Update',
				iconCls : 'updateClass',
				pressed:true,
				x:450,
				y:350,
				width:100,
				handler:function(){
							var job_code=Ext.getCmp('job_code').getValue();
					var project_id=Ext.getCmp('editnotesHeader_projectID').getValue();

					var dateresolved='';
					var narrative='';
					var dateraised='';
					var notes_id='';
					var grid=Ext.getCmp('editnotesgrid');

					var myStore = Ext.getCmp('editnotesgrid').getStore();
					myStore.each( function(rec) {

						dateresolved=dateresolved+rec.get('dateresolved')+',';
						narrative=narrative+rec.get('narrative')+',';
						dateraised=dateraised+rec.get('dateraised')+',';
						notes_id=notes_id+rec.get('id')+',';

					});
					var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/notes.php',
						method: 'POST',
						params : {
							action:2,
							project_id:project_id,
							dateresolved:dateresolved,
							narrative:narrative,
							dateraised:dateraised,
							notes_id:notes_id
						},
						success: function(response) {
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message);
							//refresh grid
							var grid3=Ext.getCmp('editnotesgrid');
							grid3.getStore().load({
								params: {
									action:3,
									project_id:project_id
								}
							});

						}
					});
					
				}
			},
			{
				xtype:'button',
				text:'Cancel',
				iconCls : 'cancelClass',
				pressed:true,
				x:600,
				y:350,
				width:100,
				handler:function(){
					win.close();
				}
			}
			]
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
			},
			{
				iconCls : 'artworkClass',
				tooltip : 'Edit Artwork',
				handler : function(grid, rowIndex, colIndex) {
	     var win = Ext.create('Ext.Window', {
						extend : 'Ext.form.Panel',
						layout : {
							type : 'absolute'
						},
						autoScroll : true,
						title : 'Edit Artwork',
						width : 1200,
						height : 450,
						items : [
						{
							xtype:'editprojectArtworkHeaderForm',
							
							x:0,
							y:0,
							margin:'5 5 5 5'
						},
						{
							xtype:'editprojectArtworkgrid',
							x : 5,
							y : 80,
							width:1150,
							margin:'5 5 5 5',
						},
						{
				xtype:'button',
				text:'Update',
				iconCls : 'updateClass',
				pressed:true,
				x:450,
				y:350,
				width:100,
				//	margin:'0 0 0 100',
				handler: function() {
					var total_cost=0;
					var total_redraws=0;
					var total_relabel=0;
					var total_final=0;
					/*** get value from store**/
					var myStore = Ext.getCmp('editprojectArtworkgrid').getStore();
					myStore.each(function(rec) {
					
				    total_cost=total_cost+parseInt(rec.get('cost'));
				    
				    total_redraws=total_redraws+parseInt(rec.get('redrawsimple'));
				   
				    total_relabel=total_relabel+parseInt(rec.get('relabel'));
				    total_final=total_final+parseInt(rec.get('finalartwrk'));
				    
				   					
				});
				
				Ext.getCmp('total_cost').setValue(total_cost);
				Ext.getCmp('total_redraws').setValue(total_redraws);
				Ext.getCmp('total_relabel').setValue(total_relabel);
				Ext.getCmp('total_final').setValue(total_final);
					
					
				//	var job_code=Ext.getCmp('job_code').getValue();
					var project_id=Ext.getCmp('edit_ArtworkHeader_projectID').getValue();

				                   var figurenumber='';
                    				var inputformat= '';
                    				var resolution='';
                 					var colourmode='';
                    				var vendorassessment='';
                    				var cnvrt='';
                    				var redrawsimple='';
                    				var redrawcomplex='';
                    				var relabel='';                				
                    				var finalartwrk='';
                    				var cost='';
                    				var comments='';
                    				var artwork_id='';
					var grid=Ext.getCmp('editprojectArtworkgrid');

					var myStore = Ext.getCmp('editprojectArtworkgrid').getStore();
					myStore.each( function(rec) {

						figurenumber=figurenumber+rec.get('figurenumber')+',';
						inputformat=inputformat+rec.get('inputformat')+',';
						resolution=resolution+rec.get('resolution')+',';
						colourmode=colourmode+rec.get('colourmode')+',';
						vendorassessment=vendorassessment+rec.get('vendorassessment')+',';
						cnvrt=cnvrt+rec.get('convert1')+',';
						redrawsimple=redrawsimple+rec.get('redrawsimple')+',';
						redrawcomplex=redrawcomplex+rec.get('redrawcomplex')+',';
						relabel=relabel+rec.get('relabel')+',';
						finalartwrk=finalartwrk+rec.get('finalartwrk')+',';
						cost=cost+rec.get('cost')+',';
						comments=comments+rec.get('comments')+',';
						artwork_id=artwork_id+rec.get('id')+',';

					});
					var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/Artwork.php',
						method: 'POST',
						params : {
							action:2,
							
							project_id:project_id,
							figurenumber:figurenumber,
							inputformat:inputformat,
							resolution:resolution,
							colourmode:colourmode,
							vendorassessment:vendorassessment,
							cnvrt:cnvrt,
							redrawsimple:redrawsimple,
							redrawcomplex:redrawcomplex,
							relabel:relabel,
							finalartwrk:finalartwrk,
							cost:cost,
							comments:comments,
							artwork_id:artwork_id
						},
						success: function(response) {
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message);
							//refresh grid
							var grid3=Ext.getCmp('editprojectArtworkgrid');
							grid3.getStore().load({
								params: {
									action:3,
									project_id:project_id
								}
							});

						}
					});

				}
			},
			{
				xtype:'button',
				text:'Cancel',
				pressed:true,
				iconCls : 'cancelClass',
				x:600,
				y:350,
				width:100,
				//	margin:'0 0 0 100',
				handler: function() {
					win.close();
				}
				}]
					});
					win.show();
					var rec = grid.getStore().getAt(rowIndex);
					var project_id = rec.get('pro_id');
					var job_code = rec.get('pro_code');
					var workflow=rec.get('workflow');
					var grid1 = Ext.getCmp('editprojectArtworkgrid');
					grid1.getStore().load({
						params : {
							action : 3,
							project_id : project_id,
							
						}
					});
					var currentForm = Ext.getCmp('editprojectArtworkHeaderForm');
					currentForm.getForm().load({
						url : 'service/Artwork.php',
						params : {
							action : 1,
							job_code:job_code,
							},
						failure : function(form, action) {
							Ext.Msg.alert("Load failed", action.result.errorMessage);
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
