Ext.define('MyDesktop.view.projectmanagement.currentprojects.ProductionBudgetGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.pbudgetgrid',
	anchor: '100% 89%',
	closeAction: 'hide',
	
	//height:200,
	requires:['MyDesktop.store.ProductionReportBudget'],
	//title:'Budget',
	id:'pbudgetgrid',
	
	initComponent: function() {
		
		
		function color(value, metaData, record, rowIndex, colIndex,store){
		return '<span style="background-color:#c0c0c0;">' + value + '</span>';
		}
	
		
		//load budget store
		var budget = Ext.create('MyDesktop.store.ProductionReportBudget');
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
					dataIndex: 'name',
					text: 'Activity',
					flex: 2			 
				},
				{
					dataIndex: 'currency_rate',
					text: 'Currency',
					flex: 2,
					
				},	
	     	   {
	     			dataIndex:'unit_of_measurement',
		        	text: 'UOM',
		        	flex: 2,
		        	
		        },
				{
					dataIndex:'no_of_unit',
		        	text: 'No of Units',
		        	flex: 2,
				},
				{
					dataIndex:'rate_USD_GBP',
		        	text: 'Rate / Unit',
		        	flex: 2,
				},
		       		        			
				{
		        	dataIndex:'acual_amount_USD_GBP',
		        	text: 'Actual Amount',
		       },
		      
			
				
		];
		 
			
		
		this.callParent(arguments);

	}
});
//    employee.loadPage(1);
