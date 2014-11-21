     var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
			
     
Ext.define('MyDesktop.view.mastermanagement.Customers.CustomersGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.customersgrid',
	closeAction: 'hide',
	selModel:sm,
	height:190,
	requires : ['MyDesktop.store.Customers'],
	
	id:'customersgrid',
	initComponent: function() {
	var ci = Ext.create('MyDesktop.store.Customers');
		ci.load({
			params: {
				start: 0,
				limit: 8
			}
		});
		ci.loadPage(1);
		this.store=ci,
			this.columns = [
				{
					dataIndex: 'id',
					hidden:true
				},
				{
					dataIndex: 'code',
					text: 'Code',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'name',
					text: 'Name',
					align: 'center',
					flex:2,
					filter: {
                	type: 'string'
           		}
				},
				
				
				{
					dataIndex: 'mail',
					text: 'E-mail',
					align: 'center',
					flex:2,
					filter: {
                	type: 'string'
           		}
				},
				
				{
					dataIndex: 'phone',
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
						tooltip: 'View',
					handler: function(grid, rowIndex, colIndex) {
						var currentForm = Ext.getCmp('custbasicinfoform');
						var rec = grid.getStore().getAt(rowIndex);
						var id=rec.get('id');
						 currentForm.getForm().load({
   								 url: 'service/customers.php',
							     params: {
        						 	action:2,id:id
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						Ext.getCmp('custbasiccode').setReadOnly(true);
						
						
						
						Ext.getCmp('custbasicname').setReadOnly(true);
						Ext.getCmp('custbasicaddress1').setReadOnly(true);
						Ext.getCmp('custbasicaddress2').setReadOnly(true);
						Ext.getCmp('custbasiccity').setReadOnly(true);
						
						Ext.getCmp('custbasicstate').setReadOnly(true);
						Ext.getCmp('custbasiccountry').setReadOnly(true);
						
						//Ext.getCmp('custbasicpin').setReadOnly(true);
						Ext.getCmp('custbasicphone').setReadOnly(true);
						
						Ext.getCmp('custbasicfax').setReadOnly(true);
						Ext.getCmp('custbasicemail').setReadOnly(true);
						Ext.getCmp('custbasicwebsite').setReadOnly(true);
						Ext.getCmp('custbasicdescription').setReadOnly(true);
						//hide add,edit and reset buttons
						Ext.getCmp('customer_basicadd').setVisible(false); 
						Ext.getCmp('customer_basicedit').setVisible(false); 
						Ext.getCmp('customer_basicreset').setVisible(false);
						 //load teams grid
						 var grid1=Ext.getCmp('custteamgrid');
						grid1.getStore().load({params:{action:3,customerid:id}});
						 //load ratecard grid
						 
						 //load contacts grid
						 var grid3=Ext.getCmp('custcontactgrid');
						grid3.getStore().load({params:{action:1,id:id}});
						 //show inner panel
						Ext.getCmp('customercontactsformTab').setDisabled(false);
							Ext.getCmp('customerteamsformTab').setDisabled(false);
						
						
				}
			},{
				iconCls: 'editClass',
				//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
				tooltip: 'Edit',
				handler: function(grid, rowIndex, colIndex) {
					
					   var currentForm = Ext.getCmp('custbasicinfoform');
						var rec = grid.getStore().getAt(rowIndex);
						var id=rec.get('id');
						 currentForm.getForm().load({
   								 url: 'service/customers.php',
							     params: {
        						 	action:2,id:id
							    },
							    
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
					
   	    		    //alert("value ");
							Ext.getCmp('custbasiccode').setReadOnly(true);
						
						
						
						Ext.getCmp('custbasicname').setReadOnly(false);
						Ext.getCmp('custbasicaddress1').setReadOnly(false);
						Ext.getCmp('custbasicaddress2').setReadOnly(false);
						Ext.getCmp('custbasiccity').setReadOnly(false);
						
						Ext.getCmp('custbasicstate').setReadOnly(false);
						Ext.getCmp('custbasiccountry').setReadOnly(false);
						
						//Ext.getCmp('custbasicpin').setReadOnly(false);
						Ext.getCmp('custbasicphone').setReadOnly(false);
						
						Ext.getCmp('custbasicfax').setReadOnly(false);
						Ext.getCmp('custbasicemail').setReadOnly(false);
						Ext.getCmp('custbasicwebsite').setReadOnly(false);
						Ext.getCmp('custbasicdescription').setReadOnly(false);
						//show add,edit and reset buttons
						Ext.getCmp('customer_basicadd').setVisible(true); 
						Ext.getCmp('customer_basicedit').setVisible(true); 
						Ext.getCmp('customer_basicreset').setVisible(true);
						//load teams grid
						 var grid1=Ext.getCmp('custteamgrid');
						grid1.getStore().load({params:{action:3,customerid:id}});
						//load ratecard grid
						 
						//load contacts grid
						 var grid3=Ext.getCmp('custcontactgrid');
						grid3.getStore().load({params:{action:1,id:id}});
						 	//show inner panel
						Ext.getCmp('customercontactsformTab').setDisabled(false);
							Ext.getCmp('customerteamsformTab').setDisabled(false);
						
						
					
						
						
				}
			},{
					iconCls: 'deleteClass',
					tooltip: 'Delete',
					handler: function(grid, rowIndex, colIndex) {
					var grid = this.up('grid');
					if (grid) {
						var rec = grid.getStore().getAt(rowIndex);
						Ext.Msg.confirm('Remove Record '+rec.get('code')+' ?',+rec.get('code'), function (button) {
							if (button == 'yes') {
								var id=rec.get('id');
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/customers.php',
									method: 'POST',
									params : {action:3,id:id},
									success:function(response){
										
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message); 
										Ext.getCmp('customersgrid').getStore().reload();
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
