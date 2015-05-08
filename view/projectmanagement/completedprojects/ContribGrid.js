/*Completed projects for contributors*/


    
Ext.define('MyDesktop.view.projectmanagement.completedprojects.ContribGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.contribgridCP',
	closeAction: 'hide',
	
//	height:200,
	
	anchor: '76% 30%',
	id:'contribgridCP',
	title:'Contributors',
	initComponent: function() {
		
		
		var contributor = Ext.create('MyDesktop.store.ContribGrid');
		contributor.load({
			params: {
				start: 0,
				limit: 50
			}
		});
	this.store = contributor,
			this.columns = [
				{
					dataIndex: 'Id',
					hidden:true
				},
				{
					dataIndex: 'chap_num',
					text: 'Chapter Number',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'contrib_name',
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
					dataIndex: 'see_proof',
					text: 'To See Proofs?',
					align: 'center',
					flex:2,
					filter: {
                	type: 'string'
           	},
           	
				},
				{
					dataIndex: 'proof_sent',
					text: 'Proof Sent',
					align: 'center',
					flex:2,
					filter: {
                	type: 'string'
           	},
           	
				},
				{
					dataIndex: 'proof_back',
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
			{
                               xtype : 'button',
                               id : 'edit_refresh_Contributer',
                               text : 'Refresh',
                               pressed:true,
                               x : 500,
                               y : 10,
                               width : 100,
                               height : 25,
                               handler : function() {
                              		contributor.reload();
            				 }                           
        },
			],listeners: {
							afterrender : function() {
								this.child('#refresh').hide();
							}		
						}
			
		}),
		
		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);


