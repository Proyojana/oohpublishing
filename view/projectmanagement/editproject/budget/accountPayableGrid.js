var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
var encode = false;
    
  
Ext.define('MyDesktop.view.projectmanagement.editproject.budget.accountPayableGrid', {
	extend:'Ext.grid.Panel',
	title:'Budgeted Expenses and Accounts Payable',
	
	alias:'widget.edit_accountPayableGrid',
	closeAction: 'hide',
	//selModel:sm,
	requires:['MyDesktop.store.Budget'],
	id:'edit_accountPayableGrid',
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
				limit: 8
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
		this.tbar = Ext.create('Ext.Toolbar', {  
							   items:[{
                               xtype : 'button',
                               id : 'addnewrowcust1',
                               text : 'Insert New Row',
                               pressed:true,
                               x : 500,
                               y : 10,
                               width : 100,
                               height : 25,
                               handler : function() {
               						var r = Ext.create('MyDesktop.model.budget', {
               						budgetExpense_id:'',
                    				activityid: '',
                    				activity: '',
                 					stageid: '',
                    				stage: '',
                    				vendor:'',
                    				unit: '',
                    				num_units_budgeted: '',
                 					rate_USD: '',
                    				rate_GBP: '',
                    				budgeted_amount_USD:'',
                    				budgeted_amount_GBP: '',
                    				actual_unit: '',
                 					actual_amount_USD: '',
                    				actual_amount_GBP: '',
                    				
                				});
                		       budget.insert(0, r);
            				 }                           
        },
        
        ]
        });
		this.columns = [
		
		{
			dataIndex: 'budgetExpense_id',
			hidden:true,
		},
		/*{
			dataIndex: 'activityid',
			hidden:true,
		},
		{
			dataIndex: 'stageid',
			hidden:true,
		},*/
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
					dataIndex: 'stage',
					text: 'Stage',
					flex: 2,
					align:'center',
					editor: { 
						xtype:'textfield',
						
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
                	var grid = this.up().up();
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
					 
					 var unit=obj1.data.uom;
					 var rate=obj1.data.rate_USD;
					 var rate1=obj1.data.rate_GBP; 
                        //NOTE: 'control' here is the value set in the dataIndex property of the Control combobox  
                         selModel.getSelection()[0].set('unit', unit);
                         selModel.getSelection()[0].set('rate_USD', rate);
                         selModel.getSelection()[0].set('rate_GBP', rate1);
					 }
					 });
                   
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
					dataIndex: 'unit',
					text: 'Unit',
					flex: 2,
					align:'center',
					
				},
				{	
			
					dataIndex: 'num_units_budgeted',
					text: 'No.of Units <br/>Budgeted',
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
					
                                                                   }
                              } 
                              }
           
					
				},	
				{
					text:'Rate / Unit',
					
		columns: [{
					dataIndex: 'rate_USD',
					text: '$',
		        	align:'center',
		        	textStyle:'font-size:13px;'
									
				},
				{
					dataIndex: 'rate_GBP',
					text: '£',
		        	align:'center',
				}
				]
				},
				
				{
					text:'Budgeted Amount',
		columns: [
				{
					dataIndex: 'budgeted_amount_USD',
					text: '$',
		        	align:'center',
		        	
					
			    },
			    {
			    	dataIndex: 'budgeted_amount_GBP',
					text: '£',
		        	align:'center',
			    }
			    ]
			    },
		       
		       
	     	   {
	     			dataIndex:'actual_unit',
		        	text: 'No. of Units<br/> Actual',
		        	editor: { xtype:'textfield',
		        	listeners:{ 
						change: function(field, newValue, oldValue){
							
							var grid = this.up().up();
                       		// get selection model of the grid  
                     		var selModel = grid.getSelectionModel();
		                	//var num_units=selModel.getSelection()[0].data.actual_unit;
		                	var rate=selModel.getSelection()[0].data.rate_USD;
		                	var rate1=selModel.getSelection()[0].data.rate_GBP;
		                	//calculate actual amount
		                	var budget=newValue*rate;
		                	var budget1=newValue*rate1;
		                	//set actual amount value
		                	selModel.getSelection()[0].set('actual_amount_USD', budget);
		                	selModel.getSelection()[0].set('actual_amount_GBP', budget1);
								}
						},
		        	
					},
					flex: 2,
					align:'center',
		        	
		        }
		         ,
		        {
		        	text:'Actual Amount',
		        	
		columns: [
				{
		        	dataIndex:'actual_amount_USD',
		        	text: '$',
		        	align:'center',
		        	
		       },
		       {
		       		dataIndex:'actual_amount_GBP',
		        	text: '£',
		        	align:'center',
		       },
		       ]
		       },
		       							
		{
			xtype:'actioncolumn',
			align: 'center',
			flex:1,
			text:'Actions',
			
			items: [
			{
					iconCls: 'deleteClass',
					tooltip: 'Delete',
					handler: function(grid, rowIndex, colIndex) {
						
						var grid = this.up('grid');
					if (grid) {
						var projectID=Ext.getCmp('budgetHeader_projectID').getValue(); 
					var workflow=Ext.getCmp('budgetHeader_workflow').getValue(); 
						       	var rec = grid.getStore().getAt(rowIndex);
						Ext.Msg.confirm('Remove Record '+rec.get('stage')+' ?',+rec.get('stage'), function (button) {
							if (button == 'yes') {
								var id=rec.get('budgetExpense_id');
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/budget.php',
									method: 'POST',
									params : {action:5,budgetid:id},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message); 
										  var grid3=Ext.getCmp('accountPayableGrid');
									grid3.getStore().load({params:{action:1,workflowid:workflow,projectid:projectID}});
									},
									failure:function(response){
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
			//displayInfo: false,
			//displayMsg: 'Displaying topics {0} - {1} of {2}',
			//emptyMsg: "No topics to display",
			items:[
			{
				xtype:'button',
				text:'Save',
				pressed:true,
				width:100,
			//	margin:'0 0 0 100',
				handler:function(){
					
					var projectID=Ext.getCmp('editbudgetHeader_projectID').getValue(); 
					var workflow=Ext.getCmp('editbudgetHeader_workflow').getValue(); 
					//alert(projectID);
							var activity='';
							var stage='';
							var vendor='';
							var unit='';
							var budgeted_unit='';
							var rate_USD='';
							var rate_GBP='';
							var budgeted_amount_USD='';
							var budgeted_amount_GBP='';
							var actual_unit='';
							var actual_amount_USD='';
							var actual_amount_GBP='';
							var budget_id='';
							var grid=Ext.getCmp('edit_accountPayableGrid');
							
					var myStore = Ext.getCmp('edit_accountPayableGrid').getStore();
					myStore.each(function(rec) {
						
				    activity=activity+rec.get('activityid')+',';
				    stage=stage+rec.get('stage')+',';
				    vendor=vendor+rec.get('vendor')+',';
				    unit=unit+rec.get('unit')+',';
				    budgeted_unit=budgeted_unit+rec.get('num_units_budgeted')+',';
				    rate_USD=rate_USD+rec.get('rate_USD')+',';
				    rate_GBP=rate_GBP+rec.get('rate_GBP')+',';
				    budgeted_amount_USD=budgeted_amount_USD+rec.get('budgeted_amount_USD')+',';
				    budgeted_amount_GBP=budgeted_amount_GBP+rec.get('budgeted_amount_GBP')+',';
				    actual_unit=actual_unit+rec.get('actual_unit')+',';
				    actual_amount_USD=actual_amount_USD+rec.get('actual_amount_USD')+',';
				    actual_amount_GBP=actual_amount_GBP+rec.get('actual_amount_GBP')+',';
				    budget_id=budget_id+rec.get('budgetExpense_id')+',';
				   					
				});
				      //alert(e);	
					 //alert(d);
					//alert(tid);	
				   //alert(secid);
				
					var conn = new Ext.data.Connection();
					 conn.request({
						url: 'service/budget.php',
						method: 'POST',
						params : {action:4,workflow:workflow,budget_id:budget_id,projectID:projectID,activity:activity,stage:stage,vendor:vendor,unit:unit,budgeted_unit:budgeted_unit,rate_USD:rate_USD,rate_GBP:rate_GBP,
							budgeted_amount_USD:budgeted_amount_USD,budgeted_amount_GBP:budgeted_amount_GBP,actual_unit:actual_unit,actual_amount_USD:actual_amount_USD,actual_amount_GBP:actual_amount_GBP},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							//refresh grid
							var grid3=Ext.getCmp('accountPayableGrid');
							grid3.getStore().load({params:{action:1,workflowid:workflow,projectid:projectID}});
						}
					});
					
				}
			},
			
			{
				xtype:'button',
				text:'Show total',
				pressed:true,
				width:100,
				margin:'0 0 0 50',
				handler:function(){
					
					/**variable declaration**/
					var budgeted_amount_USD=0;
					var budgeted_amount_GBP=0;
					var actual_amount_USD=0;
					var actual_amount_GBP=0;
					/*** get value from store**/
					var myStore = Ext.getCmp('accountPayableGrid').getStore();
					myStore.each(function(rec) {
					
				    budgeted_amount_USD=budgeted_amount_USD+parseInt(rec.get('budgeted_amount_USD'));
				    
				    budgeted_amount_GBP=budgeted_amount_GBP+parseInt(rec.get('budgeted_amount_GBP'));
				   
				    actual_amount_USD=actual_amount_USD+parseInt(rec.get('actual_amount_USD'));
				    actual_amount_GBP=actual_amount_GBP+parseInt(rec.get('actual_amount_GBP'));
				    
				   					
				});
				
				var diff_usd=budgeted_amount_USD-actual_amount_USD;
				var diff_gbp=budgeted_amount_GBP-actual_amount_GBP;
					
					var win = Ext.create('Ext.Window', {
					extend : 'Ext.form.Panel',
					layout : {
						type : 'absolute'
					},
					maximizable : false,
					//title : 'Resubmission Reason',
					frame : true,
					width : 700,
					height : 173,
					modal:true,
				    defaults: {
						labelWidth: 165,
						
					},
					
					defaultType: 'textfield',
	
					items : [
					{
						
						fieldLabel:'Total Budgeted Amount in $',
						x:10,
						y:10,
						id:'total_budgeted_amount_usd',
						listeners: {
                            afterrender: function() {
                                Ext.getCmp('total_budgeted_amount_usd').setValue(budgeted_amount_USD);
                            } 
                        }
						
					},
					{
						
						fieldLabel:'Total Budgeted Amount in £',
						x:320,
						y:10,
					    id:'total_budgeted_amount_gbp',
					    listeners: {
                            afterrender: function() {
                                Ext.getCmp('total_budgeted_amount_gbp').setValue(budgeted_amount_GBP);
                            } 
                        }
						
						
					},
					{
						
						fieldLabel:'Total Actual Amount in $',
						x:10,
						y:60,
						id:'total_actual_amount_usd',
						listeners: {
                            afterrender: function() {
                                Ext.getCmp('total_actual_amount_usd').setValue(actual_amount_USD);
                            } 
                        }
						
						
					},
					
					{
						
						fieldLabel:'Total Actual Amount in £',
						x:320,
						y:60,
						id:'total_actual_amount_gbp',
						listeners: {
                            afterrender: function() {
                                Ext.getCmp('total_actual_amount_gbp').setValue(actual_amount_GBP);
                            } 
                        }
						
						
					},
					
					{
						
						fieldLabel:'Difference in $',
						x:10,
						y:110,
						id:'difference_usd',
						listeners: {
                            afterrender: function() {
                                Ext.getCmp('difference_usd').setValue(diff_usd);
                            } 
                        }
						
						
					},
					{
						
						fieldLabel:'Difference in £',
						x:320,
						y:110,
						id:'difference_gbp',
						listeners: {
                            afterrender: function() {
                                Ext.getCmp('difference_gbp').setValue(diff_gbp);
                            } 
                        }
						
						
					},
					
					]
					});
					win.show();
					
					
				}
			},
			
			
			]
		});
		
		
		this.callParent(arguments);

	}
});