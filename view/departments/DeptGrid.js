var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
			var available = Ext.create('Ext.data.Store', {
    fields: ['period1', 'name1'],
    data : [
         {"period1":"edit", "name1":"Edit"},
            {"period1":"delete", "name1":"Delete"}
        ]
    });
var exp = Ext.create('Ext.data.Store', {
    fields: ['period', 'name'],
    data : [
         {"period":"Visible Page", "name":"Visible Page"},
            {"period":"All", "name":"All"}
        ]
    });    
     var encode = false;
    
    // configure whether filtering is performed locally or remotely (initially)
    var local = true;

		/*	 var filters = {
        ftype: 'filters',
        // encode and local configuration options defined previously for easier reuse
        encode: encode, // json encode the filter query
        local: local,   // defaults to false (remote filtering)
        filters: [{
            type: 'string',
            dataIndex: 'firstname',
            disabled: false
        }, {
            type: 'numeric',
            dataIndex: 'price'
        }, {
            type: 'date',
            dataIndex: 'doj'
        }, {
            type: 'list',
            dataIndex: 'size',
            options: ['small', 'medium', 'large', 'extra large'],
            phpMode: true
        }, {
            type: 'boolean',
            dataIndex: 'visible'
        }]
    };*/
Ext.define('MyDesktop.view.departments.DeptGrid', {
	extend:'Ext.ux.LiveSearchGridPanel',
	//features:[filters],
	//title: 'City',
	alias:'widget.deptgrid',
	closeAction: 'hide',
	selModel:sm,
	height:250,
	requires : ['MyDesktop.store.Dept'],
	
	id:'deptgrid',
	initComponent: function() {
		
		var ci = Ext.create('MyDesktop.store.Dept');
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
					dataIndex: 'deptid',
					hidden:true
				},
				{
					dataIndex: 'deptcode',
					text: 'Dept Code',
					align: 'center',
					width:270,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'deptname',
					text: 'Name',
					align: 'center',
					width:270,
					filter: {
                	type: 'string'
           		}
				},				
				{
					dataIndex: 'deptdesc',
					text: 'Description',
					align: 'center',
					width:270,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'deptcourse',
					text: 'Course Offered',
					align: 'center',
					width:270,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'deptreview',
					text: 'Reviewer',
					align: 'center',
					width:270,
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
					    var currentForm = Ext.getCmp('deptform');
						var rec = grid.getStore().getAt(rowIndex);
						var deptid=rec.get('deptid');
						Ext.getCmp('deptcode').setReadOnly(true);
						currentForm.getForm().load({
   								 url: 'service/Dept.php',
							     params: {
        						 	action:2,deptid:deptid
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						
						Ext.getCmp('depttab').layout.setActiveItem('deptform');
						
						Ext.getCmp('deptcode').setReadOnly(true);
						Ext.getCmp('deptdesc').setReadOnly(true);
						Ext.getCmp('deptname').setReadOnly(true);
						
						
						Ext.getCmp('add_dept').getEl().hide();
						Ext.getCmp('edit_dept').getEl().hide();
						Ext.getCmp('reset_dept').getEl().hide();
						
						
    					
    					
    					Ext.getCmp('deptaddform').setTitle('View State');
						
				}
			},{
				iconCls: 'editClass',
				//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
				tooltip: 'Edit',
		 	handler: function(grid, rowIndex, colIndex) {
					
					    var currentForm = Ext.getCmp('deptform');
						var rec = grid.getStore().getAt(rowIndex);
						var deptid=rec.get('deptid');
						Ext.getCmp('deptcode').setReadOnly(true);
						currentForm.getForm().load({
   								 url: 'service/Dept.php',
							     params: {
        						 	action:2,deptid:deptid
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						
						Ext.getCmp('depttab').layout.setActiveItem('deptform');
						Ext.getCmp('deptcode').setReadOnly(false);
						Ext.getCmp('deptdesc').setReadOnly(false);
						Ext.getCmp('deptname').setReadOnly(false);
						
						
						Ext.getCmp('add_dept').getEl().show();
						Ext.getCmp('edit_dept').getEl().show();
						Ext.getCmp('reset_dept').getEl().show();
						
						
    					
    					
    					Ext.getCmp('deptaddform').setTitle('Edit Dept');
						
				}
			},{
					iconCls: 'deleteClass',
					tooltip: 'Delete',
					handler: function(grid, rowIndex, colIndex) {
					var grid = this.up('grid');
					if (grid) {
						var rec = grid.getStore().getAt(rowIndex);
						Ext.Msg.confirm('Remove Record '+rec.get('deptcode')+' ?',+rec.get('deptcode'), function (button) {
							if (button == 'yes') {
								var deptid=rec.get('deptid');
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/Dept.php',
									method: 'POST',
									params : {action:3,deptid:deptid},
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
