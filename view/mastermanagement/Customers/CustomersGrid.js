     var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
			var custo = Ext.create('Ext.data.JsonStore', {
    fields: ['cust_code','cust_name', 'cust__mail','cust_phone'],
    data: [
    { "cust_code":"C001","cust_name":"Johnson","cust__mail":"John@gmail.com","cust_phone":"9034767231"},
    { "cust_code":"C002","cust_name":"Emy","cust__mail":"emy@gmail.com","cust_phone":"9566567571"},
    { "cust_code":"C003","cust_name":"Rafe","cust__mail":"rafe@gmail.com","cust_phone":"6789335667"},
    { "cust_code":"C004","cust_name":"Liilian","cust__mail":"lillian@gmail.com","cust_phone":"6767876889"},
    { "cust_code":"C005","cust_name":"Deisy","cust__mail":"deisy@gmail.com","cust_phone":"0347645456"},
    
     ]
});
     
Ext.define('MyDesktop.view.mastermanagement.Customers.CustomersGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.customersgrid',
	closeAction: 'hide',
	selModel:sm,
	height:190,
	//requires : ['MyDesktop.store.freelancer'],
	
	id:'customersgrid',
	initComponent: function() {
		
	/*	var ci = Ext.create('MyDesktop.store.freelancer');
		ci.load({
			params: {
				start: 0,
				limit: 8
			}
		});
		ci.loadPage(1);*/
		this.store = custo,
			this.columns = [
				{
				//	dataIndex: 'Id',
					hidden:true
				},
				{
					dataIndex: 'cust_code',
					text: 'Code',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'cust_name',
					text: 'Name',
					align: 'center',
					flex:2,
					filter: {
                	type: 'string'
           		}
				},
				
				/*{
					dataIndex: 'cust__state',
					text: 'State',
					align: 'center',
					flex:2,
					filter: {
                	type: 'string'
           		}
				},*/
				{
					dataIndex: 'cust__mail',
					text: 'E-mail',
					align: 'center',
					flex:2,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'cust_phone',
					text: 'Phone',
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
