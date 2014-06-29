     var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
     
Ext.define('MyDesktop.view.mastermanagement.Vendors.ContactGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.contactgrid',
	//closeAction: 'hide',
	selModel:sm,
	//height:100,
	//requires : ['MyDesktop.store.freelancer'],
	title:'',
	id:'contactgrid',
	initComponent: function() {
		
	/*	var ci = Ext.create('MyDesktop.store.freelancer');
		ci.load({
			params: {
				start: 0,
				limit: 8
			}
		});
		ci.loadPage(1);
		this.store = ci,*/
			this.tbar = Ext.create('Ext.Toolbar', {  
							   items:[{
                               xtype : 'button',
                               id : 'addnewrow',
                               text : 'Insert New Row',
                               pressed:true,
                               x : 500,
                               y : 10,
                               width : 100,
                               height : 25,
                               handler : function() {
/*              						 var r = Ext.create('MyDesktop.model.SalaryInfoGrid', {
                    				compcode: '',
                    				compname: '',
                 					value: '',
                    				currency: ''
                				});
                				salary.insert(0, r);*/
            				 }                           
        },
      
        ]
        });
			this.columns = [
				{
				//	dataIndex: 'Id',
					hidden:true
				},
				{
				//	dataIndex: 'Code',
					text: 'Contact Person',
					align: 'center',
				width:100,
					filter: {
                	type: 'string'
           		}
				},
				{
					//dataIndex: 'Name',
					text: 'Phone',
					align: 'center',
					flex:2,
					filter: {
                	type: 'string'
           		}
				},
				
				{
					//dataIndex: 'Description',
					text: 'E-mail',
					align: 'center',
					flex:2,
					filter: {
                	type: 'string'
           		}
				},
				
				
				/*{
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
			//},{
				//iconCls: 'editClass',
				//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
			//	tooltip: 'Edit',
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
		//	},{
				//	iconCls: 'deleteClass',
					//tooltip: 'Delete',
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
				//}]
		//}*/
		];
		
		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);
