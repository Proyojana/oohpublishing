var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
var encode = false;

Ext.define('MyDesktop.view.projectmanagement.editproject.budget.accountReceivableGrid_a', {
	extend:'Ext.grid.Panel',
	title:'Budget Accounts Receivables',
	alias:'widget.editaccountReceiveGrid_a',
	closeAction: 'hide',
	width:1100,
	requires:['MyDesktop.model.Receivable_a'],
	id:'editaccountReceiveGrid_a',
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
	var budget = Ext.create('MyDesktop.store.Receivable_a');
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
							alert("actual_amt_USD");
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
		                	 
		             actual_amt_USD=rec.get('actual_amount_USD');
				    actual_amt_GBP=actual_amt_GBP+parseInt(rec.get('actual_amount_GBP'));	
				    alert("actual_amt_USD");
		                	 
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
			items:[
			{
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
               						actual_unit:'',
               						amt_USD:'',
               						amt_GBP:''
                				});
                		       budget.insert(budget.getCount(), r);
            				 }                           
        },
        
			]
		});
		
		
		this.callParent(arguments);

	}
});