
    var available = Ext.create('Ext.data.Store', {
   fields: ['Id', 'Amount','paid','Payment','approve'],
   data : [
        {"Amount":"$40.00", "paid":"Jedidiah","Payment":"Courier Charges","approve":"Walden"},
         {"Amount":"$30.00", "paid":"Jedidiah","Payment":"For Additional copies","approve":"Walden"},
       
       ]
   });
Ext.define('MyDesktop.view.projectmanagement.completedprojects.AddChargesGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.addchargesgridCP',
	closeAction: 'hide',
	
	height:200,
	//requires : ['MyDesktop.store.freelancer'],
	title:'Budget',
	id:'addchargesgridCP',
	title:'Additional Charges',
	initComponent: function() {
		
		/*var ci = Ext.create('MyDesktop.store.freelancer');
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
					dataIndex: 'Id',
					hidden:true
				},
				{
					dataIndex: 'Amount',
					text: 'Amount',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'paid',
					text: 'Paid-to',
					align: 'left',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				
				{
					dataIndex: 'Payment',
					text: 'Reason for additional payment',
					align: 'left',
					flex:2,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'approve',
					text: 'Approved by',
					align: 'left',
					flex:2,
					filter: {
                	type: 'string'
           		}
				},
				
				
				
		];
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

// Load first data page
//    employee.loadPage(1);
