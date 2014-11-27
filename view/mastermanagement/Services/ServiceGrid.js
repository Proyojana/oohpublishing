var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
			
Ext.define('MyDesktop.view.mastermanagement.Services.ServiceGrid', {
	extend:'Ext.ux.LiveSearchGridPanel',
	alias:'widget.servicegrid',
	closeAction: 'hide',
	selModel:sm,
	height:250,
	id:'servicegrid',
	initComponent: function() {
		var ci = Ext.create('MyDesktop.store.Service');
		ci.load({
			params: {
				start: 0,
				limit: 8
			}
		});
		ci.loadPage(1);
		this.store = ci,
			this.columns = [
				{
					dataIndex: 'service_id',
					hidden:true
				},
				{
					dataIndex: 'service_code',
					text: 'Service Code',
					align: 'center',
					width:270,
                    flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'service_name',
					text: 'Service Name',
					align: 'center',
					width:270,
                    flex:1,
					filter: {
                	type: 'string'
           		}
				},				
				{
					dataIndex: 'service_description',
					text: 'Service Description',
					align: 'center',
					width:270,
                    flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					xtype:'actioncolumn',
					align: 'center',
					width:250,
                    flex:1,
					text:'Actions',
					items: [{
						iconCls: 'viewClass',
						tooltip: 'View',
					    handler: function(grid, rowIndex, colIndex) {
								    var currentForm = Ext.getCmp('serviceform');
						var rec = grid.getStore().getAt(rowIndex);
						var serviceid=rec.get('service_id');
						currentForm.getForm().load({
   								 url: 'service/service.php',
							     params: {
        						 	action:2,serviceid:serviceid
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						
						Ext.getCmp('service_code').setReadOnly(true);
						Ext.getCmp('service_name').setReadOnly(true);
						Ext.getCmp('service_description').setReadOnly(true);
						
						
						Ext.getCmp('add_service').getEl().hide();
						Ext.getCmp('edit_service').getEl().hide();
						Ext.getCmp('reset_service').getEl().hide();
						
						
    					
    					
    					Ext.getCmp('serviceaddform').setTitle('View Service');
						
				}
			},{
				iconCls: 'editClass',
				tooltip: 'Edit',
		 	handler: function(grid, rowIndex, colIndex) {
					    var currentForm = Ext.getCmp('serviceform');
						var rec = grid.getStore().getAt(rowIndex);
						var serviceid=rec.get('service_id');
						Ext.getCmp('service_code').setReadOnly(true);
						currentForm.getForm().load({
   								 url: 'service/Service.php',
							     params: {
        						 	action:2,serviceid:serviceid
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
										
						Ext.getCmp('service_code').setReadOnly(true);
						Ext.getCmp('service_name').setReadOnly(false);
						Ext.getCmp('service_description').setReadOnly(false);
						
						
						Ext.getCmp('add_service').getEl().show();
						Ext.getCmp('edit_service').getEl().show();
						Ext.getCmp('reset_service').getEl().show();
						
						
    					
    					
    					Ext.getCmp('serviceaddform').setTitle('Edit Service');
						
				}
			},{
					iconCls: 'deleteClass',
					tooltip: 'Delete',
					handler: function(grid, rowIndex, colIndex) {
					var grid = this.up('grid');
					if (grid) {
						var rec = grid.getStore().getAt(rowIndex);
						Ext.Msg.confirm('Remove Record '+rec.get('service_code')+' ?',+rec.get('service_code'), function (button) {
							if (button == 'yes') {
								var serviceid=rec.get('service_id');
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/Service.php',
									method: 'POST',
									params : {action:3,serviceid:serviceid},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message); 
										Ext.getCmp('servicegrid').getStore().reload();
                                        Ext.getCmp('servicegrid').getView().refresh();

										
									},
									failure:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Deletion Failed !', obj.message); 
									}
								});
								
								
							}
						});
					}
					
					}
				}]
		}];
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
