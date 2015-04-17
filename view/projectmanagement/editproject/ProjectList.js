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
	'MyDesktop.view.projectmanagement.editproject.schedule.emailVendor','MyDesktop.view.projectmanagement.editproject.schedule.emailAuthor','MyDesktop.view.projectmanagement.editproject.budget.newprojectBudgetForm','MyDesktop.view.projectmanagement.editproject.artwork.newprojectArtworkForm',
	'MyDesktop.view.projectmanagement.editproject.budget.budgetform','MyDesktop.view.projectmanagement.editproject.budget.budgetinfogrid','MyDesktop.view.projectmanagement.editproject.budget.accountPayableInfoGrid','MyDesktop.view.projectmanagement.editproject.budget.accountReceivableInfoGrid',
	'MyDesktop.view.projectmanagement.editproject.budget.budgetinfogrid','MyDesktop.view.projectmanagement.editproject.budget.budgetpayinfogrid','MyDesktop.view.projectmanagement.editproject.budget.budgetprofit'],

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
		},{
			dataIndex : 'pro_code',
			text : 'Job code',
			align : 'center',
			width : 270,
			flex : 1
		},{
			dataIndex : 'pro_title',
			text : 'Project Title',
			align : 'center',
			width : 270,
			flex : 1
		},{
			dataIndex : 'pro_hb',
			text : 'HB ISBN',
			align : 'center',
			width : 270,
			flex : 1
		},{
			dataIndex : 'pro_pb',
			text : 'PB ISBN',
			align : 'center',
			width : 270,
			flex : 1
		},{
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
						modal: true,
						closable: false,
						items : [{
							xtype : 'editprojectaddform',
							x : 0,
							y : 0

						},{
							xtype:'button',
							text:'Close',
							iconCls : 'cancelClass',
							width:100,
							x:600,
							y:445,
							handler: function() {
								Ext.Array.each(Ext.ComponentQuery.query('editprojectaddform'), function (editprojectaddform) {
									if (editprojectaddform.getForm().isDirty()) {
										Ext.Msg.show({
											title:'Save Changes?',
											msg: 'Your are closing a form that has unsaved changes. Would you like to save your changes?',
											buttons: Ext.Msg.YESNO,
											fn: function(btn) {
												if(btn=='yes') {
													var project_id = Ext.getCmp("edit_project_id").getValue();
													var job_code = Ext.getCmp('edit_job_code').getValue();

													var project_title = Ext.getCmp('edit_project_title').getValue();
													var project_name= Ext.getCmp('edit_project_name').getValue();
													//var project_author= Ext.getCmp('edit_project_author').getValue();
													var hb_isbn= Ext.getCmp('edit_hb_isbn').getValue();
													var pb_isbn= Ext.getCmp('edit_pb_isbn').getValue();
													var ebook_isbn= Ext.getCmp('edit_ebook_isbn').getValue();

													var project_series = Ext.getCmp('edit_project_series').getValue();
													var project_format = Ext.getCmp('edit_project_format').getValue();
													var project_design= Ext.getCmp('edit_project_design').getValue();
													var castoff_extent= Ext.getCmp('edit_castoff_extent').getValue();
													var confirmed_extent= Ext.getCmp('edit_confirmed_extent').getValue();

													var client_deadline = Ext.getCmp('edit_client_deadline').getValue();
													var agreed_deadline = Ext.getCmp('edit_agreed_deadline').getValue();
													var word_count= Ext.getCmp('edit_word_count').getValue();
													var manuscript= Ext.getCmp('edit_manuscript').getValue();
													var index_extent= Ext.getCmp('edit_index_extent').getValue();
													var project_note= Ext.getCmp('edit_project_note').getValue();
													var chapter_footer = Ext.getCmp('edit_chapter_footer').getValue();
													var contain_colour = Ext.getCmp('edit_contain_colour').getValue();
													var project_client= Ext.getCmp('edit_project_client').getValue();
													var project_team= Ext.getCmp('edit_project_team').getValue();
													var project_workflow= Ext.getCmp('edit_project_workflow').getValue();

													var edit_word_count_indexing= Ext.getCmp('edit_word_count_indexing').getValue();
													var edit_print_run= Ext.getCmp('edit_print_run').getValue();
													var edit_print_run_confirmed= Ext.getCmp('edit_print_run_confirmed').getValue();
													var edit_cover_type= Ext.getCmp('edit_cover_type').getValue();

													if(currentForm.getForm().isValid() == true) {
														var conn = new Ext.data.Connection();
														conn.request({
															url: 'service/EditProjects.php',
															method: 'POST',
															params : {
																action:3,
																project_id:project_id,
																job_code:job_code,
																project_title:project_title,
																project_name:project_name,
																hb_isbn:hb_isbn,
																pb_isbn:pb_isbn,
																project_series:project_series,
																project_format:project_format,
																project_design:project_design,
																castoff_extent:castoff_extent,
																confirmed_extent:confirmed_extent,
																edit_word_count_indexing:edit_word_count_indexing,
																edit_print_run:edit_print_run,
																edit_print_run_confirmed:edit_print_run_confirmed,
																edit_cover_type:edit_cover_type,
																client_deadline:client_deadline,
																agreed_deadline:agreed_deadline,
																word_count:word_count,
																manuscript:manuscript,
																index_extent:index_extent,
																chapter_footer:chapter_footer,
																contain_colour:contain_colour,
																project_client:project_client,
																project_team:project_team,
																project_workflow:project_workflow,
																project_note:project_note,
																ebook_isbn:ebook_isbn
															},
															success: function(response) {
																obj = Ext.JSON.decode(response.responseText);
																Ext.Msg.alert('Message', obj.message);
																win.close();
															}
														});
													}
												} else if(btn=='no') {
													win.close();
												}
											}
										});
									} else {
										win.close();
									}
								});
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
			},{
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
						modal: true,
						closable: false,
						items : [{
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

						},{
							xtype : 'edit_contrib_grid',
							width:1100,
							x : 0,
							y : 290,
							margin:'5 5 5 5'

						},{
							xtype:'button',
							text:'Update',
							iconCls : 'updateClass',
							width:100,
							x:450,
							y:460,
							handler: function() {
								/** For Author Grid Save**/
								var job_code=Ext.getCmp('editauthHeader_Job').getValue();

								var c='';
								var d='';
								var e='';
								var f='';
								var g='';
								var h='';
								var i='';
								var b='';
								var grid=Ext.getCmp('new_author_grid');

								var myStore = Ext.getCmp('edit_author_grid').getStore();
								myStore.each( function(rec) {
									b=b+rec.get('id')+',';
									c=c+rec.get('author')+',';
									d=d+rec.get('name')+',';
									e=e+rec.get('address')+'_';
									f=f+rec.get('email')+',';
									g=g+rec.get('phone')+',';
									h=h+rec.get('see_proof')+',';
									i=i+rec.get('no_proof')+',';
								});
								if(d.length>1||f.lenght>1) {
									var conn = new Ext.data.Connection();
									conn.request({
										url: 'service/Author.php',
										method: 'POST',
										params : {
											action:1,
											id:b,
											job_code:job_code,
											author:c,
											name:d,
											address:e,
											email:f,
											phone:g,
											see_proof:h,
											no_proof:i
										},
										success: function(response) {
											obj = Ext.JSON.decode(response.responseText);
											Ext.Msg.alert('Message', obj.message);
											var grid3=Ext.getCmp('edit_author_grid');
											grid3.getStore().load({
												params: {
													action:2,
													job_code:job_code
												}
											});
											
											Ext.getCmp('edit_author_grid').getView().refresh(); 
										}
									});
								} else {
									Ext.Msg.alert("Please fill authour name and email");
								}
								/** For Contrib Grid Save**/
								var job_code=Ext.getCmp('editauthHeader_Job').getValue();
								var c='';
								var d='';
								var e='';
								var f='';
								var g='';
								var h='';
								var i='';
								var b='';
								var grid=Ext.getCmp('new_author_grid');

								var myStore = Ext.getCmp('edit_contrib_grid').getStore();
								myStore.each( function(rec) {
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
									params : {
										action:3,
										id:b,
										job_code:job_code,
										chap_num:c,
										contrib_name:d,
										email:e,
										see_proof:f,
										proof_sent:g,
										proof_back:h
									},
									success: function(response) {
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Message', obj.message);
										var grid3=Ext.getCmp('edit_contrib_grid');
										grid3.getStore().load({
											params: {
												action:4,
												job_code:job_code
											}
										});
									}
								});

							}
						},{
							xtype:'button',
							text:'Close',
							iconCls : 'cancelClass',
							width:100,
							x:600,
							y:460,
							handler: function() {
								var myStore = Ext.getCmp('edit_author_grid').getStore();
								var records = myStore.getRange();
								for(var i =0; i < records.length; i++) {
									var rec = records[i];
									var count=0;
									if(rec.dirty == true) {
										count++;
									}

								}
								if(count==0) {
									win.close();
								} else {
									Ext.Msg.show({
										title:'Save Changes?',
										msg: 'Your are closing a form that has unsaved changes. Would you like to save your changes?',
										buttons: Ext.Msg.YESNO,
										fn: function(btn) {
											if(btn=='yes') {
												/** For Author Grid Save**/
												var job_code=Ext.getCmp('editauthHeader_Job').getValue();
												var c='';
												var d='';
												var e='';
												var f='';
												var g='';
												var h='';
												var i='';
												var b='';
												var grid=Ext.getCmp('new_author_grid');

												var myStore = Ext.getCmp('edit_author_grid').getStore();
												myStore.each( function(rec) {
													b=b+rec.get('id')+',';
													c=c+rec.get('author')+',';
													d=d+rec.get('name')+',';
													e=e+rec.get('address')+'_';
													f=f+rec.get('email')+',';
													g=g+rec.get('phone')+',';
													h=h+rec.get('see_proof')+',';
													i=i+rec.get('no_proof')+',';
												});
												if(d.length>1||f.lenght>1) {
													var conn = new Ext.data.Connection();
													conn.request({
														url: 'service/Author.php',
														method: 'POST',
														params : {
															action:1,
															id:b,
															job_code:job_code,
															author:c,
															name:d,
															address:e,
															email:f,
															phone:g,
															see_proof:h,
															no_proof:i
														},
														success: function(response) {
															obj = Ext.JSON.decode(response.responseText);
															Ext.Msg.alert('Message', obj.message);
															win.close();
														}
													});
												} else {
													Ext.Msg.alert("Please fill authour name and email");
												}
											} else if(btn=='no') {
												win.close();
											}
										}
									});
								}
							}
						}
						]
					});
					win.show();

					var rec = grid.getStore().getAt(rowIndex);
					var project_id = rec.get('pro_id');
					var job_code = rec.get('pro_code');
					//alert(job_code);
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
			},{
				iconCls : 'budgetEditClass',
				tooltip : 'Edit Budget',
				handler : function(grid, rowIndex, colIndex) {
					var win = Ext.create('Ext.Window', {
						extend : 'Ext.form.Panel',
						draggable   : true,
						modal: true,
						closable: false,
						layout : {
							type : 'absolute'
						},
						autoScroll : true,
						title : 'Edit Project Budget',
						width : 1145,

						height : 600,
						items : [{
							xtype:'BudgetHeaderForm',
							x:0,
							y:0,
							margin:'5 5 5 5'
						},{
							xtype:'editBudgetForm',
							x:0,
							y:160,
							margin:'5 5 5 5'
						},
						{
							xtype:'button',
							text:'Calculate',
							pressed:true,
							width:100,
							x:300,
							y:1000,
							handler: function() 
							{
								
																
								var total_USD = 0;
								var total_GBP = 0;
								var all_receivable_actual_total=0,all_receivable_budgeted_total=0;
								var all_payable_actual_total=0,all_payable_budgeted_total=0;
								var budgeted_total_profit=0,budgeted_total_profit_percentage=0;
								
								
								
								var conversion_rate=Ext.getCmp('conversion_rate').getValue();
								
								var myStore = Ext.getCmp('editaccountReceiveGrid_a').getStore();
								myStore.each( function(rec) 
								{
									var currency_rate=rec.get('currency_rate');
									if(currency_rate=="USD")
								{
										total_USD = total_USD + parseFloat(rec.get('actual_amount_USD_GBP'));	
										
								}
								else if(currency_rate=="GBP")
								{
									total_GBP = total_GBP + parseFloat(rec.get('actual_amount_USD_GBP'));
								}		
							
									
								});
								all_receivable_actual_total=(total_USD*conversion_rate)+total_GBP;
								all_receivable_budgeted_total=(total_USD*conversion_rate)+total_GBP;
								
								Ext.getCmp('edit_total_receive_USD').setValue(total_USD);
								Ext.getCmp('edit_total_receive_GBP').setValue(total_GBP);
								
								Ext.getCmp('edit_total_receive_actual_USD').setValue(total_USD);
								Ext.getCmp('edit_total_receive_budgeted_GBP').setValue(total_GBP);
								
								Ext.getCmp('edit_total_receive_actual_total').setValue(all_receivable_actual_total);
								Ext.getCmp('edit_total_receive_budgeted_total').setValue(all_receivable_budgeted_total);
								
								var total_USD_Payable = 0;
								var total_GBP_Payable = 0;
								var total_profit=0;
								var total_profit_percentage=0;
								
								var myStore1 = Ext.getCmp('editaccountPayableGrid').getStore();
								myStore1.each( function(rec) 
								{
									var currency_rate=rec.get('currency_rate');
									if(currency_rate=="USD")
								{
										total_USD_Payable = total_USD_Payable + parseFloat(rec.get('actual_amount_USD_GBP'));	
								}
								else if(currency_rate=="GBP")
								{
									total_GBP_Payable = total_GBP_Payable + parseFloat(rec.get('actual_amount_USD_GBP'));
								}		
							
									
								});
								
								all_payable_actual_total=(total_USD_Payable*conversion_rate)+total_GBP_Payable;
								all_payable_budgeted_total=(total_USD_Payable*conversion_rate)+total_GBP_Payable;
								
								Ext.getCmp('edit_total_pay_USD').setValue(total_USD_Payable);
								Ext.getCmp('edit_total_pay_GBP').setValue(total_GBP_Payable);
								
								
								Ext.getCmp('edit_total_pay_actual_USD').setValue(total_USD_Payable);
								Ext.getCmp('edit_total_pay_budgeted_GBP').setValue(total_GBP_Payable);
								
								Ext.getCmp('edit_total_pay_actual_total').setValue(all_payable_actual_total);
								Ext.getCmp('edit_total_pay_budgeted_total').setValue(all_payable_budgeted_total);
								
								total_profit=((total_USD_Payable*conversion_rate)+total_GBP_Payable)-((total_USD*conversion_rate)+total_GBP);
								total_profit_percentage=(((total_USD_Payable*conversion_rate)+total_GBP_Payable)/((total_USD*conversion_rate)+total_GBP));
								
								//alert(total_profit_percentage);
								
								Ext.getCmp('edit_profit_GBP').setValue(total_profit);
								Ext.getCmp('edit_profit_percentage').setValue(total_profit_percentage);
								
								budgeted_total_profit=((total_USD_Payable*conversion_rate)+total_GBP_Payable)-((total_USD*conversion_rate)+total_GBP);
						        budgeted_total_profit_percentage=(((total_USD_Payable*conversion_rate)+total_GBP_Payable)/((total_USD*conversion_rate)+total_GBP));
                                
                                Ext.getCmp('edit_profit_budget_GBP').setValue(budgeted_total_profit);
                                Ext.getCmp('edit_profit_budget_percentage').setValue(budgeted_total_profit_percentage);
						}
						},
						{
							xtype:'button',
							text:'Update',
							pressed:true,
							width:100,
							x:500,
							y:1000,
							handler: function() {
								


									var job_code=Ext.getCmp('edit_Job_code').getValue();
									var projectID=Ext.getCmp('editbudgetHeader_projectID').getValue();
									var activity_name = '';
									var no_of_unit = '';
									var rate_USD_GBP = '';
									//var rate_GBP= '';
									var budgeted_USD_GBP= '';
									//var budgeted_GBP = '';
									var actual_amount_USD_GBP = '';
									//var actual_amount_GBP = '';
									var currency_rate='';
									var unit_of_measurement='';
									var grid=Ext.getCmp('editaccountReceiveGrid_a');

									var myStore = Ext.getCmp('editaccountReceiveGrid_a').getStore();
									myStore.each( function(rec) {

										type=1;
										activity_name=activity_name+rec.get('activityid')+',';
										no_of_unit=no_of_unit+rec.get('no_of_unit')+',';
										rate_USD_GBP=rate_USD_GBP+rec.get('rate_USD_GBP')+',';
										//rate_GBP=rate_GBP+rec.get('rate_GBP')+',';
										budgeted_USD_GBP=budgeted_USD_GBP+rec.get('budgeted_amount_USD_GBP')+',';
										//budgeted_GBP=budgeted_GBP+rec.get('budgeted_amount_GBP')+',';
										actual_amount_USD_GBP=actual_amount_USD_GBP+rec.get('actual_amount_USD_GBP')+',';
										//actual_amount_GBP=actual_amount_GBP+rec.get('actual_amount_GBP')+',';
										
										unit_of_measurement=unit_of_measurement+rec.get('unit_of_measurement')+',';
										currency_rate=currency_rate+rec.get('currency_rate')+',';
										
										
									});
									//alert(budgeted_USD);
									var conn = new Ext.data.Connection();
									conn.request({
										url: 'service/budget.php',
										method: 'POST',
										params : {
											action:11,
											job_code:job_code,
											projectID:projectID,
											activity_name:activity_name,
											currency_rate:currency_rate,
											unit_of_measurement:unit_of_measurement,
											no_of_unit:no_of_unit,
											rate_USD_GBP:rate_USD_GBP,
											//rate_GBP:rate_GBP,
											budgeted_USD_GBP:budgeted_USD_GBP,
											//budgeted_GBP:budgeted_GBP,
											actual_amount_USD_GBP:actual_amount_USD_GBP,
											//actual_amount_GBP:actual_amount_GBP
										},
										success: function(response) {
											obj = Ext.JSON.decode(response.responseText);
											Ext.Msg.alert('Message', obj.message);
											Ext.getCmp('editaccountReceiveGrid_a').getView().refresh();
										}
									});
								

								//Payable

								var type=2;
								var job_code=Ext.getCmp('edit_Job_code').getValue();
								var projectID=Ext.getCmp('editbudgetHeader_projectID').getValue();

								var activity='';

								var vendor='';
								var no_of_unit='';
								var rate_USD_GBP='';
								//var rate_GBP='';
								var budgeted_amount_USD_GBP='';
								//var budgeted_amount_GBP='';
								var actual_amount_USD_GBP='';
								//var actual_amount_GBP='';
								var budget_id='';
								var currency_rate='';
									var unit_of_measurement='';
								var grid=Ext.getCmp('editaccountPayableGrid');

								var myStore = Ext.getCmp('editaccountPayableGrid').getStore();
								myStore.each( function(rec) {
									activity=activity+rec.get('activityid')+',';
									vendor=vendor+rec.get('vendor')+',';
									no_of_unit=no_of_unit+rec.get('no_of_unit')+',';
									rate_USD_GBP=rate_USD_GBP+rec.get('rate_USD_GBP')+',';
									//rate_GBP=rate_GBP+rec.get('rate_GBP')+',';
									budgeted_amount_USD_GBP=budgeted_amount_USD_GBP+rec.get('budgeted_amount_USD_GBP')+',';
									//budgeted_amount_GBP=budgeted_amount_GBP+rec.get('budgeted_amount_GBP')+',';
									actual_amount_USD_GBP=actual_amount_USD_GBP+rec.get('actual_amount_USD_GBP')+',';
									//actual_amount_GBP=actual_amount_GBP+rec.get('actual_amount_GBP')+',';
									budget_id=budget_id+rec.get('budgetExpense_id')+',';
									unit_of_measurement=unit_of_measurement+rec.get('unit_of_measurement')+',';
									currency_rate=currency_rate+rec.get('currency_rate')+',';
										

								});
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/budget.php',
									method: 'POST',
									params : {
										action:4,
										job_code:job_code,
										budget_id:budget_id,
										activity:activity,
										currency_rate:currency_rate,
										unit_of_measurement:unit_of_measurement,
										vendor:vendor,
										no_of_unit:no_of_unit,
										rate_USD_GBP:rate_USD_GBP,
										//rate_GBP:rate_GBP,
										budgeted_amount_USD_GBP:budgeted_amount_USD_GBP,
										//budgeted_amount_GBP:budgeted_amount_GBP,
										actual_amount_USD_GBP:actual_amount_USD_GBP,
										//actual_amount_GBP:actual_amount_GBP
									},
									success: function(response) {
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Message', obj.message);
										//refresh grid
										var grid3=Ext.getCmp('editaccountPayableGrid');
										grid3.getStore().load({
											params: {
												action:1,
												job_code:job_code
											}
										});
										
										Ext.getCmp('editaccountPayableGrid').getView().refresh();

									}
								});

								//Insert budget total details

								var project_id=Ext.getCmp('editbudgetHeader_projectID').getValue();
								var ponumber1 = Ext.getCmp("edit_budgetHeader_ponumber1").getValue();
								var ponumber2 = Ext.getCmp("edit_budgetHeader_ponumber2").getValue();
								var invoice_date = Ext.getCmp("invoice_date").getValue();
								var prostatus = Ext.getCmp("prostatus").getValue();
								var total_receive_USD = Ext.getCmp("edit_total_receive_USD").getValue();
								var total_receive_GDP = Ext.getCmp("edit_total_receive_GBP").getValue();
								var total_pay_USD = Ext.getCmp("edit_total_pay_USD").getValue();
								var total_pay_GDP = Ext.getCmp("edit_total_pay_GBP").getValue();
								var profit_GDP = Ext.getCmp("edit_profit_GBP").getValue();
								var profit_percentage = Ext.getCmp("edit_profit_percentage").getValue();
								
								var edit_total_receive_budgeted_GBP = Ext.getCmp("edit_total_receive_budgeted_GBP").getValue();
								var edit_total_receive_budgeted_total = Ext.getCmp("edit_total_receive_budgeted_total").getValue();
								var edit_total_receive_actual_USD = Ext.getCmp("edit_total_receive_actual_USD").getValue();
								var edit_total_receive_actual_total = Ext.getCmp("edit_total_receive_actual_total").getValue();
								var edit_total_pay_budgeted_GBP = Ext.getCmp("edit_total_pay_budgeted_GBP").getValue();
								var edit_total_pay_budgeted_total = Ext.getCmp("edit_total_pay_budgeted_total").getValue();
								var edit_total_pay_actual_USD = Ext.getCmp("edit_total_pay_actual_USD").getValue();
								var edit_total_pay_actual_total = Ext.getCmp("edit_total_pay_actual_total").getValue();
								
								var edit_profit_budget_GBP = Ext.getCmp("edit_profit_budget_GBP").getValue();//
								var edit_profit_budget_percentage = Ext.getCmp("edit_profit_budget_percentage").getValue();//
								
								
								
								//new changes
								var total_receive_project_USD = 0;
								//alert(total_receive_project_USD);
								var total_receive_project_GDP = 0;
								//alert(total_receive_project_GDP);



									var conn = new Ext.data.Connection();

									conn.request({
										url: 'service/budget.php',
										method: 'POST',
										params : {
											action:14,
											projectID:project_id,
											ponumber1:ponumber1,
											ponumber2:ponumber2,
											total_receive_USD:total_receive_USD,
											total_receive_GDP:total_receive_GDP,
											total_receive_project_USD:total_receive_project_USD,
											total_receive_project_GDP:total_receive_project_GDP,
											total_pay_USD:total_pay_USD,
											total_pay_GDP:total_pay_GDP,
											profit_GDP:profit_GDP,
											profit_percentage:profit_percentage,
											edit_total_receive_budgeted_GBP:edit_total_receive_budgeted_GBP, 
											edit_total_receive_budgeted_total:edit_total_receive_budgeted_total,
											edit_total_receive_actual_USD:edit_total_receive_actual_USD,
											edit_total_receive_actual_total:edit_total_receive_actual_total,
											edit_total_pay_budgeted_GBP:edit_total_pay_budgeted_GBP,
											edit_total_pay_budgeted_total:edit_total_pay_budgeted_total, 
											edit_total_pay_actual_USD:edit_total_pay_actual_USD,
											edit_total_pay_actual_total:edit_total_pay_actual_total,
											edit_profit_budget_GBP:edit_profit_budget_GBP,//
											edit_profit_budget_percentage:edit_profit_budget_percentage,
											
											invoice_date:invoice_date,
											prostatus:prostatus
										},
										success: function(response) {
											obj = Ext.JSON.decode(response.responseText);
											Ext.Msg.alert('Message', obj.message);
											win.close();
										}
									});
								
								//ends here
							}
						},{
							xtype:'button',
							text:'Close',
							iconCls : 'cancelClass',
							width:100,
							x:700,
							y:1000,
							handler: function() {
								
								
								 //For Account payable grid
								var myStore = Ext.getCmp('editaccountPayableGrid').getStore();
								var records = myStore.getRange();
								var count=0;
								for(var i =0; i < records.length; i++) {
									var rec = records[i];
									
									if(rec.dirty == true) {
										count++;
										
									}

								}
								
								
								
								 //For Account payable grid
								var myStore1 = Ext.getCmp('editaccountReceiveGrid_a').getStore();
								var records1 = myStore1.getRange();
								var count1=0;
								for(var i =0; i < records1.length; i++) {
									var rec = records1[i];
									
									if(rec.dirty == true) {
										count1++;
									}

								}
								
								
								
								if(count==0 && count1==0) {
									win.close();
								} else {
									Ext.Msg.show({
										title:'Save Changes?',
										msg: 'Your are closing a form that has unsaved changes. Would you like to save your changes?',
										buttons: Ext.Msg.YESNO,
										fn: function(btn) {
											if(btn=='yes') {
												
												//Receivable
												
												var job_code=Ext.getCmp('edit_Job_code').getValue();
									var projectID=Ext.getCmp('editbudgetHeader_projectID').getValue();
									var activity_name = '';
									var no_of_unit = '';
									var rate_USD_GBP = '';
									//var rate_GBP= '';
									var budgeted_USD_GBP= '';
									//var budgeted_GBP = '';
									var actual_amount_USD_GBP = '';
									//var actual_amount_GBP = '';
									
									var currency_rate='';
									var unit_of_measurement='';
									
									var grid=Ext.getCmp('editaccountReceiveGrid_a');

									var myStore = Ext.getCmp('editaccountReceiveGrid_a').getStore();
									myStore.each( function(rec) {

										type=1;
										activity_name=activity_name+rec.get('activityid')+',';
										no_of_unit=no_of_unit+rec.get('no_of_unit')+',';
										rate_USD_GBP=rate_USD_GBP+rec.get('rate_USD_GBP')+',';
										//rate_GBP=rate_GBP+rec.get('rate_GBP')+',';
										budgeted_USD_GBP=budgeted_USD_GBP+rec.get('budgeted_amount_USD_GBP')+',';
										//budgeted_GBP=budgeted_GBP+rec.get('budgeted_amount_GBP')+',';
										actual_amount_USD_GBP=actual_amount_USD_GBP+rec.get('actual_amount_USD_GBP')+',';
										//actual_amount_GBP=actual_amount_GBP+rec.get('actual_amount_GBP')+',';
										unit_of_measurement=unit_of_measurement+rec.get('unit_of_measurement')+',';
										currency_rate=currency_rate+rec.get('currency_rate')+',';
									});
									//alert(budgeted_USD);
									var conn = new Ext.data.Connection();
									conn.request({
										url: 'service/budget.php',
										method: 'POST',
										params : {
											action:11,
											job_code:job_code,
											projectID:projectID,
											activity_name:activity_name,
											currency_rate:currency_rate,
											unit_of_measurement:unit_of_measurement,
											no_of_unit:no_of_unit,
											rate_USD_GBP:rate_USD_GBP,
											//rate_GBP:rate_GBP,
											budgeted_USD_GBP:budgeted_USD_GBP,
											//budgeted_GBP:budgeted_GBP,
											actual_amount_USD_GBP:actual_amount_USD_GBP,
											//actual_amount_GBP:actual_amount_GBP
										},
										success: function(response) {
											obj = Ext.JSON.decode(response.responseText);
											Ext.Msg.alert('Message', obj.message);
										}
									});
												
												//payable
												var type=2;
												var job_code=Ext.getCmp('edit_Job_code').getValue();
												var projectID=Ext.getCmp('editbudgetHeader_projectID').getValue();

												var activity='';

												var vendor='';
												var no_of_unit='';
												var rate_USD_GBP='';
												//var rate_GBP='';
												var budgeted_amount_USD_GBP='';
												//var budgeted_amount_GBP='';
												var actual_amount_USD_GBP='';
												//var actual_amount_GBP='';
												var budget_id='';
												
												var currency_rate='';
									var unit_of_measurement='';
												var grid=Ext.getCmp('editaccountPayableGrid');

												var myStore = Ext.getCmp('editaccountPayableGrid').getStore();
												myStore.each( function(rec) {
													activity=activity+rec.get('activityid')+',';
													vendor=vendor+rec.get('vendor')+',';
													no_of_unit=no_of_unit+rec.get('no_of_unit')+',';
													rate_USD_GBP=rate_USD_GBP+rec.get('rate_USD_GBP')+',';
													//rate_GBP=rate_GBP+rec.get('rate_GBP')+',';
													budgeted_amount_USD_GBP=budgeted_amount_USD_GBP+rec.get('budgeted_amount_USD_GBP')+',';
													//budgeted_amount_GBP=budgeted_amount_GBP+rec.get('budgeted_amount_GBP')+',';
													actual_amount_USD_GBP=actual_amount_USD_GBP+rec.get('actual_amount_USD_GBP')+',';
													//actual_amount_GBP=actual_amount_GBP+rec.get('actual_amount_GBP')+',';
													budget_id=budget_id+rec.get('budgetExpense_id')+',';
													unit_of_measurement=unit_of_measurement+rec.get('unit_of_measurement')+',';
													currency_rate=currency_rate+rec.get('currency_rate')+',';

												});
												var conn = new Ext.data.Connection();
												conn.request({
													url: 'service/budget.php',
													method: 'POST',
													params : {
														action:4,
														job_code:job_code,
														budget_id:budget_id,
														activity:activity,
														currency_rate:currency_rate,
														unit_of_measurement:unit_of_measurement,
														vendor:vendor,
														no_of_unit:no_of_unit,
														rate_USD_GBP:rate_USD_GBP,
														//rate_GBP:rate_GBP,
														budgeted_amount_USD_GBP:budgeted_amount_USD_GBP,
														//budgeted_amount_GBP:budgeted_amount_GBP,
														actual_amount_USD_GBP:actual_amount_USD_GBP,
														//actual_amount_GBP:actual_amount_GBP
													},
													success: function(response) {
														obj = Ext.JSON.decode(response.responseText);
														Ext.Msg.alert('Message', obj.message);
														
														
														win.close();

													}
												});
											} else if(btn=='no') {
												win.close();
											}
										}
									});
								}
							}
						},{
							xtype:'button',
							text:'Print Preview',
							pressed:true,
							width:100,
							x:900,
							y:1000,
							handler : function() {
								
				var win = Ext.create('Ext.Window', {
						extend : 'Ext.form.Panel',
						layout : {
							type : 'absolute'
						},
						autoScroll : true,
						title : 'Message',
						width : 1000,
						height : 500,
						items : [{
							xtype : 'budgetsform',
							x : 0,
							y : 0,
							margin:'5 5 5 5'

						}],
						buttons:[{
							text:'Print',
							handler: function()
							{
							//	Ext.ux.grid.Printer.printAutomatically = false;
                             //   Ext.ux.grid.Printer.print(Ext.getCmp('pschedulegrid'));
                            var targetElement = Ext.getCmp('budgetsform');
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
					//here accountPayableInfoGrid
					var projectID=Ext.getCmp('editbudgetHeader_projectID').getValue();
								
								
								var grid1 = Ext.getCmp('accountPayableInfoGrid');
					grid1.getStore().load({
						params : {
							action : 28,
							projectID : projectID,
							
						}
					});
					//here accountReceivableInfoGrid
					var projectID=Ext.getCmp('editbudgetHeader_projectID').getValue();
								//alert(projectID);
								
								var grid1 = Ext.getCmp('accountReceivableInfoGrid');
					grid1.getStore().load({
						params : {
							action : 30,
							projectID : projectID,
							
						}
					});
					
					var conn = new Ext.data.Connection();
					conn.request({
						url : 'service/budget.php',
						method : 'POST',
						params : {
							action : 29,
							
							projectID : projectID
						},
						success : function(response) {
							obj = Ext.JSON.decode(response.responseText);
							var myGrid = Ext.getCmp('budinfogrid');
							myGrid.setSource(obj);
						},
					});
					//Here Budgeted Expenses And Account Payables Details
					var conne = new Ext.data.Connection();
					conne.request({
						url : 'service/budget.php',
						method : 'POST',
						params : {
							action : 31,
							
							projectID : projectID
						},
						success : function(response) {
							obj = Ext.JSON.decode(response.responseText);
							var myGrid = Ext.getCmp('budgetpayinfogrid');
							myGrid.setSource(obj);
						},
					});
					//Here Profit
					var pro = new Ext.data.Connection();
					pro.request({
						url : 'service/budget.php',
						method : 'POST',
						params : {
							action : 32,
							
							projectID : projectID
						},
						success : function(response) {
							obj = Ext.JSON.decode(response.responseText);
							var myGrid = Ext.getCmp('budgetprofit');
							myGrid.setSource(obj);
						},
					});
					}
						
							
						}]
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
					grid1.getStore().load({
						params : {
							action : 1,
							job_code : job_code,
						}
					});
					Ext.getCmp('editaccountPayableGrid').getView().refresh();
					var grid4=Ext.getCmp('editaccountReceiveGrid_a');
					grid4.getStore().load({
						params: {
							action:13,
							job_code:job_code
						}
					});
					Ext.getCmp('editaccountReceiveGrid_a').getView().refresh();
					/*var grid4=Ext.getCmp('editaccountReceiveGrid');
					grid4.getStore().load({
						params: {
							action:12,
							job_code:job_code
						}
					});*/
					//new changes
					/*var calc=Ext.getCmp('editaccountReceiveGrid');
					calc.getStore().load({
					params:{action:19,
					job_code:job_code
					}});*/

					/***load total calc***/
					var currentForm = Ext.getCmp('editBudgetForm');
					currentForm.getForm().load({
						url : 'service/budget.php',
						params : {
							action : 19,
							job_code:job_code
						},
						failure : function(form, action) {
							Ext.Msg.alert("Load failed", action.result.errorMessage);
						}
					});
					
						var currentForm = Ext.getCmp('editBudgetForm');
					currentForm.getForm().load({
						url : 'service/budget.php',
						params : {
							action : 22,
							job_code:job_code
						},
						failure : function(form, action) {
							Ext.Msg.alert("Load failed", action.result.errorMessage);
						}
					});
					
					var currentForm = Ext.getCmp('editBudgetForm');
					currentForm.getForm().load({
						url : 'service/budget.php',
						params : {
							action : 23,
							job_code:job_code
						},
						failure : function(form, action) {
							Ext.Msg.alert("Load failed", action.result.errorMessage);
						}
					});

					//new changes ends
				}
			},{
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
						modal: true,
						closable: false,
						items : [{
							xtype:'editprojectScheduleHeaderForm',
							x:0,
							y:0,
							margin:'5 5 5 5'
						},{
							xtype:'editprojectSchedulegrid',
							x : 5,
							y : 100,
							width:1100,
							margin:'5 5 5 5',
						},{
							xtype:'button',
							text:'Update',
							iconCls : 'updateClass',
							pressed:true,
							width:100,
							x:560,
							y:500,
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
										
										Ext.getCmp('editprojectSchedulegrid').getView().refresh();

									}
								});

							}
						},{
							xtype:'button',
							text:'Close',
							iconCls : 'cancelClass',
							pressed:true,
							width:100,
							x:700,
							y:500,
							handler: function() {
								var myStore = Ext.getCmp('editprojectSchedulegrid').getStore();
								var records = myStore.getRange();
								for(var i =0; i < records.length; i++) {
									var rec = records[i];
									var count=0;
									if(rec.dirty == true) {
										count++;
									}

								}
								if(count==0) {
									win.close();
								} else {
									Ext.Msg.show({
										title:'Save Changes?',
										msg: 'Your are closing a form that has unsaved changes. Would you like to save your changes?',
										buttons: Ext.Msg.YESNO,
										fn: function(btn) {
											if(btn=='yes') {
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
														win.close();
													}
												});
											} else if(btn=='no') {
												win.close();
											}
										}
									});
								}
							}
						},{
							xtype:'button',
							text:'Email to Vendor',
							iconCls : 'emailClass',
							pressed:true,
							x:250,
							y:500,
							handler: function() {
								
								/*activity*/
								var selection = Ext.getCmp('editprojectSchedulegrid').getSelectionModel().getSelection();
								if(selection.length==0) {
									Ext.Msg.alert("Select atleast one");
								} else {
									var length=selection.length;
									//alert(length);
								
								
								/**/
								
								var email_vendor = Ext.create('Ext.Window', {
									extend : 'Ext.form.Panel',
									layout : {
										type : 'absolute'
									},
									autoScroll : true,
									title : 'Message',
									width : 800,
									height : 550,
									items : [{
										xtype : 'emailVendor',
									}
									],
									buttons:[{
										text:'Send Email',
										handler: function() {

											var vendor_from=Ext.getCmp('vendorFrom').getValue().toString();
											var vendor_to=Ext.getCmp('vendorEmail').getValue().toString();
											var vendor_cc=Ext.getCmp('vendorCc').getValue().toString();
											var vendor_message=Ext.getCmp('vendorMessage').getValue().toString();

											var conn = new Ext.data.Connection();
											conn.request({
												url : 'service/emailTemplate.php',
												method : 'POST',
												params : {
													action : 3,
													vendor_from:vendor_from,
													vendor_to:vendor_to,
													vendor_cc:vendor_cc,
													vendor_message:vendor_message

												},
												success : function(response) {
													obj = Ext.JSON.decode(response.responseText);
													Ext.Msg.alert('Message', obj.message);
													email_vendor.close();
												},
											});

										}
									}]
								});
								email_vendor.show();
								}
								var activity_id='';
								for (var i=0; i < selection.length; i++) {
									if((length-1)>=i) {
										activity_id = activity_id + selection[i].data.activityid+',';
									//alert(activity_id);
									}
								}
								
								var job_code=Ext.getCmp('edit_scheduleHeader_Job').getValue();
								var projectID=Ext.getCmp('edit_scheduleHeader_projectID').getValue();
								var currentForm = Ext.getCmp('emailVendor');
								currentForm.getForm().load({
									url : 'service/emailTemplate.php',
									params : {
										action : 1,
										job_code:job_code,
										projectID:projectID,
										activity_id:activity_id
									}
								});
							}
						},{
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
									height : 550,
									items : [{
										xtype : 'emailAuthor',
									}
									],
									buttons:[{
										text:'Send Email',
										handler: function() {

											var author_from=Ext.getCmp('authorFrom').getValue().toString();
											var author_to=Ext.getCmp('authorEmail').getValue().toString();
											var author_cc=Ext.getCmp('authorCc').getValue().toString();
											var author_message=Ext.getCmp('authorMessage').getValue().toString();

											var conn = new Ext.data.Connection();
											conn.request({
												url : 'service/emailTemplate.php',
												method : 'POST',
												params : {
													action : 4,
													author_from:author_from,
													author_to:author_to,
													author_cc:author_cc,
													author_message:author_message

												},
												success : function(response) {
													obj = Ext.JSON.decode(response.responseText);
													Ext.Msg.alert('Message', obj.message);
													email_author.close();
												},
											});

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
							}//Heare Adding print button into Edit Schedule scheduleform
						},]
					});
					win.show();
					
					var rec = grid.getStore().getAt(rowIndex);
					var project_id = rec.get('pro_id');
					var job_code = rec.get('pro_code');
					console.log(job_code);
					var workflow=rec.get('workflow');
					var grid1 = Ext.getCmp('editprojectSchedulegrid');
					grid1.getStore().load({
						params : {
							action : 4,
							projectid : project_id,

						}
					});
					Ext.getCmp('editprojectSchedulegrid').getView().refresh();
					
					/*loading header data*/
					var currentForm = Ext.getCmp('editprojectScheduleHeaderForm');
					currentForm.getForm().load({
						url : 'service/schedule.php',
						params : {
							action : 5,
							job_code:job_code,
						},
						

					});
				}
			},{
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
						modal: true,
						closable: false,
						items : [{
							xtype:'TeamHeaderForm',
							x:0,
							y:0,
							margin:'5 5 5 5'
						},{
							xtype : 'editteamgrid',
							x : 0,
							y :100,
							margin:'5 5 5 5'

						},{
							xtype:'button',
							text:'Update',
							iconCls : 'updateClass',
							pressed:true,
							x:450,
							y:370,
							width:100,
							handler: function() {
								var project_id=Ext.getCmp('editteamHeader_projectID').getValue();
								var role='';
								var name='';
								var email='';
								var myStore = Ext.getCmp('editteamgrid').getStore();
								myStore.each( function(rec) {
									role=role+rec.get('role')+',';
									name=name+rec.get('name')+',';
									email=email+rec.get('email')+',';
								});
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/Users.php',
									method: 'POST',
									params : {
										action:11,
										project_id:project_id,
										role:role,
										name:name,
										email:email
									},
									success: function(response) {
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Message', obj.message);
										
										var grid1 = Ext.getCmp('editteamgrid');
										grid1.getStore().load({
										params : 
										{
											action : 12,
											project_id : project_id,
										}
									});
										Ext.getCmp('editteamgrid').getView().refresh();
									}
								});

							}
						},{
							xtype:'button',
							text:'Close',
							iconCls : 'cancelClass',
							pressed:true,
							x:600,
							y:370,
							width:100,
							handler: function() {
								var myStore = Ext.getCmp('editteamgrid').getStore();
								var records = myStore.getRange();
								for(var i =0; i < records.length; i++) {
									var rec = records[i];
									var count=0;
									if(rec.dirty == true) {
										count++;
									}

								}
								if(count==0) {
									win.close();
								} else {
									Ext.Msg.show({
										title:'Save Changes?',
										msg: 'Your are closing a form that has unsaved changes. Would you like to save your changes?',
										buttons: Ext.Msg.YESNO,
										fn: function(btn) {
											if(btn=='yes') {
												var project_id=Ext.getCmp('editteamHeader_projectID').getValue();
												var role='';
												var name='';
												var email='';
												var myStore = Ext.getCmp('editteamgrid').getStore();
												myStore.each( function(rec) {
													role=role+rec.get('role')+',';
													name=name+rec.get('name')+',';
													email=email+rec.get('email')+',';
												});
												var conn = new Ext.data.Connection();
												conn.request({
													url: 'service/Users.php',
													method: 'POST',
													params : {
														action:11,
														project_id:project_id,
														role:role,
														name:name,
														email:email
													},
													success: function(response) {
														obj = Ext.JSON.decode(response.responseText);
														Ext.Msg.alert('Message', obj.message);
														win.close();
													}
												});
											} else if(btn=='no') {
												win.close();
											}
										}
									});
								}
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
					Ext.getCmp('editteamgrid').getView().refresh();
					var currentForm = Ext.getCmp('TeamHeaderForm');
					currentForm.getForm().load({
						url : 'service/Users.php',
						params : {
							action : 10,
							job_code:job_code,
						},

					});

				}
			},{
				iconCls : 'notesIcon',
				tooltip : 'Add Notes',
				handler : function(grid, rowIndex, colIndex) {
					var win = Ext.create('Ext.Window', {
						extend : 'Ext.form.Panel',
						layout : {
							type : 'absolute'
						},
						autoScroll : true,
						title : 'Add Notes & Reminders',
						width : 1125,
						height : 450,
						modal: true,
						closable: false,
						items : [{
							xtype:'NotesHeaderForm',
							x:0,
							y:0,
							margin:'5 5 5 5'
						},{
							xtype : 'editnotesgrid',
							x : 0,
							y :100,
							margin:'5 5 5 5',
							height:250,

						},{
							xtype:'button',
							text:'Update',
							iconCls : 'updateClass',
							pressed:true,
							x:450,
							y:370,
							width:100,
							handler: function() {
								var job_code=Ext.getCmp('editnotesHeader_Job').getValue();
								var project_id=Ext.getCmp('editnotesHeader_projectID').getValue();

								var dateresolved='';
								var narrative='';
								var dateraised='';
								var notes_id='';
								var grid=Ext.getCmp('editnotesgrid');

								var myStore = Ext.getCmp('editnotesgrid').getStore();
								myStore.each( function(rec) {

									dateresolved=dateresolved+rec.get('dateresolved')+',';
									narrative=narrative+rec.get('narrative')+',,';
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
										Ext.getCmp('editnotesgrid').getView().refresh();

									}
								});

							}
						},{
							xtype:'button',
							text:'Close',
							iconCls : 'cancelClass',
							pressed:true,
							x:600,
							y:370,
							width:100,
							handler: function() {
								var myStore = Ext.getCmp('editnotesgrid').getStore();
								var records = myStore.getRange();
								for(var i =0; i < records.length; i++) {
									var rec = records[i];
									var count=0;
									if(rec.dirty == true) {
										count++;
									}

								}
								if(count==0) {
									win.close();
								} else {
									Ext.Msg.show({
										title:'Save Changes?',
										msg: 'Your are closing a form that has unsaved changes. Would you like to save your changes?',
										buttons: Ext.Msg.YESNO,
										fn: function(btn) {
											if(btn=='yes') {
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
														win.close();

													}
												});
											} else if(btn=='no') {
												win.close();
											}
										}
									});
								}
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
					Ext.getCmp('editnotesgrid').getView().refresh();

				}
			},{
				iconCls : 'artworkClass',
				tooltip : 'Edit Artwork',
				handler : function(grid, rowIndex, colIndex) {
					var total_cost=0;
					var total_redraws=0;
					var total_relabel=0;
					var total_final=0;
					var win = Ext.create('Ext.Window', {
						extend : 'Ext.form.Panel',
						layout : {
							type : 'absolute'
						},
						autoScroll : true,
						title : 'Edit Artwork',
						width : 1200,
						height : 450,
						modal: true,
						closable: false,
						items : [{
							xtype:'editprojectArtworkHeaderForm',

							x:0,
							y:0,
							margin:'5 5 5 5'
						},{
							xtype:'editArtworkForm',
							x : 0,
							y : 100,
							width:1150,
							margin:'5 5 5 5',
						},{
							xtype:'button',
							text:'Update',
							iconCls : 'updateClass',
							pressed:true,
							x:450,
							y:380,
							width:100,
							//	margin:'0 0 0 100',
							handler: function() {

								/*** get value from store**/
								var myStore = Ext.getCmp('editprojectArtworkgrid').getStore();
								total_cost=0;
								total_redraws=0;
								total_relabel=0;
								total_final=0;
								myStore.each( function(rec) {

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
										Ext.getCmp('editprojectArtworkgrid').getView().refresh();

									}
								});

								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/Artwork.php',
									method: 'POST',
									params : {
										action:6,

										project_id:project_id,
										total_cost:total_cost,
										total_redraws:total_redraws,
										total_relabel:total_relabel,
										total_final:total_final
									},
									success: function(response) {
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Message', obj.message);
										//refresh grid

									}
								});

							}
						},{
							xtype:'button',
							text:'Close',
							pressed:true,
							iconCls : 'cancelClass',
							x:600,
							y:380,
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
					var grid1 = Ext.getCmp('editprojectArtworkgrid');
					grid1.getStore().load({
						params : {
							action : 3,
							project_id : project_id,

						}
					});

					var currentForm = Ext.getCmp('editArtworkForm');
					currentForm.getForm().load({
						url : 'service/Artwork.php',
						params : {
							action : 7,
							project_id:project_id
						},
						/*failure : function(form, action) {
							Ext.Msg.alert("Load failed", action.result.errorMessage);
						}*/
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