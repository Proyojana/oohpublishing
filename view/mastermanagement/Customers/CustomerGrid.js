     var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
			
Ext.define('MyDesktop.view.mastermanagement.Customers.CustomerGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.customergrid',
	closeAction: 'hide',
	selModel:sm,
	height:270,
	//requires : ['MyDesktop.store.freelancer'],
	
	id:'customergrid',
	initComponent: function() {
		
	/*	var ci = Ext.create('MyDesktop.store.freelancer');
		ci.load({
			params: {
				start: 0,
				limit: 8
			}
		});
		ci.loadPage(1);*/
		this.store = store1,
			this.columns = [
				{
				//	dataIndex: 'Id',
					hidden:true
				},
				{
					dataIndex: 'Code',
					text: 'Customer Code',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'Name',
					text: 'Customer Name',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				
				{
					dataIndex: 'Email',
					text: 'Email',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'Phone',
					text: 'Phone No.',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				
				{
					xtype:'actioncolumn',
					align: 'center',
					width:250,
					text:'Actions',
					items: [{
						iconCls: 'viewClass',
						//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
						tooltip: 'View',
				/*	handler: function(grid, rowIndex, colIndex) {
					    var currentForm = Ext.getCmp('freelancermasterform');
						var rec = grid.getStore().getAt(rowIndex);
						var id=rec.get('Id');
						Ext.getCmp('Code').setReadOnly(true);
						currentForm.getForm().load({
   								 url: 'service/freelancer.php',
							     params: {
        						 	action:2,Id:id
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						
						Ext.getCmp('freelancermastertab').layout.setActiveItem('freelancermasterform');
						Ext.getCmp('Code').setReadOnly(true);
						Ext.getCmp('Name').setReadOnly(true);
						Ext.getCmp('freelancerDescription').setReadOnly(true);
						
				}*/
			},{
				iconCls: 'editClass',
				//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
				tooltip: 'Edit',
			/*	handler: function(grid, rowIndex, colIndex) {
					
					    var currentForm = Ext.getCmp('freelancermasterform');
						var rec = grid.getStore().getAt(rowIndex);
						var id=rec.get('Id');
						Ext.getCmp('Code').setReadOnly(true);
						currentForm.getForm().load({
   								 url: 'service/freelancer.php',
							     params: {
        						 	action:2,Id:id
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						
						Ext.getCmp('freelancermastertab').layout.setActiveItem('freelancermasterform');
						Ext.getCmp('Id').setReadOnly(false);
						Ext.getCmp('Name').setReadOnly(false);
						Ext.getCmp('freelancerDescription').setReadOnly(false);
						
						
				}*/
			},{
					iconCls: 'deleteClass',
					tooltip: 'Delete',
				/*	handler: function(grid, rowIndex, colIndex) {
					var grid = this.up('grid');
					if (grid) {
						var rec = grid.getStore().getAt(rowIndex);
						Ext.Msg.confirm('Remove Record '+rec.get('Code')+' ?',+rec.get('Code'), function (button) {
							if (button == 'yes') {
								var id=rec.get('Id');
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/freelancer.php',
									method: 'POST',
									params : {action:3,Id:id},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message); 
										stat.load({
											params: {
												start: 0,
												limit: 50
											}
										});
									},
									failure:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Deletion Failed !', obj.message); 
									}
								});
								
								
							}
						});
					}
					}*/
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

// Load first data page
//    employee.loadPage(1);
