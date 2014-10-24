var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
			
   var ratecard = Ext.create('Ext.data.JsonStore', {
   fields: ['Activity','Name', 'Email','Phone'],
   });
Ext.define('MyDesktop.view.mastermanagement.Vendors.CurrentProjects', {
	extend:'Ext.grid.Panel',
	title: 'Current Projects',
	alias:'widget.vendorcurrentprojects',
	closeAction: 'hide',
	selModel:sm,
    requires:['MyDesktop.store.CurrentProjects'],
	id:'vendorcurrentprojects',
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
		var service = Ext.create('MyDesktop.store.CurrentProjects');
		service.load({
			params: {
				start: 0,
				limit: 50
			}
		});
		service.loadPage(1);
		
		this.store = service,
		
		this.columns = [
				/*{
					dataIndex: 'ratecardid',
					hidden:true
				},*/
				
				{
					dataIndex: 'cur_proj_code',
					text: 'ProjectCode',
					id:'cur_proj_code',
					width:100,
					align:'center',
					
		           
				},
				{
					dataIndex: 'cur_proj_title',
					text: 'Title',
					id:'cur_proj_title',
					width:100,
					flex:1,
					align:'center',
			
		           
				},
				{
					dataIndex: 'cur_proj_hbisbn',
					text: 'HB ISBN',
					//width:100,
					flex:1,
					align:'center',
				},
				{
					dataIndex: 'cur_proj_pbisbn',
					text: 'PB ISBN',
					//width:100,
					flex:1,
					align:'center',
				},
				
				{
					dataIndex: 'cur_proj_deadline',
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
