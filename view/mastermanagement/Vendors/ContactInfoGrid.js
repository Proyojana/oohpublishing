     var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
     
Ext.define('MyDesktop.view.mastermanagement.Vendors.ContactInfoGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.vendorscontactgrid',
	//closeAction: 'hide',
	selModel:sm,
	//height:100,
   requires : ['MyDesktop.store.Contactvendor'],
	title:'',
	id:'vendorscontactgrid',
	initComponent: function() {
		
		var ci = Ext.create('MyDesktop.store.Contactvendor');
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
					dataIndex: 'id',
					hidden:true
				},
				{
					dataIndex: 'name',
					text: 'Name',
					align: 'center',
				width:100,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'phone',
					text: 'Phone',
					align: 'center',
					width:100,
					//flex:2,
					filter: {
                	type: 'string'
           		}
				},
				
				{
					dataIndex: 'email',
					text: 'E-mail',
					align: 'center',
					width:100,
					//flex:2,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'designation',
					text: 'Designation',
					align: 'center',
					width:100,
					//flex:1,
					filter: {
                	type: 'string'
           		}
				},
				
				
				{
					xtype:'actioncolumn',
					align: 'center',
					width:100,
					text:'Actions',
					items: [{
						iconCls: 'viewClass',
						//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
						tooltip: 'View',
					handler: function(grid, rowIndex, colIndex) {
					    var currentForm = Ext.getCmp('Vendors_contactTab');
						var rec = grid.getStore().getAt(rowIndex);
						var id=rec.get('id');
						//alert(id);
					//	Ext.getCmp('code').setReadOnly(true);
						currentForm.getForm().load({
   								 url: 'service/ContactInfoVen.php',
							     params: {
        						 	action:2,id:id
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						
					//	Ext.getCmp('freelancermastertab').layout.setActiveItem('freelancermasterform');
							Ext.getCmp('cntctaddven').setVisible(false); 
						Ext.getCmp('cntcteditven').setVisible(false); 
						Ext.getCmp('cntctrstven').setVisible(false);
						 
						Ext.getCmp('contctname').setReadOnly(true);
						Ext.getCmp('contctphone').setReadOnly(true);
						Ext.getCmp('cntctemail').setReadOnly(true);
						Ext.getCmp('cntctdesignation').setReadOnly(true);
						
						
				}
			},{
				iconCls: 'editClass',
		//	icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
			tooltip: 'Edit',
				handler: function(grid, rowIndex, colIndex) {
					
					    var currentForm = Ext.getCmp('Vendors_contactTab');
						var rec = grid.getStore().getAt(rowIndex);
						var id=rec.get('id');
						//alert(id);
						//Ext.getCmp('Code').setReadOnly(true);
						currentForm.getForm().load({
   								 url: 'service/ContactInfoVen.php',
							     params: {
        						 	action:2,id:id
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						
						Ext.getCmp('cntctaddven').setVisible(true); 
						Ext.getCmp('cntcteditven').setVisible(true); 
						Ext.getCmp('cntctrstven').setVisible(true);
						 
						Ext.getCmp('contctname').setReadOnly(false);
						Ext.getCmp('contctphone').setReadOnly(false);
						Ext.getCmp('cntctemail').setReadOnly(false);
						Ext.getCmp('cntctdesignation').setReadOnly(false);
						
						
				}
			},{
					iconCls: 'deleteClass',
					//tooltip: 'Delete',
					handler: function(grid, rowIndex, colIndex) {
					var grid = this.up('grid');
					if (grid) {
						var rec = grid.getStore().getAt(rowIndex);
							var vendorid=Ext.getCmp('basicid').getValue();
						Ext.Msg.confirm('Remove Record '+rec.get('name')+' ?',+rec.get('name'), function (button) {
							if (button == 'yes') {
								var id=rec.get('id');
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/ContactInfoVen.php',
									method: 'POST',
									params : {action:3,id:id},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message); 
									var grid1=Ext.getCmp('vendorscontactgrid');
						grid1.getStore().load({params:{action:1,vendorid:vendorid}});
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
		}),
		
		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);
