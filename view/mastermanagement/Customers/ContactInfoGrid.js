     var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
     
Ext.define('MyDesktop.view.mastermanagement.Customers.ContactInfoGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.custcontactgrid',
	selModel:sm,
	requires : ['MyDesktop.store.Customers_contact'],
	title:'',
	id:'custcontactgrid',
	initComponent: function() {
		
		var ci = Ext.create('MyDesktop.store.Customers_contact');
		ci.load({
			params: {
				start: 0,
				limit: 8
			}
		});
		//ci.loadPage(1);
		this.store = ci,
			
			this.columns = [
				{
					dataIndex: 'id',
					hidden:true
				},
				{
					dataIndex: 'name',
					text: 'First Name',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'phone',
					text: 'Phone',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				
				{
					dataIndex: 'email',
					text: 'E-mail',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'designation',
					text: 'Designation',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				
				
				{
					xtype:'actioncolumn',
					align: 'center',
					flex:1,
					text:'Actions',
					items: [{
						iconCls: 'viewClass',
						//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
						tooltip: 'View',
					handler: function(grid, rowIndex, colIndex) {
					    var currentForm = Ext.getCmp('customercontactsformTab');
						var rec = grid.getStore().getAt(rowIndex);
						var id=rec.get('id');
						
						Ext.getCmp('customer_per').setReadOnly(true);
						Ext.getCmp('cust_first_name').setReadOnly(true);
						Ext.getCmp('cust_middle_name').setReadOnly(true);
						Ext.getCmp('cust_last_name').setReadOnly(true);
						Ext.getCmp('custcontctphone').setReadOnly(true);
						Ext.getCmp('custcntctemail').setReadOnly(true);
						Ext.getCmp('custcntctdesignation').setReadOnly(true);
						
						Ext.getCmp('customersContact_add').setVisible(false); 
						Ext.getCmp('customersContact_edit').setVisible(false); 
						Ext.getCmp('customersContact_reset').setVisible(false);
						currentForm.getForm().load({
   								 url: 'service/customers_Contact.php',
							     params: {
        						 	action:2,id:id
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						
				}
			},{
				iconCls: 'editClass',
				//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
				tooltip: 'Edit',
				handler: function(grid, rowIndex, colIndex) {
					
					   var currentForm = Ext.getCmp('customercontactsformTab');
						var rec = grid.getStore().getAt(rowIndex);
						var id=rec.get('id');
						Ext.getCmp('customer_per').setReadOnly(false);
						Ext.getCmp('cust_first_name').setReadOnly(false);
						Ext.getCmp('cust_middle_name').setReadOnly(false);
						Ext.getCmp('cust_last_name').setReadOnly(false);
						Ext.getCmp('custcontctphone').setReadOnly(false);
						Ext.getCmp('custcntctemail').setReadOnly(false);
						Ext.getCmp('custcntctdesignation').setReadOnly(false);
						
						Ext.getCmp('customersContact_add').setVisible(true); 
						Ext.getCmp('customersContact_edit').setVisible(true); 
						Ext.getCmp('customersContact_reset').setVisible(true);
						currentForm.getForm().load({
   								 url: 'service/customers_Contact.php',
							     params: {
        						 	action:2,id:id
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						
						
						
				}
			},{
					iconCls: 'deleteClass',
					//tooltip: 'Delete',
					handler: function(grid, rowIndex, colIndex) {
					var grid = this.up('grid');
					var teams_customerid = Ext.getCmp('basic_customerid').getValue();
					if (grid) {
						var rec = grid.getStore().getAt(rowIndex);
						Ext.Msg.confirm('Remove Record '+rec.get('name')+' ?',+rec.get('name'), function (button) {
							if (button == 'yes') {
								var id=rec.get('id');
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/customers_Contact.php',
									method: 'POST',
									params : {action:3,id:id},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message); 
										var grid3=Ext.getCmp('custcontactgrid');
						              grid3.getStore().load({params:{action:1,id:teams_customerid}});
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
		}
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
