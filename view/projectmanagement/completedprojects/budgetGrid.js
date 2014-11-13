

/*Completed projects for Budget grid*/

Ext.define('MyDesktop.view.projectmanagement.completedprojects.budgetGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.budgetgridCP',
	anchor: '100% 89%',
	closeAction: 'hide',
	
	//height:200,
	requires:['MyDesktop.store.Budget'],
	title:'Budget',
	id:'budgetgridCP',
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
					text: 'Activityfdgss',
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
		  
		        
			
				
		];
		 
			this.bbar = Ext.create('Ext.PagingToolbar', {
			store : this.store,
			//displayInfo: false,
			//displayMsg: 'Displaying topics {0} - {1} of {2}',
			//emptyMsg: "No topics to display",
			items:[
			
			]
		});
		
		
		this.callParent(arguments);

	}
});
//    employee.loadPage(1);

