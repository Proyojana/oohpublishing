
    var available = Ext.create('Ext.data.Store', {
   fields: ['Chapter_number', 'surname','email','approve','Sent','Back'],
   data : [
        {"Chapter_number":"4", "surname":"George","email":"george@gmail.com","approve":"3","Sent":"14/01/2014","Back":"21/01/2014"},
         {"Chapter_number":"4", "surname":"Brian","email":"brian@gmail.com","approve":"3","Sent":"23/01/2014","Back":""},
        
       ]
   });
Ext.define('MyDesktop.view.projectmanagement.completedprojects.ContribGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.contribgridCP',
	closeAction: 'hide',
	
//	height:200,
	//requires : ['MyDesktop.store.freelancer'],
	anchor: '76% 30%',
	id:'contribgridCP',
	title:'Contributors',
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
					dataIndex: 'Chapter_number',
					text: 'Chapter Number',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'surname',
					text: 'Contributor Name',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				
				{
					dataIndex: 'email',
					text: 'Email Address',
					align: 'center',
					flex:2,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'approve',
					text: 'To See Proofs?',
					align: 'center',
					flex:2,
					filter: {
                	type: 'string'
           	},
           	
				},
				{
					dataIndex: 'Sent',
					text: 'Proof Sent',
					align: 'center',
					flex:2,
					filter: {
                	type: 'string'
           	},
           	
				},
				{
					dataIndex: 'Back',
					text: 'Proof Back',
					align: 'center',
					flex:2,
					filter: {
                	type: 'string'
           	},
           	
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
