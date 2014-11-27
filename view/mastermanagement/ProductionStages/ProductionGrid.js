     var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
     
Ext.define('MyDesktop.view.mastermanagement.ProductionStages.ProductionGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.productiongrid',
	closeAction: 'hide',
	selModel:sm,
	height:250,
	requires : ['MyDesktop.store.ProductionStages'],
	
	id:'productiongrid',
	initComponent: function() {
		
		var product = Ext.create('MyDesktop.store.ProductionStages');
		product.load({
			params: {
				start: 0,
				limit: 50
			}
		});
		product.loadPage(1);
		this.store = product,
			this.columns = [
				{
				dataIndex: 'product_id',
					hidden:true
				},
				{
					dataIndex: 'product_code',
					text: 'Activity Code',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'product_name',
					text: 'Activity Name',
					align: 'center',
					flex:2,
					filter: {
                	type: 'string'
           		}
				},
				
				{
					dataIndex: 'product_description',
					text: 'Description',
					align: 'center',
					flex:2,
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
					handler: function(grid, rowIndex, colIndex) {
					    var currentForm = Ext.getCmp('productionform');
						var rec = grid.getStore().getAt(rowIndex);
						var product_id=rec.get('product_id');
						Ext.getCmp('product_code').setReadOnly(true);
						currentForm.getForm().load({
   								 url: 'service/activity.php',
							     params: {
        						 	action:2,product_id:product_id
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						Ext.getCmp('Add_production').setVisible(false); 
						Ext.getCmp('edit_production').setVisible(false); 
						Ext.getCmp('reset_production').setVisible(false);
						
						Ext.getCmp('productiontab').layout.setActiveItem('productionform');
						Ext.getCmp('product_code').setReadOnly(true);
						Ext.getCmp('product_name').setReadOnly(true);
						Ext.getCmp('product_description').setReadOnly(true);
						
				}
			},{
				iconCls: 'editClass',
				//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
				tooltip: 'Edit',
				handler: function(grid, rowIndex, colIndex) {
					
					    var currentForm = Ext.getCmp('productionform');
						var rec = grid.getStore().getAt(rowIndex);
						var product_id=rec.get('product_id');
						Ext.getCmp('product_code').setReadOnly(false);
						currentForm.getForm().load({
   								 url: 'service/activity.php',
							     params: {
        						 	action:2,product_id:product_id
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						Ext.getCmp('Add_production').setVisible(true); 
						Ext.getCmp('edit_production').setVisible(true); 
						Ext.getCmp('reset_production').setVisible(true);
						
						Ext.getCmp('productiontab').layout.setActiveItem('productionform');
						Ext.getCmp('product_code').setReadOnly(true);
						Ext.getCmp('product_name').setReadOnly(false);
						Ext.getCmp('product_description').setReadOnly(false);
						
						
						
				}
			},{
					iconCls: 'deleteClass',
					tooltip: 'Delete',
				handler: function(grid, rowIndex, colIndex) {
					var grid = this.up('grid');
					if (grid) {
						var rec = grid.getStore().getAt(rowIndex);
						Ext.Msg.confirm('Remove Record '+rec.get('product_code')+' ?',+rec.get('product_code'), function (button) {
							if (button == 'yes') {
								var product_id=rec.get('product_id');
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/activity.php',
									method: 'POST',
									params : {action:3,product_id:product_id},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message); 
										product.load({
											params: {
												start: 0,
												limit: 50
											}
										});
										Ext.getCmp('productiongrid').getView().refresh(); 
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
			items:[
			]
			
		}),
	

		
		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);
