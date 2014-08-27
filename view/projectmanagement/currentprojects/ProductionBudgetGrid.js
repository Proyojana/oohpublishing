Ext.define('MyDesktop.view.projectmanagement.currentprojects.ProductionBudgetGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.pbudgetgrid',
	anchor: '100% 89%',
	closeAction: 'hide',
	
	//height:200,
	requires:['MyDesktop.store.Budget'],
	//title:'Budget',
	id:'pbudgetgrid',
	
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
		
		
		this.store = budget,
	
		this.columns = [
		
	
		        {				
					dataIndex: 'activityid',
					text: 'Activity',
					 flex: 2,
					 
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
				},
				 
				{
					dataIndex: 'unit',
					text: 'Unit',
					flex: 2,
					
				},
								
	     	   {
	     			dataIndex:'actual_unit',
		        	text: 'No. of Units Actual',
		        	flex: 2,
		        	
		        },
		       		        			
				{
		        	dataIndex:'actual_amount_USD',
		        	text: 'Actual Amount in $',
		       },
		      
			
				
		];
		 
			
		
		this.callParent(arguments);

	}
});
//    employee.loadPage(1);
