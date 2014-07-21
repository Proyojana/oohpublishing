
    var available = Ext.create('Ext.data.Store', {
   fields: ['Id', 'Activity','Level','Page_rate1','Page_rate2','Sub_total','Sub_total1'],
   data : [
        {"Activity":"Project Manager", "Level":"tbc","Page_rate1":"$2.00","Page_rate2":"3","Sub_total":"4","Sub_total1":"8"},
         {"Activity":"Typesetting", "Level":"tbc","Page_rate1":"$20.00","Page_rate2":"3","Sub_total":"4","Sub_total1":"8"},  
         {"Activity":"Copyediting", "Level":"tbc","Page_rate1":"$20.00","Page_rate2":"3","Sub_total":"4","Sub_total1":"8"},  
       ]
   });
Ext.define('MyDesktop.view.projectmanagement.newproject.budget.budgetGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.newprojectBudgetgrid',
	closeAction: 'hide',
	
	height:215,
	//requires : ['MyDesktop.store.freelancer'],
	title:'Budget',
	id:'newprojectBudgetgrid',
	initComponent: function() {
		
	/*	var ci = Ext.create('MyDesktop.store.freelancer');
		ci.load({
			params: {
				start: 0,
				limit: 8
			}
		});
		ci.loadPage(1);*/
		this.store = available,
			this.columns = [
			{
				xtype:'rownumberer',				
			},
				{
					dataIndex: 'Id',
					hidden:true
				},
				{
					dataIndex: 'Activity',
					text: 'Activity',
					align: 'left',
					flex:1.5,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'Level',
					text: 'Level',
					align: 'center',
					flex:0.5,
					filter: {
                	type: 'string'
           		}
				},
				
				{
					dataIndex: 'Page_rate1',
					text: '$ Page rate',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'Page_rate2',
					text: '	Â£ Page rate',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'Sub_total',
					text: '$ Sub-total',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'Sub_total1',
					text: '	Â£ Sub-total',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				
				
		{
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
		}];
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
