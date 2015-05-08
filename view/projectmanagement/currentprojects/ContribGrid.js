
    var available = Ext.create('Ext.data.Store', {
   fields: ['Chapter_number', 'surname','email','approve','Sent','Back'],
   data : [
        {"Chapter_number":"4", "surname":"George","email":"george@gmail.com","approve":"3","Sent":"14/01/2014","Back":"21/01/2014"},
         {"Chapter_number":"4", "surname":"Brian","email":"brian@gmail.com","approve":"3","Sent":"23/01/2014","Back":""},
        
       ]
   });
Ext.define('MyDesktop.view.projectmanagement.currentprojects.ContribGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.contribgrid',
	closeAction: 'hide',
	
//	height:200,
	//requires : ['MyDesktop.store.freelancer'],
	anchor: '76% 30%',
	id:'contribgrid',
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
		var contributor = Ext.create('MyDesktop.store.ContribGrid');
		contributor.load({
			params: {
				start: 0,
				limit: 50
			}
		});
	this.store = contributor,
	//	this.store = available,
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
				/*{
				xtype:'actioncolumn',
				align: 'center',
				flex : 1,
				width:250,
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
				}*/
				
				
				
		];
		this.bbar = Ext.create('Ext.PagingToolbar', {  

			store : this.store,
			
			items:[
				{
                               xtype : 'button',
                               id : 'edit_refresh_contributor',
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
			],
			listeners: {
							afterrender : function() {
								this.child('#refresh').hide();
							}		
						},
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display",
			
		}),
		
		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);
