var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
			
Ext.define('MyDesktop.view.mastermanagement.EmailTemplate.TemplateGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.templategrid',
	closeAction: 'hide',
	selModel:sm,
	height:200,
	id:'templategrid',
	initComponent: function() {
		var ci = Ext.create('MyDesktop.store.Template');
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
					dataIndex: 'template_id',
					hidden:true
				},
				{
					dataIndex: 'template_code',
					text: 'Template Code',
					align: 'center',
					width:270,
                    flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'template_name',
					text: 'Tempalte Name',
					align: 'center',
					width:270,
                    flex:1,
					filter: {
                	type: 'string'
           		}
				},				
				
				{
					dataIndex: 'template_main',
					text: 'Main content',
					align: 'center',
					width:270,
                    flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'template_footer',
					text: 'Footer content',
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
								    var currentForm = Ext.getCmp('templateform');
						var rec = grid.getStore().getAt(rowIndex);
						var templateid=rec.get('template_id');
						currentForm.getForm().load({
   								 url: 'service/emailTemplate.php',
							     params: {
        						 	action:6,templateid:templateid
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						
						Ext.getCmp('template_code').setReadOnly(true);
						Ext.getCmp('template_name').setReadOnly(true);
						Ext.getCmp('template_role').setReadOnly(true);
						Ext.getCmp('template_main').setReadOnly(true);
						Ext.getCmp('template_footer').setReadOnly(true);
						Ext.getCmp('template_header').setReadOnly(true);
						
						
						Ext.getCmp('edit_template').getEl().hide();
						
						
    					
    					
    					Ext.getCmp('templateaddform').setTitle('View Template');
						
				}
			},{
				iconCls: 'editClass',
				tooltip: 'Edit',
		 	handler: function(grid, rowIndex, colIndex) {
					    var currentForm = Ext.getCmp('templateform');
						var rec = grid.getStore().getAt(rowIndex);
						var templateid=rec.get('template_id');
						Ext.getCmp('template_code').setReadOnly(true);
						currentForm.getForm().load({
   								 url: 'service/emailTemplate.php',
							     params: {
        						 	action:6,templateid:templateid
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
										
						Ext.getCmp('template_code').setReadOnly(true);
						Ext.getCmp('template_name').setReadOnly(false);
						Ext.getCmp('template_role').setReadOnly(false);
						Ext.getCmp('template_footer').setReadOnly(false);
						Ext.getCmp('template_header').setReadOnly(true);
						Ext.getCmp('edit_template').getEl().show();
						Ext.getCmp('templateaddform').setTitle('Edit Template');
						
						
						
    					
    					
    					
						
				}
			},/*{
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
					
					}
				}*/
				]
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
