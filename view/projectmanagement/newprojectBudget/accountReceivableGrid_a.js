var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
var encode = false;

Ext.define('MyDesktop.view.projectmanagement.newprojectBudget.accountReceivableGrid_a', {
	extend:'Ext.grid.Panel',
	title:'Fee offered from client (Receivables)',
	alias:'widget.accountReceiveGrid_a',
	closeAction: 'hide',
	width:1050,
	requires:['MyDesktop.model.Receive_a'],
	id:'accountReceiveGrid_a',
	plugins: [
              Ext.create('Ext.grid.plugin.CellEditing', {
                  clicksToEdit: 1
             })        
    ],
     
	initComponent: function() {
		//load receive store
		var receive = Ext.create('MyDesktop.store.Receivable');
		receive.load({
			params: {
				start: 0,
				limit: 50
			}
		});
	var activity = Ext.create('MyDesktop.store.ProductionStages');
		activity.load({
			params: {
				start: 0,
				limit: 50
			}
		});
	var budget = Ext.create('MyDesktop.store.Receive_a');
		budget.load({
			params: {
				start: 0,
				limit: 50
			}
		});
		budget.loadPage(1);
		this.store = budget,
		
		this.columns = [
		
		{
			dataIndex: 'budgetReceive_id',
			hidden:true,
		},
		 {
					dataIndex: 'activity_name',
					text: 'Activity',
					flex: 1,
					align:'center',
					 editor: { 
						xtype:'combo',
						store: activity,
						queryMode: 'local',
						displayField: 'product_name',
						valueField: 'product_id',
						listeners:{ 
						change: function(field, newValue, oldValue){
								var grid = this.up().up();
                        // get selection model of the grid  
                    var selModel = grid.getSelectionModel();
                	var activity=selModel.getSelection()[0].data.activity_name;
                	var job_code=Ext.getCmp('budgetHeader_Job').getValue();
                	alert(job_code);
					 var conn = new Ext.data.Connection();
					 conn.request({
					 url: 'service/budget.php',
					 method: 'POST',
					 params : {action:18,job_code:job_code,activity:activity},
					 success:function(response){
					 obj1 = Ext.JSON.decode(response.responseText);
					
					 var rate=obj1.data.rate_USD;
					  var rate1=obj1.data.rate_GBP;
					
					 Ext.getCmp('rate_USD').setValue(rate);
					 Ext.getCmp('rate_GBP').setValue(rate1);
					 }
					 });
						}
						}
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
					text:'Rate / Unit',
					
		columns: [{
					dataIndex: 'rate_USD',
					text: '$',
		        	align:'center',
		        	textStyle:'font-size:13px;',
		        	editor: { 
						xtype:'textfield',
					}
									
				},
				{
					dataIndex: 'rate_GBP',
					text: '£',
		        	align:'center',
		        	editor: { 
						xtype:'textfield',
					}
				}
				]
				},
					{
					dataIndex: 'no_of_unit',
					text: 'No Of Units',
					flex: 1,
					align:'center',
					editor: { 
						xtype:'textfield',
						listeners:{ 
						change: function(field, newValue, oldValue){
		                	 var grid = this.up().up();
		                	 var selModel = grid.getSelectionModel();
		                	 var rate=selModel.getSelection()[0].data.rate_USD;
		                	 var rate1=selModel.getSelection()[0].data.rate_GBP;
		                	 var actual=newValue*rate;
		                	 var actual1=newValue*rate1;
		                	 selModel.getSelection()[0].set('budgeted_amount_USD', actual);
		                	 selModel.getSelection()[0].set('budgeted_amount_GBP', actual1);
		                	  selModel.getSelection()[0].set('actual_amount_USD', actual);
		                	 selModel.getSelection()[0].set('actual_amount_GBP', actual1);
		                	 
		                	 var total_USD=0;
					         var total_GBP=0;
					         var myStore = Ext.getCmp('accountReceiveGrid_a').getStore();
					 myStore.each(function(rec) {
					 	total_USD=total_USD+parseInt(rec.get('actual_amount_USD'));
						total_GBP=total_GBP+parseInt(rec.get('actual_amount_GBP'));
					 	});
		                Ext.getCmp('total_receive_USD').setValue(total_USD);
					    Ext.getCmp('total_receive_GDP').setValue(total_GBP);
		                	}
		                }
					}
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
					text:'Actual Amount',
		columns: [
				{
					dataIndex: 'actual_amount_USD',
					text: '$',
		        	align:'center',
		        	
					
			    },
			    {
			    	dataIndex: 'actual_amount_GBP',
					text: '£',
		        	align:'center',
			    }
			    ]
			    },
		       
				/* {
					dataIndex: 'rate_USD',
					text: 'Rate/Unit in $',
					flex: 1,
					align:'center',
					editor: { 
						xtype:'textfield',
					}
				},
				 {
					dataIndex: 'rate_GBP',
					text: 'Rate/Unit in £',
					flex: 1,
					align:'center',
					editor: { 
						xtype:'textfield',
					}
				},
				{
					dataIndex: 'actual_unit',
					text: 'Actuall Billable Units',
					flex: 1,
					align:'center',
					editor: { 
						xtype:'textfield',
						listeners:{ 
						change: function(field, newValue, oldValue){
		                	 var grid = this.up().up();
		                	 var selModel = grid.getSelectionModel();
		                	 var rate=selModel.getSelection()[0].data.rate_USD;
		                	 var rate1=selModel.getSelection()[0].data.rate_GBP;
		                	 var actual=newValue*rate;
		                	 var actual1=newValue*rate1;
		                	 selModel.getSelection()[0].set('amt_USD', actual);
		                	 selModel.getSelection()[0].set('amt_GBP', actual1);
		                	}
		                }
					}
				},
				{
					dataIndex: 'amt_USD',
					text: 'Actual Billable Amount in $',
					flex: 1.5,
					align:'center',
					editor: { 
						xtype:'textfield',
					}
				},
				{
					dataIndex: 'amt_GBP',
					text: 'Actual Billable Amount in £',
					flex: 1.5,
					align:'center',
					editor: { 
						xtype:'textfield',
					}
				},*/
				
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
						
				
					}
				},
				]
		}
		  	
		];
		 
			this.bbar = Ext.create('Ext.PagingToolbar', {
			store : this.store,
			 items:[{
                               xtype : 'button',
                              // id : 'addnewrowcust',
                               text : 'Insert New Row',
                               pressed:true,
                               x : 500,
                               y : 10,
                               width : 100,
                               height : 25,
                               handler : function() {
               						var r = Ext.create('MyDesktop.model.Receive_a', {
               						budgetReceive_id:'',
               						activity_name:'',
               						uom:'',
               						rate_USD: '',
               						rate_GBP: '',
               						budgeted_amount_USD:'',
               						budgeted_amount_GBP:'',
               						actual_amount_USD:'',
               						actual_amount_GBP:''
                				});
                		       budget.insert(budget.getCount(), r);
            				 }                           
        },
        
        ]
		});
		
		
		this.callParent(arguments);

	}
});