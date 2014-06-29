
   /* var available = Ext.create('Ext.data.Store', {
   fields: ['Id', 'Activity','Level','Page_rate1','Page_rate2','Sub_total','Sub_total1'],
   data : [
        {"Activity":"Project Manager", "Level":"tbc","Page_rate1":"$2.00","Page_rate2":"3","Sub_total":"4","Sub_total1":"8"},
         {"Activity":"Typesetting", "Level":"tbc","Page_rate1":"$20.00","Page_rate2":"3","Sub_total":"4","Sub_total1":"8"},  
         {"Activity":"Copyediting", "Level":"tbc","Page_rate1":"$20.00","Page_rate2":"3","Sub_total":"4","Sub_total1":"8"},  
       ]
   });*/
Ext.define('MyDesktop.view.projectmanagement.Reports.ProjectReportGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.projectreportgrid',
	closeAction: 'hide',
	
	
	height:200,
	//requires : ['MyDesktop.store.freelancer'],
	title:'Project Reports',
	id:'projectreportgrid',
	
	initComponent: function() {
		
		this.tbar = Ext.create('Ext.Toolbar', {  

				items:[
			{
				xtype:'combo',
				store:['Ahead of Schedule','On Schedule','Behind Schedule'],
				fieldLabel:'Projects'
			},
			{
				xtype:'button',				
				 text : 'Search'
			}
			]
			
		}),
		
	/*	var ci = Ext.create('MyDesktop.store.freelancer');
		ci.load({
			params: {
				start: 0,
				limit: 8
			}
		});
		ci.loadPage(1);*/
		//this.store = available,
			this.columns = [
				
				{
					//dataIndex: 'Activity',
					text: 'Project Code',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					//dataIndex: 'Level',
					text: 'Title',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					//dataIndex: 'Level',
					text: 'Author',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					//dataIndex: 'Level',
					text: 'HB ISDN',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					//dataIndex: 'Level',
					text: 'PB ISDN',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					//dataIndex: 'Level',
					text: 'Format',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					//dataIndex: 'Level',
					text: 'Agreed Deadline',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					//dataIndex: 'Level',
					text: 'Word Count',
					align: 'center',
					flex:1,
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
