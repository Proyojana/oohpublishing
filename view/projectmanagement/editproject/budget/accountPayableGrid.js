var cur_rate = Ext.create('Ext.data.Store', {
    fields: ['period', 'name'],
    data : [
         {
		
		"name":"USD"
	},{
		
		"name":"GBP"
	}
        ]
    }); 
var unit_of_measure = Ext.create('Ext.data.Store', {
        fields: ['unit_of_measure'],
        data : [
         {"unit_of_measure":"Cast-off extent"},
         {"unit_of_measure":"Manuscript pages"},
         {"unit_of_measure":"Project"},
        ]
    }); 
    
var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
var encode = false;
    
  
Ext.define('MyDesktop.view.projectmanagement.editproject.budget.editaccountPayableGrid', {
	extend:'Ext.grid.Panel',
	title:'Budgeted Expenses and Accounts Payables',
	
	alias:'widget.editaccountPayableGrid',
	closeAction: 'hide',
	width:1085,
	//selModel:sm,
	requires:['MyDesktop.store.Budget'],
	id:'editaccountPayableGrid',
	plugins: [
              Ext.create('Ext.grid.plugin.CellEditing', {
                  clicksToEdit: 1
             })        
    ],
  
	initComponent: function() {
		
		
		function color(value, metaData, record, rowIndex, colIndex,store){
		return '<span style="background-color:#c0c0c0;">' + value + '</span>';
		}
		//load stage
		var stage = Ext.create('MyDesktop.store.Stages');
		stage.load({
			params: {
				start: 0,
				limit: 50
			}
		});
		//load activity combo
		var activity = Ext.create('MyDesktop.store.ProductionStages');
		activity.load({
			params: {
				start: 0,
				limit: 50
			}
		});
		//load budget store
		var budget = Ext.create('MyDesktop.store.Budget');
		budget.load({
			params: {
				start: 0,
				limit: 50
			}
		});
		budget.loadPage(1);
		//load vendors column in grid
		var vendor = Ext.create('MyDesktop.store.Vendors');
		vendor.load({
			params: {
				start: 0,
				limit: 8
			}
		});
		vendor.loadPage(1);
		
		this.store = budget,
		
		this.columns = [
				{
			dataIndex: 'budgetExpense_id',
			hidden:true,
		},
		    {				
					dataIndex: 'activityid',
					text: 'Activity',
					 flex: 2,
					 align:'center',
					 editor: { 
						xtype:'combo',
						store: activity,
						queryMode: 'local',
						displayField: 'product_name',
						valueField: 'product_id',
						},
						
	renderer: function(value) {
					var index = activity.find('product_id', value);
					if (index != -1) {
					return activity.getAt(index).data.product_name;
					}
					return value;
					}
				},
				{
				 	dataIndex: 'vendor',
		        	text: 'Vendor',
		        	flex: 2,
		        	align:'center',
		        	editor: { xtype:'combo',
							 store: vendor,
						   	queryMode: 'local',
							displayField: 'name',
						    valueField: 'id',
						    listeners: {
                change: function (field, newValue, oldValue) {
                	/*var grid = this.up().up();
                        // get selection model of the grid  
                    var selModel = grid.getSelectionModel();
                	var activityid=selModel.getSelection()[0].data.activityid;
                	
					var conn = new Ext.data.Connection();
					 conn.request({
					 url: 'service/budget.php',
					 method: 'POST',
					 params : {action:3,vendor:newValue,activityid:activityid},
					 success:function(response){
					 obj1 = Ext.JSON.decode(response.responseText);
					 
					 
					 var rate=obj1.data.rate_USD;
					 var rate1=obj1.data.rate_GBP; 
                         selModel.getSelection()[0].set('rate_USD', rate);
                         selModel.getSelection()[0].set('rate_GBP', rate1);
                         
                          var rate=selModel.getSelection()[0].data.rate_USD;
		                	  var rate1=selModel.getSelection()[0].data.rate_GBP;
		                	  var unit=selModel.getSelection()[0].data.no_of_unit;
		                	//calculate budgeted amount
		                	 var budget=unit*rate;
		                	 var budget1=unit*rate1;
		                	 selModel.getSelection()[0].set('budgeted_amount_USD', budget);
		                	 selModel.getSelection()[0].set('budgeted_amount_GBP', budget1);
		                	 selModel.getSelection()[0].set('actual_amount_USD', budget);
		                	 selModel.getSelection()[0].set('actual_amount_GBP', budget1);
		                	 
				            var actual_amt_USD=0;
							var actual_amt_GBP=0;
							
							
							var actual_amount_USD='';
							var actual_amount_GBP='';
							
							
							var myStore = Ext.getCmp('editaccountPayableGrid').getStore();
							myStore.each(function(rec) {
							actual_amt_USD=actual_amt_USD+parseInt(rec.get('actual_amount_USD'));
							actual_amt_GBP=actual_amt_GBP+parseInt(rec.get('actual_amount_GBP'));	
							
							actual_amount_USD=actual_amount_USD+rec.get('actual_amount_USD')+',';
							actual_amount_GBP=actual_amount_GBP+rec.get('actual_amount_GBP')+',';
							});
							
							Ext.getCmp('edit_total_pay_USD').setValue(actual_amt_USD);
							Ext.getCmp('edit_total_pay_GBP').setValue(actual_amt_GBP);
							
							var receive_usd = Ext.getCmp('edit_total_receive_USD').getValue();
							var pay_usd = Ext.getCmp('edit_total_pay_USD').getValue();
							if(receive_usd!=0&&pay_usd!=0)
							{
							var bal=receive_usd-pay_usd;
							var per=(bal/receive_usd)*100;
							Ext.getCmp('edit_profit_percentage').setValue(per);
					 var conn = new Ext.data.Connection();
					 conn.request({
					 url: 'service/budget.php',
					 method: 'POST',
					 params : {action:15},
					 success:function(response){
					 obj1 = Ext.JSON.decode(response.responseText);
					 if(obj1.data!=null)
					 {
					 var obj=obj1.data.rate;
					 var val = obj*bal;
					 Ext.getCmp('edit_profit_GBP').setValue(val);
					 }
					 else
					 {
					 	Ext.getCmp('edit_profit_GBP').setValue();
					 }
					 }
					 });
					 }
					 else{
					 	var receive_gdp = Ext.getCmp('edit_total_receive_GBP').getValue();
							var pay_gdp = Ext.getCmp('edit_total_pay_GBP').getValue();
							var bal=receive_gdp-pay_gdp;
							var per=(bal/receive_gdp)*100;
							Ext.getCmp('edit_profit_percentage').setValue(per);
							if(bal!=0){
							Ext.getCmp('edit_profit_GBP').setValue(bal);
							}
					 }
					 }
					 });*/
					 }
                    }
					},
					  renderer: function(value) {
					var index = vendor.find('id', value);
					if (index != -1) {
					return vendor.getAt(index).data.name;
					}
					return value;
					}
		        	
		       },
				{
				 dataIndex: 'currency_rate',
				 text: 'Currency',
				 align: 'center',
                 flex:1,
                 editor:{
					 	xtype:'combo',
					 	store: cur_rate,
						queryMode: 'local',
						displayField: 'name',
						valueField: 'name',
						listeners: {
					change: function (field, newValue, oldValue) 
					{

						var grid = this.up().up();
						var selModel = grid.getSelectionModel();
						var activityid=selModel.getSelection()[0].data.activityid;
						var edit_Job_code=Ext.getCmp('edit_Job_code').getValue(); 
						var conn = new Ext.data.Connection();
						conn.request({
							url: 'service/budget.php',
							method: 'POST',
							params : {
								action:27,
								edit_Job_code:edit_Job_code,activityid:activityid
							},
							success: function(response) {
								obj1 = Ext.JSON.decode(response.responseText);
								var currency_activity=obj1.data.currency_activity;
								//console.log(currency_activity);
								var ratecard_USD=obj1.data.ratecard_USD;
								//console.log(ratecard_USD);
								var ratecard_GBP=obj1.data.ratecard_GBP;
								//console.log(ratecard_GBP);
								if(newValue=="USD")
								{
									selModel.getSelection()[0].set('rate_USD_GBP', ratecard_USD);
								}
								else if(newValue=="GBP")
								{
									selModel.getSelection()[0].set('rate_USD_GBP', ratecard_GBP);
								}
							}
						});

					}
				}
			}
				
				},
				{
				 dataIndex: 'unit_of_measurement',
				 text: 'Unit Of Measurement',
				 align: 'center',
                 flex:2,
                 editor:{
					 	xtype:'combo',
					 	store: unit_of_measure,
						queryMode: 'local',
						displayField: 'unit_of_measure',
						valueField: 'unit_of_measure',
						listeners: {
					change: function (field, newValue, oldValue) 
					{

						var grid = this.up().up();
						var selModel = grid.getSelectionModel();
						var edit_Job_code=Ext.getCmp('edit_Job_code').getValue(); 
						var conn = new Ext.data.Connection();
						conn.request({
							url: 'service/budget.php',
							method: 'POST',
							params : {
								action:26,
								unit_of_measurement:newValue,edit_Job_code:edit_Job_code
							},
							success: function(response) {
								obj1 = Ext.JSON.decode(response.responseText);
								var no_of_unit=obj1.data.no_of_unit;
								var no_of_unit1=obj1.data.no_of_unit1;
								if(newValue=="Cast-off extent")
								{
									selModel.getSelection()[0].set('no_of_unit', no_of_unit);
								}
								else if(newValue=="Manuscript pages")
								{
									selModel.getSelection()[0].set('no_of_unit', no_of_unit1);
								}
								else if(newValue=="Project")
								{
									var no_of_unit_project=1;
									selModel.getSelection()[0].set('no_of_unit', no_of_unit_project);
								}
						//var selModel = grid.getSelectionModel();
						var no_of_unit=selModel.getSelection()[0].data.no_of_unit;
						//alert(no_of_unit);
						var rate_USD_GBP = selModel.getSelection()[0].data.rate_USD_GBP;
							
						var budget_actual_amount=no_of_unit*rate_USD_GBP;
						
						selModel.getSelection()[0].set('budgeted_amount_USD_GBP', budget_actual_amount);
						
						selModel.getSelection()[0].set('actual_amount_USD_GBP', budget_actual_amount);				
							
							}
						});
								

					}
				}
						}
				
				},		
				
		       {
					dataIndex: 'rate_USD_GBP',
					text: 'Rate / Unit',
					flex: 1,
					align: 'center',
					editor: 
					{
						xtype: 'textfield',
					}
				},
		       /*	{
					text:'Rate / Unit',
					
		columns: [{
					dataIndex: 'rate_USD',
					text: '$',
		        	align:'center',
		        	textStyle:'font-size:13px;',
		        	editor: { 
						xtype:'textfield',
						
						listeners:{ 
						change: function(field, newValue, oldValue){
		                	 var grid = this.up().up();
		                     // get selection model of the grid  
		                     var selModel = grid.getSelectionModel();
		                	 var rate=selModel.getSelection()[0].data.no_of_unit;
		                //	  var rate1=selModel.getSelection()[0].data.rate_GBP;
		                	//calculate budgeted amount
		                	 var budget=newValue*rate;
		                	 
		                	 
		                	 selModel.getSelection()[0].set('budgeted_amount_USD', budget);
		                	// selModel.getSelection()[0].set('budgeted_amount_GBP', budget1);
		                	 selModel.getSelection()[0].set('actual_amount_USD', budget);
		                	// selModel.getSelection()[0].set('actual_amount_GBP', budget1);
		                	
		                	
		                	 var actual_amt_USD=0;
							var actual_amt_GBP=0;
							
							
							var actual_amount_USD='';
							var actual_amount_GBP='';
							
							
							var myStore = Ext.getCmp('editaccountPayableGrid').getStore();
							myStore.each(function(rec) {
							actual_amt_USD=actual_amt_USD+parseInt(rec.get('actual_amount_USD'));
							actual_amt_GBP=actual_amt_GBP+parseInt(rec.get('actual_amount_GBP'));	
							
							actual_amount_USD=actual_amount_USD+rec.get('actual_amount_USD')+',';
							actual_amount_GBP=actual_amount_GBP+rec.get('actual_amount_GBP')+',';
							});
							
							Ext.getCmp('edit_total_pay_USD').setValue(actual_amt_USD);
							Ext.getCmp('edit_total_pay_GBP').setValue(actual_amt_GBP);
						}
						}
					}
									
				},
				{
					dataIndex: 'rate_GBP',
					text: '£',
		        	align:'center',
		        	editor: { 
						xtype:'textfield',
						
							listeners:{ 
						change: function(field, newValue, oldValue){
		                	 var grid = this.up().up();
		                     // get selection model of the grid  
		                     var selModel = grid.getSelectionModel();
		                	 var rate=selModel.getSelection()[0].data.no_of_unit;
		                //	  var rate1=selModel.getSelection()[0].data.rate_GBP;
		                	//calculate budgeted amount
		                	 var budget1=newValue*rate;
		                	
		                	// selModel.getSelection()[0].set('budgeted_amount_USD', budget);
		                 selModel.getSelection()[0].set('budgeted_amount_GBP', budget1);
		                	// selModel.getSelection()[0].set('actual_amount_USD', budget);
		                	 selModel.getSelection()[0].set('actual_amount_GBP', budget1);
		                	 
		                	  var actual_amt_USD=0;
							var actual_amt_GBP=0;
							
							
							var actual_amount_USD='';
							var actual_amount_GBP='';
							
							
							var myStore = Ext.getCmp('editaccountPayableGrid').getStore();
							myStore.each(function(rec) {
							actual_amt_USD=actual_amt_USD+parseInt(rec.get('actual_amount_USD'));
							actual_amt_GBP=actual_amt_GBP+parseInt(rec.get('actual_amount_GBP'));	
							
							actual_amount_USD=actual_amount_USD+rec.get('actual_amount_USD')+',';
							actual_amount_GBP=actual_amount_GBP+rec.get('actual_amount_GBP')+',';
							});
							
							Ext.getCmp('edit_total_pay_USD').setValue(actual_amt_USD);
							Ext.getCmp('edit_total_pay_GBP').setValue(actual_amt_GBP);
						}
						}
					}
				}
				]
				},*/
				{
			dataIndex: 'no_of_unit',
			text: 'No Of Units',
			flex: 1,
			align: 'center',
			editor: {
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue, oldValue) {

						var grid = this.up().up();
						var selModel = grid.getSelectionModel();
						//var rate = selModel.getSelection()[0].data.rate_USD;
						//var rate1 = selModel.getSelection()[0].data.rate_GBP;
						var rate = selModel.getSelection()[0].data.rate_USD_GBP;
						var actual = newValue * rate;
						selModel.getSelection()[0].set('budgeted_amount_USD_GBP', actual);
						selModel.getSelection()[0].set('actual_amount_USD_GBP', actual);

						var total_USD = 0;
						var total_GBP = 0;
						var myStore = Ext.getCmp('editaccountReceiveGrid_a').getStore();
						myStore.each( function(rec) {
							total_USD = total_USD + parseFloat(rec.get('actual_amount_USD'));
							total_GBP = total_GBP + parseFloat(rec.get('actual_amount_GBP'));
						});
						Ext.getCmp('edit_total_receive_USD').setValue(total_USD);
						Ext.getCmp('edit_total_receive_GBP').setValue(total_GBP);

					}
				}
			}
		},
				/*{
					dataIndex: 'no_of_unit',
					text: 'No of Units',
					flex: 2,
					align:'center',
					editor: { 
						xtype:'textfield',
					listeners:{ 
						change: function(field, newValue, oldValue){
		                	 var grid = this.up().up();
		                     // get selection model of the grid  
		                     var selModel = grid.getSelectionModel();
		                	 var rate=selModel.getSelection()[0].data.rate_USD;
		                	  var rate1=selModel.getSelection()[0].data.rate_GBP;
		                	//calculate budgeted amount
		                	 var budget=newValue*rate;
		                	 var budget1=newValue*rate1;
		                	 selModel.getSelection()[0].set('budgeted_amount_USD', budget);
		                	 selModel.getSelection()[0].set('budgeted_amount_GBP', budget1);
		                	 selModel.getSelection()[0].set('actual_amount_USD', budget);
		                	 selModel.getSelection()[0].set('actual_amount_GBP', budget1);
		                	 
				            var actual_amt_USD=0;
							var actual_amt_GBP=0;
							
							
							var actual_amount_USD='';
							var actual_amount_GBP='';
							
							
							var myStore = Ext.getCmp('editaccountPayableGrid').getStore();
							myStore.each(function(rec) {
							actual_amt_USD=actual_amt_USD+parseInt(rec.get('actual_amount_USD'));
							actual_amt_GBP=actual_amt_GBP+parseInt(rec.get('actual_amount_GBP'));	
							
							actual_amount_USD=actual_amount_USD+rec.get('actual_amount_USD')+',';
							actual_amount_GBP=actual_amount_GBP+rec.get('actual_amount_GBP')+',';
							});
							
							Ext.getCmp('edit_total_pay_USD').setValue(actual_amt_USD);
							Ext.getCmp('edit_total_pay_GBP').setValue(actual_amt_GBP);
							
							var receive_usd = Ext.getCmp('edit_total_receive_USD').getValue();
							var pay_usd = Ext.getCmp('edit_total_pay_USD').getValue();
							if(receive_usd!=0&&pay_usd!=0)
							{
							var bal=receive_usd-pay_usd;
							var per=(bal/receive_usd)*100;
							per=Math.round(per);
							Ext.getCmp('edit_profit_percentage').setValue(per);
					 var conn = new Ext.data.Connection();
					 conn.request({
					 url: 'service/budget.php',
					 method: 'POST',
					 params : {action:15},
					 success:function(response){
					 obj1 = Ext.JSON.decode(response.responseText);
					 if(obj1.data!=null)
					 {
					 var obj=obj1.data.rate;
					 var val = obj*bal;
					 val=Math.round(val);
					 Ext.getCmp('edit_profit_GBP').setValue(val);
					 }
					 else
					 {
					 	Ext.getCmp('edit_profit_GBP').setValue(bal);
					 }
					 }
					 });
					 }
					 else{
					 	var receive_gdp = Ext.getCmp('edit_total_receive_GBP').getValue();
							var pay_gdp = Ext.getCmp('edit_total_pay_GBP').getValue();
							var bal=receive_gdp-pay_gdp;
							var per=(bal/receive_gdp)*100;
							per=Math.round(per);
							Ext.getCmp('edit_profit_percentage').setValue(per);
							if(bal!=0){
								bal=Math.round(bal);
							Ext.getCmp('edit_profit_GBP').setValue(bal);
							}
					 }
					     }
                             } 
                             }
					
				},*/
				
				{
			dataIndex: 'budgeted_amount_USD_GBP',
			text: 'Budgeted Amount',
			flex: 2,
			align: 'center',
			decimalPrecision: 2,
			sortable: true,
			renderer: Ext.util.Format.numberRenderer('000000.00'),
			
		},
			/*	{
					text:'Budgeted Amount',
		columns: [
				{
					dataIndex: 'budgeted_amount_USD',
					text: '$',
		        	align:'center',
		        	decimalPrecision: 2,
		        	sortable: true,
                    renderer: Ext.util.Format.numberRenderer('0000.00'),
                    //summaryType: 'sum',
					
			    },
			    {
			    	dataIndex: 'budgeted_amount_GBP',
					text: '£',
		        	align:'center',		        	
                    decimalPrecision: 2,			
					sortable: true,
                    renderer: Ext.util.Format.numberRenderer('000000.00'),
			    }
			    ]
			    },*/
			   
			   {
			dataIndex: 'actual_amount_USD_GBP',
			text: 'Actual Amount',
			flex: 2,
			align: 'center',
			decimalPrecision: 2,
			sortable: true,
			renderer: Ext.util.Format.numberRenderer('000000.00'),
			
		},
              /*{
		        	text:'Actual Amount',
		        	
		columns: [
				{
		        	dataIndex:'actual_amount_USD',
		        	text: '$',
		        	align:'center',
		        	editor: { 
						xtype:'numberfield',
						hideTrigger:true,
                        decimalPrecision: 2,
						listeners: {
                            change: function(field, newValue, oldValue) {
								var calcOldValue = parseFloat(oldValue);
								var calcNewValue = parseFloat(newValue);
								if(oldValue === null || oldValue === undefined || oldValue === '' || oldValue === 'NaN' || oldValue === NaN)
									calcOldValue = 0;
								if(newValue === null || newValue === undefined || newValue === '' || newValue === 'NaN' || newValue === NaN)
								{
									calcNewValue = 0;
									field.setValue('0.00');
								}
								var newUsdValue = parseFloat(Ext.getCmp('edit_total_pay_USD').getValue())- parseFloat(calcOldValue) + parseFloat(calcNewValue);
								Ext.getCmp('edit_total_pay_USD').setValue(newUsdValue);
                            }
                        }
						
						
						
						
						
						
						},
						sortable: true,
                        renderer: Ext.util.Format.numberRenderer('000000.00'),
		        	
		       },
		       {
		       		dataIndex:'actual_amount_GBP',
		        	text: '£',
		        	align:'center',
		        	editor: { 
						xtype:'numberfield',
						hideTrigger:true,
                        decimalPrecision: 2,
							listeners: {
                            change: function(field, newValue, oldValue) {
								var calcOldValue = parseFloat(oldValue);
								var calcNewValue = parseFloat(newValue);
								if(oldValue === null || oldValue === undefined || oldValue === '' || oldValue === 'NaN' || oldValue === NaN)
									calcOldValue = 0;
								if(newValue === null || newValue === undefined || newValue === '' || newValue === 'NaN' || newValue === NaN)
								{
									calcNewValue = 0;
									field.setValue('0.00');
								}
								var newGbpValue = parseFloat(Ext.getCmp('edit_total_pay_GBP').getValue())- parseFloat(calcOldValue) + parseFloat(calcNewValue);
								Ext.getCmp('edit_total_pay_GBP').setValue(newGbpValue);
                            }

                            
                        }
						
						
						},
						sortable: true,
                        renderer: Ext.util.Format.numberRenderer('000000.00'),
		       },
		       ]
		       },*/
		       							
		{
			xtype:'actioncolumn',
			align: 'center',
			flex:2,
			text:'Actions',
			
			items: [
			{
					iconCls: 'deleteClass',
					tooltip: 'Delete',
					handler: function(grid, rowIndex, colIndex) {
						
						

					var grid = this.up('grid');
					if (grid)
					{
						
						var edit_Job_code=Ext.getCmp('edit_Job_code').getValue();
						var projectID=Ext.getCmp('editbudgetHeader_projectID').getValue();
						
						//alert(projectID);
						
						var workflow=Ext.getCmp('editbudgetHeader_workflow').getValue();
						//alert(workflow);
						
						var rec = grid.getStore().getAt(rowIndex);
						Ext.Msg.confirm('Remove Record '+rec.get('activityid')+' ?',+rec.get('activityid'), function (button) 
						{
							if (button == 'yes') 
							{
								var id=rec.get('budgetExpense_id');
								
								//alert(id);
								
								var conn = new Ext.data.Connection();
								conn.request(
								{
									url: 'service/budget.php',
									method: 'POST',
									params : 
									{
										action:5,
										budgetid:id
									},
									success: function(response) 
									{
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message);
										var grid3=Ext.getCmp('editaccountPayableGrid');
										grid3.getStore().load(
										{
											params: 
											{
												action:1,job_code:edit_Job_code
											}
										});
										 Ext.getCmp('editaccountPayableGrid').getView().refresh();
										
									},
									failure: function(response) 
									{
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Deletion Failed !', obj.message);
									}
								});

							}
						});
					}
					
					}
				},
				]
		}
		  
		];
		 
			this.bbar = Ext.create('Ext.PagingToolbar', {
			store : this.store,
			items:[{
                               xtype : 'button',
                               text : 'Insert New Row',
                               pressed:true,
                               x : 500,
                               y : 10,
                               width : 100,
                               height : 25,
                               handler : function() {
                               	var project_id=Ext.getCmp('editbudgetHeader_projectID').getValue();
                               	   	 var conn = new Ext.data.Connection();
					 conn.request({
					 url: 'service/budget.php',
					 method: 'POST',
					 params : {action:17,project_id:project_id},
					 success:function(response){
					 obj1 = Ext.JSON.decode(response.responseText);
					 var confirm=obj1.data.confirmed_extent;
					 var cast=obj1.data.castoff_extent;
					if (confirm != 0 && cast != 0 )
					 {
					var r = Ext.create('MyDesktop.model.budget', {
               						budgetExpense_id:'',
                    				activityid: '',
                    				activity: '',
                 					vendor:'',
                    				no_of_unit: cast,
                    				rate_USD: '',
                    				rate_GBP: '',
                    				budgeted_amount_USD:'',
                    				budgeted_amount_GBP: '',
                    				actual_amount_USD: '',
                    				actual_amount_GBP: '',
                    				
                				});
                		       budget.insert(budget.getCount(), r);
					 }
					 else if(confirm != 0 )
					 {
					 		var r = Ext.create('MyDesktop.model.budget', {
               						budgetExpense_id:'',
                    				activityid: '',
                    				activity: '',
                 					vendor:'',
                    				no_of_unit: confirm,
                    				rate_USD: '',
                    				rate_GBP: '',
                    				budgeted_amount_USD:'',
                    				budgeted_amount_GBP: '',
                    				actual_amount_USD: '',
                    				actual_amount_GBP: '',
                    				
                				});
                		       budget.insert(budget.getCount(), r);
					 }else 
					 {
					 	var r = Ext.create('MyDesktop.model.budget', {
               						budgetExpense_id:'',
                    				activityid: '',
                    				activity: '',
                 					vendor:'',
                    				no_of_unit: cast,
                    				rate_USD: '',
                    				rate_GBP: '',
                    				budgeted_amount_USD:'',
                    				budgeted_amount_GBP: '',
                    				actual_amount_USD: '',
                    				actual_amount_GBP: '',
                    				
                				});
                		       budget.insert(budget.getCount(), r);
					 }
					 }
					 });
               						
            				 }                           
        },{
                               xtype : 'button',
                               id : 'edit_refresh_new_pay_budget',
                               text : 'Refresh',
                               pressed:true,
                               x : 500,
                               y : 10,
                               width : 100,
                               height : 25,
                               handler : function() {
                              		budget.reload();
            				 }                           
        },
        
        ],
				listeners: {
							afterrender : function() {
								this.child('#refresh').hide();
							}		
						}	
			
		});
		
		
		this.callParent(arguments);

	}
});