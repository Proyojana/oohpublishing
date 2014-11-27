     var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
     
Ext.define('MyDesktop.view.mastermanagement.Vendors.VendorsGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.vendorsgrid',
	closeAction: 'hide',
	selModel:sm,
	height:190,
	requires : ['MyDesktop.store.Vendors'],
	
	id:'vendorsgrid',
	initComponent: function() {
		
	var ci = Ext.create('MyDesktop.store.Vendors');
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
					text: 'First Name',
					align: 'center',
					flex:2,
					filter: {
                	type: 'string'
           		}
				},
				
				{
					dataIndex: 'lstname',
					text: 'Last Name',
					align: 'center',
					flex:2,
					filter: {
                	type: 'string'
           		}
				},
				
				{
					dataIndex: 'email',
					text: 'Email',
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
			/*	{
					dataIndex: 'services',
					text: 'Services',
					align: 'center',
					flex:2,
					filter: {
                	type: 'string'
           		}
				},*/
				
				
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
					    var currentForm = Ext.getCmp('basicinfoform');
						var rec = grid.getStore().getAt(rowIndex);
						var id=rec.get('id');
						 currentForm.getForm().load({
   								 url: 'service/vendors.php',
							     params: {
        						 	action:2,id:id
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						Ext.getCmp('basiccode').setReadOnly(true);
						
						Ext.getCmp('Vendors_teamformTab').setDisabled(false);
							Ext.getCmp('Vendors_contactTab').setDisabled(false);
							Ext.getCmp('Vendors_ratecardgridTab').setDisabled(false);
							Ext.getCmp('Vendors_currentprojectsgridTab').setDisabled(false);
							Ext.getCmp('Vendors_histryprojectsgridTab').setDisabled(false);
						
						Ext.getCmp('basicname').setReadOnly(true);
						Ext.getCmp('basicaddress1').setReadOnly(true);
						Ext.getCmp('basicaddress2').setReadOnly(true);
						Ext.getCmp('basiccity').setReadOnly(true);
						
						Ext.getCmp('basicstate').setReadOnly(true);
						Ext.getCmp('basiccountry').setReadOnly(true);
						
						//Ext.getCmp('basicpin').setReadOnly(true);
						Ext.getCmp('basicphone').setReadOnly(true);
						
						Ext.getCmp('basicfax').setReadOnly(true);
						Ext.getCmp('basicemail').setReadOnly(true);
						Ext.getCmp('basicwebsite').setReadOnly(true);
						Ext.getCmp('basicdescription').setReadOnly(true);
						
							
						
						//hide add,edit and reset buttons
						Ext.getCmp('venadd').setVisible(false); 
						Ext.getCmp('venedit').setVisible(false); 
						 Ext.getCmp('venreset').setVisible(false);
						 //load teams grid
						 var grid1=Ext.getCmp('vendorsteamgrid');
						grid1.getStore().load({params:{action:3,basicvendorid:id}});
						 var grid1=Ext.getCmp('vendorscontactgrid');
						grid1.getStore().load({params:{action:1,vendorid:id}});
						var grid1=Ext.getCmp('Vendors_ratecardgridTab');
						grid1.getStore().load({params:{action:1,vendorid:id}});
								
						
						
				}
			},{
				iconCls: 'editClass',
				//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
				tooltip: 'Edit',
				handler: function(grid, rowIndex, colIndex) {
					
					    var currentForm = Ext.getCmp('basicinfoform');
						var rec = grid.getStore().getAt(rowIndex);
						var id=rec.get('id');
						 currentForm.getForm().load({
   								 url: 'service/vendors.php',
							     params: {
        						 	action:2,id:id
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						Ext.getCmp('Vendors_teamformTab').setDisabled(false);
							Ext.getCmp('Vendors_contactTab').setDisabled(false);
							Ext.getCmp('Vendors_ratecardgridTab').setDisabled(false);
							Ext.getCmp('Vendors_currentprojectsgridTab').setDisabled(false);
							Ext.getCmp('Vendors_histryprojectsgridTab').setDisabled(false);

Ext.getCmp('basiccode').setReadOnly(false);
Ext.getCmp('basicname').setReadOnly(false);
						Ext.getCmp('basicaddress1').setReadOnly(false);
						Ext.getCmp('basicaddress2').setReadOnly(false);
						Ext.getCmp('basiccity').setReadOnly(false);
						
						Ext.getCmp('basicstate').setReadOnly(false);
						Ext.getCmp('basiccountry').setReadOnly(false);
						
						//Ext.getCmp('basicpin').setReadOnly(false);
						Ext.getCmp('basicphone').setReadOnly(false);
						
						Ext.getCmp('basicfax').setReadOnly(false);
						Ext.getCmp('basicemail').setReadOnly(false);
						Ext.getCmp('basicwebsite').setReadOnly(false);
						Ext.getCmp('basicdescription').setReadOnly(false);
						
						Ext.getCmp('venadd').setVisible(true); 
						Ext.getCmp('venedit').setVisible(true); 
						 Ext.getCmp('venreset').setVisible(true);
						 var grid1=Ext.getCmp('vendorsteamgrid');
						grid1.getStore().load({params:{action:3,basicvendorid:id}});
						var grid2=Ext.getCmp('Vendors_currentprojectsgridTab');
						grid2.getStore().load({params:{action:1,vendorid:id}});	
						var history=Ext.getCmp('Vendors_histryprojectsgridTab');
						history.getStore().load({params:{action:2,vendorid:id}});							
						 var grid1=Ext.getCmp('vendorscontactgrid');
						grid1.getStore().load({params:{action:1,vendorid:id}});
						var grid1=Ext.getCmp('Vendors_ratecardgridTab');
						grid1.getStore().load({params:{action:1,vendorid:id}});
					
						
						
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
									url: 'service/vendors.php',
									method: 'POST',
									params : {action:3,id:id},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message); 
										Ext.getCmp('vendorsgrid').getStore().reload();
								        Ext.getCmp('vendorsgrid').getView().refresh();
										
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
				}],
				
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
