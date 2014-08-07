
    var available = Ext.create('Ext.data.Store', {
   fields: ['Id', 'Activity','Level','Page_rate1','Page_rate2','Sub_total','Sub_total1'],
   data : [
        {"Activity":"Project Manager", "Level":"tbc","Page_rate1":"$2.00","Page_rate2":"3","Sub_total":"4","Sub_total1":"8"},
         {"Activity":"Typesetting", "Level":"tbc","Page_rate1":"$20.00","Page_rate2":"3","Sub_total":"4","Sub_total1":"8"},  
         {"Activity":"Copyediting", "Level":"tbc","Page_rate1":"$20.00","Page_rate2":"3","Sub_total":"4","Sub_total1":"8"},  
       ]
   });
Ext.define('MyDesktop.view.projectmanagement.currentprojects.budgetGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.budgetgrid',
	anchor: '50% 89%',
	closeAction: 'hide',
	
	//height:200,
	requires:['MyDesktop.store.Budget'],
	title:'Budget',
	id:'budgetgrid',
	initComponent: function() {
		
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
				xtype:'rownumberer',				
			},
				{
					dataIndex: 'Id',
					hidden:true
				},
				{
					dataIndex: 'activity_name',
					text: 'Activity',
					align: 'left',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'stage',
					text: 'Stage',
					align: 'center',
					flex:0.5,
					filter: {
                	type: 'string'
           		}
				},
				
				{
					dataIndex: 'rate_USD',
					text: 'Page rate ($)',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'rate_GBP',
					text: 'Page rate (£)',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'budgeted_amount_USD',
					text: 'Budgeted Amount ($)',
					align: 'center',
					flex:1.5,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'budgeted_amount_GBP',
					text: 'Budgeted Amount (£)',
					align: 'center',
					flex:1.5,
					filter: {
                	type: 'string'
           		}
				},
				
				
	/*	{
					xtype:'actioncolumn',
					align: 'center',
					flex:1,
				//	width:180,
					text:'Actions',
					items: [{
						iconCls: 'viewClass',
						tooltip: 'View',
		
			},{
				iconCls: 'editClass',
				//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
				tooltip: 'Edit',
			
			},{
					iconCls: 'deleteClass',
					tooltip: 'Delete',
			
				}]
		}*/];
		this.bbar = Ext.create('Ext.PagingToolbar', {  

			store : this.store,
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display",
			items:[
			]
			
		}),
		
		this.callParent(arguments);

	}
});
//    employee.loadPage(1);
