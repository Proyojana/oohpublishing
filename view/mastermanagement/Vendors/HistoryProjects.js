var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
			/* var available = Ext.create('Ext.data.Store', {
        fields: ['period1', 'name1'],
        data : [
         {"period1":"Month", "name1":"Month"},
            {"period1":"Year", "name1":"Year"}
        ]
    });
     var available1 = Ext.create('Ext.data.Store', {
        fields: ['period1', 'name1'],
        data : [
         {"period1":"Fixed", "name1":"Fixed"},
            {"period1":"Variable", "name1":"Variable"}
        ]
    });*/
   var ratecard = Ext.create('Ext.data.JsonStore', {
   fields: ['Activity','Name', 'Email','Phone'],
   });
Ext.define('MyDesktop.view.mastermanagement.Vendors.HistoryProjects', {
	extend:'Ext.grid.Panel',
	title: 'Projects History',
	alias:'widget.vendorhistryprojects',
	closeAction: 'hide',
	selModel:sm,
	requires:['MyDesktop.store.HistoryProjects'],
	id:'vendorhistryprojects',
	plugins: [
              Ext.create('Ext.grid.plugin.CellEditing', {
                  clicksToEdit: 1,
                  id:'editing',
                  listeners: {
                  'edit': function (editor,e) {
		                  	var grid = e.grid;
		                  	var record=e.record;
                 			var code = e.value;
                 		

			    	}
				}
             })        
    ],
	initComponent: function() {
		var service = Ext.create('MyDesktop.store.HistoryProjects');
		service.load({
			params: {
				start: 0,
				limit: 50
			}
		});
		service.loadPage(1);
		
	
		this.store = service,

		this.columns = [
				
				
				{
					dataIndex: 'histry_proj_code',
					text: 'ProjectCode',
					id:'histry_proj_code',
					width:100,
					align:'center',
					
		           
				},
				{
					dataIndex: 'histry_proj_title',
					text: 'Title',
					id:'histry_proj_title',
					width:100,
					flex:1,
					align:'center',
			
		           
				},
				
				{
					dataIndex: 'histry_proj_hbisbn',
					id:'histry_proj_hbisbn',
					text: 'HB ISBN',
					//width:100,
					flex:1,
					align:'center',
				
				},{
					dataIndex: 'histry_proj_pbisbn',
					id:'histry_proj_pbisbn',
					text: 'PB ISBN',
					//width:100,
					flex:1,
					align:'center',
				},
				
			{
					dataIndex: 'histry_proj_deadline',
					text: 'Agreed Deadline',
					//width:100,
					flex:1,
					align:'center',
				}
				];
		
		
		this.bbar = Ext.create('Ext.PagingToolbar', {
			store : this.store,
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display",			
		}),
		
		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);
