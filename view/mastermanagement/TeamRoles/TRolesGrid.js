var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});

Ext.define('MyDesktop.view.mastermanagement.TeamRoles.TRolesGrid', {
	extend:'Ext.ux.LiveSearchGridPanel',
	alias:'widget.trolesgrid',
	closeAction: 'hide',
	selModel:sm,
	height:250,
		requires : ['MyDesktop.store.TeamRoles'],
	
	id:'trolesgrid',
	initComponent: function() {
	var ci = Ext.create('MyDesktop.store.TeamRoles');
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
					dataIndex: 'trolesid',
					hidden:true
				},
				{
					dataIndex: 'trolescode',
					text: 'Role Code',
					align: 'center',
					width:270,
 flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'trolesname',
					text: 'Role Name',
					align: 'center',
					width:270,
 flex:1,
					filter: {
                	type: 'string'
           		}
				},				
				{
					dataIndex: 'description',
					text: 'Role Description',
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
					text:'Actions',
					items: [{
						iconCls: 'viewClass',
						//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
						tooltip: 'View',
					handler: function(grid, rowIndex, colIndex) {
					    var currentForm = Ext.getCmp('trolesaddform');
						var rec = grid.getStore().getAt(rowIndex);
						var trolesid=rec.get('trolesid');
						Ext.getCmp('trolescode').setReadOnly(true);
						currentForm.getForm().load({
   								 url: 'service/team_roles.php',
							     params: {
        						 	action:4,trolesid:trolesid
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						
					//	Ext.getCmp('depttab').layout.setActiveItem('deptform');
						
						Ext.getCmp('trolesid').setReadOnly(true);
						Ext.getCmp('trolesname').setReadOnly(true);
						Ext.getCmp('trolesdescription').setReadOnly(true);
						
						
						Ext.getCmp('add_roles').getEl().hide();
						Ext.getCmp('edit_roles').getEl().hide();
						Ext.getCmp('reset_roles').getEl().hide();
						
						
    					
    					
    					Ext.getCmp('trolesaddform').setTitle('View Roles');
						
				}
			},{
				iconCls: 'editClass',
				//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
				tooltip: 'Edit',
		 	handler: function(grid, rowIndex, colIndex) {
					
					 	    var currentForm = Ext.getCmp('trolesaddform');
						var rec = grid.getStore().getAt(rowIndex);
						var trolesid=rec.get('trolesid');
						Ext.getCmp('trolescode').setReadOnly(true);
						currentForm.getForm().load({
   								 url: 'service/team_roles.php',
							     params: {
        						 	action:4,trolesid:trolesid
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						
					//	Ext.getCmp('depttab').layout.setActiveItem('deptform');
						
						Ext.getCmp('trolesid').setReadOnly(false);
						Ext.getCmp('trolesname').setReadOnly(false);
						Ext.getCmp('trolesdescription').setReadOnly(false);
						
						
						Ext.getCmp('add_roles').getEl().show();
						Ext.getCmp('edit_roles').getEl().show();
						Ext.getCmp('reset_roles').getEl().show();
						
						
    					
    						Ext.getCmp('trolesaddform').setTitle('Edit Roles');

//    					Ext.getCmp('trolesaddform').setTitle('View Roles');
						
				}
			},{
					iconCls: 'deleteClass',
					tooltip: 'Delete',
					handler: function(grid, rowIndex, colIndex) {
					var grid = this.up('grid');
					if (grid) {
						var rec = grid.getStore().getAt(rowIndex);
						Ext.Msg.confirm('Remove Record '+rec.get('trolescode')+' ?',+rec.get('trolescode'), function (button) {
							if (button == 'yes') {
								var trolesid=rec.get('trolesid');
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/team_roles.php',
									method: 'POST',
									params : {action:5,trolesid:trolesid},
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
				}]
		}];
		this.bbar = Ext.create('Ext.PagingToolbar', {  

			store : this.store,
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display",
			items:[
			/*{
                               xtype : 'button',
                               id : 'city_bulk',
                               text : 'Delete',
                               pressed:true,
                               //iconCls: 'fileuploads',
                               x : 500,
                               y : 10,
                               //disabled:true,
                               width : 100,
                               height : 25,
                               handler : function() {
                                       
                                       var selection = Ext.getCmp('citygrid').getSelectionModel().getSelection();
                                       
                                       if(selection.length==0) {

                                               Ext.Msg.alert("Select atleast one");
                                       } else {
                                       		var length=selection.length;
                                       	Ext.Msg.confirm('Remove selected Record(s)?','', function (button) {
										if (button == 'yes') {

                                               var check='';
                                              
                                               for (var i=0; i < selection.length; i++)
                                               {
		                                               
		                                              
				                                            if((length-1)>i)
				                                            {
				                                            check = check + selection[i].data.cityid+',';
				                                           
				                                            }
				                                            else
				                                            {
				                                                    check = check + selection[i].data.cityid;
				                                                  
				                                            }                                                                                
                                               
                                               }
                                               
                                               
                                                       var conn = new Ext.data.Connection();
                                               conn.request({
                                                       url: 'service/City.php',
                                                       method: 'POST',
                                                       params : {
                                                               action:6,
                                                               id:check
                                                       },
                                                       success:function(response){
                                                       obj = Ext.JSON.decode(response.responseText);
                                                       Ext.Msg.alert('Message', obj.message); 
                                                       Ext.getCmp('citygrid').getStore().reload();
                                                          
                                                       }
                                               });
                                           }});            
                                                               
                                       }                                        
                               }
                       },
			{
				xtype:'combo',
				store:available,
				displayField:'name1',
				id:'bulk_city',
				valueField: 'period1',
				margin:'0 0 0 30',
				listeners: 
				{
                  afterrender: function(combo) {
                  var recordSelected = combo.getStore().getAt(0);                     
                  combo.setValue(recordSelected.get('period1'));
                  } 
                }
			},
			{
				xtype:'button',
				text:'Go',
			/*	handler:function(grid,rowIndex,colIndex){
					
				   var selection = Ext.getCmp('citygrid').getSelectionModel().getSelection();
                                       if(selection.length==0) {
                                               Ext.Msg.alert("Select atleast one");
                                       }
                                        else {
                                        var select=Ext.getCmp('bulk_city').getValue();
										if(select=='edit')
										alert("EDIT");
										else{
                                       	var length=selection.length;
                                       	Ext.Msg.confirm('Remove selected Record(s)?','', function (button) {
										if (button == 'yes') {
                                               var check='';
                                               for (var i=0; i < selection.length; i++)
                                               {
		                                                   if((length-1)>i)
				                                            {
				                                            check = check + selection[i].data.cityid+',';
				                                            }
				                                            else
				                                            {
				                                                    check = check + selection[i].data.cityid;
				                                            }                                                                                
                                               }
                                               var conn = new Ext.data.Connection();
                                               conn.request({
                                                       url: 'service/City.php',
                                                       method: 'POST',
                                                       params : {
                                                               action:6,
                                                               id:check
                                                       },
                                                       success:function(response){
                                                       obj = Ext.JSON.decode(response.responseText);
                                                       Ext.Msg.alert('Message', obj.message); 
                                                       Ext.getCmp('citygrid').getStore().reload();
                                                          
                                                       }
                                               });
                                              }});                 
                                       }                                       
					}
				}		
			},
			{
				xtype:'combo',
				store:exp,
				displayField:'name',
				valueField: 'period',
				margin:'0 0 0 60',
				listeners: 
				{
                  afterrender: function(combo) {
                  var recordSelected = combo.getStore().getAt(0);                     
                  combo.setValue(recordSelected.get('period'));
                  } 
                }
			},
			{
				xtype:'exporterbutton',
				text:'Export',
				//margin:'0 0 0 40'
			},
						{
    		xtype:'button',
    		x:260,
    		y:10,
    		width:50,
            text:'csv',
            iconCls :'csvfileuploadClass',
           // renderTo:body,
            handler:function() {
            	
     	var body = Ext.getBody();
      
   var frame = body.createChild({
         tag:'iframe'
        ,cls:'x-hidden'
        ,id:'iframe'
        ,name:'iframe'
    });
        
    var form = body.createChild({
         tag:'form'
        ,cls:'x-hidden'
        ,id:'form'
        ,action:'service/citycsv.php'
        ,target:'iframe'
    });
                         form.dom.submit();
                                }
			},
			{
				xtype : 'button',
				text : 'Import',
				
			/*	handler : function() {
				var win = Ext.create('Ext.Window', {
					extend : 'Ext.form.Panel',
					layout : {
						type : 'absolute'
					},
					maximizable : true,
					title : 'Csv Upload Form',
					frame : true,
					width : 400,
					height : 250,
					items : [					
				{
					//xtype : 'cityimprtform',
				}			
					],
					
				})
				win.show();
			}

			}*/]
			
		}),
		
		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);
